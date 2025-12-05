# Vercel 환경 변수 전체 추가 스크립트
# Production, Preview, Development 모든 환경에 추가

Write-Host "=== Vercel Environment Variables Setup ===" -ForegroundColor Cyan
Write-Host ""

# Clerk 환경 변수
Write-Host "Adding Clerk variables..." -ForegroundColor Yellow
echo "pk_test_d29ya2FibGUtaGlwcG8tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA" | npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
echo "pk_test_d29ya2FibGUtaGlwcG8tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA" | npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY preview
echo "pk_test_d29ya2FibGUtaGlwcG8tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA" | npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY development

echo "sk_test_xzL3CRyeaCEnceoY4qmAh9BKWnfREJk56I0g8tHWDv" | npx vercel env add CLERK_SECRET_KEY production
echo "sk_test_xzL3CRyeaCEnceoY4qmAh9BKWnfREJk56I0g8tHWDv" | npx vercel env add CLERK_SECRET_KEY preview
echo "sk_test_xzL3CRyeaCEnceoY4qmAh9BKWnfREJk56I0g8tHWDv" | npx vercel env add CLERK_SECRET_KEY development

echo "/sign-in" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production
echo "/sign-in" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL preview
echo "/sign-in" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL development

echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL production
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL preview
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL development

echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL production
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL preview
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL development

# Supabase 환경 변수
Write-Host ""
Write-Host "Adding Supabase variables..." -ForegroundColor Yellow
echo "https://tnklcqzijbbqbphrbvry.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "https://tnklcqzijbbqbphrbvry.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL preview
echo "https://tnklcqzijbbqbphrbvry.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL development

echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTIzMDcsImV4cCI6MjA4MDI4ODMwN30.LM38MeM88GSt6IdJ58xNKPW0APFIIrLIUfRvdKxT2QQ" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTIzMDcsImV4cCI6MjA4MDI4ODMwN30.LM38MeM88GSt6IdJ58xNKPW0APFIIrLIUfRvdKxT2QQ" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTIzMDcsImV4cCI6MjA4MDI4ODMwN30.LM38MeM88GSt6IdJ58xNKPW0APFIIrLIUfRvdKxT2QQ" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development

echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDcxMjMwNywiZXhwIjoyMDgwMjg4MzA3fQ.9E4vmITnrdnyuw160p00Z18QH7OIoJXOQ4iAWbhYcvE" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDcxMjMwNywiZXhwIjoyMDgwMjg4MzA3fQ.9E4vmITnrdnyuw160p00Z18QH7OIoJXOQ4iAWbhYcvE" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY preview
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2xjcXppamJicWJwaHJidnJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDcxMjMwNywiZXhwIjoyMDgwMjg4MzA3fQ.9E4vmITnrdnyuw160p00Z18QH7OIoJXOQ4iAWbhYcvE" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY development

# Storage 환경 변수
Write-Host ""
Write-Host "Adding Storage variables..." -ForegroundColor Yellow
echo "uploads" | npx vercel env add NEXT_PUBLIC_STORAGE_BUCKET production
echo "uploads" | npx vercel env add NEXT_PUBLIC_STORAGE_BUCKET preview
echo "uploads" | npx vercel env add NEXT_PUBLIC_STORAGE_BUCKET development

Write-Host ""
Write-Host "=== Complete! ===" -ForegroundColor Green

