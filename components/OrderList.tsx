/**
 * @file components/OrderList.tsx
 * @description 주문 목록 컴포넌트
 *
 * 주문 목록을 카드 형태로 표시하고 날짜별로 정렬합니다.
 */

"use client";

import { Order, ORDER_STATUS_LABELS } from "@/types/order";
import Link from "next/link";
import { Package, ArrowRight, Calendar } from "lucide-react";

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700";
      case "confirmed":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700";
      case "shipped":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700";
      case "delivered":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link key={order.id} href={`/orders/${order.id}`}>
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6 hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300 shadow-md hover:shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* 주문 정보 */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    주문 #{order.id.slice(0, 8)}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border-2 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(order.created_at).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* 금액 및 액션 */}
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    총 결제 금액
                  </p>
                  <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    {formattedPrice(order.total_amount)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold">
                  <span>상세 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

