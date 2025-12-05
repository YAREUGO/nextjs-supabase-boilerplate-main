/**
 * @file lib/supabase/products.ts
 * @description 상품 데이터 조회를 위한 Supabase 유틸리티 함수
 *
 * Server Component와 Server Actions에서 사용할 수 있는 함수들
 */

import { createClient } from "@/lib/supabase/server";
import { Product, ProductCategory } from "@/types/product";

/**
 * 모든 활성화된 상품 조회
 */
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(`상품 조회 실패: ${error.message}`);
  }

  return (data as Product[]) || [];
}

/**
 * 카테고리별 상품 조회
 */
export async function getProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products by category:", error);
    throw new Error(`카테고리별 상품 조회 실패: ${error.message}`);
  }

  return (data as Product[]) || [];
}

/**
 * 단일 상품 조회
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // 상품을 찾을 수 없음
      return null;
    }
    console.error("Error fetching product:", error);
    throw new Error(`상품 조회 실패: ${error.message}`);
  }

  return (data as Product) || null;
}

/**
 * 인기 상품 조회 (최근 생성된 상품 중 상위 N개)
 */
export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .gt("stock_quantity", 0)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured products:", error);
    throw new Error(`인기 상품 조회 실패: ${error.message}`);
  }

  return (data as Product[]) || [];
}

/**
 * 사용 가능한 카테고리 목록 조회
 */
export async function getCategories(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("is_active", true)
    .not("category", "is", null);

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  // 중복 제거 및 null 제거
  const categories = Array.from(
    new Set(
      (data || [])
        .map((item) => item.category)
        .filter((cat): cat is string => cat !== null)
    )
  );

  return categories;
}


