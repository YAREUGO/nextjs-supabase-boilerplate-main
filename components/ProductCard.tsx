/**
 * @file components/ProductCard.tsx
 * @description 상품 카드 컴포넌트
 *
 * 상품 정보를 카드 형태로 표시하는 재사용 가능한 컴포넌트
 * 상품 목록 페이지와 홈페이지에서 사용됩니다.
 */

"use client";

import Link from "next/link";
import { ProductCardProps, CATEGORY_LABELS } from "@/types/product";
import { Package } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: ProductCardProps) {
  const categoryLabel =
    product.category && CATEGORY_LABELS[product.category]
      ? CATEGORY_LABELS[product.category]
      : product.category || "기타";

  const isOutOfStock = product.stock_quantity === 0;
  const formattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(product.price);

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2">
      {/* 상품 이미지 영역 - 클릭 가능 */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-56 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50 flex items-center justify-center overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
          <Package className="w-20 h-20 text-blue-600 dark:text-blue-400 opacity-40 group-hover:opacity-60 transition-all duration-300 group-hover:scale-110" />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-lg bg-red-500 px-6 py-3 rounded-full shadow-lg">
                품절
              </span>
            </div>
          )}
          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/5 group-hover:to-black/0 transition-all duration-300"></div>
        </div>
      </Link>

      {/* 상품 정보 */}
      <div className="p-5">
        {/* 카테고리 */}
        {product.category && (
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-3">
            {categoryLabel}
          </span>
        )}

        {/* 상품명 - 클릭 가능 */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* 상품 설명 */}
        {product.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* 가격 및 재고 정보 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {formattedPrice}
          </span>
          {!isOutOfStock && (
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
              재고: {product.stock_quantity}개
            </span>
          )}
        </div>

        {/* 장바구니 추가 버튼 */}
        <AddToCartButton
          productId={product.id}
          disabled={isOutOfStock || !product.is_active}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
        />
      </div>
    </div>
  );
}

