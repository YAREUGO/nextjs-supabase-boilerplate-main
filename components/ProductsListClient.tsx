/**
 * @file components/ProductsListClient.tsx
 * @description 상품 목록 클라이언트 래퍼 컴포넌트
 *
 * 서버 컴포넌트에서 클라이언트 컴포넌트를 안전하게 사용하기 위한 래퍼
 */

"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductsListClientProps {
  products: Product[];
}

export function ProductsListClient({ products }: ProductsListClientProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}


