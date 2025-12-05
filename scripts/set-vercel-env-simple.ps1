# Simple Vercel Environment Variables Setup
# Reads .env and adds each variable to Vercel

$envFile = ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "Error: .env file not found." -ForegroundColor Red
    exit 1
}

Write-Host "Reading .env file..." -ForegroundColor Cyan

Get-Content $envFile -Encoding UTF8 | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+?)\s*=\s*(.+)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        
        # Remove quotes
        if ($value -match '^["''](.+)["'']$') {
            $value = $matches[1]
        }
        
        if ($key -and $value) {
            Write-Host ""
            Write-Host "Adding: $key" -ForegroundColor Yellow
            
            # Add to each environment separately
            $environments = @("production", "preview", "development")
            $successCount = 0
            
            foreach ($env in $environments) {
                $value | npx vercel env add $key $env 2>&1 | Out-Null
                if ($LASTEXITCODE -eq 0) {
                    $successCount++
                }
            }
            
            if ($successCount -eq 3) {
                Write-Host "Success: $key (all environments)" -ForegroundColor Green
            } elseif ($successCount -gt 0) {
                Write-Host "Partial: $key ($successCount/3 environments)" -ForegroundColor Yellow
            } else {
                Write-Host "Warning: $key may already exist" -ForegroundColor Yellow
            }
        }
    }
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green

