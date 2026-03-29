# GitHub Release v0.1.0

## 中文说明

这份文档是可以直接粘贴到 GitHub Release 的发布文案草稿。

建议：

- 标题使用 `v0.1.0`
- 正文直接使用下面内容
- 上传 MSI 和 NSIS 两个安装包

## Release Body

```md
## TodoList v0.1.0

TodoList 的首个 MVP 版本已经可用。

This is the first MVP release of TodoList for Windows.

### Included In This Version

- Local-first desktop todo workflow
- SQLite local persistence
- Todo create / edit / complete / reopen / delete
- Category create / filter / count / delete
- Today / All / Upcoming / Overdue / Completed views
- English / Simplified Chinese language switching
- Dark / Light theme switching
- Windows MSI and NSIS installers

### 本版本已包含

- 本地优先的桌面待办管理流程
- SQLite 本地持久化
- Todo 的新增、编辑、完成、重新打开、删除
- 分类的创建、筛选、计数、删除
- 今天、全部、即将到期、已逾期、已完成视图
- 英文 / 简体中文切换
- Windows MSI 和 NSIS 安装包

### Installer Files

- `TodoList_0.1.0_x64_en-US.msi`
- `TodoList_0.1.0_x64-setup.exe`

### SHA256

- MSI: `c84a6297c13e6362935f3e262b4a49b5e1aea7e76a9e843b2ebdb4b02ee091fc`
- NSIS: `2c85ebe7d0b454387dc4939772a5972d5dafe9668957212260483b17ee45a8c2`

### Known Limitations

- No cloud sync
- No notification system yet
- No tray integration yet
- No data import/export yet

### 当前已知限制

- 暂不支持云同步
- 暂未加入通知系统
- 暂未加入系统托盘
- 暂未加入数据导入导出
```

## Release Asset Correction

- Replace any previously uploaded `v0.1.0` assets with the rebuilt installers generated after commit `ed69f9b`
- Correct MSI: `D:\VibeCoding_project\TodoList\src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- Correct NSIS: `D:\VibeCoding_project\TodoList\src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`
- This rebuild includes language switching, theme switching, and refreshed desktop UI styling
