use std::{fs, path::PathBuf, sync::Mutex};

use chrono::Utc;
use rusqlite::{params, Connection};
use tauri::{AppHandle, Manager};
use uuid::Uuid;

use crate::models::{
  AppSettings, Category, CreateCategoryPayload, CreateTodoPayload, Todo, UpdateLanguagePayload,
  UpdateThemePayload, UpdateTodoPayload, UpdateTodoStatusPayload,
};

pub struct DatabaseState {
  pub connection: Mutex<Connection>,
}

pub fn init_database(app: &AppHandle) -> Result<DatabaseState, String> {
  let db_path = resolve_db_path(app)?;

  if let Some(parent) = db_path.parent() {
    fs::create_dir_all(parent).map_err(|error| error.to_string())?;
  }

  let connection = Connection::open(db_path).map_err(|error| error.to_string())?;
  run_migrations(&connection).map_err(|error| error.to_string())?;

  Ok(DatabaseState {
    connection: Mutex::new(connection),
  })
}

fn resolve_db_path(app: &AppHandle) -> Result<PathBuf, String> {
  let data_dir = app
    .path()
    .app_data_dir()
    .map_err(|error| error.to_string())?;

  Ok(data_dir.join("todolist.db"))
}

fn run_migrations(connection: &Connection) -> rusqlite::Result<()> {
  connection.execute_batch(
    "
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      color TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL CHECK(status IN ('pending', 'completed')),
      priority TEXT NOT NULL CHECK(priority IN ('low', 'medium', 'high')),
      category_id TEXT,
      due_date TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      completed_at TEXT,
      FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    ",
  )?;

  let count: i64 = connection.query_row("SELECT COUNT(*) FROM categories", [], |row| row.get(0))?;

  if count == 0 {
    let now = Utc::now().to_rfc3339();
    let defaults = [
      ("Inbox", "#F3A522"),
      ("Work", "#3AC28C"),
      ("Personal", "#6EA8FE"),
    ];

    for (name, color) in defaults {
      connection.execute(
        "INSERT INTO categories (id, name, color, created_at) VALUES (?1, ?2, ?3, ?4)",
        params![Uuid::new_v4().to_string(), name, color, now],
      )?;
    }
  }

  connection.execute(
    "INSERT OR IGNORE INTO settings (key, value) VALUES ('language', 'en')",
    [],
  )?;
  connection.execute(
    "INSERT OR IGNORE INTO settings (key, value) VALUES ('theme', 'dark')",
    [],
  )?;

  Ok(())
}

pub fn get_settings(connection: &Connection) -> rusqlite::Result<AppSettings> {
  let language: String = connection.query_row(
    "SELECT value FROM settings WHERE key = 'language'",
    [],
    |row| row.get(0),
  )?;
  let theme: String = connection.query_row(
    "SELECT value FROM settings WHERE key = 'theme'",
    [],
    |row| row.get(0),
  )?;

  Ok(AppSettings { language, theme })
}

pub fn update_language(
  connection: &Connection,
  payload: UpdateLanguagePayload,
) -> rusqlite::Result<AppSettings> {
  connection.execute(
    "INSERT INTO settings (key, value) VALUES ('language', ?1)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value",
    params![payload.language],
  )?;

  get_settings(connection)
}

pub fn update_theme(
  connection: &Connection,
  payload: UpdateThemePayload,
) -> rusqlite::Result<AppSettings> {
  connection.execute(
    "INSERT INTO settings (key, value) VALUES ('theme', ?1)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value",
    params![payload.theme],
  )?;

  get_settings(connection)
}

pub fn list_categories(connection: &Connection) -> rusqlite::Result<Vec<Category>> {
  let mut statement = connection.prepare(
    "SELECT id, name, color, created_at FROM categories ORDER BY created_at ASC, name ASC",
  )?;

  let rows = statement.query_map([], |row| {
    Ok(Category {
      id: row.get(0)?,
      name: row.get(1)?,
      color: row.get(2)?,
      created_at: row.get(3)?,
    })
  })?;

  rows.collect()
}

pub fn create_category(
  connection: &Connection,
  payload: CreateCategoryPayload,
) -> rusqlite::Result<Category> {
  let category = Category {
    id: Uuid::new_v4().to_string(),
    name: payload.name.trim().to_string(),
    color: payload.color.trim().to_string(),
    created_at: Utc::now().to_rfc3339(),
  };

  connection.execute(
    "INSERT INTO categories (id, name, color, created_at) VALUES (?1, ?2, ?3, ?4)",
    params![category.id, category.name, category.color, category.created_at],
  )?;

  Ok(category)
}

