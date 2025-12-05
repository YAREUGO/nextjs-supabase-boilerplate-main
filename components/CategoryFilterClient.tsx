/**
 * @file components/CategoryFilterClient.tsx
 * @description 카테고리 필터 클라이언트 컴포넌트
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/types/product";

interface CategoryFilterClientProps {
  categories: string[];
}

export function CategoryFilterClient({ categories }: CategoryFilterClientProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link href="/products">
        <Button
          variant="outline"
          className="border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
        >
          전체
        </Button>
      </Link>
      {categories.map((category) => (
        <Link key={category} href={`/products?category=${category}`}>
          <Button
            variant="outline"
            className="border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
          >
            {CATEGORY_LABELS[category] || category}
          </Button>
        </Link>
      ))}
    </div>
  );
}


