Option Explicit

Dim fso, shell, here, html, browser, commandText, profile
Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")
here = fso.GetParentFolderName(WScript.ScriptFullName)
html = here & "\index.html"
browser = FindBrowser()

If browser = "" Then
  shell.Run "explorer.exe """ & html & """", 1, False
Else
  profile = shell.ExpandEnvironmentStrings("%LOCALAPPDATA%\error-translator\edge")
  commandText = """" & browser & """ --app=""" & FileUri(html) & """ --window-size=920,590 --user-data-dir=""" & profile & """"
  shell.Run commandText, 1, False
End If
shell.Run "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & here & "\set-window-icon.ps1""", 0, False

Function FindBrowser()
  Dim candidates, path
  candidates = Array( _
    shell.ExpandEnvironmentStrings("%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"), _
    shell.ExpandEnvironmentStrings("%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"), _
    shell.ExpandEnvironmentStrings("%LocalAppData%\Google\Chrome\Application\chrome.exe"), _
    shell.ExpandEnvironmentStrings("%ProgramFiles%\Google\Chrome\Application\chrome.exe"), _
    shell.ExpandEnvironmentStrings("%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"))
  For Each path In candidates
    If fso.FileExists(path) Then
      FindBrowser = path
      Exit Function
    End If
  Next
  FindBrowser = ""
End Function

Function FileUri(path)
  Dim index, char, code, value
  FileUri = "file:///"
  For index = 1 To Len(path)
    char = Mid(path, index, 1)
    If char = "\" Then
      FileUri = FileUri & "/"
    Else
      code = AscW(char)
      If code < 0 Then code = code + 65536
      If IsUnreserved(code) Then
        FileUri = FileUri & char
      Else
        For Each value In Utf8Bytes(code)
          FileUri = FileUri & "%" & Right("0" & Hex(value), 2)
        Next
      End If
    End If
  Next
End Function

Function IsUnreserved(code)
  IsUnreserved = (code >= 48 And code <= 57) Or (code >= 65 And code <= 90) Or (code >= 97 And code <= 122)
  If code = 45 Or code = 46 Or code = 58 Or code = 95 Then IsUnreserved = True
End Function

Function Utf8Bytes(code)
  If code < 128 Then
    Utf8Bytes = Array(code)
  ElseIf code < 2048 Then
    Utf8Bytes = Array(192 + Int(code / 64), 128 + (code Mod 64))
  Else
    Utf8Bytes = Array(224 + Int(code / 4096), 128 + ((Int(code / 64)) Mod 64), 128 + (code Mod 64))
  End If
End Function
