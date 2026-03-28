# TodoList

## 中文介绍

TodoList 是一个面向 Windows 的本地优先、轻量化桌面待办应用。

这个项目的目标很明确：

- 用尽量轻的桌面形态完成日常待办管理
- 支持离线使用和本地 SQLite 持久化
- 保持简单直接的交互，而不是演化成复杂的协作平台

当前项目已经具备的核心能力包括：

- Todo 的新增、编辑、完成、重新打开、删除
- 分类的创建、筛选、计数、删除
- Today / All / Upcoming / Overdue / Completed 视图
- 英文 / 简体中文切换
- Windows 安装包构建能力

当前技术栈：

- Tauri 2
- React
- TypeScript
- Vite
- SQLite
- Zustand
- React Hook Form
- Zod

安装包产物位置：

- `src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- `src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`

常用开发命令：

```bash
npm.cmd run lint
npm.cmd run build
cargo check --manifest-path src-tauri\Cargo.toml
cargo tauri build
```

相关文档：

- [产品规划](D:\VibeCoding_project\TodoList\plan.md)
- [MVP 任务拆解](D:\VibeCoding_project\TodoList\docs\mvp-task-breakdown.md)
- [发布指南](D:\VibeCoding_project\TodoList\docs\release-guide.md)
- [手工验收清单](D:\VibeCoding_project\TodoList\docs\manual-acceptance-checklist.md)
- [GitHub Release 发布说明](D:\VibeCoding_project\TodoList\docs\github-release-publish-guide-zh.md)
- [原 README 归档](D:\VibeCoding_project\TodoList\docs\README-legacy.md)

## English Introduction

TodoList is a local-first, lightweight desktop todo application for Windows.

The project has a focused scope:

- provide a lightweight desktop workflow for daily task management
- support offline usage with local SQLite persistence
- stay simple and practical instead of becoming a heavy collaboration platform

Core features currently implemented:

- create, edit, complete, reopen, and delete todos
- create, filter, count, and delete categories
- Today / All / Upcoming / Overdue / Completed views
- English / Simplified Chinese language switching
- Windows installer packaging support

Current tech stack:

- Tauri 2
- React
- TypeScript
- Vite
- SQLite
- Zustand
- React Hook Form
- Zod

Package outputs:

- `src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- `src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`

Common development commands:

```bash
npm.cmd run lint
npm.cmd run build
cargo check --manifest-path src-tauri\Cargo.toml
cargo tauri build
```

Project documents:

- [Project Plan](D:\VibeCoding_project\TodoList\plan.md)
- [MVP Breakdown](D:\VibeCoding_project\TodoList\docs\mvp-task-breakdown.md)
- [Release Guide](D:\VibeCoding_project\TodoList\docs\release-guide.md)
- [Manual Acceptance Checklist](D:\VibeCoding_project\TodoList\docs\manual-acceptance-checklist.md)
- [GitHub Release Publishing Guide](D:\VibeCoding_project\TodoList\docs\github-release-publish-guide-zh.md)
- [Archived Previous README](D:\VibeCoding_project\TodoList\docs\README-legacy.md)
