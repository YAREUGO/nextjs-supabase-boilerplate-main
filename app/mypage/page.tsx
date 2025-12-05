/**
 * @file app/mypage/page.tsx
 * @description 마이페이지
 *
 * 사용자의 주문 내역을 조회하는 페이지
 */

import { Suspense } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getOrders } from "@/actions/order";
import { OrderList } from "@/components/OrderList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag } from "lucide-react";

// Vercel 배포를 위한 동적 렌더링 설정
export const dynamic = "force-dynamic";

async function MyPageContent() {
  const orders = await getOrders();

  return (
    <div className="space-y-8">
      {/* 사용자 정보 섹션 */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          마이페이지
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          주문 내역을 확인하고 관리할 수 있습니다.
        </p>
      </div>

      {/* 주문 내역 섹션 */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          주문 내역
        </h2>
        {orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-12 text-center shadow-lg">
            <ShoppingBag className="w-16 h-16 text-blue-400 dark:text-blue-600 mx-auto mb-4 opacity-50" />
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              아직 주문 내역이 없습니다.
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                상품 둘러보기
              </Button>
            </Link>
          </div>
        ) : (
          <OrderList orders={orders} />
        )}
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          마이페이지
        </h1>

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
            <MyPageContent />
          </Suspense>
        </SignedIn>

        <SignedOut>
          <div className="text-center py-16">
            <User className="w-24 h-24 text-blue-400 dark:text-blue-600 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              로그인이 필요합니다
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              마이페이지를 보려면 로그인해주세요.
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

