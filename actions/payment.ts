/**
 * @file actions/payment.ts
 * @description 결제 관련 Server Actions
 *
 * Toss Payments 결제 승인 및 주문 상태 업데이트를 처리합니다.
 */

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getServiceRoleClient } from "@/lib/supabase/service-role";
import { PaymentCallbackParams } from "@/types/payment";

/**
 * 결제 승인 처리 및 주문 상태 업데이트
 */
export async function confirmPayment(
  params: PaymentCallbackParams
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  try {
    const supabase = getServiceRoleClient();

    // 주문 조회 및 검증
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", params.orderId)
      .eq("clerk_id", userId)
      .single();

    if (orderError || !order) {
      console.error("Error fetching order:", orderError);
      return { success: false, error: "주문을 찾을 수 없습니다." };
    }

    // 주문 상태 확인
    if (order.status !== "pending") {
      return {
        success: false,
        error: `이미 처리된 주문입니다. (상태: ${order.status})`,
      };
    }

    // 금액 검증
    if (Number(order.total_amount) !== params.amount) {
      console.error("Amount mismatch:", {
        orderAmount: order.total_amount,
        paymentAmount: params.amount,
      });
      return { success: false, error: "결제 금액이 일치하지 않습니다." };
    }

    // 주문 상태를 confirmed로 업데이트
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "confirmed",
        // 결제 정보는 추후 확장 가능 (payment_key, payment_method 등)
      })
      .eq("id", params.orderId);

    if (updateError) {
      console.error("Error updating order status:", updateError);
      return { success: false, error: "주문 상태 업데이트 실패" };
    }

    // 장바구니 비우기 (결제 성공 후)
    const { error: clearCartError } = await supabase
      .from("cart_items")
      .delete()
      .eq("clerk_id", userId);

    if (clearCartError) {
      console.error("Error clearing cart:", clearCartError);
      // 장바구니 비우기 실패는 경고만 하고 주문은 유지
    }

    revalidatePath("/cart");
    revalidatePath("/orders");
    revalidatePath(`/orders/${params.orderId}`);

    return { success: true, orderId: params.orderId };
  } catch (error) {
    console.error("Error in confirmPayment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

/**
 * 결제 실패 시 주문 취소
 */
export async function cancelOrder(
  orderId: string
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  try {
    const supabase = await createClient();

    // 주문 조회 및 검증
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("clerk_id", userId)
      .single();

    if (orderError || !order) {
      return { success: false, error: "주문을 찾을 수 없습니다." };
    }

    // pending 상태인 주문만 취소 가능
    if (order.status !== "pending") {
      return {
        success: false,
        error: `취소할 수 없는 주문입니다. (상태: ${order.status})`,
      };
    }

    // 주문 상태를 cancelled로 업데이트
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", orderId)
      .eq("clerk_id", userId);

    if (updateError) {
      console.error("Error cancelling order:", updateError);
      return { success: false, error: "주문 취소 실패" };
    }

    revalidatePath("/orders");
    revalidatePath(`/orders/${orderId}`);

    return { success: true };
  } catch (error) {
    console.error("Error in cancelOrder:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}


