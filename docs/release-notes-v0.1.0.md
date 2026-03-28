# Release Notes v0.1.0

## 中文说明

这份文档是 `v0.1.0` 版本的发布说明草稿。

它主要用于汇总：

- 这个版本交付了哪些核心能力
- 当前技术栈是什么
- 打包产物是什么
- 还存在哪些已知限制
- 下一步建议怎么推进

这份文档后续可以直接整理成 GitHub Release 文案或对外发布说明。

## Summary

`v0.1.0` is the first MVP milestone for TodoList on Windows.

It delivers a local-first desktop todo application with:

- SQLite local persistence
- Todo create, edit, complete, reopen, and delete flows
- Category creation, filtering, counting, and deletion
- Today, All, Upcoming, Overdue, and Completed views
- Windows installer packaging through Tauri

## Major Features

- Local desktop todo management
- Date-aware task views
- Priority and category filtering
- Local category management
- Windows MSI and NSIS installer generation

## Technical Stack

- Tauri 2
- React
- TypeScript
- Vite
- SQLite
- Zustand
- React Hook Form
- Zod

## Packaging Outputs

- `TodoList_0.1.0_x64_en-US.msi`
- `TodoList_0.1.0_x64-setup.exe`

## Known Limitations

- No cloud sync
- No user accounts
- No tray integration yet
- No notifications yet
- No import/export flow yet

## Recommended Next Steps

- Run full manual installation acceptance
- Finalize refined icon set for future releases
- Prepare a public-facing changelog and screenshots
