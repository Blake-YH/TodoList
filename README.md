# TodoList

Local-first lightweight desktop todo app for Windows.  
面向 Windows 的本地优先、轻量化桌面待办应用。

## Overview | 项目简介

**English**

TodoList is a desktop todo application focused on simple, fast, and practical daily task management.

Current product direction:

- lightweight desktop experience
- offline-first local usage
- SQLite local persistence
- bilingual interface
- dark / light theme switching

**中文**

TodoList 是一个专注于简单、快速、实用的桌面待办应用。

当前产品方向：

- 轻量化桌面体验
- 离线优先、本地使用
- 基于 SQLite 的本地持久化
- 中英文双语界面
- 深色 / 浅色主题切换

## Current Features | 当前功能

- Todo create / edit / complete / reopen / delete
- Category create / filter / count / delete
- Today / All / Upcoming / Overdue / Completed views
- English / Simplified Chinese language switching
- Dark / Light theme switching
- Local SQLite persistence
- Windows installer packaging

## Quick Start | 快速开始

```bash
npm.cmd install
npm.cmd run build
```

For Rust / Tauri commands on Windows:

```cmd
scripts\vs-dev-shell.cmd
cargo check --manifest-path src-tauri\Cargo.toml
cargo tauri build
```

## Core Documents | 核心文档

- [Development Plan](docs/development-plan.md)
- [Tech Stack](docs/tech-stack.md)
- [Requirements](docs/requirements.md)
- [User Guide](docs/user-guide.md)

## Status | 当前状态

The project is in MVP polish and release-preparation stage.  
项目当前处于 MVP 打磨与发布准备阶段。
