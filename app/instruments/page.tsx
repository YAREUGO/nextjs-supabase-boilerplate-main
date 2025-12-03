import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import Link from "next/link";
import { Pyramid, Crown, ArrowLeft, Gem } from "lucide-react";

/**
 * Instruments 데이터 컴포넌트
 *
 * Supabase 공식 문서 패턴을 따릅니다:
 * - Server Component에서 직접 데이터 fetching
 * - Suspense를 사용한 로딩 상태 처리
 *
 * 참고: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
 */
interface Instrument {
  id: number;
  name: string;
  created_at?: string;
}

async function InstrumentsData() {
  const supabase = await createClient();
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    // 에러 상세 정보 로깅 (에러 객체의 모든 속성 확인)
    const errorInfo = {
      message: error?.message || "알 수 없는 오류",
      details: error?.details || null,
      hint: error?.hint || null,
      code: error?.code || null,
      fullError: error,
      errorType: typeof error,
      errorKeys: error ? Object.keys(error) : [],
      errorString: String(error),
      errorJSON: JSON.stringify(error, null, 2),
    };

    console.error("Error fetching instruments:", errorInfo);

    return (
      <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/50 dark:to-orange-950/50 border-2 border-red-300 dark:border-red-700 rounded-lg shadow-lg">
        <p className="text-red-800 dark:text-red-300 font-semibold flex items-center gap-2">
          <Crown className="w-5 h-5" />
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <p className="text-sm text-red-600 mt-2">
          <strong>에러:</strong> {errorInfo.message}
        </p>
        {errorInfo.details && (
          <p className="text-xs text-red-500 mt-1">
            <strong>상세:</strong> {errorInfo.details}
          </p>
        )}
        {errorInfo.hint && (
          <p className="text-xs text-red-500 mt-1">
            <strong>힌트:</strong> {errorInfo.hint}
          </p>
        )}
        {errorInfo.code && (
          <p className="text-xs text-red-500 mt-1">
            <strong>코드:</strong> {errorInfo.code}
          </p>
        )}
        {errorInfo.errorKeys.length > 0 && (
          <details className="text-xs text-gray-500 mt-2">
            <summary className="cursor-pointer">에러 상세 정보</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
              {errorInfo.errorJSON}
            </pre>
          </details>
        )}
      </div>
    );
  }

  if (!instruments || instruments.length === 0) {
    return (
      <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/50 dark:to-yellow-950/50 border-2 border-amber-300 dark:border-amber-700 rounded-lg shadow-lg">
        <p className="text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-2">
          <Pyramid className="w-5 h-5" />
          아직 악기 데이터가 없습니다.
        </p>
        <p className="text-sm text-amber-800 dark:text-amber-300 mt-2">
          Supabase Dashboard의 SQL Editor에서 instruments 테이블을 생성하고
          데이터를 추가하세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
        <Gem className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        악기 목록
      </h2>
      <ul className="space-y-2">
        {(instruments as Instrument[]).map((instrument) => (
          <li
            key={instrument.id}
            className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-2 border-amber-300 dark:border-amber-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="font-bold text-amber-900 dark:text-amber-200">
              {instrument.name}
            </span>
            <span className="text-sm text-amber-700 dark:text-amber-400 ml-2">
              (ID: {instrument.id})
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 p-4 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/50 dark:to-yellow-900/50 border-2 border-amber-400 dark:border-amber-600 rounded-lg shadow-lg">
        <pre className="text-xs overflow-auto text-amber-900 dark:text-amber-200">
          {JSON.stringify(instruments, null, 2)}
        </pre>
      </div>
    </div>
  );
}

/**
 * Instruments 페이지
 *
 * Supabase 공식 문서의 예시를 기반으로 작성되었습니다.
 */
export default function Instruments() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 font-semibold mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            홈으로 돌아가기
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Supabase 연결 테스트
            </h1>
          </div>
          <p className="text-amber-900 dark:text-amber-200 text-lg font-medium">
            이 페이지는 Supabase 공식 문서의 패턴을 따릅니다.
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-400 mt-2">
            <a
              href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 underline font-semibold"
            >
              공식 문서 보기
            </a>
          </p>
        </div>

        <Suspense
          fallback={
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 dark:border-amber-400"></div>
              <p className="mt-4 text-amber-900 dark:text-amber-200 font-semibold">
                악기 데이터를 불러오는 중...
              </p>
            </div>
          }
        >
          <InstrumentsData />
        </Suspense>
      </div>
    </div>
  );
}
