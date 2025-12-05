/**
 * @file app/payments/success/page.tsx
 * @description 결제 성공 페이지
 *
 * Toss Payments 결제 성공 후 콜백을 처리하고 주문 상태를 업데이트합니다.
 */

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { confirmPayment } from "@/actions/payment";
import { PaymentSuccessContent } from "@/components/PaymentSuccessContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    paymentKey?: string;
    orderId?: string;
    amount?: string;
  }>;
}

async function PaymentSuccessHandler({
  searchParams,
}: {
  searchParams: Promise<{
    paymentKey?: string;
    orderId?: string;
    amount?: string;
  }>;
}) {
  const params = await searchParams;

  if (!params.paymentKey || !params.orderId || !params.amount) {
    redirect("/orders");
  }

  // 결제 승인 처리
  const result = await confirmPayment({
    paymentKey: params.paymentKey,
    orderId: params.orderId,
    amount: Number(params.amount),
  });

  if (!result.success) {
    // 결제 승인 실패 시 주문 상세 페이지로 리다이렉트
    redirect(`/orders/${params.orderId}`);
  }

  return <PaymentSuccessContent orderId={params.orderId} />;
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SignedIn>
          <Suspense
            fallback={
              <div className="text-center py-12">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              </div>
            }
          >
            <PaymentSuccessHandler searchParams={searchParams} />
          </Suspense>
        </SignedIn>

        <SignedOut>
          <div className="text-center py-16">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              로그인이 필요합니다
            </h2>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                상품 둘러보기
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </main>
  );
}

