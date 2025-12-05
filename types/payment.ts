/**
 * @file types/payment.ts
 * @description 결제 관련 TypeScript 타입 정의
 *
 * Toss Payments와 주문 결제 정보를 위한 타입 정의
 */

export interface PaymentInfo {
  orderId: string;
  amount: number;
  orderName: string;
  customerName: string;
  customerEmail?: string;
  customerMobilePhone?: string;
  successUrl: string;
  failUrl: string;
}

export interface PaymentResult {
  success: boolean;
  paymentKey?: string;
  orderId?: string;
  amount?: number;
  error?: string;
}

export interface PaymentCallbackParams {
  paymentKey: string;
  orderId: string;
  amount: number;
}


