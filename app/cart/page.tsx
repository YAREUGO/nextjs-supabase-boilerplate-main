/**
 * @file app/cart/page.tsx
 * @description 장바구니 페이지
 *
 * 사용자의 장바구니 아이템을 표시하고 수량 변경, 삭제 기능을 제공합니다.
 */

import { Suspense } from "react";
import { getCartSummary } from "@/actions/cart";
import { CartItemList } from "@/components/CartItemList";
import { CartSummary } from "@/components/CartSummary";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";

// Vercel 배포를 위한 동적 렌더링 설정
export const dynamic = "force-dynamic";

async function CartContent() {
  const summary = await getCartSummary();

  if (summary.items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-24 h-24 text-blue-400 dark:text-blue-600 mx-auto mb-6 opacity-50" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          장바구니가 비어있습니다
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          상품을 추가해보세요!
        </p>
        <Link href="/products">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            상품 둘러보기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartItemList items={summary.items} />
      </div>
      <div className="lg:col-span-1">
        <CartSummary summary={summary} />
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          장바구니
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
            <CartContent />
          </Suspense>
        </SignedIn>

        <SignedOut>
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-blue-400 dark:text-blue-600 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              로그인이 필요합니다
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              장바구니를 사용하려면 로그인해주세요.
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                상품 둘러보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </main>
  );
}

