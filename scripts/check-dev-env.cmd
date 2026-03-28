@echo off
call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64
echo [check] cl.exe
where cl
echo.
echo [check] compiler version
cl
echo.
echo [check] cargo
cargo -V
echo.
echo [check] rustc
rustc -V
echo.
echo [check] tauri cli
cargo tauri -V
