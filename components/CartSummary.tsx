/**
 * @file components/CartSummary.tsx
 * @description 장바구니 요약 컴포넌트
 *
 * 장바구니 총 금액과 주문하기 버튼을 표시합니다.
 */

"use client";

import { CartSummary as CartSummaryType } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CartSummaryProps {
  summary: CartSummaryType;
}

export function CartSummary({ summary }: CartSummaryProps) {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        주문 요약
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>상품 개수</span>
          <span>{summary.totalItems}개</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100 pt-3 border-t-2 border-amber-200 dark:border-amber-800">
          <span>총 금액</span>
          <span className="text-amber-600 dark:text-amber-400">
            {formattedPrice(summary.totalAmount)}
          </span>
        </div>
      </div>

      <Link href="/orders/new" className="block">
        <Button
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg py-6"
          disabled={summary.items.length === 0}
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          주문하기
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>

      <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
        주문하기를 클릭하면 배송지 정보를 입력하게 됩니다.
      </p>
    </div>
  );
}


