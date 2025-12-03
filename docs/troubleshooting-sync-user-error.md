# 사용자 동기화 에러 해결 가이드

## 에러 메시지

```
Failed to sync user: {"error":"Internal server error"}
```

## 가능한 원인 및 해결 방법

### 1. 환경 변수 누락

**증상:**
- "Server configuration error" 메시지
- "Supabase environment variables are missing" 상세 정보

**해결 방법:**

`.env` 파일에 다음 환경 변수가 모두 설정되어 있는지 확인하세요:

```env
# 필수 환경 변수
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

**확인 방법:**

1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 각 환경 변수가 올바른 값으로 설정되어 있는지 확인
3. Supabase Dashboard → Settings → API에서 값 확인
4. **중요**: `.env` 파일 수정 후 개발 서버를 재시작하세요

### 2. Supabase 테이블이 없음

**증상:**
- "Failed to sync user to Supabase" 메시지
- "relation 'public.users' does not exist" 에러 코드

**해결 방법:**

Supabase Dashboard에서 `users` 테이블을 생성하세요:

1. Supabase Dashboard → SQL Editor
2. 다음 SQL 실행:

```sql
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- RLS 비활성화 (개발 환경)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 권한 부여
GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;
```

또는 `supabase/migrations/setup_schema.sql` 파일의 내용을 실행하세요.

### 3. Supabase 연결 실패

**증상:**
- "Failed to create Supabase client" 메시지
- 네트워크 에러

**해결 방법:**

1. Supabase 프로젝트가 활성화되어 있는지 확인
2. `NEXT_PUBLIC_SUPABASE_URL`이 올바른지 확인 (https://로 시작해야 함)
3. 인터넷 연결 확인
4. Supabase Dashboard에서 프로젝트 상태 확인

### 4. Clerk 인증 문제

**증상:**
- "Unauthorized" 메시지
- "Failed to fetch user from Clerk" 메시지

**해결 방법:**

1. Clerk Dashboard에서 프로젝트가 활성화되어 있는지 확인
2. `.env` 파일에 Clerk 키가 올바르게 설정되어 있는지 확인:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-publishable-key"
CLERK_SECRET_KEY="your-secret-key"
```

3. 브라우저에서 로그인 상태 확인
4. Clerk Dashboard → Users에서 사용자가 생성되었는지 확인

### 5. 권한 문제

**증상:**
- "permission denied" 에러
- "insufficient privileges" 에러

**해결 방법:**

1. `SUPABASE_SERVICE_ROLE_KEY`가 올바른지 확인
   - Service Role Key는 `service_role`로 시작해야 함
   - Anon Key가 아닌 Service Role Key를 사용해야 함

2. Supabase Dashboard → Settings → API에서 확인:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`에 사용
   - **anon public**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 사용
   - **service_role secret**: `SUPABASE_SERVICE_ROLE_KEY`에 사용

## 디버깅 방법

### 1. 서버 로그 확인

개발 서버 콘솔에서 자세한 에러 메시지를 확인하세요:

```bash
pnpm dev
```

에러가 발생하면 콘솔에 상세한 로그가 출력됩니다.

### 2. 브라우저 콘솔 확인

브라우저 개발자 도구(F12) → Console 탭에서 클라이언트 사이드 에러를 확인하세요.

### 3. 네트워크 탭 확인

브라우저 개발자 도구 → Network 탭에서 `/api/sync-user` 요청을 확인하세요:
- 요청 상태 코드
- 응답 본문
- 요청 헤더

### 4. 환경 변수 확인 스크립트

다음 명령어로 환경 변수가 설정되어 있는지 확인할 수 있습니다:

```bash
# Windows PowerShell
$env:NEXT_PUBLIC_SUPABASE_URL
$env:SUPABASE_SERVICE_ROLE_KEY

# 또는 .env 파일 직접 확인 (보안 주의)
cat .env
```

## 일반적인 해결 순서

1. **환경 변수 확인** → `.env` 파일 확인 및 서버 재시작
2. **Supabase 테이블 확인** → SQL Editor에서 `users` 테이블 존재 확인
3. **Clerk 인증 확인** → 로그인 상태 및 Clerk Dashboard 확인
4. **서버 로그 확인** → 개발 서버 콘솔에서 상세 에러 확인
5. **브라우저 콘솔 확인** → 클라이언트 사이드 에러 확인

## 여전히 문제가 해결되지 않으면

1. 개발 서버를 완전히 종료하고 다시 시작
2. 브라우저 캐시 삭제
3. `.env` 파일의 값이 올바른지 다시 한 번 확인
4. Supabase Dashboard에서 프로젝트가 정상 작동하는지 확인

## 추가 리소스

- [Supabase 문서](https://supabase.com/docs)
- [Clerk 문서](https://clerk.com/docs)
- [Next.js 환경 변수](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

