# 배포 체크리스트

이 문서는 Vercel에 배포하기 전에 확인해야 할 사항들을 정리한 체크리스트입니다.

## ✅ 빌드 테스트

- [x] 프로덕션 빌드 성공 (`pnpm build`)
- [x] TypeScript 타입 오류 없음
- [x] ESLint 경고 최소화

## 🔐 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정해야 합니다:

### Clerk 인증
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` (기본값: `/sign-in`)
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` (기본값: `/`)
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` (기본값: `/`)

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (서버 사이드 전용)
- `NEXT_PUBLIC_STORAGE_BUCKET` (기본값: `uploads`)

### Toss Payments
- `NEXT_PUBLIC_TOSS_CLIENT_KEY` (테스트 모드: `test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq`)

## 📋 배포 전 확인 사항

### 1. 데이터베이스 준비
- [ ] Supabase 프로젝트가 생성되어 있고 활성화되어 있는지 확인
- [ ] 모든 마이그레이션이 적용되었는지 확인
- [ ] 샘플 상품 데이터가 등록되어 있는지 확인

### 2. Clerk 설정
- [ ] Clerk 프로젝트가 생성되어 있는지 확인
- [ ] Clerk 대시보드에서 허용된 URL에 Vercel 도메인 추가
- [ ] 회원가입/로그인 플로우가 정상 작동하는지 확인

### 3. Toss Payments 설정
- [ ] Toss Payments 테스트 키가 올바르게 설정되어 있는지 확인
- [ ] 결제 테스트가 정상 작동하는지 확인

### 4. 코드 품질
- [ ] 모든 린터 경고 해결
- [ ] 사용하지 않는 import 제거
- [ ] 에러 핸들링이 적절한지 확인

## 🚀 Vercel 배포 단계

### 1. Vercel 프로젝트 생성
1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결 또는 직접 배포

### 2. 환경 변수 설정
1. Vercel 프로젝트 설정 → Environment Variables
2. 위의 모든 환경 변수 추가
3. Production, Preview, Development 환경 모두 설정

### 4. 빌드 설정 확인
- **Framework Preset**: Next.js
- **Build Command**: `pnpm build` (또는 `npm run build`)
- **Output Directory**: `.next` (자동 감지)
- **Install Command**: `pnpm install` (또는 `npm install`)

### 5. 배포 실행
1. "Deploy" 버튼 클릭
2. 빌드 로그 확인
3. 배포 완료 후 도메인 확인

## 🔍 배포 후 확인 사항

### 필수 확인
- [ ] 홈페이지가 정상적으로 로드되는지 확인
- [ ] 회원가입/로그인이 정상 작동하는지 확인
- [ ] 상품 목록이 정상적으로 표시되는지 확인
- [ ] 장바구니 기능이 정상 작동하는지 확인
- [ ] 주문 프로세스가 정상 작동하는지 확인
- [ ] 결제 프로세스가 정상 작동하는지 확인
- [ ] 마이페이지가 정상적으로 표시되는지 확인

### 성능 확인
- [ ] 페이지 로딩 속도 확인
- [ ] 이미지 최적화 확인
- [ ] API 응답 시간 확인

### 보안 확인
- [ ] 환경 변수가 노출되지 않는지 확인
- [ ] 인증이 정상 작동하는지 확인
- [ ] HTTPS가 활성화되어 있는지 확인

## 🐛 문제 해결

### 빌드 실패
- 환경 변수가 올바르게 설정되었는지 확인
- 빌드 로그에서 오류 메시지 확인
- 로컬에서 `pnpm build` 실행하여 오류 재현

### 런타임 오류
- Vercel 함수 로그 확인
- 브라우저 콘솔 확인
- 환경 변수 값 확인

### 데이터베이스 연결 오류
- Supabase URL과 키가 올바른지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인
- 네트워크 방화벽 설정 확인

## 📚 참고 문서

- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Vercel 문서](https://vercel.com/docs)
- [Clerk 배포 가이드](https://clerk.com/docs/deployments/overview)
- [Supabase 배포 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Toss Payments 연동 가이드](https://developers.tosspayments.com/)


