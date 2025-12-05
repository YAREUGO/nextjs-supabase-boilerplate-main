/**
 * @file app/orders/[id]/page.tsx
 * @description 주문 확인 페이지
 *
 * 주문 완료 후 주문 상세 정보를 표시하는 페이지
 */

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getOrderById } from "@/actions/order";
import { OrderDetail } from "@/components/OrderDetail";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";

// Vercel 배포를 위한 동적 렌더링 설정
export const dynamic = "force-dynamic";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

async function OrderContent({ orderId }: { orderId: string }) {
  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return <OrderDetail order={order} />;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/mypage">
          <Button
            variant="ghost"
            className="mb-6 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            주문 내역으로
          </Button>
        </Link>

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
            <OrderContent orderId={id} />
          </Suspense>
        </SignedIn>

        <SignedOut>
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-blue-400 dark:text-blue-600 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              로그인이 필요합니다
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              주문 내역을 보려면 로그인해주세요.
            </p>
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

