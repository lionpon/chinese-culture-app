# ============================================================
# Chinese Culture Studio — PayPal 沙盒支付测试一键启动
# 前提: 代理已开(7890), 沙盒商户/买家账户已在 developer.paypal.com 就绪
# 用法: 右键 "使用 PowerShell 运行" 或 powershell -ExecutionPolicy Bypass -File sandbox-test.ps1
# ============================================================
$ErrorActionPreference = "Continue"
$cpolar = "D:\PsTool\cpolar\extracted\cpolar\cpolar.exe"
$project = "D:\chinese culture\project2"
$proxy = "http://127.0.0.1:7890"
$businessEmail = "sb-h7ohb52047717@business.example.com"

Write-Host "==> [1/4] 停止旧的 dev server (端口 3000)..." -ForegroundColor Cyan
$conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($conn) { $conn | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } }
Start-Sleep -Seconds 2

Write-Host "==> [2/4] 启动 cpolar 隧道..." -ForegroundColor Cyan
if (-not (Get-Process cpolar -ErrorAction SilentlyContinue)) {
    Start-Process $cpolar -ArgumentList "http","3000","--log","D:\PsTool\cpolar\tunnel.log" -WindowStyle Hidden
}
Start-Sleep -Seconds 8

$newestLog = Get-ChildItem "D:\PsTool\cpolar\tunnel.log*" -File | Sort-Object LastWriteTime -Descending | Select-Object -First 1
$tunnelUrl = $null
foreach ($f in (Get-ChildItem "D:\PsTool\cpolar\tunnel.log*" -File | Sort-Object LastWriteTime -Descending | Select-Object -First 3)) {
    $m = Select-String -Path $f.FullName -Pattern "Tunnel established at (https://[^\s]+)" -ErrorAction SilentlyContinue | Select-Object -Last 1
    if ($m) { $tunnelUrl = $m.Matches[0].Groups[1].Value; break }
}
if (-not $tunnelUrl) { Write-Host "!! 未找到隧道 URL，请检查 cpolar" -ForegroundColor Red; exit 1 }
Write-Host "    隧道: $tunnelUrl" -ForegroundColor Green

Write-Host "==> [3/4] 启动沙盒模式 dev server..." -ForegroundColor Cyan
$env:PAYPAL_SANDBOX = "true"
$env:NEXT_PUBLIC_APP_URL = $tunnelUrl
$env:PAYPAL_EMAIL = $businessEmail
$env:OUTBOUND_PROXY_ENABLED = "1"
$env:HTTPS_PROXY = $proxy
$env:HTTP_PROXY = $proxy
Start-Process -FilePath "npm.cmd" -ArgumentList "run","dev" -WorkingDirectory $project -WindowStyle Hidden
Start-Sleep -Seconds 12

Write-Host "==> [4/4] 完成! 浏览器打开下面的链接开始测试:" -ForegroundColor Cyan
Write-Host ""
Write-Host "    测试地址: $tunnelUrl/divination" -ForegroundColor Green
Write-Host "    或本机:   http://localhost:3000/divination" -ForegroundColor Green
Write-Host ""
Write-Host "  支付时用沙盒买家账户登录 sandbox.paypal.com 完成付款" -ForegroundColor Yellow
Write-Host "  付款后应自动跳回结果页显示完整卦象" -ForegroundColor Yellow
