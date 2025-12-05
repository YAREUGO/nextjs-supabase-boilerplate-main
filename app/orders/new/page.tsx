/**
 * @file app/orders/new/page.tsx
 * @description 주문 페이지
 *
 * 배송지 정보를 입력받고 주문을 생성하는 페이지
 */

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getCartSummary } from "@/actions/cart";
import { OrderForm } from "@/components/OrderForm";
import { CartSummary } from "@/components/CartSummary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";

// Vercel 배포를 위한 동적 렌더링 설정
export const dynamic = "force-dynamic";

async function OrderContent() {
  const summary = await getCartSummary();

  if (summary.items.length === 0) {
    redirect("/cart");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <OrderForm />
      </div>
      <div className="lg:col-span-1">
        <CartSummary summary={summary} />
      </div>
    </div>
  );
}

export default function NewOrderPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/cart">
          <Button
            variant="ghost"
            className="mb-6 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            장바구니로 돌아가기
          </Button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          주문하기
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
            <OrderContent />
          </Suspense>
        </SignedIn>

        <SignedOut>
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-blue-400 dark:text-blue-600 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              로그인이 필요합니다
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              주문하려면 로그인해주세요.
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

