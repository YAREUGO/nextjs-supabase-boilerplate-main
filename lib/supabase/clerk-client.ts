"use client";

import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";

/**
 * Clerk + Supabase 네이티브 통합 클라이언트 (Client Component용)
 *
 * 2025년 4월부터 권장되는 방식:
 * - JWT 템플릿 불필요
 * - useAuth().getToken()으로 현재 세션 토큰 사용
 * - React Hook으로 제공되어 Client Component에서 사용
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { useClerkSupabaseClient } from '@/lib/supabase/clerk-client';
 *
 * export default function MyComponent() {
 *   const supabase = useClerkSupabaseClient();
 *
 *   async function fetchData() {
 *     const { data } = await supabase.from('table').select('*');
 *     return data;
 *   }
 *
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

export function useClerkSupabaseClient() {
  const { getToken } = useAuth();

  const supabase = useMemo(() => {
    try {
      const { supabaseUrl, supabaseKey } = validateSupabaseConfig();

      return createClient(supabaseUrl, supabaseKey, {
        async accessToken() {
          const token = await getToken();
          return token ?? null;
        },
        // accessToken 옵션 사용 시 onAuthStateChange 비활성화
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
    } catch (error) {
      // 개발 환경에서만 에러를 throw하여 문제를 빠르게 발견
      if (process.env.NODE_ENV === "development") {
        console.error("[useClerkSupabaseClient] Configuration error:", error);
        throw error;
      }
      // 프로덕션에서는 더미 클라이언트 반환 (앱이 크래시되지 않도록)
      console.warn(
        "[useClerkSupabaseClient] Using fallback client due to configuration error",
      );
      return createClient("https://placeholder.supabase.co", "placeholder-key");
    }
  }, [getToken]);

  return supabase;
}
