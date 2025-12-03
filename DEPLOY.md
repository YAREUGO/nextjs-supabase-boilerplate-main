# 🚀 Vercel 배포 가이드

## 방법 1: Vercel 대시보드에서 배포 (가장 쉬운 방법)

### 1단계: GitHub에 코드 업로드

1. **GitHub에 새 저장소 생성**
   - [GitHub](https://github.com/new)에서 새 저장소 생성
   - 저장소 이름 입력 (예: `nextjs-supabase-boilerplate`)
   - Public 또는 Private 선택
   - "Create repository" 클릭

2. **로컬에서 GitHub에 푸시**
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

### 2단계: Vercel에서 배포

1. **Vercel 대시보드 접속**
   - [Vercel 대시보드](https://vercel.com/dashboard) 접속
   - GitHub 계정으로 로그인 (처음이면 회원가입)

2. **프로젝트 Import**
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 선택
   - "Import" 클릭

3. **프로젝트 설정 확인**
   - Framework Preset: **Next.js** (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `pnpm build` (자동 감지됨)
   - Output Directory: `.next` (자동 감지됨)
   - Install Command: `pnpm install` (자동 감지됨)

4. **배포 시작**
   - "Deploy" 버튼 클릭
   - 빌드가 완료될 때까지 대기 (약 2-3분)

5. **배포 완료 후**
   - 배포 URL 확인 (예: `https://your-project.vercel.app`)
   - ⚠️ **환경 변수 없이 배포되면 일부 기능이 작동하지 않을 수 있습니다**

### 3단계: 환경 변수 설정

1. **환경 변수 추가**
   - Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables**
   - 다음 변수들을 하나씩 추가:

   **Clerk:**
   - Name: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Value: Clerk Dashboard에서 복사한 Publishable Key
   - Environment: Production, Preview, Development 모두 체크

   - Name: `CLERK_SECRET_KEY`
   - Value: Clerk Dashboard에서 복사한 Secret Key
   - Environment: Production, Preview, Development 모두 체크

   - Name: `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
   - Value: `/sign-in`
   - Environment: Production, Preview, Development 모두 체크

   - Name: `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`
   - Value: `/`
   - Environment: Production, Preview, Development 모두 체크

   - Name: `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`
   - Value: `/`
   - Environment: Production, Preview, Development 모두 체크

   **Supabase:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Supabase Dashboard → Settings → API → Project URL
   - Environment: Production, Preview, Development 모두 체크

   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Supabase Dashboard → Settings → API → anon public key
   - Environment: Production, Preview, Development 모두 체크

   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: Supabase Dashboard → Settings → API → service_role secret key
   - Environment: Production, Preview, Development 모두 체크
   - ⚠️ **절대 공개하지 마세요!**

   **Storage:**
   - Name: `NEXT_PUBLIC_STORAGE_BUCKET`
   - Value: `uploads`
   - Environment: Production, Preview, Development 모두 체크

2. **재배포**
   - 환경 변수 추가 후 자동으로 재배포되거나
   - Deployments 탭 → 최신 배포 → "Redeploy" 클릭

### 4단계: 기능 테스트

배포된 사이트에서 다음 페이지들을 테스트:

- ✅ `/` - 홈페이지가 정상적으로 로드되는지
- ✅ `/instruments` - Supabase 연결이 작동하는지
- ✅ `/storage-test` - 파일 업로드가 작동하는지
- ✅ `/auth-test` - Clerk 로그인 및 Supabase 연동이 작동하는지

---

## 방법 2: Vercel CLI로 배포

### 1단계: Vercel CLI 설치 및 로그인

```bash
# npx를 사용하여 Vercel CLI 실행 (설치 불필요)
npx vercel login
```

### 2단계: 프로젝트 배포

```bash
# 프로젝트 루트에서 실행
npx vercel
```

질문에 답변:
- Set up and deploy? → **Y**
- Which scope? → 본인 계정 선택
- Link to existing project? → **N** (처음 배포)
- What's your project's name? → 프로젝트 이름 입력
- In which directory is your code located? → **./** (Enter)

### 3단계: 프로덕션 배포

```bash
npx vercel --prod
```

### 4단계: 환경 변수 설정

```bash
# 각 환경 변수를 하나씩 추가
npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
npx vercel env add CLERK_SECRET_KEY
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
npx vercel env add SUPABASE_SERVICE_ROLE_KEY
npx vercel env add NEXT_PUBLIC_STORAGE_BUCKET
```

각 변수 추가 시:
- Value: 실제 값 입력
- Environment: `Production`, `Preview`, `Development` 모두 선택

### 5단계: 재배포

```bash
npx vercel --prod
```

---

## 🔧 문제 해결

### 빌드 실패
- Vercel 대시보드 → Deployments → 실패한 배포 → Build Logs 확인
- 로컬에서 `pnpm build`가 성공하는지 확인

### 런타임 오류
- Vercel 대시보드 → 프로젝트 → Functions → Logs 확인
- 브라우저 콘솔에서 오류 확인
- 환경 변수가 올바르게 설정되었는지 확인

### 환경 변수 오류
- `NEXT_PUBLIC_` 접두사가 있는 변수는 클라이언트에서도 접근 가능
- 환경 변수 추가 후 **반드시 재배포** 필요

---

## 📚 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [환경 변수 설정](https://vercel.com/docs/concepts/projects/environment-variables)

