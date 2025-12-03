import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

/**
 * Clerk + Supabase 네이티브 통합 클라이언트 (Server Component용)
 *
 * Supabase 공식 문서 패턴을 따르면서 Clerk 통합을 유지합니다:
 * - @supabase/ssr의 createServerClient 사용 (Cookie-based Auth 지원)
 * - Clerk 토큰을 Supabase가 자동 검증
 * - Next.js 15의 cookies() API 사용
 *
 * @example
 * ```tsx
 * // Server Component
 * import { createClient } from '@/lib/supabase/server';
 *
 * export default async function MyPage() {
 *   const supabase = await createClient();
 *   const { data } = await supabase.from('table').select('*');
 *   return <div>...</div>;
 * }
 * ```
 */
/**
 * 환경 변수 검증 함수
 */
function validateSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseUrl.trim()) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set. Please check your .env file.",
    );
  }

  if (
    !supabaseUrl.startsWith("http://") &&
    !supabaseUrl.startsWith("https://")
  ) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL: "${supabaseUrl}". Must be a valid HTTP or HTTPS URL.`,
    );
  }

  if (!supabaseKey || !supabaseKey.trim()) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Please check your .env file.",
    );
  }

  return { supabaseUrl: supabaseUrl.trim(), supabaseKey: supabaseKey.trim() };
}

export async function createClient() {
  const cookieStore = await cookies();

  const { supabaseUrl, supabaseKey } = validateSupabaseConfig();

  // Clerk 토큰 가져오기
  const clerkAuth = await auth();
  const clerkToken = await clerkAuth.getToken();

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // Server Component는 read-only이므로 경고만 로그
        // 세션 갱신은 middleware에서 처리
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component에서는 쿠키 설정이 제한될 수 있음
          // 이는 정상적인 동작이며, middleware에서 처리됩니다
        }
      },
    },
    // Clerk 토큰을 accessToken 옵션으로 전달
    // Server Component에서는 onAuthStateChange를 사용하지 않으므로 문제 없음
    ...(clerkToken && {
      accessToken: async () => {
        return clerkToken;
      },
    }),
    // auth 옵션으로 세션 관리 비활성화 (onAuthStateChange 에러 방지)
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    // Realtime 비활성화 (Server Component에서는 사용하지 않음)
    realtime: {
      params: {
        eventsPerSecond: 0,
      },
    },
  });

  return supabase;
}

/**
 * @deprecated createClient를 사용하세요.
 * 하위 호환성을 위해 유지됩니다.
 */
export async function createClerkSupabaseClient() {
  return createClient();
}
