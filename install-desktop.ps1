$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktop = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "报错翻译器.lnk"
$vbs = Join-Path $here "start.vbs"
$icon = Join-Path $here "icon.ico"
$wscript = Join-Path $env:SystemRoot "System32\wscript.exe"

if (-not (Test-Path -LiteralPath $vbs)) {
  throw "找不到启动文件。"
}

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $wscript
$shortcut.Arguments = "//nologo `"$vbs`""
$shortcut.WorkingDirectory = $here
$shortcut.WindowStyle = 7
$shortcut.Description = "报错翻译器"
if (Test-Path -LiteralPath $icon) {
  $shortcut.IconLocation = "$icon,0"
}
$shortcut.Save()

Start-Process -FilePath $wscript -ArgumentList "//nologo `"$vbs`""
