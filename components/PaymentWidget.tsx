/**
 * @file components/PaymentWidget.tsx
 * @description Toss Payments 결제 위젯 컴포넌트
 *
 * Toss Payments 위젯을 초기화하고 결제를 처리합니다.
 * 테스트 모드로 운영됩니다.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { OrderWithItems } from "@/types/order";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";

interface PaymentWidgetProps {
  order: OrderWithItems;
}

/**
 * Toss Payments 클라이언트 키
 * 
 * 환경 변수 NEXT_PUBLIC_TOSS_CLIENT_KEY를 사용합니다.
 * .env 또는 .env.local 파일에 설정해야 합니다.
 * 
 * 테스트 모드 기본값: test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
 * 프로덕션 모드: Toss Payments 대시보드에서 발급받은 실제 키 사용
 */
const TOSS_CLIENT_KEY =
  process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ||
  "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

/**
 * Clerk user ID를 Toss Payments customerKey 형식으로 변환
 * 
 * Toss Payments customerKey 요구사항:
 * - 영문 대소문자, 숫자, 특수문자(`-`,`_`,`=`,`.`,`@`)만 허용
 * - 최소 2자 이상 최대 50자 이하
 * 
 * @param clerkId Clerk user ID
 * @returns Toss Payments customerKey 형식 문자열
 */
function normalizeCustomerKey(clerkId: string): string {
  if (!clerkId || typeof clerkId !== "string") {
    // clerkId가 없거나 유효하지 않은 경우 fallback
    return `cust_${Date.now().toString(36)}`.substring(0, 50);
  }

  // Toss Payments는 UUID 형식의 무작위한 값을 권장합니다.
  // Clerk ID를 직접 사용하지 않고, 항상 Base64 인코딩을 사용하여 안전한 형식으로 변환합니다.
  
  try {
    // Base64 인코딩 (URL-safe: + -> -, / -> _, = 제거)
    let encoded = btoa(clerkId)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, ""); // 패딩 제거
    
    // 허용된 문자만 남기기
    encoded = encoded.replace(/[^a-zA-Z0-9\-_=\.@]/g, "");
    
    // 숫자로 시작하는 경우 방지 (영문자로 시작하도록 보장)
    if (/^\d/.test(encoded)) {
      // 숫자로 시작하면 앞에 영문자 접두사 추가
      encoded = "c" + encoded;
    }
    
    // 특수문자 포함 확인 및 보장
    if (!/[-_=\.@]/.test(encoded)) {
      // 특수문자가 없으면 `_` 추가
      encoded = encoded + "_";
    }
    
    // 길이 제한 (최대 50자)
    if (encoded.length > 50) {
      encoded = encoded.substring(0, 50);
      // 마지막 문자가 특수문자인지 확인
      if (!/[-_=\.@]/.test(encoded[encoded.length - 1])) {
        encoded = encoded.substring(0, 49) + "_";
      }
    }
    
    // 최소 길이 보장 (2자 이상)
    if (encoded.length >= 2) {
      // 최종 검증
      const validPattern = /^[a-zA-Z0-9\-_=\.@]{2,50}$/;
      const hasSpecialChar = /[-_=\.@]/.test(encoded);
      
      if (validPattern.test(encoded) && hasSpecialChar) {
        return encoded;
      }
    }
  } catch (error) {
    console.error("[normalizeCustomerKey] Base64 encoding failed:", error);
  }
  
  // Base64 인코딩 실패 시 해시 기반 변환 (특수문자 포함 보장)
  let hash = 0;
  for (let i = 0; i < clerkId.length; i++) {
    const char = clerkId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  // Base36 인코딩 + 특수문자 추가
  const hashStr = Math.abs(hash).toString(36);
  const timestamp = Date.now().toString(36);
  let normalized = `cust_${hashStr}${timestamp}`.substring(0, 50);
  
  // 특수문자 포함 확인
  if (!/[-_=\.@]/.test(normalized)) {
    normalized = normalized.replace(/_$/, "") + "_";
    if (normalized.length > 50) {
      normalized = normalized.substring(0, 50);
    }
  }
  
  return normalized;
}

