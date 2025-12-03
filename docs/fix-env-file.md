# .env 파일 수정 가이드

## 문제

현재 `.env` 파일에서 `NEXT_PUBLIC_SUPABASE_URL`에 잘못된 값이 설정되어 있습니다:

```
❌ 잘못된 값: NEXT_PUBLIC_SUPABASE_URL=sb_publishable_sk3DVb2W-5e11lh8kgynxQ_aJYJ2pKD
```

이것은 Supabase URL이 아니라 키입니다.

## 해결 방법

### 1. Supabase Dashboard에서 올바른 값 확인

1. [Supabase Dashboard](https://supabase.com/dashboard)에 접속
2. 프로젝트 선택
3. **Settings** → **API** 메뉴 클릭
4. 다음 값들을 확인:

   - **Project URL**: `https://tnklcqzijbbqbphrbvry.supabase.co` (이것이 URL입니다!)
   - **anon public**: 이것이 `NEXT_PUBLIC_SUPABASE_ANON_KEY`입니다
   - **service_role secret**: 이것이 `SUPABASE_SERVICE_ROLE_KEY`입니다

### 2. .env 파일 수정

`.env` 파일을 열고 다음 부분을 수정하세요:

**수정 전 (잘못된 값):**
```env
NEXT_PUBLIC_SUPABASE_URL=sb_publishable_sk3DVb2W-5e11lh8kgynxQ_aJYJ2pKD
```

**수정 후 (올바른 값):**
```env
NEXT_PUBLIC_SUPABASE_URL="https://tnklcqzijbbqbphrbvry.supabase.co"
```

### 3. 전체 Supabase 섹션 확인

`.env` 파일의 Supabase 섹션이 다음과 같이 되어 있어야 합니다:

```env
# Supabase 연결 정보 (필수)
NEXT_PUBLIC_SUPABASE_URL="https://tnklcqzijbbqbphrbvry.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTIzMDcsImV4cCI6MjA4MDI4ODMwN30.LM38MeM88GSt6IdJ58xNKPW0APFIIrLIUfRvdKxT2QQ"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDcxMjMwNywiZXhwIjoyMDgwMjg4MzA3fQ.9E4vmITnrdnyuw160p00Z18QH7OIoJXOQ4iAWbhYcvE"
NEXT_PUBLIC_STORAGE_BUCKET="uploads"
```

### 4. 중요 사항

- ✅ URL은 반드시 `https://`로 시작해야 합니다
- ✅ 따옴표로 감싸야 합니다
- ✅ 앞뒤 공백이 없어야 합니다
- ✅ `sb_publishable_`로 시작하는 값은 URL이 아닙니다!

### 5. 개발 서버 재시작

`.env` 파일을 수정한 후 **반드시** 개발 서버를 재시작하세요:

```bash
# 서버 중지 (Ctrl+C)
pnpm dev
```

## Supabase Dashboard에서 값 찾는 방법

1. **Project URL 찾기:**
   - Settings → API → **Project URL** 섹션
   - 형식: `https://[프로젝트ID].supabase.co`

2. **Anon Key 찾기:**
   - Settings → API → **Project API keys** 섹션
   - **anon** `public` 옆의 값

3. **Service Role Key 찾기:**
   - Settings → API → **Project API keys** 섹션
   - **service_role** `secret` 옆의 값 (⚠️ 주의: 이 키는 절대 공개하지 마세요!)

## 확인 방법

수정 후 브라우저 콘솔에서 에러가 사라지고 버튼이 정상적으로 작동하는지 확인하세요.

