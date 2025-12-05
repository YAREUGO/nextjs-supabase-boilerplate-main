/**
 * @file components/ProductSection.tsx
 * @description 상품 섹션 컴포넌트
 *
 * 홈페이지에서 사용할 상품 목록을 표시하는 섹션 컴포넌트
 */

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  viewAllText?: string;
}

export function ProductSection({
  title,
  products,
  viewAllLink,
  viewAllText = "전체 보기",
}: ProductSectionProps) {
  if (products.length === 0) {
    return null;
  }

  // 제목에 따른 부제목 설정
  const getTitleAndSubtitle = () => {
    if (title.includes("인기")) {
      return {
        mainTitle: "지금 장바구니에 많이 담긴 것들",
        subtitle: "오늘 주문하면 무료배송 + 세트 할인으로 고민 덜기"
      };
    } else if (title.includes("의류")) {
      return {
        mainTitle: "사진보다 실제가 더 나은 옷들",
        subtitle: "출근·산책·약속 어디에 던져 입어도 어색하지 않은 기본템"
      };
    }
    return {
      mainTitle: title,
      subtitle: "그냥 쓰기 좋은 것들만 골라뒀어요"
    };
  };

  const { mainTitle, subtitle } = getTitleAndSubtitle();

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {mainTitle}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          </div>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button
                variant="outline"
                size="lg"
                className="hidden sm:flex items-center gap-2 px-6 py-3 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
              >
                {viewAllText}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {viewAllLink && (
          <div className="mt-16 text-center sm:hidden">
            <Link href={viewAllLink}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                더 많은 상품 보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
        
        {/* 중단 CTA - 상품 섹션 사이 */}
        {viewAllLink && (
          <div className="mt-16 text-center hidden sm:block space-y-4">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              지금 구매하면 무료배송 + 세트 할인
            </p>
            <Link href={viewAllLink}>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                더 많은 상품 보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}


