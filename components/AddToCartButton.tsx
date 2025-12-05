/**
 * @file components/AddToCartButton.tsx
 * @description 장바구니 추가 버튼 컴포넌트
 *
 * 클라이언트 컴포넌트로 구현되어 사용자 인터랙션을 처리합니다.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { addToCart } from "@/actions/cart";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  productId: string;
  disabled?: boolean;
  className?: string;
  quantity?: number;
}

export function AddToCartButton({
  productId,
  disabled = false,
  className,
  quantity = 1,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 전파 중지
    e.preventDefault();
    e.stopPropagation();

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
          description: "장바구니에서 확인하실 수 있습니다.",
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
    <Button
      className={className}
      disabled={disabled || isLoading}
      onClick={handleAddToCart}
    >
      <ShoppingBag className="w-5 h-5 mr-2" />
      {isLoading ? "추가 중..." : disabled ? "품절" : "장바구니에 추가"}
    </Button>
  );
}

