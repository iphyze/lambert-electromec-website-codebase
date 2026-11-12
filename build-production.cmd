@echo off
setlocal

call npm run build
if errorlevel 1 exit /b %errorlevel%

echo.
echo Lambert Electromec static export is ready in the out folder.
