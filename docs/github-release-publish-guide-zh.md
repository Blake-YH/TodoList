# GitHub Release 发布操作文档

## 中文说明

这份文档用于指导 `v0.1.0` 的 GitHub Release 发布与修正。
当前需要特别注意的是：GitHub 上已经上传过一次旧安装包，而那一版不包含“中英文切换”功能，因此必须先替换旧附件，再更新 Release 正文中的 SHA256。

## 1. Release 标题

直接填写：

```text
v0.1.0
```

## 2. Release 正文

可直接复制到 GitHub Release 正文输入框：

```md
## TodoList v0.1.0

TodoList 的首个 MVP 版本现已可用。
This is the first MVP release of TodoList for Windows.

### Included In This Version

- Local-first desktop todo workflow
- SQLite local persistence
- Todo create / edit / complete / reopen / delete
- Category create / filter / count / delete
- Today / All / Upcoming / Overdue / Completed views
- English / Simplified Chinese language switching
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

- MSI: `6af4ba8db2c315393a702f82caebfbe4f331c2a6f32317cacd315bb1bac02fbe`
- NSIS: `80c3f9cd84bf7ea8abfa5b339f25e56622147aff789a1e73eda8d5caa19735e8`

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

## 3. 正确附件清单

本次发布必须上传以下重新打包后的文件：

- `D:\VibeCoding_project\TodoList\src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- `D:\VibeCoding_project\TodoList\src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`

## 4. 旧附件修正说明

如果你之前已经在 GitHub 的 `v0.1.0` Release 中上传过安装包，需要先删除旧附件，再重新上传上面的两个新文件。

原因：

- 旧附件打包时间早于语言切换功能合入
- 旧附件安装后看不到 Language 相关切换入口
- 当前正确附件已经包含中英文切换能力

## 5. 在 GitHub 页面手工修正 Release

按下面步骤操作：

1. 打开 `https://github.com/Blake-YH/TodoList/releases/tag/v0.1.0`
2. 点击 `Edit`
3. 在 `Assets` 区域删除旧的 MSI 和 EXE 附件
4. 上传以下两个新文件
   - `D:\VibeCoding_project\TodoList\src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
   - `D:\VibeCoding_project\TodoList\src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`
5. 将 Release 正文中的 SHA256 更新为本文档第 2 节给出的新值
6. 点击 `Update release`

## 6. 如果要重新创建 Release

也可以删除原有附件后直接编辑，不一定要新建 Release。
如果你想重新走一次发布流程，可按下面步骤执行：

1. 打开仓库：`https://github.com/Blake-YH/TodoList`
2. 点击 `Releases`
3. 选择已有的 `v0.1.0`，或者点击创建新 Release
4. `Choose a tag` 选择 `v0.1.0`
5. `Release title` 填写 `v0.1.0`
6. 粘贴本文档第 2 节的正文
7. 上传两个正确的安装包
8. 确认不是 `Set as a pre-release`
9. 点击 `Publish release` 或 `Update release`

## 7. 最后确认

在最终发布前，确认以下事项：

- 当前 `main` 分支代码已经推送到 GitHub
- `v0.1.0` tag 已存在并已推送
- Release 附件已替换为新安装包
- Release 正文中的 SHA256 已更新为新值
- 重新下载并安装后，可以看到中英文切换功能
