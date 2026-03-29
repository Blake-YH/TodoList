# Development Plan

## 中文说明

本文档用于记录 TodoList 当前的开发计划、当前所处阶段、已完成内容与下一步动作。

## 1. Current Stage

Current stage: `MVP polish and release preparation`  
当前阶段：`MVP 打磨与发布准备`

### Current Step | 当前所处步骤

The project is currently in:

- UI polish and consistency fixes
- release asset refresh
- final packaged-app verification

项目当前处于：

- 界面细节打磨与一致性修正
- 发布安装包更新
- 最终安装版验收验证

## 2. Completed

- Built desktop app with Tauri 2 + React + TypeScript
- Implemented local SQLite persistence
- Implemented todo create / edit / complete / reopen / delete
- Implemented category create / filter / count / delete
- Implemented Today / All / Upcoming / Overdue / Completed views
- Implemented English / Simplified Chinese switching
- Implemented dark / light theme switching with local persistence
- Refreshed desktop UI and fixed dropdown theme mismatch issues
- Built Windows MSI and NSIS installers

## 3. In Progress

- Final review of packaged app behavior
- Final synchronization between GitHub Release assets and local installers
- Release-page wording and asset confirmation

## 4. Next Steps

1. Install the latest packaged build locally.
2. Verify theme switching, language switching, and dropdown readability in the installed app.
3. Replace GitHub Release assets with the newest installers if needed.
4. Perform final manual acceptance before public distribution.

## 5. Short Milestone Roadmap

### Milestone A | MVP Available

- Core todo workflow available
- Local persistence available
- Windows installer build available

### Milestone B | MVP Polish

- UI consistency improvements
- Language switching
- Theme switching
- Better visual hierarchy and readability

### Milestone C | Release Closure

- Final packaged build verification
- GitHub Release asset update
- User-facing screenshots and release notes cleanup

## 6. Current Risks

- Packaged build and GitHub Release attachments can drift if installers are rebuilt but not re-uploaded.
- Windows terminal encoding differences can make old Chinese text look broken in terminal output.
- Final GUI validation still depends on manual installation and clicking through the packaged app.
