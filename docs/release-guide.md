# Release Guide

## Current Target

- Platform: Windows
- App shell: Tauri 2
- Frontend: Vite + React + TypeScript
- Local storage: SQLite

## Build Prerequisites

Use the Visual Studio developer environment before packaging:

```cmd
scripts\vs-dev-shell.cmd
```

Or run build commands through:

```cmd
"C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64
```

## Validation Steps

Run these before packaging:

```cmd
npm.cmd run lint
npm.cmd run build
```

Then validate Rust and Tauri compilation:

```cmd
cargo check --manifest-path src-tauri\Cargo.toml
```

## Package Command

Build the Windows installer and app bundle with:

```cmd
cargo tauri build
```

## Expected Output

Tauri build artifacts should be generated under:

```text
src-tauri\target\release\bundle\
```

Typical Windows outputs may include:

- MSI installer
- NSIS installer
- Executable bundle artifacts

## Latest Verified Result

Verification date: 2026-03-28

Verified successful outputs:

- `src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- `src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`

Build result:

- `cargo tauri build` completed successfully
- Frontend production build completed successfully as part of the package flow
- Windows MSI and NSIS installer generation both completed successfully

## Release Checklist

- Confirm `npm.cmd run lint` passes
- Confirm `npm.cmd run build` passes
- Confirm `cargo check --manifest-path src-tauri\Cargo.toml` passes
- Confirm `cargo tauri build` completes
- Verify installer launches successfully on Windows
- Verify local SQLite data is created in the app data directory
- Verify add/edit/complete/delete flows still work in the packaged app
