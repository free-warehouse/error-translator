@echo off
chcp 65001 >nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0安装到桌面.ps1"
if errorlevel 1 (
  echo 没能放到桌面。可以先双击「打开.bat」。
  pause
  exit /b 1
)
echo.
echo 桌面已经放好「报错翻译器」。
echo 以后点桌面上的图标就行。这个文件夹不要删。
echo.
pause
