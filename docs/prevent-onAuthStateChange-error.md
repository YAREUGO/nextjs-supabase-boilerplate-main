# onAuthStateChange 에러 방지 가이드

## 문제

`@supabase/ssr`의 `createServerClient`에서 `accessToken` 옵션을 사용할 때 다음과 같은 에러가 발생합니다:

```
@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.onAuthStateChange is not possible
```

## 원인

`accessToken` 옵션을 사용하면 Supabase 클라이언트가 내부적으로 `onAuthStateChange`를 초기화하려고 시도하지만, 이 옵션과 함께 사용할 수 없기 때문에 에러가 발생합니다.

## 해결 방법

### Server Component (`lib/supabase/server.ts`)

`accessToken` 옵션 대신 `global.headers`를 사용하여 Clerk 토큰을 Authorization 헤더로 전달합니다:

```typescript
const supabase = createServerClient(
  supabaseUrl,
  supabaseKey,
  {
    cookies: { ... },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    // accessToken 옵션 대신 global.headers 사용
    global: {
      headers: clerkToken
        ? {
            Authorization: `Bearer ${clerkToken}`,
          }
        : {},
    },
  }
);
```

### Client Component (`lib/supabase/clerk-client.ts`)

Client Component에서는 `accessToken` 옵션을 사용하되, `auth` 옵션으로 세션 관리를 비활성화합니다:

```typescript
return createClient(supabaseUrl, supabaseKey, {
  async accessToken() {
    return (await getToken()) ?? null;
  },
  // accessToken 옵션 사용 시 onAuthStateChange 비활성화
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});
```

## 예방 조치

1. **Server Component에서는 `global.headers` 사용**
   - `accessToken` 옵션 사용 금지
   - Clerk 토큰을 Authorization 헤더로 전달

2. **Client Component에서는 `auth` 옵션 추가**
   - `accessToken` 옵션과 함께 `auth` 옵션으로 세션 관리 비활성화

3. **에러 핸들링**
   - 모든 Supabase 클라이언트에 환경 변수 검증 추가
   - 명확한 에러 메시지 제공

## 참고

- Server Component에서는 `onAuthStateChange`를 사용하지 않으므로, `global.headers` 방식이 더 안전합니다.
- Client Component에서는 `onAuthStateChange`를 사용할 수 있지만, `accessToken` 옵션과 함께 사용할 때는 `auth` 옵션으로 비활성화해야 합니다.

