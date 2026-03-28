use tauri::State;

use crate::{
  db::{self, DatabaseState},
  models::{
    AppSettings, Category, CreateCategoryPayload, CreateTodoPayload, Todo, UpdateLanguagePayload,
    UpdateTodoPayload, UpdateTodoStatusPayload,
  },
};

#[tauri::command]
pub fn list_todos(state: State<'_, DatabaseState>) -> Result<Vec<Todo>, String> {
  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::list_todos(&connection).map_err(|error| error.to_string())
}

#[tauri::command]
pub fn create_todo(
  payload: CreateTodoPayload,
  state: State<'_, DatabaseState>,
) -> Result<Todo, String> {
  if payload.title.trim().is_empty() {
    return Err("Title is required.".to_string());
  }

  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::create_todo(&connection, payload).map_err(|error| error.to_string())
}

#[tauri::command]
pub fn update_todo(
  payload: UpdateTodoPayload,
  state: State<'_, DatabaseState>,
) -> Result<Todo, String> {
  if payload.title.trim().is_empty() {
    return Err("Title is required.".to_string());
  }

  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::update_todo(&connection, payload).map_err(|error| error.to_string())
}

#[tauri::command]
pub fn update_todo_status(
  payload: UpdateTodoStatusPayload,
  state: State<'_, DatabaseState>,
) -> Result<Todo, String> {
  if payload.status != "pending" && payload.status != "completed" {
    return Err("Unsupported status.".to_string());
  }

  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::update_todo_status(&connection, payload).map_err(|error| error.to_string())
}

#[tauri::command]
pub fn delete_todo(todo_id: String, state: State<'_, DatabaseState>) -> Result<(), String> {
  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::delete_todo(&connection, &todo_id).map_err(|error| error.to_string())
}

#[tauri::command]
pub fn list_categories(state: State<'_, DatabaseState>) -> Result<Vec<Category>, String> {
  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::list_categories(&connection).map_err(|error| error.to_string())
}

#[tauri::command]
pub fn get_settings(state: State<'_, DatabaseState>) -> Result<AppSettings, String> {
  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::get_settings(&connection).map_err(|error| error.to_string())
}

#[tauri::command]
pub fn create_category(
  payload: CreateCategoryPayload,
  state: State<'_, DatabaseState>,
) -> Result<Category, String> {
  if payload.name.trim().is_empty() {
    return Err("Category name is required.".to_string());
  }

  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::create_category(&connection, payload).map_err(|error| error.to_string())
}

#[tauri::command]
pub fn delete_category(category_id: String, state: State<'_, DatabaseState>) -> Result<(), String> {
  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::delete_category(&connection, &category_id).map_err(|error| error.to_string())
}

#[tauri::command]
pub fn update_language(
  payload: UpdateLanguagePayload,
  state: State<'_, DatabaseState>,
) -> Result<AppSettings, String> {
  if payload.language != "en" && payload.language != "zh-CN" {
    return Err("Unsupported language.".to_string());
  }

  let connection = state.connection.lock().map_err(|error| error.to_string())?;
  db::update_language(&connection, payload).map_err(|error| error.to_string())
}
