import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

/**
 * @deprecated 이 파일은 레거시입니다. 다음 파일들을 사용하세요:
 * - Server Component: `@/lib/supabase/server`의 `createClient()`
 * - Client Component: `@/lib/supabase/clerk-client`의 `useClerkSupabaseClient()`
 * - Service Role: `@/lib/supabase/service-role`의 `getServiceRoleClient()`
 * 
 * 하위 호환성을 위해 유지되지만, 새 코드에서는 사용하지 마세요.
 */

/**
 * 환경 변수 검증 함수
 */
function validateSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseUrl.trim()) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set. Please check your .env file."
    );
  }

  if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL: "${supabaseUrl}". Must be a valid HTTP or HTTPS URL.`
    );
  }

  if (!supabaseKey || !supabaseKey.trim()) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Please check your .env file."
    );
  }

  return { supabaseUrl: supabaseUrl.trim(), supabaseKey: supabaseKey.trim() };
}

/**
 * @deprecated Server Component에서는 `@/lib/supabase/server`의 `createClient()`를 사용하세요.
 */
export const createSupabaseClient = async () => {
  const { supabaseUrl, supabaseKey } = validateSupabaseConfig();
  
  return createClient(supabaseUrl, supabaseKey, {
    async accessToken() {
      const clerkAuth = await auth();
      return (await clerkAuth.getToken()) ?? null;
    },
    // accessToken 옵션 사용 시 onAuthStateChange 비활성화
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
};
