# TodoList

[English](README.md) | [涓枃](README.zh-CN.md)

Local-first lightweight desktop todo app for Windows.

## Overview

TodoList is a lightweight desktop todo application designed for fast personal task management on Windows.

Current highlights:

- local-first workflow
- SQLite persistence
- category management
- English / Simplified Chinese switching
- dark / light theme switching
- Windows installer packaging

## Quick Start

```bash
npm.cmd install
npm.cmd run build
```

For Rust / Tauri commands on Windows:

```cmd
scripts\vs-dev-shell.cmd
cargo check --manifest-path src-tauri\Cargo.toml
cargo tauri build
```

## Documents

- [Development Plan](docs/development-plan.md)
- [Tech Stack](docs/tech-stack.md)
- [Requirements](docs/requirements.md)
- [User Guide](docs/user-guide.md)

## Status

Current stage: `MVP polish and release preparation`