pub fn delete_category(connection: &Connection, category_id: &str) -> rusqlite::Result<()> {
  connection.execute("DELETE FROM categories WHERE id = ?1", params![category_id])?;
  Ok(())
}

pub fn list_todos(connection: &Connection) -> rusqlite::Result<Vec<Todo>> {
  let mut statement = connection.prepare(
    "
    SELECT id, title, description, status, priority, category_id, due_date, created_at, updated_at, completed_at
    FROM todos
    ORDER BY
      CASE status WHEN 'pending' THEN 0 ELSE 1 END ASC,
      CASE priority WHEN 'high' THEN 0 WHEN 'medium' THEN 1 ELSE 2 END ASC,
      COALESCE(due_date, '9999-12-31') ASC,
      created_at DESC
    ",
  )?;

  let rows = statement.query_map([], |row| {
    Ok(Todo {
      id: row.get(0)?,
      title: row.get(1)?,
      description: row.get(2)?,
      status: row.get(3)?,
      priority: row.get(4)?,
      category_id: row.get(5)?,
      due_date: row.get(6)?,
      created_at: row.get(7)?,
      updated_at: row.get(8)?,
      completed_at: row.get(9)?,
    })
  })?;

  rows.collect()
}

pub fn create_todo(connection: &Connection, payload: CreateTodoPayload) -> rusqlite::Result<Todo> {
  let now = Utc::now().to_rfc3339();
  let todo = Todo {
    id: Uuid::new_v4().to_string(),
    title: payload.title.trim().to_string(),
    description: payload.description.and_then(trimmed_or_none),
    status: "pending".to_string(),
    priority: payload.priority,
    category_id: payload.category_id.and_then(trimmed_or_none),
    due_date: payload.due_date.and_then(trimmed_or_none),
    created_at: now.clone(),
    updated_at: now,
    completed_at: None,
  };

  connection.execute(
    "
    INSERT INTO todos (id, title, description, status, priority, category_id, due_date, created_at, updated_at, completed_at)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
    ",
    params![
      todo.id,
      todo.title,
      todo.description,
      todo.status,
      todo.priority,
      todo.category_id,
      todo.due_date,
      todo.created_at,
      todo.updated_at,
      todo.completed_at,
    ],
  )?;

  Ok(todo)
}

pub fn update_todo(connection: &Connection, payload: UpdateTodoPayload) -> rusqlite::Result<Todo> {
  let now = Utc::now().to_rfc3339();

  connection.execute(
    "
    UPDATE todos
    SET title = ?1, description = ?2, priority = ?3, category_id = ?4, due_date = ?5, updated_at = ?6
    WHERE id = ?7
    ",
    params![
      payload.title.trim(),
      payload.description.and_then(trimmed_or_none),
      payload.priority,
      payload.category_id.and_then(trimmed_or_none),
      payload.due_date.and_then(trimmed_or_none),
      now,
      payload.id,
    ],
  )?;

  get_todo_by_id(connection, &payload.id)
}

pub fn update_todo_status(
  connection: &Connection,
  payload: UpdateTodoStatusPayload,
) -> rusqlite::Result<Todo> {
  let now = Utc::now().to_rfc3339();
  let completed_at = if payload.status == "completed" {
    Some(now.clone())
  } else {
    None
  };

  connection.execute(
    "
    UPDATE todos
    SET status = ?1, updated_at = ?2, completed_at = ?3
    WHERE id = ?4
    ",
    params![payload.status, now, completed_at, payload.id],
  )?;

  get_todo_by_id(connection, &payload.id)
}

pub fn delete_todo(connection: &Connection, todo_id: &str) -> rusqlite::Result<()> {
  connection.execute("DELETE FROM todos WHERE id = ?1", params![todo_id])?;
  Ok(())
}

fn get_todo_by_id(connection: &Connection, todo_id: &str) -> rusqlite::Result<Todo> {
  connection.query_row(
    "
    SELECT id, title, description, status, priority, category_id, due_date, created_at, updated_at, completed_at
    FROM todos
    WHERE id = ?1
    ",
    params![todo_id],
    |row| {
      Ok(Todo {
        id: row.get(0)?,
        title: row.get(1)?,
        description: row.get(2)?,
        status: row.get(3)?,
        priority: row.get(4)?,
        category_id: row.get(5)?,
        due_date: row.get(6)?,
        created_at: row.get(7)?,
        updated_at: row.get(8)?,
        completed_at: row.get(9)?,
      })
    },
  )
}

fn trimmed_or_none(value: String) -> Option<String> {
  let trimmed = value.trim().to_string();
  if trimmed.is_empty() {
    None
  } else {
    Some(trimmed)
  }
}
