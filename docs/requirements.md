# Requirements

## Product Goal

Build a lightweight Windows desktop todo application for personal daily task management.

## Target Users

- personal users
- users who prefer local-first desktop tools
- users who want a simpler alternative to heavy productivity platforms

## MVP Scope

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
- persist sidebar expanded / collapsed state locally

### Persistence

- local SQLite storage
- app restart should retain todos, categories, and settings

## UI / UX Requirements

- desktop-first layout
- clean visual hierarchy
- readable cards, buttons, and labels
- dropdown menus must match the active theme
- dark theme and light theme must both remain readable
- avoid noisy explanatory cards in the main workspace
- sidebar must support collapse / expand with a light animation
- main workspace must provide top navigation for `Tasks` and `Create`
- editing an existing todo should switch the user to the `Create` page automatically
- category management should remain in the sidebar for the current version

## Non-Functional Requirements

- lightweight runtime experience
- stable local data persistence
- packageable into Windows installers
- maintainable code structure
- support future release iteration without major rewrites

## Out of Scope

- cloud sync
- account system
- collaboration
- notifications
- tray integration
- import/export flow

## Current Release Expectation

The current release candidate should provide:

- stable local todo workflow
- category management
- language switching
- theme switching
- collapsible sidebar
- `Tasks` / `Create` split workspace
- packaged installer availability
