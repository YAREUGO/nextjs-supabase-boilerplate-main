/**
 * @file types/order.ts
 * @description 주문 관련 TypeScript 타입 정의
 *
 * Supabase orders 및 order_items 테이블과 일치하는 타입 정의
 */

import { Product } from "./product";

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  addressDetail?: string;
  postalCode: string;
}

export interface Order {
  id: string;
  clerk_id: string;
  total_amount: number;
  status: OrderStatus;
  shipping_address: ShippingAddress | null;
  order_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  created_at: string;
  // 조인된 상품 정보
  product?: Product;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "주문 대기",
  confirmed: "주문 확인",
  shipped: "배송 중",
  delivered: "배송 완료",
  cancelled: "주문 취소",
};


