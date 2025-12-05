/**
 * @file app/products/[id]/page.tsx
 * @description 상품 상세 페이지
 *
 * 개별 상품의 상세 정보를 표시하고 장바구니 추가 기능을 제공하는 페이지
 */

import { notFound } from "next/navigation";
import { getProductById } from "@/lib/supabase/products";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CATEGORY_LABELS } from "@/types/product";
import { ProductDetailAddToCart } from "@/components/ProductDetailAddToCart";

// Vercel 배포를 위한 동적 렌더링 설정
export const dynamic = "force-dynamic";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const categoryLabel =
    product.category && CATEGORY_LABELS[product.category]
      ? CATEGORY_LABELS[product.category]
      : product.category || "기타";

  const formattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(product.price);

  const isOutOfStock = product.stock_quantity === 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 뒤로가기 버튼 */}
        <Link href="/products">
          <Button
            variant="ghost"
            className="mb-6 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            상품 목록으로
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 상품 이미지 */}
          <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
            <Package className="w-32 h-32 text-blue-600 dark:text-blue-400 opacity-50" />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-2xl bg-red-500 px-6 py-3 rounded">
                  품절
                </span>
              </div>
            )}
          </div>

          {/* 상품 정보 */}
          <div className="flex flex-col gap-6">
            {/* 카테고리 */}
            {product.category && (
              <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 rounded-full w-fit">
                {categoryLabel}
              </span>
            )}

            {/* 상품명 */}
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              {product.name}
            </h1>

            {/* 가격 */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formattedPrice}
              </span>
            </div>

            {/* 재고 정보 */}
            <div className="flex items-center gap-4">
              <span className="text-lg text-gray-600 dark:text-gray-400">
                재고:{" "}
                <span
                  className={`font-bold ${
                    isOutOfStock
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {isOutOfStock ? "품절" : `${product.stock_quantity}개`}
                </span>
              </span>
            </div>

            {/* 상품 설명 */}
            {product.description && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  상품 설명
                </h2>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* 장바구니 추가 (수량 선택 포함) */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
              <ProductDetailAddToCart
                productId={product.id}
                maxQuantity={product.stock_quantity}
                disabled={isOutOfStock || !product.is_active}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-6"
              />
            </div>

            {/* 상품 정보 테이블 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                상품 정보
              </h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    상품 ID
                  </dt>
                  <dd className="text-slate-900 dark:text-slate-100">{product.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    카테고리
                  </dt>
                  <dd className="text-slate-900 dark:text-slate-100">{categoryLabel}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    재고 상태
                  </dt>
                  <dd className="text-slate-900 dark:text-slate-100">
                    {isOutOfStock ? "품절" : "재고 있음"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    등록일
                  </dt>
                  <dd className="text-slate-900 dark:text-slate-100">
                    {new Date(product.created_at).toLocaleDateString("ko-KR")}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

