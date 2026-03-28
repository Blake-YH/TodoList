# Release Guide / 发布指南

## Current Target / 当前目标

- Platform / 平台: Windows
- App shell / 桌面壳: Tauri 2
- Frontend / 前端: Vite + React + TypeScript
- Local storage / 本地存储: SQLite

## Build Prerequisites / 构建前提

Use the Visual Studio developer environment before packaging.  
打包前请先进入 Visual Studio 开发者环境。

```cmd
scripts\vs-dev-shell.cmd
```

Or run build commands through the Visual Studio developer command.  
或者直接通过 Visual Studio 开发者命令环境执行构建命令。

```cmd
"C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64
```

## Validation Steps / 构建前验证

Run these before packaging.  
正式打包前先执行以下验证命令。

```cmd
npm.cmd run lint
npm.cmd run build
```

Then validate Rust and Tauri compilation.  
然后验证 Rust 与 Tauri 编译链是否正常。

```cmd
cargo check --manifest-path src-tauri\Cargo.toml
```

## Package Command / 打包命令

Build the Windows installer and application bundle with:  
使用以下命令构建 Windows 安装包与应用产物：

```cmd
cargo tauri build
```

## Expected Output / 预期输出

Tauri build artifacts should be generated under:  
Tauri 打包产物应生成在以下目录：

```text
src-tauri\target\release\bundle\
```

Typical Windows outputs may include:  
典型 Windows 产物通常包括：

- MSI installer / MSI 安装包
- NSIS installer / NSIS 安装包
- Executable bundle artifacts / 可执行文件与相关 bundle 产物

## Latest Verified Result / 最近一次验证结果

Verification date / 验证日期: 2026-03-28

Verified successful outputs / 已验证成功的产物：

- `src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- `src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`

Build result / 构建结果：

- `cargo tauri build` completed successfully
- `cargo tauri build` 已成功完成
- Frontend production build completed successfully as part of the package flow
- 前端生产构建已在打包流程中成功完成
- Windows MSI and NSIS installer generation both completed successfully
- Windows 的 MSI 与 NSIS 安装包均已成功生成
- Branded icon assets were regenerated and re-verified through the package build
- 品牌图标资源已经重生成，并通过打包流程完成再次验证

## Release Checklist / 发布检查清单

- Confirm `npm.cmd run lint` passes
- 确认 `npm.cmd run lint` 通过
- Confirm `npm.cmd run build` passes
- 确认 `npm.cmd run build` 通过
- Confirm `cargo check --manifest-path src-tauri\Cargo.toml` passes
- 确认 `cargo check --manifest-path src-tauri\Cargo.toml` 通过
- Confirm `cargo tauri build` completes
- 确认 `cargo tauri build` 成功完成
- Verify installer launches successfully on Windows
- 验证安装包可在 Windows 上正常启动
- Verify local SQLite data is created in the app data directory
- 验证本地 SQLite 数据文件可在应用数据目录中正确创建
- Verify add/edit/complete/delete flows still work in the packaged app
- 验证打包后的应用仍可完成新增、编辑、完成、删除等核心流程

## Manual Acceptance Note / 手工验收说明

The packaging pipeline has been verified in this environment, but GUI installer execution and post-install clicking flows still require manual local validation.

当前环境已经完成打包链路验证，但图形化安装过程与安装后的手工点击验收仍需要在本机手动完成。
