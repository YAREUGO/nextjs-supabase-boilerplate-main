/**
 * @file components/PaymentSuccessContent.tsx
 * @description 결제 성공 콘텐츠 컴포넌트
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface PaymentSuccessContentProps {
  orderId: string;
}

export function PaymentSuccessContent({ orderId }: PaymentSuccessContentProps) {
  return (
    <div className="text-center py-16">
      <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-200 mb-4">
        결제가 완료되었습니다!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        주문이 성공적으로 처리되었습니다.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
        주문 번호: <span className="font-mono">{orderId}</span>
      </p>
      <div className="flex gap-4 justify-center">
        <Link href={`/orders/${orderId}`}>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
            주문 상세 보기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">쇼핑 계속하기</Button>
        </Link>
      </div>
    </div>
  );
}

