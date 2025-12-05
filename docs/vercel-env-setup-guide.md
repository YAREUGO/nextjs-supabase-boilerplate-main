# Vercel 환경 변수 설정 가이드

## 🚨 현재 상태

빌드는 성공했지만, **환경 변수가 설정되지 않아** 런타임 오류가 발생합니다.

에러 메시지:
```
Error: @clerk/clerk-react: Missing publishableKey
```

## ✅ 해결 방법

Vercel 대시보드에서 다음 환경 변수를 설정해야 합니다:

### 1. Vercel 대시보드 접속
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 새로 생성한 프로젝트 클릭
3. **Settings** → **Environment Variables** 클릭

### 2. 필수 환경 변수 추가

다음 변수들을 **하나씩** 추가하세요:

#### Clerk 환경 변수 (필수)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = <Clerk Dashboard에서 복사>
CLERK_SECRET_KEY = <Clerk Dashboard에서 복사>
NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL = /
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL = /
```

#### Supabase 환경 변수 (필수)
```
NEXT_PUBLIC_SUPABASE_URL = <Supabase Dashboard에서 복사>
NEXT_PUBLIC_SUPABASE_ANON_KEY = <Supabase Dashboard에서 복사>
SUPABASE_SERVICE_ROLE_KEY = <Supabase Dashboard에서 복사>
```

#### 선택적 환경 변수
```
NEXT_PUBLIC_STORAGE_BUCKET = uploads
NEXT_PUBLIC_TOSS_CLIENT_KEY = test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
```

### 3. 환경 변수 값 찾는 방법

#### Clerk 키 찾기
1. [Clerk Dashboard](https://dashboard.clerk.com/) 접속
2. 프로젝트 선택
3. **API Keys** 메뉴 클릭
4. **Publishable Key**와 **Secret Key** 복사

#### Supabase 키 찾기
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** → **API** 메뉴 클릭
4. 다음 값들 복사:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 4. 환경 변수 추가 방법

각 환경 변수 추가 시:
1. **Key**: 변수 이름 입력 (예: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
2. **Value**: 실제 값 입력
3. **Environment**: 다음 중 선택
   - ✅ Production
   - ✅ Preview
   - ✅ Development

**중요**: 모든 환경(Production, Preview, Development)에 체크하세요!

### 5. 재배포

환경 변수 추가 후:
- 자동으로 재배포되거나
- 수동으로 **Deployments** 탭 → 최신 배포 → **Redeploy** 클릭

## 📋 체크리스트

환경 변수 설정 후 다음을 확인하세요:

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 설정됨
- [ ] `CLERK_SECRET_KEY` 설정됨
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL` 설정됨
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` 설정됨
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` 설정됨
- [ ] `NEXT_PUBLIC_SUPABASE_URL` 설정됨
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정됨
- [ ] `SUPABASE_SERVICE_ROLE_KEY` 설정됨
- [ ] 재배포 완료

## 🎉 완료 후

환경 변수 설정 및 재배포가 완료되면:
1. 배포된 사이트 접속
2. 홈페이지가 정상적으로 로드되는지 확인
3. 로그인 기능 테스트

---

**참고**: 기존 프로젝트(`1203`)의 환경 변수를 복사해서 사용할 수도 있습니다.
Vercel CLI로 확인: `npx vercel env ls`

