-- RLS (Row Level Security) 정책 설정
-- 프로덕션 환경에서 사용할 수 있는 Clerk + Supabase 통합 기반 RLS 정책 예시
--
-- 참고: 이 파일은 프로덕션 배포 시 사용하는 예시입니다.
-- 개발 환경에서는 RLS가 비활성화되어 있을 수 있습니다.
--
-- Clerk 통합 시 auth.jwt()->>'sub'를 사용하여 Clerk 사용자 ID에 접근합니다.
-- 자세한 내용: https://clerk.com/docs/guides/development/integrations/databases/supabase

-- ============================================
-- users 테이블 RLS 정책
-- ============================================

-- RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- SELECT 정책: 사용자는 자신의 정보만 조회 가능
CREATE POLICY "Users can view their own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (
    ((SELECT auth.jwt()->>'sub') = clerk_id::text)
  );

-- INSERT 정책: 사용자는 자신의 정보만 생성 가능
CREATE POLICY "Users can insert their own profile"
  ON public.users
  AS PERMISSIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (
    ((SELECT auth.jwt()->>'sub') = clerk_id::text)
  );

-- UPDATE 정책: 사용자는 자신의 정보만 수정 가능
CREATE POLICY "Users can update their own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (
    ((SELECT auth.jwt()->>'sub') = clerk_id::text)
  )
  WITH CHECK (
    ((SELECT auth.jwt()->>'sub') = clerk_id::text)
  );

-- DELETE 정책: 사용자는 자신의 정보만 삭제 가능 (일반적으로 비활성화 권장)
-- CREATE POLICY "Users can delete their own profile"
--   ON public.users
--   FOR DELETE
--   TO authenticated
--   USING (
--     ((SELECT auth.jwt()->>'sub') = clerk_id::text)
--   );

-- ============================================
-- 예시: tasks 테이블 RLS 정책 (참고용)
-- ============================================
-- 이 섹션은 예시입니다. 실제로 tasks 테이블을 사용하는 경우 주석을 해제하세요.

-- CREATE TABLE IF NOT EXISTS public.tasks (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL,
--   user_id TEXT NOT NULL DEFAULT (auth.jwt()->>'sub'),
--   created_at TIMESTAMPTZ DEFAULT now() NOT NULL
-- );

-- ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "User can view their own tasks"
--   ON public.tasks
--   FOR SELECT
--   TO authenticated
--   USING (
--     ((SELECT auth.jwt()->>'sub') = user_id::text)
--   );

-- CREATE POLICY "Users must insert their own tasks"
--   ON public.tasks
--   AS PERMISSIVE
--   FOR INSERT
--   TO authenticated
--   WITH CHECK (
--     ((SELECT auth.jwt()->>'sub') = user_id::text)
--   );

-- CREATE POLICY "Users can update their own tasks"
--   ON public.tasks
--   FOR UPDATE
--   TO authenticated
--   USING (
--     ((SELECT auth.jwt()->>'sub') = user_id::text)
--   )
--   WITH CHECK (
--     ((SELECT auth.jwt()->>'sub') = user_id::text)
--   );

-- CREATE POLICY "Users can delete their own tasks"
--   ON public.tasks
--   FOR DELETE
--   TO authenticated
--   USING (
--     ((SELECT auth.jwt()->>'sub') = user_id::text)
--   );

