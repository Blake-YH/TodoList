# Release Notes v0.1.0

## Summary

`v0.1.0` is the first MVP milestone for TodoList on Windows.

It delivers a local-first desktop todo application with:

- SQLite local persistence
- Todo create, edit, complete, reopen, and delete flows
- Category creation, filtering, counting, and deletion
- Today, All, Upcoming, Overdue, and Completed views
- Windows installer packaging through Tauri

## Major Features

- Local desktop todo management
- Date-aware task views
- Priority and category filtering
- Local category management
- Windows MSI and NSIS installer generation

## Technical Stack

- Tauri 2
- React
- TypeScript
- Vite
- SQLite
- Zustand
- React Hook Form
- Zod

## Packaging Outputs

- `TodoList_0.1.0_x64_en-US.msi`
- `TodoList_0.1.0_x64-setup.exe`

## Known Limitations

- No cloud sync
- No user accounts
- No tray integration yet
- No notifications yet
- No import/export flow yet

## Recommended Next Steps

- Run full manual installation acceptance
- Finalize refined icon set for future releases
- Prepare a public-facing changelog and screenshots
