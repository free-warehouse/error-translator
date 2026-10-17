@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-desktop.ps1"
if errorlevel 1 (
  echo Install failed. You can double-click the open bat in this folder instead.
  pause
  exit /b 1
)
echo.
echo Desktop shortcut is ready. The app window should open.
echo Keep this folder. Do not delete it.
echo.
pause
