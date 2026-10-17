@echo off
cd /d "%~dp0"
where git >nul 2>&1
if errorlevel 1 (
  echo No git on this PC.
  echo Re-download the zip from GitHub and overwrite rules.js in this folder.
  echo https://github.com/free-warehouse/error-translator
  pause
  exit /b 1
)

git checkout HEAD -- rules.js
if errorlevel 1 (
  echo Failed to restore rules.js from git.
  echo Re-download the zip and overwrite rules.js:
  echo https://github.com/free-warehouse/error-translator
  pause
  exit /b 1
)

echo rules.js restored to the clean version in this repo.
echo If the page still shows local trial rules, open Dev and click Clear local trial.
pause
