# .env 파일 수정 후 개발 서버 재시작 가이드

## 문제

`.env` 파일을 수정했지만 여전히 이전 값이 사용되고 있습니다.

## 원인

Next.js는 **서버 시작 시** 환경 변수를 로드합니다. `.env` 파일을 수정한 후에는 **반드시 개발 서버를 재시작**해야 합니다.

## 해결 방법

### 1단계: 개발 서버 완전히 종료

**중요**: 단순히 Ctrl+C로 중지하는 것이 아니라, 모든 Node 프로세스를 종료해야 합니다.

**Windows PowerShell:**
```powershell
# 모든 Node 프로세스 종료
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

또는 작업 관리자에서:
1. Ctrl + Shift + Esc로 작업 관리자 열기
2. "Node.js" 프로세스 찾기
3. 모두 종료

### 2단계: .env 파일 확인

`.env` 파일이 올바르게 수정되었는지 확인:

```env
NEXT_PUBLIC_SUPABASE_URL="https://tnklcqzijbbqbphrbvry.supabase.co"
```

**확인 사항:**
- ✅ 따옴표로 감싸져 있는지
- ✅ `https://`로 시작하는지
- ✅ 앞뒤 공백이 없는지

### 3단계: 개발 서버 재시작

```bash
pnpm dev
```

### 4단계: 브라우저 새로고침

- **강력 새로고침**: Ctrl + Shift + R
- 또는 **시크릿 모드**에서 테스트

## 추가 확인 사항

### .env.local 파일 확인

`.env.local` 파일이 있으면 그것이 우선순위가 높습니다:

```bash
# .env.local 파일 확인
Get-Content .env.local
```

`.env.local` 파일에도 같은 환경 변수가 있으면 수정해야 합니다.

### 환경 변수 우선순위

Next.js는 다음 순서로 환경 변수를 로드합니다:
1. `.env.local` (최우선)
2. `.env.development` (개발 환경)
3. `.env`

### 여러 .env 파일 확인

```bash
# 모든 .env 파일 확인
Get-ChildItem -Path . -Filter ".env*" -File
```

## 빠른 해결 체크리스트

- [ ] 개발 서버 완전히 종료 (모든 Node 프로세스 종료)
- [ ] `.env` 파일에 올바른 URL 확인
- [ ] `.env.local` 파일이 있으면 확인 및 수정
- [ ] 개발 서버 재시작 (`pnpm dev`)
- [ ] 브라우저 강력 새로고침 (Ctrl + Shift + R)

## 여전히 문제가 있으면

1. **캐시 완전 삭제:**
   ```bash
   pnpm clean
   Remove-Item -Recurse -Force .next
   ```

2. **환경 변수 직접 확인:**
   개발 서버 콘솔에서 환경 변수가 제대로 로드되었는지 확인

3. **브라우저 개발자 도구 확인:**
   - Network 탭에서 요청 확인
   - Console 탭에서 에러 확인

