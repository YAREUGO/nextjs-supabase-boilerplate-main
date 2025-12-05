/**
 * @file app/payments/fail/page.tsx
 * @description 결제 실패 페이지
 *
 * Toss Payments 결제 실패 시 표시되는 페이지
 */

import { Suspense } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { cancelOrder } from "@/actions/payment";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft } from "lucide-react";

interface PaymentFailPageProps {
  searchParams: Promise<{
    code?: string;
    message?: string;
    orderId?: string;
  }>;
}

async function PaymentFailHandler({
  searchParams,
}: {
  searchParams: Promise<{
    code?: string;
    message?: string;
    orderId?: string;
  }>;
}) {
  const params = await searchParams;

  // 주문 취소 처리 (선택사항)
  if (params.orderId) {
    await cancelOrder(params.orderId);
  }

  return (
    <div className="text-center py-16">
      <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
      <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
        결제에 실패했습니다
      </h1>
      {params.message && (
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
          {params.message}
        </p>
      )}
      {params.code && (
        <p className="text-sm text-slate-500 dark:text-slate-500 mb-8">
          오류 코드: {params.code}
        </p>
      )}
      <div className="flex gap-4 justify-center">
        {params.orderId && (
          <Link href={`/orders/${params.orderId}`}>
            <Button variant="outline" className="border-slate-300 dark:border-slate-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              주문 상세로
            </Button>
          </Link>
        )}
        <Link href="/products">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            상품 둘러보기
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default async function PaymentFailPage({
  searchParams,
}: PaymentFailPageProps) {
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
            <PaymentFailHandler searchParams={searchParams} />
          </Suspense>
        </SignedIn>

        <SignedOut>
          <div className="text-center py-16">
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
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

