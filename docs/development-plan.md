# Development Plan

## Purpose

This document tracks the current project stage, completed work, work in progress, and next actions.

## Current Stage

Current stage: `MVP polish and release preparation`

Current step:

- sidebar collapse and expand interaction
- split main workspace into `Tasks` and `Create` pages
- packaged build verification
- release asset synchronization
- final UI consistency review

## Completed

- Chose `Tauri + React + TypeScript + Vite + SQLite + Zustand`
- Implemented local SQLite persistence
- Implemented todo create / edit / complete / reopen / delete
- Implemented category create / filter / count / delete
- Implemented Today / All / Upcoming / Overdue / Completed views
- Implemented English / Simplified Chinese switching
- Implemented dark / light theme switching with local persistence
- Refreshed desktop UI and fixed dropdown theme mismatch issues
- Built Windows MSI and NSIS installers

## In Progress

- sidebar collapse animation and persistence
- top workspace navigation for `Tasks` and `Create`
- auto-jump from edit action to `Create` page
- final packaged app review
- release page asset replacement
- final release wording cleanup

## Next Steps

1. Install the latest packaged build locally.
2. Verify sidebar collapse and expand behavior in the installed app.
3. Verify `Tasks` / `Create` top navigation and edit-to-create flow.
4. Verify language switching, theme switching, and dropdown readability in the installed app.
5. Replace GitHub Release assets with the newest installers when needed.
6. Complete final manual acceptance before public distribution.

## Milestones

### Milestone A: MVP Available

- core todo workflow
- local persistence
- Windows installer build

### Milestone B: MVP Polish

- language switching
- theme switching
- UI readability improvements
- category workflow refinement
- collapsible desktop sidebar
- split `Tasks` and `Create` workspace pages

### Milestone C: Release Closure

- packaged build verification
- GitHub Release asset update
- public-facing README and documentation cleanup

## Known Risks

- release attachments can drift from local installers after rebuilds
- final GUI validation still depends on manual installed-app testing
- Windows terminal encoding can still look wrong if the shell is not configured for UTF-8
