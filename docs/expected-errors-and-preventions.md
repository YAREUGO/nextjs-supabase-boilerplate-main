# 예상 오류 및 예방 조치

이 문서는 프로젝트에서 발생할 수 있는 오류와 예방 조치를 정리합니다.

## 1. Supabase onAuthStateChange 에러

### 에러 메시지
```
@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.onAuthStateChange is not possible
```

### 원인
- `accessToken` 옵션을 사용할 때 Supabase 클라이언트가 내부적으로 `onAuthStateChange`를 초기화하려고 시도
- Server Component에서는 `onAuthStateChange`를 사용하지 않으므로 불필요한 초기화

### 해결 방법
- **Server Component**: `accessToken` 옵션 대신 `global.headers`를 사용하여 Clerk 토큰을 Authorization 헤더로 전달
- **Client Component**: `accessToken` 옵션과 함께 `auth` 옵션으로 세션 관리 비활성화

### 예방 조치
- ✅ `lib/supabase/server.ts`: `global.headers` 사용
- ✅ `lib/supabase/clerk-client.ts`: `auth` 옵션 추가

---

## 2. 환경 변수 누락 에러

### 에러 메시지
```
NEXT_PUBLIC_SUPABASE_URL is not set. Please check your .env file.
Invalid NEXT_PUBLIC_SUPABASE_URL: "...". Must be a valid HTTP or HTTPS URL.
```

### 원인
- `.env` 파일에 환경 변수가 설정되지 않음
- 환경 변수 형식이 잘못됨 (URL이 아닌 키 값 등)

### 해결 방법
1. `.env` 파일 확인
2. Supabase Dashboard에서 올바른 URL과 키 복사
3. 개발 서버 재시작

### 예방 조치
- ✅ 모든 Supabase 클라이언트에 환경 변수 검증 함수 추가
- ✅ URL 형식 검증 (http:// 또는 https:// 시작 확인)
- ✅ 명확한 에러 메시지 제공

---

## 3. Webpack 설정 에러

### 에러 메시지
```
Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.
configuration[0].watchOptions.ignored should be one of these: [non-empty string, ...] | RegExp | non-empty string
```

### 원인
- `next.config.ts`의 `watchOptions.ignored`에 RegExp 객체 사용
- Webpack이 문자열만 허용하는 경우

### 해결 방법
- RegExp 제거, 문자열 패턴만 사용

### 예방 조치
- ✅ `next.config.ts`: 문자열 패턴만 사용

---

## 4. Clerk 인증 에러

### 에러 메시지
```
Unauthorized
Failed to fetch user from Clerk
```

### 원인
- Clerk API 키가 잘못 설정됨
- Clerk 사용자가 존재하지 않음
- 네트워크 문제

### 해결 방법
1. Clerk Dashboard에서 API 키 확인
2. `.env` 파일에 올바른 키 설정
3. 개발 서버 재시작

### 예방 조치
- ✅ `app/api/sync-user/route.ts`: 상세한 에러 로깅
- ✅ 환경 변수 검증

---

## 5. Supabase 연결 에러

### 에러 메시지
```
Failed to sync user to Supabase
Connection test failed
```

### 원인
- Supabase URL 또는 키가 잘못됨
- 네트워크 문제
- RLS 정책 문제
- 테이블이 존재하지 않음

### 해결 방법
1. Supabase Dashboard에서 연결 정보 확인
2. 테이블 및 RLS 정책 확인
3. 네트워크 연결 확인

### 예방 조치
- ✅ 환경 변수 검증
- ✅ 연결 테스트 기능 제공 (`/auth-test` 페이지)
- ✅ 명확한 에러 메시지

---

## 6. 타입 에러

### 에러 메시지
```
Type 'any' is not assignable to type '...'
Property '...' does not exist on type '...'
```

### 원인
- `any` 타입 사용
- 타입 정의 누락

### 해결 방법
- 인터페이스 정의
- 타입 안전성 확보

### 예방 조치
- ✅ `app/instruments/page.tsx`: `Instrument` 인터페이스 정의
- ✅ 린터 에러 확인

---

## 7. Next.js 빌드 캐시 에러

### 에러 메시지
```
Invalid or unexpected token
Loading chunk app/layout failed
```

### 원인
- Next.js 빌드 캐시 손상
- 브라우저 캐시 문제

### 해결 방법
1. `.next` 폴더 삭제
2. `node_modules/.cache` 폴더 삭제
3. 개발 서버 재시작
4. 브라우저 캐시 지우기

### 예방 조치
- ✅ `package.json`: `clean` 및 `dev:clean` 스크립트 추가

---

## 8. 파일 감시 에러 (Watchpack)

### 에러 메시지
```
Watchpack Error (initial scan): Error: EINVAL: invalid argument, lstat 'D:\pagefile.sys'
```

### 원인
- Next.js 파일 감시기가 시스템 파일에 접근 시도

### 해결 방법
- `next.config.ts`에서 시스템 파일 제외

### 예방 조치
- ✅ `next.config.ts`: `watchOptions.ignored`에 시스템 파일 패턴 추가

---

## 사용자 액션 필요 사항

### 1. 환경 변수 설정
`.env` 파일에 다음 환경 변수를 설정해야 합니다:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Storage
NEXT_PUBLIC_STORAGE_BUCKET=uploads
```

### 2. Supabase 테이블 생성
Supabase Dashboard에서 다음 테이블을 생성해야 합니다:

- `users`: Clerk 사용자 동기화용
- `instruments`: 테스트용 (선택사항)

### 3. 개발 서버 재시작
환경 변수를 수정한 후 **반드시** 개발 서버를 재시작해야 합니다:

```bash
# 모든 Node 프로세스 종료
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# 개발 서버 재시작
pnpm dev
```

### 4. 브라우저 캐시 지우기
변경사항이 반영되지 않으면:

- **강력 새로고침**: `Ctrl + Shift + R`
- 또는 **시크릿 모드**에서 테스트

---

## 자동 예방 메커니즘

프로젝트에는 다음 자동 예방 메커니즘이 구현되어 있습니다:

1. **환경 변수 검증**: 모든 Supabase 클라이언트에서 환경 변수 자동 검증
2. **에러 핸들링**: 네트워크 에러, 타임아웃, 재시도 로직
3. **타입 안정성**: TypeScript를 통한 타입 검증
4. **린터 검사**: ESLint를 통한 코드 품질 검사

---

## 추가 리소스

- [에러 점검 보고서](./error-check-report.md)
- [onAuthStateChange 에러 방지 가이드](./prevent-onAuthStateChange-error.md)
- [환경 변수 설정 가이드](../README.md#환경-변수-설정)

