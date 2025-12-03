"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

/**
 * Clerk 사용자를 Supabase DB에 자동으로 동기화하는 훅
 *
 * 사용자가 로그인한 상태에서 이 훅을 사용하면
 * 자동으로 /api/sync-user를 호출하여 Supabase users 테이블에 사용자 정보를 저장합니다.
 *
 * 에러가 발생해도 앱에 영향을 주지 않도록 조용히 처리합니다.
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { useSyncUser } from '@/hooks/use-sync-user';
 *
 * export default function Layout({ children }) {
 *   useSyncUser();
 *   return <>{children}</>;
 * }
 * ```
 */
export function useSyncUser() {
  const { isLoaded, userId } = useAuth();
  const syncedRef = useRef(false);
  const retryCountRef = useRef(0);
  const maxRetries = 3;
  const retryDelay = 2000; // 2초

  useEffect(() => {
    // 이미 동기화했거나, 로딩 중이거나, 로그인하지 않은 경우 무시
    if (syncedRef.current || !isLoaded || !userId) {
      return;
    }

    // 동기화 실행 (재시도 로직 포함)
    const syncUser = async (attempt: number = 1): Promise<void> => {
      try {
        const response = await fetch("/api/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // 타임아웃 설정 (10초)
          signal: AbortSignal.timeout(10000),
        });

        // 성공 응답 처리
        if (response.ok) {
          try {
            const result = await response.json();
            if (result?.success) {
              syncedRef.current = true;
              retryCountRef.current = 0;
              return;
            }
          } catch (parseError) {
            // JSON 파싱 실패는 성공으로 간주 (서버가 200을 반환했으므로)
            syncedRef.current = true;
            retryCountRef.current = 0;
            return;
          }
        }

        // 에러 응답 처리 (조용히 처리)
        if (response.status >= 500 && attempt < maxRetries) {
          // 서버 에러인 경우 재시도
          retryCountRef.current = attempt;
          await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt));
          return syncUser(attempt + 1);
        }

        // 클라이언트 에러(401, 404 등)는 재시도하지 않음
        if (response.status === 401 || response.status === 404) {
          // 인증 오류나 사용자 없음은 정상적인 상황일 수 있음
          return;
        }

        // 기타 에러는 조용히 로그만 남기기 (사용자에게 표시하지 않음)
        // 개발 환경에서만 상세 로그 출력
        if (process.env.NODE_ENV === "development") {
          try {
            const responseText = await response.text();
            let errorData: any = {};
            if (responseText) {
              try {
                errorData = JSON.parse(responseText);
              } catch {
                errorData = { raw: responseText };
              }
            }
            console.warn("[useSyncUser] Sync failed (non-critical):", {
              status: response.status,
              attempt,
              error: errorData,
            });
          } catch {
            // 응답 읽기 실패도 무시
          }
        }
      } catch (error) {
        // 네트워크 에러 등 - 재시도 가능한 경우에만 재시도
        if (attempt < maxRetries && error instanceof Error) {
          // AbortError (타임아웃) 또는 네트워크 에러인 경우 재시도
          if (
            error.name === "AbortError" ||
            error.message.includes("fetch") ||
            error.message.includes("network")
          ) {
            retryCountRef.current = attempt;
            await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt));
            return syncUser(attempt + 1);
          }
        }

        // 개발 환경에서만 로그 출력
        if (process.env.NODE_ENV === "development") {
          console.warn("[useSyncUser] Sync error (non-critical):", {
            error: error instanceof Error ? error.message : "Unknown error",
            attempt,
          });
        }
      }
    };

    syncUser();
  }, [isLoaded, userId]);
}
