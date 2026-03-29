# Tech Stack

## Stack Summary

- Desktop shell: `Tauri 2`
- Frontend: `React + TypeScript + Vite`
- State management: `Zustand`
- Form handling: `React Hook Form + Zod`
- Local database: `SQLite`
- Native bridge: `Tauri commands in Rust`
- Packaging: `cargo tauri build`

## Why This Stack

### Tauri 2

- lighter packaging than a typical Electron app
- suitable for a small Windows desktop utility
- supports native packaging and local integration

### React + TypeScript + Vite

- fast development loop
- component-based UI composition
- TypeScript improves model and interaction safety

### Zustand

- simple store model
- enough for current app complexity
- less ceremony than Redux

### SQLite

- good fit for local-first persistence
- suitable for todos, categories, and settings
- easier to evolve than plain JSON files

### Rust + Tauri Commands

- keeps desktop and database operations in a typed backend layer
- exposes a small native command surface to the frontend
- works well for local settings persistence

## Current Architecture

### Frontend Layer

Responsible for:

- UI rendering
- forms and interactions
- filters and views
- language and theme application

### Store Layer

Responsible for:

- local app state
- initialization
- query state
- calling Tauri commands

### Backend Layer

Responsible for:

- SQLite access
- settings persistence
- todo and category CRUD
- packaged desktop runtime

## Persisted Settings

- `language`
- `theme`

## Build Commands

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

## Output Artifacts

- `src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- `src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`
