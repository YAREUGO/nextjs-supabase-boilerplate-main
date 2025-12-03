# 개발 서버 재시작 스크립트
# .env 파일 수정 후 이 스크립트를 실행하면 자동으로 재시작됩니다

Write-Host "개발 서버 재시작 중..." -ForegroundColor Cyan

# 1. 모든 Node 프로세스 종료
Write-Host "`n[1/3] Node 프로세스 종료 중..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host "   ✓ Node 프로세스 종료 완료" -ForegroundColor Green
} else {
    Write-Host "   ✓ 실행 중인 Node 프로세스 없음" -ForegroundColor Green
}

# 2. .next 폴더 삭제 (선택사항)
Write-Host "`n[2/3] 빌드 캐시 정리 중..." -ForegroundColor Yellow
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "   ✓ .next 폴더 삭제 완료" -ForegroundColor Green
} else {
    Write-Host "   ✓ .next 폴더 없음" -ForegroundColor Green
}

# 3. 환경 변수 확인
Write-Host "`n[3/3] 환경 변수 확인 중..." -ForegroundColor Yellow
$supabaseUrl = (Get-Content .env | Select-String "NEXT_PUBLIC_SUPABASE_URL").ToString()
if ($supabaseUrl -match 'https://') {
    Write-Host "   ✓ Supabase URL 형식 올바름" -ForegroundColor Green
} else {
    Write-Host "   ⚠ Supabase URL 형식 확인 필요: $supabaseUrl" -ForegroundColor Red
}

Write-Host "`n개발 서버를 시작합니다..." -ForegroundColor Cyan
Write-Host "명령어: pnpm dev`n" -ForegroundColor Yellow

# 개발 서버 시작
pnpm dev

