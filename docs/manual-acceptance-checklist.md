# Manual Acceptance Checklist

## Scope

This checklist is used after the Windows installer is built and installed locally.

## Installation

- Install the MSI package successfully
- Install the NSIS package successfully
- Launch the app after installation without crashes
- Confirm the window opens with the expected title and size

## First Launch

- Confirm the app creates a local SQLite database in the app data directory
- Confirm default categories are visible on first launch
- Confirm the app loads without obvious layout issues

## Todo Core Flow

- Create a todo without category and due date
- Create a todo with category, priority, and due date
- Edit an existing todo
- Mark a todo as completed
- Reopen a completed todo
- Delete a todo

## Category Flow

- Create a category with a custom color
- Select a category from the sidebar to filter todos
- Delete a category and confirm related todos move back to uncategorized

## List Views

- Verify `Today` view
- Verify `All todos` view
- Verify `Upcoming` view
- Verify `Overdue` view
- Verify `Completed` view

## Filters

- Filter by category
- Filter by priority
- Combine category and priority filters
- Clear filters and confirm list resets correctly

## Persistence

- Close and reopen the app
- Confirm todos still exist
- Confirm categories still exist
- Confirm completed state is preserved

## Visual Review

- Confirm brand colors are consistent
- Confirm buttons and cards are aligned correctly
- Confirm due-date badges show the correct tone for today, upcoming, and overdue items

## Release Decision

- If all items pass, the build is acceptable for MVP release candidate review
- If any core flow fails, fix and rebuild before release
