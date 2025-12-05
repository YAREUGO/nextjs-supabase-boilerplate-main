import { createClient } from "@supabase/supabase-js";

/**
 * 환경 변수 검증 함수
 */
function validateSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

  if (!supabaseAnonKey || !supabaseAnonKey.trim()) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Please check your .env file.",
    );
  }

  return {
    supabaseUrl: supabaseUrl.trim(),
    supabaseAnonKey: supabaseAnonKey.trim(),
  };
}

/**
 * 공개 Supabase 클라이언트 (인증 불필요한 데이터용)
 *
 * 환경 변수가 없으면 더미 클라이언트를 반환하여 빌드가 실패하지 않도록 합니다.
 * 실제 사용 시에는 환경 변수가 필요합니다.
 */
function getSupabaseClient() {
  try {
    const { supabaseUrl, supabaseAnonKey } = validateSupabaseConfig();
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch {
    // 빌드 시 환경 변수가 없어도 빌드가 실패하지 않도록 더미 클라이언트 반환
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[supabase/client] Using fallback client. Please set environment variables in Vercel.",
      );
    }
    return createClient("https://placeholder.supabase.co", "placeholder-key");
  }
}

export const supabase = getSupabaseClient();
