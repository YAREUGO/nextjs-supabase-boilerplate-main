/**
 * @file components/OrderDetail.tsx
 * @description 주문 상세 컴포넌트
 *
 * 주문 정보, 배송지, 주문 아이템을 표시합니다.
 */

import { OrderWithItems, ORDER_STATUS_LABELS } from "@/types/order";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderDetailProps {
  order: OrderWithItems;
}

export function OrderDetail({ order }: OrderDetailProps) {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  };

  const shippingAddress = order.shipping_address;

  return (
    <div className="space-y-6">
      {/* 주문 상태 메시지 */}
      {order.status === "pending" && (
        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/50 dark:to-amber-900/50 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200 mb-2">
            결제 대기 중
          </h2>
          <p className="text-amber-700 dark:text-amber-300 mb-4">
            주문 번호: {order.id}
          </p>
          <p className="text-sm text-amber-600 dark:text-amber-400">
            결제를 완료해주세요.
          </p>
        </div>
      )}
      {order.status === "confirmed" && (
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 border-2 border-green-300 dark:border-green-700 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-200 mb-2">
            주문이 완료되었습니다!
          </h2>
          <p className="text-green-700 dark:text-green-300">
            주문 번호: {order.id}
          </p>
        </div>
      )}

      {/* 주문 정보 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          주문 정보
        </h2>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              주문 번호
            </dt>
            <dd className="text-gray-900 dark:text-gray-100">{order.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              주문 상태
            </dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {ORDER_STATUS_LABELS[order.status]}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              주문일시
            </dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {new Date(order.created_at).toLocaleString("ko-KR")}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              총 금액
            </dt>
            <dd className="text-lg font-bold text-amber-600 dark:text-amber-400">
              {formattedPrice(order.total_amount)}
            </dd>
          </div>
        </dl>
      </div>

      {/* 배송지 정보 */}
      {shippingAddress && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            배송지 정보
          </h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <span className="font-semibold">받는 분:</span> {shippingAddress.name}
            </p>
            <p>
              <span className="font-semibold">전화번호:</span> {shippingAddress.phone}
            </p>
            <p>
              <span className="font-semibold">주소:</span> ({shippingAddress.postalCode}){" "}
              {shippingAddress.address}
              {shippingAddress.addressDetail && ` ${shippingAddress.addressDetail}`}
            </p>
          </div>
        </div>
      )}

      {/* 주문 아이템 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          주문 상품
        </h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {item.product_name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formattedPrice(item.price)} × {item.quantity}개
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-600 dark:text-amber-400">
                  {formattedPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t-2 border-amber-200 dark:border-amber-800 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            총 금액
          </span>
          <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {formattedPrice(order.total_amount)}
          </span>
        </div>
      </div>

      {/* 결제 정보 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          결제 정보
        </h2>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              결제 상태
            </dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {order.status === "confirmed" ||
              order.status === "shipped" ||
              order.status === "delivered"
                ? "결제 완료"
                : order.status === "pending"
                  ? "결제 대기"
                  : "결제 취소"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              결제 금액
            </dt>
            <dd className="text-lg font-bold text-amber-600 dark:text-amber-400">
              {formattedPrice(order.total_amount)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              결제 수단
            </dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {order.status === "confirmed" ||
              order.status === "shipped" ||
              order.status === "delivered"
                ? "카드 결제"
                : "-"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              결제일시
            </dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {order.status === "confirmed" ||
              order.status === "shipped" ||
              order.status === "delivered"
                ? new Date(order.updated_at).toLocaleString("ko-KR")
                : "-"}
            </dd>
          </div>
        </dl>
      </div>

      {/* 주문 요청사항 */}
      {order.order_note && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            주문 요청사항
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {order.order_note}
          </p>
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="flex gap-4">
        {order.status === "pending" && (
          <Link href={`/payments/${order.id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
              결제하기
            </Button>
          </Link>
        )}
        <Link href="/products" className="flex-1">
          <Button
            variant="outline"
            className="w-full border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
          >
            쇼핑 계속하기
          </Button>
        </Link>
        <Link href="/mypage" className="flex-1">
          <Button
            variant="outline"
            className="w-full border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
          >
            주문 내역 보기
          </Button>
        </Link>
      </div>
    </div>
  );
}

