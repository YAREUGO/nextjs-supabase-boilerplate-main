# Vercel 배포 가이드

## 🚀 빠른 배포 방법

### 방법 1: Vercel 대시보드에서 배포 (추천)

1. **GitHub에 코드 푸시**

   ```bash
   # GitHub에 새 저장소 생성 후
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```

2. **Vercel 대시보드에서 배포**

   - [Vercel 대시보드](https://vercel.com/dashboard) 접속
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정:
     - **Framework Preset**: Next.js (자동 감지)
     - **Root Directory**: `./` (기본값)
     - **Build Command**: `pnpm build` (자동 감지)
     - **Output Directory**: `.next` (자동 감지)
     - **Install Command**: `pnpm install` (자동 감지)
   - "Deploy" 클릭

3. **환경 변수 설정** (배포 후)
   - 배포 완료 후 → Settings → Environment Variables
   - 아래 환경 변수 추가:
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_STORAGE_BUCKET`
   - "Redeploy" 클릭

### 방법 2: Vercel CLI로 배포

1. **Vercel CLI 설치**

   ```bash
   npm i -g vercel
   # 또는
   pnpm add -g vercel
   ```

2. **Vercel 로그인**

   ```bash
   vercel login
   ```

3. **프로젝트 배포**

   ```bash
   vercel
   ```

   질문에 답변:

   - Set up and deploy? → **Y**
   - Which scope? → 본인 계정 선택
   - Link to existing project? → **N**
   - What's your project's name? → 프로젝트 이름 입력
   - In which directory is your code located? → **./**

4. **프로덕션 배포**

   ```bash
   vercel --prod
   ```

5. **환경 변수 설정**
   ```bash
   vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   vercel env add CLERK_SECRET_KEY
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add NEXT_PUBLIC_STORAGE_BUCKET
   ```

## 📝 배포 후 확인 사항

1. ✅ 홈페이지 로드 확인: `https://your-project.vercel.app`
2. ✅ Clerk 로그인 작동 확인
3. ✅ Supabase 연결 확인: `/instruments` 페이지
4. ✅ 파일 업로드 확인: `/storage-test` 페이지
5. ✅ 인증 연동 확인: `/auth-test` 페이지

## 🔧 문제 해결

### 빌드 실패

- Vercel 대시보드 → Deployments → 실패한 배포 → Build Logs 확인
- 로컬에서 `pnpm build` 성공하는지 확인

### 런타임 오류

- Vercel 대시보드 → Functions → Logs 확인
- 환경 변수가 올바르게 설정되었는지 확인

### 환경 변수 오류

- `NEXT_PUBLIC_` 접두사가 있는 변수는 클라이언트에서도 접근 가능
- 환경 변수 추가 후 **반드시 재배포** 필요

## 📚 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [환경 변수 설정](https://vercel.com/docs/concepts/projects/environment-variables)
