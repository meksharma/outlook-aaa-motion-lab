@echo off
REM Auto-deployment script for Motion Phrasebook (Windows)
REM This script commits and pushes changes to trigger GitHub Pages deployment

echo.
echo 🚀 Auto-deploying Motion Phrasebook changes...
echo.

REM Change to project directory
cd /d "%~dp0"

REM Check if there are changes to commit
git diff --quiet
if %errorlevel% equ 0 (
    git diff --staged --quiet
    if %errorlevel% equ 0 (
        echo ✅ No changes to deploy
        exit /b 0
    )
)

REM Add all changes (excluding gitignored files)
echo 📁 Adding changes...
git add -A

REM Get current timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

REM Commit with timestamp
echo 💾 Committing changes...
git commit -m "Auto-deploy: Updates from Claude Code session at %timestamp%" -m "" -m "- Liquid Glass design system updates" -m "- Documentation improvements" -m "- Motion pattern enhancements" -m "" -m "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

REM Push to main branch (triggers GitHub Pages deployment)
echo 🌐 Pushing to GitHub...
git push origin main

echo.
echo ✅ Deployment complete! Site will be updated at:
echo    https://potential-carnival-o7eemy3.pages.github.io/
echo ⏱️  GitHub Pages typically updates within 2-5 minutes
echo.