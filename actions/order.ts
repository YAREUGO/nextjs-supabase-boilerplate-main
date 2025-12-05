/**
 * @file actions/order.ts
 * @description 주문 관련 Server Actions
 *
 * 주문 생성 및 조회 기능을 제공합니다.
 */

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ShippingAddress, Order, OrderItem, OrderWithItems } from "@/types/order";
import { getCartItems } from "./cart";
import { getProductById } from "@/lib/supabase/products";

/**
 * 주문 생성
 */
export async function createOrder(
  shippingAddress: ShippingAddress,
  orderNote?: string
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  try {
    const supabase = await createClient();

    // 장바구니 아이템 조회
    const cartItems = await getCartItems();

    if (cartItems.length === 0) {
      return { success: false, error: "장바구니가 비어있습니다." };
    }

    // 총 금액 계산 및 재고 확인
    let totalAmount = 0;
    const orderItemsData: Array<{
      product_id: string;
      product_name: string;
      quantity: number;
      price: number;
    }> = [];

    for (const cartItem of cartItems) {
      const product = cartItem.product;
      if (!product) {
        return { success: false, error: "상품 정보를 찾을 수 없습니다." };
      }

      // 재고 확인
      const currentProduct = await getProductById(product.id);
      if (!currentProduct) {
        return {
          success: false,
          error: `상품 "${product.name}"을(를) 찾을 수 없습니다.`,
        };
      }

      if (currentProduct.stock_quantity < cartItem.quantity) {
        return {
          success: false,
          error: `상품 "${product.name}"의 재고가 부족합니다. (현재 재고: ${currentProduct.stock_quantity}개)`,
        };
      }

      const itemTotal = cartItem.quantity * product.price;
      totalAmount += itemTotal;

      orderItemsData.push({
        product_id: product.id,
        product_name: product.name,
        quantity: cartItem.quantity,
        price: product.price,
      });
    }

    // 주문 생성
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        clerk_id: userId,
        total_amount: totalAmount,
        status: "pending",
        shipping_address: shippingAddress as any,
        order_note: orderNote || null,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Error creating order:", orderError);
      return { success: false, error: "주문 생성 실패" };
    }

    // 주문 상세 아이템 생성
    const orderItemsInsert = orderItemsData.map((item) => ({
      order_id: order.id,
      ...item,
    }));

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItemsInsert);

    if (orderItemsError) {
      console.error("Error creating order items:", orderItemsError);
      // 주문 삭제 (롤백)
      await supabase.from("orders").delete().eq("id", order.id);
      return { success: false, error: "주문 상세 생성 실패" };
    }

    // 결제 전에는 장바구니를 비우지 않음 (결제 완료 후 비움)
    // 장바구니 비우기는 결제 성공 후 처리

    revalidatePath("/cart");
    revalidatePath("/orders");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error in createOrder:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

/**
 * 사용자의 주문 목록 조회
 */
export async function getOrders(): Promise<Order[]> {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("clerk_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }

    return (data as Order[]) || [];
  } catch (error) {
    console.error("Error in getOrders:", error);
    return [];
  }
}

/**
 * 주문 상세 조회 (아이템 포함)
 */
export async function getOrderById(
  orderId: string
): Promise<OrderWithItems | null> {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const supabase = await createClient();

    // 주문 조회
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("clerk_id", userId)
      .single();

    if (orderError || !order) {
      return null;
    }

    // 주문 아이템 조회
    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", { ascending: true });

    if (itemsError) {
      console.error("Error fetching order items:", itemsError);
      return { ...(order as Order), items: [] };
    }

    return {
      ...(order as Order),
      items: (items as OrderItem[]) || [],
    };
  } catch (error) {
    console.error("Error in getOrderById:", error);
    return null;
  }
}

