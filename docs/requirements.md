# Requirements

## 中文说明

本文档用于整理 TodoList 当前版本的产品需求，包含目标、范围、核心功能和非功能要求。

## 1. Product Goal

Build a lightweight Windows desktop todo application for personal daily task management.

目标是做一个面向个人用户的轻量级 Windows 桌面待办应用。

## 2. Target Users

- personal users
- users who prefer local-first desktop tools
- users who want a simpler alternative to heavy productivity platforms

## 3. MVP Scope

### Core Todo Capability

- create todo
- edit todo
- delete todo
- mark complete
- reopen completed todo
- set priority
- set due date
- assign category

### Views and Filtering

- Today view
- All todos view
- Upcoming view
- Overdue view
- Completed view
- category filter
- priority filter

### Category Management

- create category
- choose category color
- filter by category
- delete category
- keep related todos usable after category deletion

### Settings

- English / Simplified Chinese switching
- dark / light theme switching
- persist language locally
- persist theme locally

### Persistence

- local SQLite storage
- app restart should retain todos, categories, and settings

## 4. UI / UX Requirements

- desktop-first layout
- clean visual hierarchy
- readable cards, buttons, and labels
- dropdown menus must match the active theme
- dark theme and light theme must both remain readable
- avoid noisy, placeholder-like explanatory cards in the main workspace

## 5. Non-Functional Requirements

- lightweight runtime experience
- stable local data persistence
- packageable into Windows installers
- maintainable code structure
- support future release iteration without major rewrites

## 6. Out of Scope for Current Version

- cloud sync
- account system
- collaboration
- notifications
- tray integration
- import/export flow

## 7. Current Release Expectation

The current release candidate should satisfy:

- stable local todo workflow
- category management
- language switching
- theme switching
- packaged installer availability
