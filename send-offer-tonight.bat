@echo off
cd /d "D:/chinese culture/project2"
for /f "delims=" %%i in ('node scripts/fetch-render-env.cjs RESEND_API_KEY') do set "RESEND_API_KEY=%%i"
node scripts/send-offer-email.cjs --schedule
echo.
echo Done - press any key to close
pause >nul
