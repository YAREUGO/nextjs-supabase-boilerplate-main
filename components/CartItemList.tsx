/**
 * @file components/CartItemList.tsx
 * @description 장바구니 아이템 목록 컴포넌트
 *
 * 장바구니 아이템을 표시하고 수량 변경, 삭제 기능을 제공합니다.
 */

"use client";

import { CartItemWithProduct } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { useTransition } from "react";
import { updateCartItemQuantity, removeFromCart } from "@/actions/cart";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CartItemListProps {
  items: CartItemWithProduct[];
}

export function CartItemList({ items }: CartItemListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) return;

    startTransition(async () => {
      const result = await updateCartItemQuantity(cartItemId, newQuantity);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "수량 변경에 실패했습니다.");
      }
    });
  };

  const handleRemove = (cartItemId: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    startTransition(async () => {
      const result = await removeFromCart(cartItemId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "삭제에 실패했습니다.");
      }
    });
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const product = item.product;
        const itemTotal = item.quantity * (product?.price || 0);

        return (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6"
          >
            <div className="flex gap-4">
              {/* 상품 이미지 */}
              <Link
                href={`/products/${product?.id}`}
                className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-lg flex items-center justify-center"
              >
                <div className="text-amber-600 dark:text-amber-400 text-2xl">
                  📦
                </div>
              </Link>

              {/* 상품 정보 */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product?.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    {product?.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {formattedPrice(product?.price || 0)} / 개
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  재고: {product?.stock_quantity || 0}개
                </p>
              </div>

              {/* 수량 조절 및 삭제 */}
              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={isPending || item.quantity <= 1}
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={product?.stock_quantity || 999}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || 1;
                      handleQuantityChange(item.id, newQuantity);
                    }}
                    className="w-16 text-center"
                    disabled={isPending}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={
                      isPending ||
                      item.quantity >= (product?.stock_quantity || 0)
                    }
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    {formattedPrice(itemTotal)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 mt-2"
                    onClick={() => handleRemove(item.id)}
                    disabled={isPending}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

