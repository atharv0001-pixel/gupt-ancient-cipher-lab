@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -Command "$nodes = @((Get-Command node.exe -All -ErrorAction SilentlyContinue).Source); $pkg = Get-AppxPackage -Name 'OpenAI.CodexPrimaryRuntime*' -ErrorAction SilentlyContinue | Sort-Object Version -Descending | Select-Object -First 1; if ($pkg) { $nodes += Join-Path $pkg.InstallLocation 'dependencies/node/bin/node.exe' }; foreach ($candidate in $nodes) { if ($candidate -and (Test-Path -LiteralPath $candidate)) { $ver = [version]((& $candidate -p 'process.versions.node').Trim()); if (($ver.Major -eq 20 -and $ver.Minor -ge 19) -or ($ver.Major -eq 22 -and $ver.Minor -ge 12) -or $ver.Major -gt 22) { & $candidate 'node_modules/vite/bin/vite.js' --host 127.0.0.1 --open; exit $LASTEXITCODE } } }; Write-Host 'Install Node.js 24 LTS, then reopen this launcher.'; exit 1"
if errorlevel 1 pause
