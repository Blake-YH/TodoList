# Publish Checklist v0.1.0

## 中文说明

这份文档用于 `v0.1.0` 正式发布前的最后检查与发布执行。

目标：

- 确认当前版本可发布
- 确认安装包、文档、说明都齐全
- 确认 GitHub Release 可以一次性整理完成

## Release Target

- Version: `v0.1.0`
- Branch: `main`
- Platform: `Windows x64`

## Required Artifacts

- MSI: `src-tauri\target\release\bundle\msi\TodoList_0.1.0_x64_en-US.msi`
- NSIS: `src-tauri\target\release\bundle\nsis\TodoList_0.1.0_x64-setup.exe`

## SHA256

- MSI: `6af4ba8db2c315393a702f82caebfbe4f331c2a6f32317cacd315bb1bac02fbe`
- NSIS: `80c3f9cd84bf7ea8abfa5b339f25e56622147aff789a1e73eda8d5caa19735e8`

## Pre-Release Checks

- Confirm `main` is clean
- Confirm `npm.cmd run lint` passes
- Confirm `npm.cmd run build` passes
- Confirm `cargo check --manifest-path src-tauri\Cargo.toml` passes
- Confirm `cargo tauri build` passes
- Confirm bilingual UI switching works
- Confirm local SQLite data is created correctly
- Confirm Todo create / edit / complete / reopen / delete all work
- Confirm category create / filter / delete all work
- Confirm Today / All / Upcoming / Overdue / Completed views all work

## Manual Acceptance

Use:

- [manual-acceptance-checklist.md](/D:/VibeCoding_project/TodoList/docs/manual-acceptance-checklist.md)

Minimum release requirement:

- Installation succeeds
- First launch succeeds
- Core todo flow succeeds
- Language switch succeeds

## GitHub Release Assets

Recommended upload set:

- `TodoList_0.1.0_x64_en-US.msi`
- `TodoList_0.1.0_x64-setup.exe`

Replacement note:

- If `v0.1.0` assets were uploaded before the language switching rebuild, delete the old GitHub Release assets and upload the rebuilt installers again
- Keep only the installers matching the SHA256 values in this document

Recommended description source:

- [github-release-v0.1.0.md](/D:/VibeCoding_project/TodoList/docs/github-release-v0.1.0.md)

## Final Publish Steps

1. Create Git tag `v0.1.0`
2. Push the tag to GitHub
3. Create a new GitHub Release
4. Use the prepared release text
5. Upload both installer files
6. Optionally include SHA256 values in the release body
7. Publish release
