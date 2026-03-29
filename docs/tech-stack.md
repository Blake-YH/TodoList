# Tech Stack

## 中文说明

本文档说明 TodoList 当前采用的技术栈、选型理由以及各层职责。

## 1. Stack Summary

- Desktop shell: `Tauri 2`
- Frontend: `React + TypeScript + Vite`
- State management: `Zustand`
- Form validation: `React Hook Form + Zod`
- Local database: `SQLite`
- Backend bridge: `Tauri commands (Rust)`
- Packaging: `cargo tauri build`

## 2. Why This Stack

### Tauri 2

- lighter than typical Electron packaging
- suitable for a small Windows desktop utility
- supports native packaging and local desktop integration

### React + TypeScript + Vite

- fast development loop
- component-based UI structure
- TypeScript reduces data model and interaction errors

### Zustand

- simple store model
- enough for MVP-level desktop app state
- lower ceremony than Redux

### SQLite

- local-first persistence
- good fit for todo, category, and settings data
- easier to evolve than plain JSON files

### Rust + Tauri Commands

- keeps desktop/data access logic in a typed backend layer
- exposes a small native command surface to the frontend
- works well for local settings and database operations

## 3. Current Architecture

### Frontend Layer

Responsible for:

- UI rendering
- forms and interactions
- filters and views
- theme and language application

### Store Layer

Responsible for:

- local app state
- initialization flow
- calling Tauri commands
- keeping language/theme/query state consistent

### Tauri Backend Layer

Responsible for:

- SQLite access
- settings persistence
- todo and category CRUD
- packaged desktop runtime

### Data Layer

Current persistent entities:

- `todos`
- `categories`
- `settings`

## 4. Settings Currently Persisted

- `language`
- `theme`

## 5. Build and Packaging

### Frontend Build

```bash
npm.cmd run build
```

### Rust Validation

```bash
cargo check --manifest-path src-tauri\Cargo.toml
```

### Windows Installer Build

```bash
cargo tauri build
```

### Output Artifacts

- `src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- `src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`
