import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiSupabaseFill } from "react-icons/ri";
import {
  Database,
  Shield,
  ArrowRight,
  Pyramid,
  Crown,
  Gem,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950">
      {/* Hero Section with Egyptian Theme */}
      <section className="relative overflow-hidden">
        {/* Desert Background with Pyramids */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Sun */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-40 animate-pulse"></div>

          {/* Pyramid Shapes */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[200px] border-l-transparent border-r-[200px] border-r-transparent border-b-[150px] border-b-amber-200/30 dark:border-b-amber-900/20 transform rotate-12"></div>
          <div className="absolute bottom-0 left-40 w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[120px] border-b-amber-300/40 dark:border-b-amber-800/30 transform -rotate-12"></div>
          <div className="absolute bottom-0 right-20 w-0 h-0 border-l-[180px] border-l-transparent border-r-[180px] border-r-transparent border-b-[140px] border-b-yellow-200/30 dark:border-b-yellow-900/20 transform rotate-6"></div>

          {/* Sand Dunes */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-100/50 to-transparent dark:from-amber-950/50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 좌측: 환영 메시지 - 이집트 테마 */}
            <div className="flex flex-col gap-6 lg:gap-8 z-10">
              {/* Egyptian Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900 text-sm font-bold w-fit shadow-lg">
                <Crown className="w-4 h-4" />
                <span>파라오의 보물</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
                  이집트의 신비로운
                </span>
                <br />
                <span className="text-amber-800 dark:text-amber-300">
                  SaaS 템플릿
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                고대 이집트의 지혜처럼
                <span className="font-bold text-orange-700 dark:text-orange-400">
                  {" "}
                  강력하고 영원한
                </span>
                <br className="hidden sm:block" />
                Next.js, Clerk, Supabase로 구축된 템플릿
              </p>

              {/* Features List with Egyptian Icons */}
              <div className="flex flex-col gap-3 mt-4">
                {[
                  { text: "황금 같은 성능", icon: Gem },
                  { text: "파라오급 보안", icon: Crown },
                  { text: "피라미드처럼 견고한 구조", icon: Pyramid },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                      <feature.icon className="w-4 h-4 text-amber-900" />
                    </div>
                    <span className="text-amber-900 dark:text-amber-200 font-semibold">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 우측: 이미지와 버튼들 - 이집트 스타일 */}
            <div className="flex flex-col gap-6 z-10">
              {/* Egyptian Image Area */}
              <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl mb-4 border-4 border-amber-600 dark:border-amber-700">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 via-orange-500/40 to-yellow-500/40 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl mb-4 border-4 border-amber-300">
                      <Pyramid className="w-12 h-12 text-amber-900" />
                    </div>
                    <p className="text-amber-900 font-bold text-xl drop-shadow-lg">
                      고대의 지혜
                    </p>
                    <p className="text-amber-800 text-sm mt-1">현대의 기술</p>
                  </div>
                </div>
                {/* Egyptian Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1))] bg-[length:20px_20px] opacity-30"></div>
              </div>

              {/* 버튼 세 개 - 이집트 황금 스타일 */}
              <div className="flex flex-col gap-4">
                <Link href="/instruments" className="group">
                  <Button className="w-full h-20 flex items-center justify-center gap-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white border-2 border-amber-400 hover:border-amber-300 transform hover:scale-105">
                    <Database className="w-6 h-6 drop-shadow-lg" />
                    <span className="font-bold">Supabase 연결 테스트</span>
                    <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-2 transition-transform drop-shadow-lg" />
                  </Button>
                </Link>

                <Link href="/storage-test" className="group">
                  <Button className="w-full h-20 flex items-center justify-center gap-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 text-white border-2 border-orange-400 hover:border-orange-300 transform hover:scale-105">
                    <RiSupabaseFill className="w-6 h-6 drop-shadow-lg" />
                    <span className="font-bold">
                      Storage 파일 업로드 테스트
                    </span>
                    <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-2 transition-transform drop-shadow-lg" />
                  </Button>
                </Link>

                <Link href="/auth-test" className="group">
                  <Button
                    className="w-full h-20 flex items-center justify-center gap-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-amber-950 dark:to-orange-950 text-amber-900 dark:text-amber-200 border-3 border-amber-400 dark:border-amber-600 hover:border-amber-500 dark:hover:border-amber-500 transform hover:scale-105 font-bold"
                    variant="outline"
                  >
                    <Shield className="w-6 h-6" />
                    <span>Clerk + Supabase 인증 연동</span>
                    <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - Egyptian Style */}
      <section className="py-16 bg-gradient-to-b from-amber-100/50 via-orange-100/50 to-yellow-100/50 dark:from-amber-950/50 dark:via-orange-950/50 dark:to-yellow-950/50 border-t-4 border-amber-400 dark:border-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 dark:text-amber-200">
                파라오의 기술 스택
              </h2>
              <Crown className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-lg text-amber-800 dark:text-amber-300 font-medium">
              고대 이집트처럼 영원한 기술들
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Next.js 15",
                icon: "⚡",
                color: "from-amber-400 to-orange-500",
              },
              {
                name: "React 19",
                icon: "⚛️",
                color: "from-orange-400 to-amber-500",
              },
              {
                name: "TypeScript",
                icon: "📘",
                color: "from-yellow-400 to-amber-500",
              },
              {
                name: "Tailwind CSS",
                icon: "🎨",
                color: "from-amber-500 to-yellow-500",
              },
              {
                name: "Clerk",
                icon: "🔐",
                color: "from-orange-500 to-amber-600",
              },
              {
                name: "Supabase",
                icon: "🗄️",
                color: "from-amber-500 to-orange-600",
              },
              {
                name: "shadcn/ui",
                icon: "🎯",
                color: "from-yellow-500 to-amber-600",
              },
              {
                name: "Zod",
                icon: "✅",
                color: "from-amber-600 to-orange-500",
              },
            ].map((tech, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 hover:shadow-xl transition-all duration-300 hover:scale-110 hover:border-amber-500 dark:hover:border-amber-500 text-center group"
              >
                <div
                  className={`text-4xl mb-3 transform group-hover:scale-125 transition-transform bg-gradient-to-br ${tech.color} bg-clip-text text-transparent`}
                >
                  {tech.icon}
                </div>
                <div className="font-bold text-amber-900 dark:text-amber-200">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Egyptian Footer Pattern */}
      <section className="py-8 bg-gradient-to-t from-amber-200/30 to-transparent dark:from-amber-900/30 border-t-2 border-amber-400 dark:border-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-800 dark:text-amber-300 font-semibold flex items-center justify-center gap-2">
            <Pyramid className="w-5 h-5" />
            <span>고대의 지혜로 현대의 기술을</span>
            <Pyramid className="w-5 h-5" />
          </p>
        </div>
      </section>
    </main>
  );
}
