/**
 * @file app/products/page.tsx
 * @description 상품 목록 페이지
 *
 * 모든 상품을 표시하고 카테고리별 필터링을 지원하는 페이지
 */

import { Suspense } from "react";
import { getProducts, getProductsByCategory, getCategories } from "@/lib/supabase/products";
import { ProductsListClient } from "@/components/ProductsListClient";
import { CategoryFilterClient } from "@/components/CategoryFilterClient";
import { ProductCategory, CATEGORY_LABELS } from "@/types/product";

// Vercel 배포를 위한 동적 렌더링 설정
export const dynamic = "force-dynamic";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

async function ProductsList({ category }: { category?: string }) {
  try {
    const products = category
      ? await getProductsByCategory(category as ProductCategory)
      : await getProducts();

    if (products.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {category
              ? `${CATEGORY_LABELS[category] || category} 카테고리에 상품이 없습니다.`
              : "등록된 상품이 없습니다."}
          </p>
        </div>
      );
    }

    return <ProductsListClient products={products} />;
  } catch (error) {
    console.error("Error loading products:", error);
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400 text-lg">
          상품을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }
}

async function CategoryFilter() {
  try {
    const categories = await getCategories();
    return <CategoryFilterClient categories={categories} />;
  } catch (error) {
    console.error("Error loading categories:", error);
    return null;
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            상품 목록
          </h1>
          {category && (
            <p className="text-lg text-slate-600 dark:text-slate-400">
              카테고리: {CATEGORY_LABELS[category] || category}
            </p>
          )}
        </div>

        {/* 카테고리 필터 */}
        <Suspense fallback={<div className="h-12 mb-8" />}>
          <CategoryFilter />
        </Suspense>

        {/* 상품 목록 */}
        <Suspense
          fallback={
            <div className="text-center py-12">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          }
        >
          <ProductsList category={category} />
        </Suspense>
      </div>
    </main>
  );
}

