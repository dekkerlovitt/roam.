@echo off
echo Starting roam. local server at http://localhost:3000
echo Press Ctrl+C to stop.
powershell.exe -ExecutionPolicy Bypass -NonInteractive -File "%~dp0serve.ps1"
pause
