# Git 提交记录

## 中文说明

这份文档用于记录项目的重要 Git 提交与阶段性演进结果。

它的目标是：

- 让项目演进过程在文档层面也可快速回顾
- 记录每一阶段做了什么，而不只依赖 `git log`
- 帮助后续发布、复盘和版本归档

每当有重要里程碑完成时，都应同步补充本文件。

## 仓库信息

- 仓库地址：`https://github.com/Blake-YH/TodoList`
- 默认分支：`main`

## 当前提交历史

### 2026-03-28

#### `0e32ef7`

提交信息：

`chore: initialize project planning and structure`

包含内容：

- 初始化本地 Git 仓库
- 建立 `main` 分支
- 生成项目规划文档 `plan.md`
- 生成项目说明文档 `README.md`
- 生成 MVP 任务拆解文档
- 初始化基础目录结构
- 配置 `.gitignore`

#### `e3cdf69`

提交信息：

`docs: add readiness checklist and git history`

包含内容：

- 新增开发前准备检查文档
- 新增 Git 提交记录文档
- 明确当前环境检查范围与仓库演进记录方式

#### `87fe38e`

提交信息：

`docs: update readiness guide and add local dev scripts`

包含内容：

- 修正文档结论，确认本地环境可用于 Tauri 开发
- 新增本地 VS 开发环境启动脚本
- 新增本地环境快速检查脚本

#### `dedb220`

提交信息：

`docs: add local development environment notes to plan`

包含内容：

- 在 `plan.md` 中同步本机开发环境约束
- 明确 VS 开发者环境和 `npm.cmd` 使用要求

#### `b04bbc1`

提交信息：

`feat: scaffold tauri react desktop app`

包含内容：

- 初始化 `Tauri + Vite + React + TypeScript` 工程
- 建立前端入口、基础 UI 和 Tauri 配置
- 完成工程级构建、Lint 和 Rust 编译验证

#### `待提交`

计划提交信息：

`feat: add local sqlite todo data flow`

包含内容：

- 接入 SQLite 本地数据库
- 实现 Tauri command 基础 CRUD
- 实现前端 Todo store、service 和基础交互
- 更新 README 与 MVP 文档中的阶段进度

## 说明

后续每次发生实际变更时，都应同步更新本文件，记录以下信息：

- 提交哈希
- 提交信息
- 提交日期
- 本次变更摘要

这样可以让文档层面也保留一份更容易阅读的项目演进记录。
### 2026-03-28 Additional Entries

#### `7837993`

Commit message:

`feat: add local sqlite todo data flow`

Summary:

- Added SQLite-backed local persistence
- Added Tauri command based todo and category data flow
- Added frontend store and service integration

#### `pending`

Planned commit message:

`feat: add todo editing and list filters`

Summary:

- Add todo editing support
- Add category and priority filters
- Update README and MVP progress notes

#### `pending`

Planned commit message:

`feat: add overdue and upcoming todo views`

Summary:

- Add upcoming and overdue filters
- Add due-date status indicators
- Update README and MVP progress notes

#### `pending`

Planned commit message:

`feat: improve category management workflow`

Summary:

- Add category color selection
- Add category list with counts and delete action
- Update README and MVP progress notes

#### `pending`

Planned commit message:

`docs: add packaging validation and release guide`

Summary:

- Add release guide
- Record successful MSI and NSIS package outputs
- Update README and MVP progress notes

#### `pending`

Planned commit message:

`docs: finalize release wrap-up assets`

Summary:

- Make release guide bilingual
- Add manual acceptance checklist
- Add release notes draft
- Add branding guide and refreshed icon source
- Rebuild Windows installers after icon refresh

#### `pending`

Planned commit message:

`feat: add bilingual language switching`

Summary:

- Add English / Simplified Chinese switching
- Persist selected language in local settings
- Update planning and release documents

#### `pending`

Planned commit message:

`docs: prepare v0.1.0 publish assets`

Summary:

- Add release publish checklist
- Add GitHub Release body draft
- Record SHA256 for Windows installers
- Correct v0.1.0 release hashes after rebuilding installers with language switching support
