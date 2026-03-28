# MVP 任务拆解文档

## 1. MVP 目标

在第一阶段交付一个可本地使用的 Windows Todo 桌面软件，满足以下最低可用标准：

- 用户可以新增、编辑、删除 Todo
- 用户可以查看未完成、已完成、今天到期、逾期任务
- 用户可以为 Todo 设置优先级、截止日期、分类
- 数据本地持久化保存，重启应用后仍然存在
- 软件基本可安装、可运行、可持续迭代

MVP 不包含：

- 云同步
- 账户系统
- 多人协作
- 插件系统
- 复杂统计视图

## 当前进度

截至 2026-03-28，当前实现状态如下：

- `M1 工程初始化`：已完成
- `M2 数据层打底`：已完成首版
- `M3 Todo 核心功能`：已完成新增、完成状态切换、删除
- `M4 列表与筛选`：已完成基础视图切换
- `M5 基础体验优化`：已完成表单校验与基础错误展示
- `M6 打包与发布准备`：未开始

当前缺口：

- Todo 编辑能力
- 更完整的截止日期与逾期视图
- 分类管理增强
- 安装包与发布验证

---

## 2. 里程碑拆解

## M1：工程初始化

目标：把桌面端、前端、基础开发规范搭起来。

任务：

- 初始化 Tauri 工程
- 初始化 Vite + React + TypeScript
- 配置目录结构
- 配置基础脚本
- 配置代码规范：ESLint / Prettier
- 约定环境变量和配置文件
- 确认 Windows 可正常运行开发环境

验收标准：

- 项目可本地启动
- 前端页面可在 Tauri 容器中显示
- 基础命令可以运行

---

## M2：数据层打底

目标：完成本地数据持久化能力。

任务：

- 确定 SQLite 方案
- 设计 `todos`、`categories`、`settings` 表
- 创建数据库初始化逻辑
- 创建迁移机制
- 封装基础 CRUD 接口
- 打通 Tauri command 与数据库调用

验收标准：

- 首次启动可自动初始化数据库
- 可以写入 Todo 数据
- 可以读取 Todo 列表
- 重启应用后数据仍然存在

当前状态：

- 已完成 SQLite 单文件数据库接入
- 已完成 `todos` 与 `categories` 表初始化
- 已完成 Tauri command 与本地数据访问层打通

---

## M3：Todo 核心功能

目标：完成最关键的产品能力。

任务：

- 新增 Todo
- 编辑 Todo
- 删除 Todo
- 标记完成 / 未完成
- 设置优先级
- 设置截止日期
- 设置分类

验收标准：

- 上述操作都能从界面完成
- 数据修改后界面即时刷新
- 所有操作可写入数据库

当前状态：

- 已完成新增 Todo
- 已完成删除 Todo
- 已完成完成 / 未完成切换
- Todo 编辑尚未实现

---

## M4：列表与筛选

目标：让 Todo 真正可管理，而不是只可记录。

任务：

- 全部待办列表
- 未完成列表
- 已完成列表
- 今天到期列表
- 逾期列表
- 分类筛选
- 优先级筛选
- 空状态展示

验收标准：

- 不同视图切换正常
- 筛选结果准确
- 数据量达到数百条时仍可正常使用

当前状态：

- 已完成 Today / All / Completed 三类基础视图
- 逾期视图、优先级筛选、分类筛选尚未实现

---

## M5：基础体验优化

目标：让软件达到“可持续使用”的水平。

任务：

- 表单校验
- 错误提示
- 加载状态
- 删除确认
- 基础键盘操作优化
- 窗口最小尺寸与布局适配
- 基础 UI 样式统一

验收标准：

- 常见错误不导致崩溃
- 主要交互路径清晰
- 桌面窗口在常见分辨率下可用

---

## M6：打包与发布准备

目标：让 MVP 可以作为可安装产品交付。

任务：

- 配置 Tauri 打包
- 生成 Windows 安装包
- 配置应用图标与名称
- 校验安装目录和数据目录
- 编写发布说明

验收标准：

- 能产出可安装包
- 安装后应用可正常运行
- 数据目录策略明确

---

## 3. 详细任务清单

## 3.1 基础工程任务

- 建立仓库目录规范
- 配置 `package.json`
- 配置 `tsconfig.json`
- 配置 Vite
- 配置 ESLint
- 配置 Prettier
- 配置 Tauri `src-tauri`
- 配置基础脚本：开发、构建、检查

