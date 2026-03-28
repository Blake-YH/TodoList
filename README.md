# TodoList

Local-first lightweight desktop todo app for Windows.  
面向 Windows 的本地优先、轻量化桌面待办应用。

---

## Overview | 项目简介

**English**

TodoList is a desktop todo application built for simple, fast, and practical daily task management.

It is designed to:

- stay lightweight
- work offline
- persist data locally with SQLite
- avoid turning into a heavy collaboration platform

**中文**

TodoList 是一个专注于日常任务管理的桌面待办应用，目标是做到简单、快速、实用。

它的设计方向是：

- 保持轻量
- 支持离线使用
- 基于 SQLite 做本地持久化
- 不演化成复杂的协作平台

---

## Screenshot Placeholder | 项目截图占位

Current repository status: screenshot asset not added yet.  
当前仓库状态：项目截图尚未加入。

Recommended future screenshots:

- main todo dashboard
- category management panel
- language switch state
- packaged Windows installer result

建议后续补充的截图：

- 主待办面板
- 分类管理区域
- 中英文切换效果
- Windows 安装包与安装完成界面

Brand asset preview:

![TodoList Brand Mark](public/brand-mark.svg)

---

## Quick Start | 快速开始

### Run In Development | 本地开发启动

```bash
npm.cmd install
npm.cmd run lint
npm.cmd run build
```

For Rust / Tauri commands on Windows, use the Visual Studio developer environment first:

```cmd
scripts\vs-dev-shell.cmd
```

Windows 下执行 Rust / Tauri 相关命令前，建议先进入 Visual Studio 开发环境：

```cmd
scripts\vs-dev-shell.cmd
```

### Validate Desktop Build | 验证桌面构建

```bash
cargo check --manifest-path src-tauri\Cargo.toml
```

### Build Windows Installers | 构建 Windows 安装包

```bash
cargo tauri build
```

Current package outputs:

- `src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- `src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`

---

## Features | 当前功能

- Todo create / edit / complete / reopen / delete
- Category create / filter / count / delete
- Today / All / Upcoming / Overdue / Completed views
- English / Simplified Chinese language switching
- Local SQLite persistence
- Windows installer packaging

- Todo 的新增 / 编辑 / 完成 / 重新打开 / 删除
- 分类的创建 / 筛选 / 计数 / 删除
- 今天 / 全部 / 即将到期 / 已逾期 / 已完成视图
- 英文 / 简体中文切换
- SQLite 本地持久化
- Windows 安装包构建

---

## Tech Stack | 技术栈

- Tauri 2
- React
- TypeScript
- Vite
- SQLite
- Zustand
- React Hook Form
- Zod

---

## Project Documents | 项目文档

- [Project Plan](plan.md)
- [MVP Breakdown](docs/mvp-task-breakdown.md)
- [Release Guide](docs/release-guide.md)
- [Manual Acceptance Checklist](docs/manual-acceptance-checklist.md)
- [Release Notes v0.1.0](docs/release-notes-v0.1.0.md)
- [GitHub Release Publish Guide](docs/github-release-publish-guide-zh.md)
- [Branding Guide](docs/branding-guide.md)
- [Archived Previous README](docs/README-legacy.md)

---

## Status | 当前状态

**English**

The project has reached MVP release-ready status:

- core local workflow is implemented
- Windows installers are built successfully
- release materials are prepared

**中文**

当前项目已进入 MVP 可发布状态：

- 核心本地待办流程已经完成
- Windows 安装包已经构建成功
- 发布所需文档和材料已经整理完成
