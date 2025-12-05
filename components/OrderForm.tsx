/**
 * @file components/OrderForm.tsx
 * @description 주문 폼 컴포넌트
 *
 * 배송지 정보를 입력받는 폼 컴포넌트
 */

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createOrder } from "@/actions/order";
import { ShippingAddress } from "@/types/order";

const orderSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  phone: z
    .string()
    .regex(/^[0-9-]+$/, "올바른 전화번호 형식이 아닙니다.")
    .min(10, "전화번호는 10자 이상이어야 합니다."),
  postalCode: z
    .string()
    .regex(/^[0-9]{5}$/, "우편번호는 5자리 숫자여야 합니다."),
  address: z.string().min(5, "주소를 입력해주세요."),
  addressDetail: z.string().optional(),
  orderNote: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

export function OrderForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = (data: OrderFormData) => {
    startTransition(async () => {
      const shippingAddress: ShippingAddress = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        addressDetail: data.addressDetail,
        postalCode: data.postalCode,
      };

      const result = await createOrder(shippingAddress, data.orderNote);

      if (result.success && result.orderId) {
        // 결제 페이지로 이동
        router.push(`/payments/${result.orderId}`);
      } else {
        alert(result.error || "주문 생성에 실패했습니다.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          배송지 정보
        </h2>

        <div className="space-y-4">
          {/* 이름 */}
          <div>
            <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">
              받는 분 이름 *
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="홍길동"
              className="mt-1"
              disabled={isPending}
            />
            {errors.name && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* 전화번호 */}
          <div>
            <Label htmlFor="phone" className="text-gray-900 dark:text-gray-100">
              전화번호 *
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="010-1234-5678"
              className="mt-1"
              disabled={isPending}
            />
            {errors.phone && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* 우편번호 */}
          <div>
            <Label
              htmlFor="postalCode"
              className="text-gray-900 dark:text-gray-100"
            >
              우편번호 *
            </Label>
            <Input
              id="postalCode"
              {...register("postalCode")}
              placeholder="12345"
              className="mt-1"
              disabled={isPending}
              maxLength={5}
            />
            {errors.postalCode && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          {/* 주소 */}
          <div>
            <Label htmlFor="address" className="text-gray-900 dark:text-gray-100">
              주소 *
            </Label>
            <Input
              id="address"
              {...register("address")}
              placeholder="서울시 강남구 테헤란로 123"
              className="mt-1"
              disabled={isPending}
            />
            {errors.address && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* 상세주소 */}
          <div>
            <Label
              htmlFor="addressDetail"
              className="text-gray-900 dark:text-gray-100"
            >
              상세주소
            </Label>
            <Input
              id="addressDetail"
              {...register("addressDetail")}
              placeholder="101동 101호"
              className="mt-1"
              disabled={isPending}
            />
          </div>
        </div>
      </div>

      {/* 주문 요청사항 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          주문 요청사항
        </h2>
        <Textarea
          {...register("orderNote")}
          placeholder="배송 시 요청사항을 입력해주세요. (선택사항)"
          className="min-h-[100px]"
          disabled={isPending}
        />
      </div>

      {/* 주문하기 버튼 */}
      <div className="flex gap-4">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg py-6"
          disabled={isPending}
        >
          {isPending ? "주문 처리 중..." : "주문하기"}
        </Button>
      </div>
    </form>
  );
}