交付物：

- 可运行的基础工程
- 统一的代码风格和目录约束

## 3.2 数据模型任务

- 定义 `Todo` TypeScript 类型
- 定义 `Category` 类型
- 定义 `TodoStatus`、`TodoPriority` 枚举
- 设计 SQLite 表结构
- 设计数据库迁移脚本
- 定义前后端数据转换规则

交付物：

- 类型定义文件
- SQL 初始化脚本
- Rust 数据访问封装

## 3.3 前端页面任务

建议 MVP 页面如下：

- `TodayPage`
- `AllTodosPage`
- `CompletedPage`
- `SettingsPage`

每个页面需要覆盖：

- 加载状态
- 空状态
- 错误状态
- 列表渲染
- 筛选区域

交付物：

- 页面骨架
- 导航布局
- 页面路由结构

## 3.4 Todo 组件任务

- `TodoInput`
- `TodoForm`
- `TodoList`
- `TodoListItem`
- `TodoFilters`
- `PriorityBadge`
- `CategoryTag`

交付物：

- 可复用 UI 组件
- Todo 相关交互组件

## 3.5 状态管理任务

- 建立 Todo Store
- 建立分类 Store
- 管理筛选条件
- 管理加载状态
- 管理错误状态

交付物：

- `zustand` store
- 前端业务状态流

## 3.6 服务层任务

- 封装获取 Todo 列表接口
- 封装新增 Todo 接口
- 封装编辑 Todo 接口
- 封装删除 Todo 接口
- 封装切换完成状态接口
- 封装获取分类接口

交付物：

- 统一的前端 service 层
- Tauri command 调用封装

## 3.7 桌面能力任务

MVP 阶段建议只做基础能力：

- 本地数据库访问
- 应用打包

二阶段再加入：

- 托盘
- 系统通知
- 开机自启

交付物：

- Tauri 基础能力层

---

## 4. 优先级排序

## P0：必须完成

- 工程初始化
- SQLite 接入
- Todo CRUD
- 分类
- 截止日期
- 完成状态切换
- 基础筛选
- Windows 打包

## P1：建议完成

- 表单校验
- 删除确认
- 错误处理
- 基础样式统一
- 空状态和加载状态

## P2：可以延后

- 搜索
- 托盘
- 通知
- 自启动
- 导入导出

---

## 5. 建议实施顺序

1. 先把 Tauri 和 React 工程跑起来
2. 再把 SQLite 打通
3. 再做 Todo CRUD
4. 再做分类、筛选、截止日期
5. 最后做样式、体验和打包

原因：

- 如果先做 UI，不先打通数据层，后面容易返工
- 如果先做桌面增强能力，会偏离 MVP 核心目标
- Todo 工具的核心竞争力首先是“记录和完成”的链路顺畅

---

## 6. 每阶段验收清单

## M1 验收

- 开发环境可启动
- 目录结构固定
- 代码规范可执行

## M2 验收

- 数据可持久化
- 数据库初始化正常
- 基础 CRUD 可调用

## M3 验收

- Todo 全流程可操作
- 前后端数据一致

## M4 验收

- 筛选逻辑准确
- 列表展示稳定

## M5 验收

- 用户能连续使用而不明显受阻
- 错误不致命

## M6 验收

- MVP 可安装
- MVP 可交付测试

---

## 7. 最终交付定义

MVP 完成时，应达到以下状态：

- 这是一个可安装的 Windows 桌面应用
- 可以稳定保存和管理个人 Todo
- 核心待办流程完整
- 工程结构清晰，方便继续迭代

这意味着项目已经从“想法验证”进入“可持续开发”阶段。
## 8. Latest Update

Date: 2026-03-28

Completed in this round:

- Added Todo edit capability
- Added category filter
- Added priority filter
- Extended Tauri commands and SQLite flow for todo updates

Open items for the next round:

- Add overdue and date-focused views
- Improve category management
- Prepare packaging and release validation

## 9. Latest Update

Date: 2026-03-28

Completed in this round:

- Added upcoming view
- Added overdue view
- Added due-date visual states and overdue metric

Open items for the next round:

- Improve category management
- Prepare packaging and release validation

## 10. Latest Update

Date: 2026-03-28

Completed in this round:

- Added category color selection
- Added category list with todo counts
- Added category deletion
- Improved category filtering UX

Open items for the next round:

- Prepare packaging and release validation
