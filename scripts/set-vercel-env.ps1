# Vercel Environment Variables Setup Script
# Automatically adds environment variables from .env file to Vercel

Write-Host "Starting Vercel environment variables setup..." -ForegroundColor Cyan

# .env file path
$envFile = ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "Error: .env file not found." -ForegroundColor Red
    exit 1
}

# Read .env file
$envVars = @{}
Get-Content $envFile -Encoding UTF8 | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+?)\s*=\s*(.+)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        # Remove quotes
        if ($value -match '^["''](.+)["'']$') {
            $value = $matches[1]
        }
        $envVars[$key] = $value
    }
}

Write-Host "Found $($envVars.Count) environment variables" -ForegroundColor Green
Write-Host ""
Write-Host "Please run the following commands manually:" -ForegroundColor Yellow
Write-Host "Each command will prompt you to enter the value." -ForegroundColor Yellow
Write-Host ""

# Generate commands for user to run
foreach ($key in $envVars.Keys) {
    $value = $envVars[$key]
    Write-Host "echo '$value' | npx vercel env add $key production preview development" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Or use the automated method below:" -ForegroundColor Yellow
Write-Host ""

# Automated method using echo to pipe value
$count = 0
foreach ($key in $envVars.Keys) {
    $value = $envVars[$key]
    
    Write-Host "Setting: $key" -ForegroundColor Yellow
    
    # Use echo to pipe value to vercel env add
    $value | npx vercel env add $key production preview development
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Success: $key" -ForegroundColor Green
        $count++
    } else {
        Write-Host "Warning: $key may already exist" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Complete! $count environment variables set." -ForegroundColor Green
Write-Host "Note: Existing variables are not updated." -ForegroundColor Cyan

