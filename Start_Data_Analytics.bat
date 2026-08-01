@echo off
title Data Analytics Launcher
color 0B
echo =========================================
echo       Starting Data Analytics Platform...
echo =========================================
echo.

set "PROJECT_ROOT=%~dp0"

:: Step 0: Check & clean ONLY port 5175 (Data Analytics port)
echo [0/3] Cleaning up port 5175...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":5175 " ^| findstr "LISTENING"') do (
    echo       Killing stale process on port 5175 (PID: %%a)
    taskkill /f /pid %%a >nul 2>&1
)

:: Step 1: Verify dependencies
echo [1/3] Checking dependencies...
if not exist "%PROJECT_ROOT%node_modules" (
    echo       Installing npm dependencies...
    cd /d "%PROJECT_ROOT%"
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install npm dependencies.
        pause
        exit /b 1
    )
) else (
    echo       Dependencies verified.
)

:: Step 2: Start Vite Dev Server on Port 5175
echo [2/3] Launching Data Analytics UI on port 5175...
cd /d "%PROJECT_ROOT%"
start "Data Analytics UI" cmd /k "npm run dev || pause"

:: Step 3: Open Browser
echo [3/3] Opening browser...
ping -n 4 127.0.0.1 >nul 2>&1
start http://localhost:5175

echo.
echo =========================================
echo   Data Analytics Platform is Running!
echo   URL: http://localhost:5175
echo =========================================
pause
