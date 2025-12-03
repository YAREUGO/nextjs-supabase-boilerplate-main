# Vercel 환경 변수 자동 추가 스크립트
# .env 파일을 읽어서 Vercel에 환경 변수를 추가합니다

Write-Host "=== Vercel 환경 변수 추가 시작 ===" -ForegroundColor Green

# .env 파일 읽기
$envFile = ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "오류: .env 파일을 찾을 수 없습니다." -ForegroundColor Red
    exit 1
}

# .env 파일에서 환경 변수 추출
$envVars = @{}
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim().Trim('"').Trim("'")
        $envVars[$key] = $value
    }
}

# 추가할 환경 변수 목록
$requiredVars = @(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY",
    "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
    "NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL",
    "NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_STORAGE_BUCKET"
)

# 각 환경 변수 추가
foreach ($varName in $requiredVars) {
    if ($envVars.ContainsKey($varName)) {
        $value = $envVars[$varName]
        Write-Host "`n환경 변수 추가 중: $varName" -ForegroundColor Yellow
        
        # Vercel CLI로 환경 변수 추가 (모든 환경에 추가)
        $environments = @("production", "preview", "development")
        
        foreach ($env in $environments) {
            Write-Host "  → $env 환경에 추가 중..." -ForegroundColor Cyan
            # stdin으로 값을 전달하고, sensitive 질문에 N으로 답변
            $value | npx vercel env add $varName $env --yes 2>&1 | Out-Null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "    ✓ $env 환경 추가 완료" -ForegroundColor Green
            } else {
                Write-Host "    ✗ $env 환경 추가 실패 (이미 존재할 수 있음)" -ForegroundColor Yellow
            }
        }
        
        Write-Host "✓ $varName 모든 환경 추가 완료" -ForegroundColor Green
    } else {
        Write-Host "⚠ 경고: .env 파일에 $varName 이(가) 없습니다. 건너뜁니다." -ForegroundColor Yellow
    }
}

Write-Host "`n=== 환경 변수 추가 완료 ===" -ForegroundColor Green
Write-Host "재배포를 실행하세요: npx vercel --prod" -ForegroundColor Cyan

