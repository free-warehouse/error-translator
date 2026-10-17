$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$iconPath = Join-Path $here "icon.ico"
$script:appTitle = "报错翻译器"
if (-not (Test-Path -LiteralPath $iconPath)) { exit 0 }

Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public static class AppIcon {
  public delegate bool EnumProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc lpEnumFunc, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll", CharSet = CharSet.Unicode)] public static extern int GetWindowText(IntPtr hWnd, StringBuilder text, int count);
  [DllImport("user32.dll", CharSet = CharSet.Unicode)] public static extern IntPtr LoadImage(IntPtr instance, string name, uint type, int width, int height, uint load);
  [DllImport("user32.dll")] public static extern IntPtr SendMessage(IntPtr hWnd, uint msg, IntPtr wParam, IntPtr lParam);
}
"@

$big = [AppIcon]::LoadImage([IntPtr]::Zero, $iconPath, 1, 256, 256, 0x10)
$small = [AppIcon]::LoadImage([IntPtr]::Zero, $iconPath, 1, 32, 32, 0x10)
if ($big -eq [IntPtr]::Zero) { exit 0 }

$deadline = (Get-Date).AddSeconds(8)
do {
  $script:handles = New-Object System.Collections.Generic.List[IntPtr]
  $callback = [AppIcon+EnumProc] {
    param($hwnd, $param)
    if (-not [AppIcon]::IsWindowVisible($hwnd)) { return $true }
    $buffer = New-Object System.Text.StringBuilder 256
    [void][AppIcon]::GetWindowText($hwnd, $buffer, $buffer.Capacity)
    if ($buffer.ToString() -eq $script:appTitle) { $script:handles.Add($hwnd) }
    return $true
  }
  [void][AppIcon]::EnumWindows($callback, [IntPtr]::Zero)
  if ($script:handles.Count -gt 0) {
    foreach ($hwnd in $script:handles) {
      [void][AppIcon]::SendMessage($hwnd, 0x80, [IntPtr]1, $big)
      if ($small -ne [IntPtr]::Zero) {
        [void][AppIcon]::SendMessage($hwnd, 0x80, [IntPtr]0, $small)
      }
    }
    exit 0
  }
  Start-Sleep -Milliseconds 200
} while ((Get-Date) -lt $deadline)
