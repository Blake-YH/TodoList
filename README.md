# TodoList

一个面向个人用户的本地优先、轻量化 PC Todo 桌面软件项目。

当前阶段以产品规划和工程初始化为主，目标是先完成一个可稳定使用的 MVP，再逐步扩展通知、托盘、自启动和自动更新等桌面能力。

## 项目目标

- 快速记录待办
- 快速查看今天和未完成事项
- 快速完成、编辑、删除待办
- 本地持久化保存，离线可用
- 保持足够轻量，不走复杂协作和云平台路线

## 推荐技术栈

基于当前规划，项目采用以下方案：

- 桌面容器：Tauri
- 前端：React
- 语言：TypeScript
- 构建工具：Vite
- 本地存储：SQLite
- 状态管理：Zustand
- 表单与校验：React Hook Form + Zod

选择这套方案的原因很明确：

- 比 Electron 更轻，符合“轻量化 PC 软件”的定位
- 比原生桌面方案更容易快速落地
- 比 JSON 文件存储更利于后续扩展
- 工程复杂度控制在个人项目可维护范围内

## 当前文档

- [plan.md](/D:/VibeCoding_project/TodoList/plan.md)：产品定位、技术选型、架构方案
- [docs/mvp-task-breakdown.md](/D:/VibeCoding_project/TodoList/docs/mvp-task-breakdown.md)：MVP 任务拆解与里程碑

## 目录结构

当前仓库已完成基础目录初始化：

```text
TodoList/
├─ docs/
├─ public/
├─ scripts/
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ features/
│  │  └─ todos/
│  ├─ hooks/
│  ├─ layouts/
│  ├─ pages/
│  ├─ services/
│  ├─ store/
│  ├─ styles/
│  ├─ types/
│  └─ utils/
├─ src-tauri/
│  ├─ icons/
│  ├─ migrations/
│  └─ src/
└─ tests/
```

## 目录职责

- `docs/`：产品、方案、任务拆解等文档
- `public/`：前端静态资源
- `src/`：React 前端代码
- `src/features/todos/`：Todo 核心业务模块
- `src/services/`：前端服务层，负责调用 Tauri command
- `src/store/`：全局状态管理
- `src/types/`：数据类型定义
- `src-tauri/`：Tauri 桌面端与 Rust 侧代码
- `src-tauri/migrations/`：SQLite 数据迁移脚本
- `tests/`：测试目录
- `scripts/`：本地开发脚本

## 推荐开发顺序

1. 初始化 Tauri + React + TypeScript 工程
2. 完成 SQLite 数据库接入
3. 实现 Todo 的增删改查
4. 完成筛选、分类、截止日期和完成状态切换
5. 补充通知、托盘、导入导出等增强能力

## 当前状态

当前仓库已完成：

- 技术选型规划
- README 编写
- MVP 任务拆解文档
- 基础目录结构初始化
- Tauri + Vite + React + TypeScript 脚手架初始化
- SQLite 本地数据库接入
- Tauri command 基础数据读写能力
- 前端 Todo store、service 和基础 CRUD 页面骨架

尚未完成：

- Todo 编辑能力
- 更完整的筛选和分类管理
- 数据导入导出、通知、托盘、自启动
- Windows 安装包验证

## 下一步

下一阶段建议直接开始：

1. 实现 Todo 编辑与更完整的筛选
2. 完善分类管理和错误处理
3. 开始准备 MVP 打包链路
