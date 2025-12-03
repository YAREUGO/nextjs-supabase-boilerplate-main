# Vercel 배포 체크리스트

## 🚀 배포 순서

### 1단계: 프로젝트 배포 (환경 변수 없이 먼저 시도 가능)
1. Vercel 대시보드에서 프로젝트를 GitHub/GitLab/Bitbucket에 연결
2. 프로젝트를 Import하여 첫 배포 시작
3. ✅ **빌드는 성공합니다!** (환경 변수 없이도 빌드 가능하도록 수정됨)
4. ⚠️ 하지만 런타임에서 기능이 작동하지 않을 수 있습니다 (환경 변수 필요)

### 2단계: 환경 변수 설정 (배포 후)
배포가 완료된 후 환경 변수를 추가합니다:
- Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
- 아래의 "필수 환경 변수" 섹션 참고

### 3단계: 재배포
환경 변수 추가 후:
- 자동으로 재배포되거나
- 수동으로 "Redeploy" 클릭
- 또는 새로운 커밋을 푸시하면 자동 재배포

### 4단계: 기능 테스트
환경 변수 설정 후 다음 페이지들이 정상 작동하는지 확인:
- `/` - 홈페이지
- `/instruments` - Supabase 연결 테스트
- `/storage-test` - Storage 파일 업로드 테스트
- `/auth-test` - Clerk + Supabase 인증 연동 테스트

---

## 필수 환경 변수 설정

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에서 다음 변수들을 설정해야 합니다:

### Clerk 환경 변수
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk Dashboard → API Keys → Publishable Key
- `CLERK_SECRET_KEY`: Clerk Dashboard → API Keys → Secret Key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: `/sign-in` (또는 커스텀 경로)
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`: `/` (또는 커스텀 경로)
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`: `/` (또는 커스텀 경로)

### Supabase 환경 변수
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Dashboard → Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Dashboard → Settings → API → anon public key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Dashboard → Settings → API → service_role secret key (⚠️ 절대 공개하지 마세요!)

### Storage 환경 변수
- `NEXT_PUBLIC_STORAGE_BUCKET`: `uploads` (또는 커스텀 버킷 이름)

## 환경별 설정

Vercel에서는 다음 환경별로 변수를 설정할 수 있습니다:
- **Production**: 프로덕션 배포용
- **Preview**: PR/브랜치 배포용
- **Development**: 로컬 개발용 (선택사항)

모든 환경에 동일한 변수를 설정하거나, 환경별로 다른 값을 설정할 수 있습니다.

## 배포 전 확인 사항

1. ✅ 모든 환경 변수가 Vercel에 설정되었는지 확인
2. ✅ Supabase 테이블이 생성되었는지 확인 (`users`, `instruments` 등)
3. ✅ Supabase Storage 버킷이 생성되었는지 확인 (`uploads`)
4. ✅ RLS 정책이 올바르게 설정되었는지 확인 (개발 중에는 비활성화 가능)
5. ✅ Clerk와 Supabase 통합이 활성화되었는지 확인

## 배포 후 확인 사항

1. ✅ 홈페이지가 정상적으로 로드되는지 확인
2. ✅ Clerk 로그인이 작동하는지 확인
3. ✅ Supabase 연결이 정상인지 확인 (`/instruments` 페이지)
4. ✅ 파일 업로드가 작동하는지 확인 (`/storage-test` 페이지)
5. ✅ 인증 연동이 정상인지 확인 (`/auth-test` 페이지)

## 문제 해결

### 빌드 실패
- Vercel 대시보드 → Deployments → 실패한 배포 → Build Logs 확인
- 환경 변수가 올바르게 설정되었는지 확인
- 로컬에서 `pnpm build`가 성공하는지 확인

### 런타임 오류
- Vercel 대시보드 → 프로젝트 → Functions → Logs 확인
- 브라우저 콘솔에서 오류 확인
- 환경 변수가 런타임에 접근 가능한지 확인 (`NEXT_PUBLIC_` 접두사 필수)

### 인증 오류
- Clerk Dashboard에서 Webhook URL 확인
- Supabase Dashboard에서 RLS 정책 확인
- 환경 변수가 올바르게 설정되었는지 확인

## 참고 자료

- [Vercel 환경 변수 설정 가이드](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Clerk 배포 가이드](https://clerk.com/docs/deployments/overview)
- [Supabase 배포 가이드](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

