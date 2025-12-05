/**
 * @file actions/cart.ts
 * @description 장바구니 관련 Server Actions
 *
 * 장바구니 아이템 추가, 조회, 수정, 삭제 기능을 제공합니다.
 * RLS를 사용하지 않으므로 서버 사이드에서 clerk_id로 필터링합니다.
 */

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CartItem, CartItemWithProduct, CartSummary } from "@/types/cart";
import { Product } from "@/types/product";

/**
 * 현재 사용자의 장바구니 아이템 조회
 */
export async function getCartItems(): Promise<CartItemWithProduct[]> {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        *,
        product:products(*)
      `
      )
      .eq("clerk_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching cart items:", error);
      throw new Error(`장바구니 조회 실패: ${error.message}`);
    }

    return (data as CartItemWithProduct[]) || [];
  } catch (error) {
    console.error("Error in getCartItems:", error);
    return [];
  }
}

/**
 * 장바구니 아이템 추가
 */
export async function addToCart(
  productId: string,
  quantity: number = 1
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  if (quantity <= 0) {
    return { success: false, error: "수량은 1개 이상이어야 합니다." };
  }

  try {
    const supabase = await createClient();

    // 상품 존재 및 재고 확인
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .eq("is_active", true)
      .single();

    if (productError || !product) {
      return { success: false, error: "상품을 찾을 수 없습니다." };
    }

    if (product.stock_quantity < quantity) {
      return {
        success: false,
        error: `재고가 부족합니다. (현재 재고: ${product.stock_quantity}개)`,
      };
    }

    // 기존 장바구니 아이템 확인
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("clerk_id", userId)
      .eq("product_id", productId)
      .single();

    if (existingItem) {
      // 기존 아이템이 있으면 수량 업데이트
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock_quantity < newQuantity) {
        return {
          success: false,
          error: `재고가 부족합니다. (현재 재고: ${product.stock_quantity}개)`,
        };
      }

      const { error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", existingItem.id);

      if (updateError) {
        console.error("Error updating cart item:", updateError);
        return { success: false, error: "장바구니 업데이트 실패" };
      }
    } else {
      // 새 아이템 추가
      const { error: insertError } = await supabase
        .from("cart_items")
        .insert({
          clerk_id: userId,
          product_id: productId,
          quantity,
        });

      if (insertError) {
        console.error("Error adding to cart:", insertError);
        return { success: false, error: "장바구니 추가 실패" };
      }
    }

    revalidatePath("/cart");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error in addToCart:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

/**
 * 장바구니 아이템 수량 변경
 */
export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  if (quantity <= 0) {
    return { success: false, error: "수량은 1개 이상이어야 합니다." };
  }

  try {
    const supabase = await createClient();

    // 장바구니 아이템 확인 (본인 것인지 확인)
    const { data: cartItem, error: cartError } = await supabase
      .from("cart_items")
      .select("*, product:products(*)")
      .eq("id", cartItemId)
      .eq("clerk_id", userId)
      .single();

    if (cartError || !cartItem) {
      return { success: false, error: "장바구니 아이템을 찾을 수 없습니다." };
    }

    const product = cartItem.product as Product;
    if (product.stock_quantity < quantity) {
      return {
        success: false,
        error: `재고가 부족합니다. (현재 재고: ${product.stock_quantity}개)`,
      };
    }

    // 수량 업데이트
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", cartItemId)
      .eq("clerk_id", userId);

    if (updateError) {
      console.error("Error updating cart item quantity:", updateError);
      return { success: false, error: "수량 변경 실패" };
    }

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error in updateCartItemQuantity:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

/**
 * 장바구니 아이템 삭제
 */
export async function removeFromCart(
  cartItemId: string
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId)
      .eq("clerk_id", userId);

    if (error) {
      console.error("Error removing from cart:", error);
      return { success: false, error: "장바구니에서 삭제 실패" };
    }

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

/**
 * 장바구니 전체 삭제
 */
export async function clearCart(): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("clerk_id", userId);

    if (error) {
      console.error("Error clearing cart:", error);
      return { success: false, error: "장바구니 비우기 실패" };
    }

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error in clearCart:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

/**
 * 장바구니 요약 정보 조회
 */
export async function getCartSummary(): Promise<CartSummary> {
  const items = await getCartItems();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * (item.product?.price || 0),
    0
  );

  return {
    totalItems,
    totalAmount,
    items,
  };
}


