/**
 * @file components/ProductDetailAddToCart.tsx
 * @description 상품 상세 페이지용 장바구니 추가 컴포넌트
 *
 * 수량 선택과 함께 장바구니 추가 기능을 제공합니다.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { addToCart } from "@/actions/cart";
import { QuantitySelector } from "./QuantitySelector";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailAddToCartProps {
  productId: string;
  maxQuantity: number;
  disabled?: boolean;
  className?: string;
}

export function ProductDetailAddToCart({
  productId,
  maxQuantity,
  disabled = false,
  className,
}: ProductDetailAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    // 로그인하지 않은 경우 미리 체크
    if (!isSignedIn) {
      toast({
        title: "로그인 필요",
        description: "장바구니에 추가하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await addToCart(productId, quantity);
      if (result.success) {
        router.refresh();
        toast({
          title: "장바구니에 추가되었습니다!",
          description: `${quantity}개가 장바구니에 추가되었습니다.`,
        });
      } else {
        toast({
          title: "장바구니 추가 실패",
          description: result.error || "장바구니 추가에 실패했습니다.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // 네트워크 오류 체크
      if (error instanceof Error && error.message.includes("fetch")) {
        toast({
          title: "네트워크 오류",
          description: "인터넷 연결을 확인해주세요.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "오류 발생",
          description: "장바구니 추가 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          수량:
        </span>
        <QuantitySelector
          min={1}
          max={maxQuantity}
          defaultValue={1}
          onChange={setQuantity}
          disabled={disabled || isLoading}
        />
      </div>
      <Button
        className={className}
        disabled={disabled || isLoading || maxQuantity === 0}
        onClick={handleAddToCart}
      >
        <ShoppingBag className="w-5 h-5 mr-2" />
        {isLoading
          ? "추가 중..."
          : disabled || maxQuantity === 0
            ? "품절"
            : "장바구니에 추가"}
      </Button>
    </div>
  );
}

