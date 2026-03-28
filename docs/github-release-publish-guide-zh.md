# GitHub Release 发布操作文档

## 1. Release 标题

可直接复制：

```text
v0.1.0
```

## 2. Release 正文

可直接复制到 GitHub Release 的正文输入框：

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

- MSI: `8de0d6587c2d2c97a83334c0e878b30a354db9fa4a26f1194ea9f5027179ed17`
- NSIS: `380cfad2055d1d09cbc6cdd5b7c67762f078a7353e74b076fd899ee5937e0e50`

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

## 3. 附件清单

发布时上传以下两个文件：

- `D:\VibeCoding_project\TodoList\src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- `D:\VibeCoding_project\TodoList\src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`

## 4. 创建 Git Tag

在项目根目录执行：

```bash
git tag v0.1.0
```

查看 tag 是否创建成功：

```bash
git tag
```

如果输出里能看到 `v0.1.0`，说明本地 tag 已创建成功。

## 5. 推送 Tag 到 GitHub

执行：

```bash
git push origin v0.1.0
```

如果你想把所有本地 tag 一次性推送，也可以执行：

```bash
git push --tags
```

但当前更建议只推送这一个版本 tag：

```bash
git push origin v0.1.0
```

## 6. 在 GitHub 上发布 Release

### 方式一：从 Releases 页面创建

1. 打开你的仓库：
   `https://github.com/Blake-YH/TodoList`
2. 点击右侧或顶部的 `Releases`
3. 点击 `Draft a new release`
4. 在 `Choose a tag` 中选择：
   `v0.1.0`
5. `Release title` 填：
   `v0.1.0`
6. 把本文件中“Release 正文”整段复制进去
7. 上传两个安装包附件
8. 确认不是 `Set as a pre-release`
9. 点击 `Publish release`

### 方式二：直接通过标签页创建

1. 打开仓库主页
2. 点击 `Tags`
3. 找到 `v0.1.0`
4. 点击 `Create release`
5. 然后重复上面的标题、正文、附件上传步骤

## 7. 建议的 GitHub Release 设置

- Tag：`v0.1.0`
- Release title：`v0.1.0`
- Target：`main`
- Latest release：开启
- Pre-release：关闭

## 8. 发布前最后确认

在点击 `Publish release` 之前，建议你确认：

- 当前代码已经推送到 GitHub
- `v0.1.0` tag 已经推送到 GitHub
- 两个安装包附件都已上传
- Release 正文已经粘贴完整
- SHA256 已保留在正文里

## 9. 最短操作路径

如果你只想最快发布，按下面做：

1. 在本地执行：

```bash
git tag v0.1.0
git push origin v0.1.0
```

2. 打开：

```text
https://github.com/Blake-YH/TodoList/releases/new
```

3. 选择 `v0.1.0`
4. 标题填 `v0.1.0`
5. 粘贴正文
6. 上传两个安装包
7. 点击 `Publish release`
