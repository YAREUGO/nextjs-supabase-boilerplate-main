# Vercel 환경 변수 추가 명령어 전체 목록

## 사용 방법

1. 먼저 프로젝트 연결:
```powershell
npx vercel link
```

2. 아래 명령어들을 복사해서 터미널에 붙여넣고 실행하세요.

---

## Clerk 환경 변수

### NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
```powershell
echo "pk_test_d29ya2FibGUtaGlwcG8tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA" | npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
echo "pk_test_d29ya2FibGUtaGlwcG8tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA" | npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY preview
echo "pk_test_d29ya2FibGUtaGlwcG8tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA" | npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY development
```

### CLERK_SECRET_KEY
```powershell
echo "sk_test_xzL3CRyeaCEnceoY4qmAh9BKWnfREJk56I0g8tHWDv" | npx vercel env add CLERK_SECRET_KEY production
echo "sk_test_xzL3CRyeaCEnceoY4qmAh9BKWnfREJk56I0g8tHWDv" | npx vercel env add CLERK_SECRET_KEY preview
echo "sk_test_xzL3CRyeaCEnceoY4qmAh9BKWnfREJk56I0g8tHWDv" | npx vercel env add CLERK_SECRET_KEY development
```

### NEXT_PUBLIC_CLERK_SIGN_IN_URL
```powershell
echo "/sign-in" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production
echo "/sign-in" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL preview
echo "/sign-in" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL development
```

### NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
```powershell
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL production
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL preview
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL development
```

### NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
```powershell
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL production
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL preview
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL development
```

---

## Supabase 환경 변수

### NEXT_PUBLIC_SUPABASE_URL
```powershell
echo "https://tnklcqzijbbqbphrbvry.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "https://tnklcqzijbbqbphrbvry.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL preview
echo "https://tnklcqzijbbqbphrbvry.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL development
```

### NEXT_PUBLIC_SUPABASE_ANON_KEY
```powershell
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTIzMDcsImV4cCI6MjA4MDI4ODMwN30.LM38MeM88GSt6IdJ58xNKPW0APFIIrLIUfRvdKxT2QQ" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTIzMDcsImV4cCI6MjA4MDI4ODMwN30.LM38MeM88GSt6IdJ58xNKPW0APFIIrLIUfRvdKxT2QQ" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTIzMDcsImV4cCI6MjA4MDI4ODMwN30.LM38MeM88GSt6IdJ58xNKPW0APFIIrLIUfRvdKxT2QQ" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
```

### SUPABASE_SERVICE_ROLE_KEY
```powershell
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDcxMjMwNywiZXhwIjoyMDgwMjg4MzA3fQ.9E4vmITnrdnyuw160p00Z18QH7OIoJXOQ4iAWbhYcvE" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDcxMjMwNywiZXhwIjoyMDgwMjg4MzA3fQ.9E4vmITnrdnyuw160p00Z18QH7OIoJXOQ4iAWbhYcvE" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY preview
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDcxMjMwNywiZXhwIjoyMDgwMjg4MzA3fQ.9E4vmITnrdnyuw160p00Z18QH7OIoJXOQ4iAWbhYcvE" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY development
```

---

## Storage 환경 변수

### NEXT_PUBLIC_STORAGE_BUCKET
```powershell
echo "uploads" | npx vercel env add NEXT_PUBLIC_STORAGE_BUCKET production
echo "uploads" | npx vercel env add NEXT_PUBLIC_STORAGE_BUCKET preview
echo "uploads" | npx vercel env add NEXT_PUBLIC_STORAGE_BUCKET development
```

---

## 한 번에 실행하기

스크립트 파일을 실행하면 모든 환경 변수가 자동으로 추가됩니다:

```powershell
.\scripts\add-all-vercel-env.ps1
```

---

## 총 환경 변수 개수

- **총 9개 환경 변수**
- **각 환경 변수마다 3개 환경 (production, preview, development)**
- **총 27개 명령어**

