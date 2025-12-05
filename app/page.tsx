import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Zap,
  Star,
  ChevronRight,
} from "lucide-react";
import { Suspense } from "react";
import { getFeaturedProducts, getProductsByCategory } from "@/lib/supabase/products";
import { ProductSection } from "@/components/ProductSection";

// Vercel 배포를 위한 동적 렌더링 설정
// cookies()를 사용하는 Supabase 클라이언트로 인해 필요
export const dynamic = "force-dynamic";

async function FeaturedProductsSection() {
  try {
    const products = await getFeaturedProducts(8);
    return (
      <ProductSection
        title="지금 장바구니에 많이 담긴 것들"
        products={products}
        viewAllLink="/products"
        viewAllText="더 많은 상품 보기"
      />
    );
  } catch (error) {
    console.error("Error loading featured products:", error);
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-600 dark:text-red-400">
            상품을 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      </section>
    );
  }
}

async function CategoryProductsSection() {
  try {
    // 의류 카테고리 상품 조회
    const clothingProducts = await getProductsByCategory("clothing");
    if (clothingProducts.length === 0) return null;

    return (
      <ProductSection
        title="사진보다 실제가 더 나은 옷들"
        products={clothingProducts.slice(0, 4)}
        viewAllLink="/products?category=clothing"
        viewAllText="더 많은 상품 보기"
      />
    );
  } catch (error) {
    console.error("Error loading category products:", error);
    return null;
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* 좌측: 메인 콘텐츠 */}
            <div className="flex flex-col gap-8 lg:gap-12 z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-blue-400/20 text-blue-700 dark:text-blue-300 text-sm font-semibold w-fit backdrop-blur-sm shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>가성비·가심비 셀렉트숍</span>
              </div>

              {/* 헤드라인 - 더 여유롭게 */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.1] tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block mb-2">
                    고민하는 시간도
                  </span>
                  <span className="text-slate-900 dark:text-slate-100 block">
                    아까운 사람들용
                  </span>
                </h1>
              </div>

              {/* 설명 텍스트 - 더 넓은 간격 */}
              <div className="space-y-3">
                <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  매일 쓰는 전자제품이랑 옷
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    실패 적은 것만
                  </span>
                  {" "}골라뒀어요
                </p>
              </div>

              {/* Features List - 더 넓은 간격 */}
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  { text: "한 번 사면 오래 쓰는 구성", icon: Zap },
                  { text: "리뷰 보고 거른 아이템만 취급", icon: Star },
                  { text: "세트로 사면 더 싸게", icon: TrendingUp },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                    <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons - 더 넓은 간격 */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/products" className="group">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto px-10 py-7 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    일상템 한 번에 보기
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/products?category=clothing">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto px-10 py-7 text-lg border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                  >
                    지금 인기 있는 것부터
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* 우측: Visual Element */}
            <div className="flex flex-col gap-8 z-10">
              {/* Glassmorphism Card */}
              <div className="relative w-full h-96 sm:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-36 h-36 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                      <ShoppingBag className="w-20 h-20 text-white" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        그냥 쓰기 좋은 것들
                      </p>
                      <p className="text-lg text-slate-600 dark:text-slate-300">
                        고민 덜기, 매일 쓰는 것만
                      </p>
                    </div>
                  </div>
                </div>
                {/* Animated Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px] opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - 신뢰 지표 */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
              사고 또 사는 사람들
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              재구매율 85%, &apos;그냥 이게 편해서요&apos;라는 리뷰가 많아요
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                number: "85%", 
                label: "재구매율",
                description: "같은 상품을 다시 사는 고객이 많아요"
              },
              { 
                number: "4.8점", 
                label: "실사용자 리뷰",
                description: "실제로 써본 사람들의 평가예요"
              },
              { 
                number: "30일", 
                label: "무료 교환",
                description: "부담 없이 구매할 수 있어요"
              },
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all space-y-4">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xl md:text-2xl text-slate-900 dark:text-slate-100 font-bold">
                  {stat.label}
                </div>
                <div className="text-base md:text-lg text-slate-600 dark:text-slate-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 상품 섹션 */}
      <Suspense
        fallback={
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </section>
        }
      >
        <FeaturedProductsSection />
      </Suspense>

      {/* 카테고리별 상품 섹션 */}
      <Suspense fallback={null}>
        <CategoryProductsSection />
      </Suspense>

      {/* CTA Section - 하단 */}
      <section className="py-28 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              이미 써 본 사람들이 증명함
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              실사용자 평점 4.8점, 지금 많이 사는 상품만 모아봤어요
            </p>
          </div>
          <Link href="/products">
            <Button 
              size="lg" 
              className="px-10 py-7 text-lg bg-white text-blue-600 hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              전체 상품 둘러보기
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