export function PaymentWidget({ order }: PaymentWidgetProps) {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initPaymentWidget = async () => {
      try {
        // Clerk user ID를 Toss Payments customerKey 형식으로 변환
        const customerKey = normalizeCustomerKey(order.clerk_id);
        
        // 디버깅: 개발 환경에서만 로그 출력
        if (process.env.NODE_ENV === "development") {
          console.log("[PaymentWidget] Original clerk_id:", order.clerk_id);
          console.log("[PaymentWidget] Normalized customerKey:", customerKey);
          console.log("[PaymentWidget] customerKey length:", customerKey.length);
          console.log("[PaymentWidget] customerKey pattern test:", /^[a-zA-Z0-9\-_=\.@]{2,50}$/.test(customerKey));
          console.log("[PaymentWidget] customerKey has special char:", /[-_=\.@]/.test(customerKey));
          console.log("[PaymentWidget] customerKey starts with number:", /^\d/.test(customerKey));
        }
        
        // 결제 위젯 초기화
        // Toss Payments SDK v1: customerKey를 문자열로 직접 전달 (객체가 아님!)
        const paymentWidget = await loadPaymentWidget(TOSS_CLIENT_KEY, customerKey);

        paymentWidgetRef.current = paymentWidget;

        // 결제 금액 UI 렌더링
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
          "#payment-widget",
          { value: order.total_amount },
          { variantKey: "DEFAULT" }
        );

        paymentMethodsWidgetRef.current = paymentMethodsWidget;

        // 이용약관 UI 렌더링
        paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing payment widget:", err);
        setError("결제 위젯 초기화에 실패했습니다.");
        setIsLoading(false);
      }
    };

    initPaymentWidget();
  }, [order.clerk_id, order.total_amount]);

  const handlePayment = async () => {
    if (!paymentWidgetRef.current) {
      alert("결제 위젯이 초기화되지 않았습니다.");
      return;
    }

    try {
      // 결제 요청
      await paymentWidgetRef.current.requestPayment({
        orderId: order.id,
        orderName: `${order.items[0]?.product_name || "상품"} 외 ${order.items.length - 1}건`,
        successUrl: `${window.location.origin}/payments/success?orderId=${order.id}`,
        failUrl: `${window.location.origin}/payments/fail?orderId=${order.id}`,
        customerEmail: undefined, // 필요시 추가
        customerName: order.shipping_address?.name || "고객",
        customerMobilePhone: order.shipping_address?.phone,
      });
    } catch (err) {
      console.error("Error requesting payment:", err);
      alert("결제 요청 중 오류가 발생했습니다.");
    }
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-400 mx-auto mb-4" />
        <p className="text-amber-800 dark:text-amber-300">결제 위젯을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-6">
        <p className="text-red-800 dark:text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 주문 요약 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          주문 요약
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">주문 번호</span>
            <span className="text-gray-900 dark:text-gray-100 font-mono text-sm">
              {order.id}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">주문 상품</span>
            <span className="text-gray-900 dark:text-gray-100">
              {order.items.length}개
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-amber-200 dark:border-amber-800">
            <span className="text-gray-900 dark:text-gray-100">총 결제 금액</span>
            <span className="text-amber-600 dark:text-amber-400">
              {formattedPrice(order.total_amount)}
            </span>
          </div>
        </div>
      </div>

      {/* 결제 수단 선택 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          결제 수단 선택
        </h2>
        <div id="payment-widget" className="mb-4"></div>
        <div id="agreement"></div>
      </div>

      {/* 결제하기 버튼 */}
      <Button
        onClick={handlePayment}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg py-6"
      >
        <CreditCard className="w-5 h-5 mr-2" />
        {formattedPrice(order.total_amount)} 결제하기
      </Button>

      {/* 테스트 모드 안내 */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg p-4">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          <strong>테스트 모드:</strong> 실제 결제가 발생하지 않습니다. 테스트 카드 번호를
          사용하여 결제를 진행할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

