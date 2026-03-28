# 开发前准备检查

## 中文说明

这份文档用于确认当前机器是否已经具备 TodoList 项目的本地开发条件。

重点检查项包括：

- Git 是否可正常工作
- Node.js / npm 是否可用
- Rust / Cargo / Tauri CLI 是否可用
- Windows 下 Tauri 所需的 MSVC 编译环境是否正常

它的作用不是描述产品需求，而是给开发前的环境准备提供一个明确结论。

## 检查时间

- 日期：2026-03-28
- 仓库路径：`D:\VibeCoding_project\TodoList`

## 结论

当前项目的开发前准备已经 **基本完备**，可以进入正式开发。

之前检测不到 `cl.exe`，原因不是缺少 MSVC，而是普通 PowerShell 会话没有自动加载 Visual Studio 开发者环境。

经过复查，已确认：

- Visual Studio 2022 Community 已安装
- MSVC 工具链已安装
- Windows SDK 已安装
- `cl.exe` 可在 `VsDevCmd.bat` 环境中正常调用

因此当前判断为：

**开发准备状态：完备，可开始开发**

---

## 已具备条件

### Git

- 本地仓库已初始化
- 当前分支为 `main`
- 已绑定远程仓库 `origin`
- 已完成首次推送到 GitHub

### Node.js

- `node -v`：`v22.15.1`
- `npm.cmd -v`：`10.9.2`

说明：

- `npm` 在 PowerShell 中被执行策略拦截的是 `npm.ps1`
- 实际可用命令为 `npm.cmd`
- 这不影响项目开发，只需要在当前终端环境中优先使用 `npm.cmd`

### Rust

- `cargo -V`：`cargo 1.94.0`
- `rustc -V`：`rustc 1.94.0`
- `rustup show active-toolchain`：`stable-x86_64-pc-windows-msvc`
- 已安装目标：`x86_64-pc-windows-msvc`

### Tauri CLI

- `cargo tauri -V`：`tauri-cli 2.10.1`

---

## 未满足条件

### 普通 PowerShell 会话默认识别不到 `cl.exe`

检查结果：

- 直接执行 `where.exe cl` 无结果
- 但在 `VsDevCmd.bat -arch=x64` 环境下，`where cl` 和 `cl` 均可正常执行

影响：

- 如果直接在普通 PowerShell 中运行桌面构建命令，可能会误以为本机缺少 C++ 编译环境
- 实际上只需要先进入 VS 开发者命令环境

---

## 使用建议

推荐使用以下任一方式进入开发环境：

1. 使用“x64 Native Tools Command Prompt for VS 2022”
2. 运行仓库脚本 `scripts\vs-dev-shell.cmd`

仓库中已补充辅助脚本：

- `scripts\vs-dev-shell.cmd`
- `scripts\check-dev-env.cmd`

用途：

- 前者用于进入已加载 MSVC 环境的 PowerShell
- 后者用于快速验证 `cl`、`cargo`、`rustc`、`tauri` 是否可用

---

## 是否可以开始开发

### 可以开始的部分

- 文档继续完善
- 前端目录与模块设计
- 数据模型设计
- SQL 迁移脚本设计
- React 侧代码结构搭建

### 需要注意的部分

- 后续运行桌面构建相关命令时，优先在 `VsDevCmd` 环境中执行
- `npm` 在当前 PowerShell 中优先使用 `npm.cmd`

---

## 下一步建议

优先级最高的动作：

1. 初始化 `Tauri + Vite + React + TypeScript`
2. 接入 SQLite 数据层
3. 开始实现 Todo MVP
