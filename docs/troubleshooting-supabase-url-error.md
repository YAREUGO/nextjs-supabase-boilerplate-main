# Supabase URL 에러 해결 가이드

## 에러 메시지

```
Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.
```

## 원인

이 에러는 `NEXT_PUBLIC_SUPABASE_URL` 환경 변수가 설정되지 않았거나, 잘못된 형식일 때 발생합니다.

## 해결 방법

### 1. .env 파일 확인

프로젝트 루트에 `.env` 파일이 있는지 확인하고, 다음 환경 변수가 올바르게 설정되어 있는지 확인하세요:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 2. Supabase URL 형식 확인

Supabase URL은 반드시 다음 형식이어야 합니다:

- ✅ 올바른 형식: `https://xxxxxxxxxxxxx.supabase.co`
- ❌ 잘못된 형식: `xxxxxxxxxxxxx.supabase.co` (https:// 없음)
- ❌ 잘못된 형식: 빈 문자열 또는 공백만 있음

### 3. Supabase Dashboard에서 URL 확인

1. [Supabase Dashboard](https://supabase.com/dashboard)에 접속
2. 프로젝트 선택
3. **Settings** → **API** 메뉴 클릭
4. **Project URL** 값을 복사
5. `.env` 파일에 붙여넣기

**중요**: URL은 반드시 `https://`로 시작해야 합니다!

### 4. 환경 변수 설정 예시

```env
# ✅ 올바른 예시
NEXT_PUBLIC_SUPABASE_URL="https://abcdefghijklmnop.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# ❌ 잘못된 예시
NEXT_PUBLIC_SUPABASE_URL="abcdefghijklmnop.supabase.co"  # https:// 없음
NEXT_PUBLIC_SUPABASE_URL=""  # 빈 문자열
NEXT_PUBLIC_SUPABASE_URL=" "  # 공백만 있음
```

### 5. 개발 서버 재시작

`.env` 파일을 수정한 후에는 **반드시 개발 서버를 재시작**해야 합니다:

```bash
# 서버 중지 (Ctrl+C)
# 그 다음 다시 시작
pnpm dev
```

### 6. 환경 변수 확인 방법

다음 명령어로 환경 변수가 제대로 로드되었는지 확인할 수 있습니다:

**Windows PowerShell:**
```powershell
# .env 파일 내용 확인 (보안 주의)
Get-Content .env | Select-String "SUPABASE"
```

또는 개발 서버 콘솔에서 확인:
- 환경 변수가 설정되지 않으면 명확한 에러 메시지가 표시됩니다.

## 자주 발생하는 실수

### 1. 따옴표 누락
```env
# ❌ 잘못됨
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co

# ✅ 올바름
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
```

### 2. 공백 포함
```env
# ❌ 잘못됨 (앞뒤 공백)
NEXT_PUBLIC_SUPABASE_URL=" https://xxx.supabase.co "

# ✅ 올바름
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
```

### 3. 잘못된 키 사용
```env
# ❌ 잘못됨 (Publishable Key 사용)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="pk_xxx"  # Publishable Key는 Clerk용

# ✅ 올바름 (Anon Key 사용)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  # Anon Key
```

## 추가 확인 사항

1. **파일 위치**: `.env` 파일이 프로젝트 루트에 있어야 합니다
2. **파일 이름**: `.env.local` 또는 `.env.development`도 사용 가능하지만, `.env`가 우선순위가 높습니다
3. **Git 무시**: `.env` 파일은 `.gitignore`에 포함되어 있어야 합니다 (보안)

## 여전히 문제가 해결되지 않으면

1. `.env` 파일을 삭제하고 다시 생성
2. Supabase Dashboard에서 모든 키를 다시 복사
3. 개발 서버 완전히 종료 후 재시작
4. 브라우저 캐시 삭제

## 참고 자료

- [Next.js 환경 변수 문서](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Supabase 시작 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

