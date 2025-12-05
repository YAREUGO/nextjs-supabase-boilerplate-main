/**
 * @file components/PaymentWidgetWrapper.tsx
 * @description 결제 위젯 클라이언트 래퍼 컴포넌트
 *
 * 서버 컴포넌트에서 클라이언트 컴포넌트를 안전하게 사용하기 위한 래퍼
 */

"use client";

import { OrderWithItems } from "@/types/order";
import { PaymentWidget } from "./PaymentWidget";

interface PaymentWidgetWrapperProps {
  order: OrderWithItems;
}

export function PaymentWidgetWrapper({ order }: PaymentWidgetWrapperProps) {
  return <PaymentWidget order={order} />;
}


