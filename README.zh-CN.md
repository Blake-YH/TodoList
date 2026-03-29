# TodoList

[English](README.md) | [中文](README.zh-CN.md)

面向 Windows 的本地优先、轻量化桌面待办应用。

## 项目简介

TodoList 是一个为个人任务管理设计的轻量级桌面待办应用，重点是简单、快速、可本地使用。

当前重点能力：

- 本地优先工作流
- SQLite 数据持久化
- 分类管理
- 中英文界面切换
- 深色 / 浅色主题切换
- Windows 安装包构建

## 快速开始

```bash
npm.cmd install
npm.cmd run build
```

在 Windows 下执行 Rust / Tauri 相关命令前，建议先进入开发环境：

```cmd
scripts\vs-dev-shell.cmd
cargo check --manifest-path src-tauri\Cargo.toml
cargo tauri build
```

## 核心文档

- [开发计划](docs/development-plan.md)
- [技术栈](docs/tech-stack.md)
- [需求文档](docs/requirements.md)
- [使用文档](docs/user-guide.md)

## 当前状态

当前阶段：`MVP 打磨与发布准备`

当前重点工作：

- 安装包版本核对
- 界面细节与一致性修正
- 发布前最终验收

## 当前功能

- Todo 新增 / 编辑 / 完成 / 重新打开 / 删除
- 分类新增 / 筛选 / 计数 / 删除
- 今天 / 全部 / 即将到期 / 已逾期 / 已完成视图
- 中英文切换
- 深色 / 浅色主题切换
- 本地 SQLite 持久化
- Windows 安装包打包
