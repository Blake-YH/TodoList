use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Todo {
  pub id: String,
  pub title: String,
  pub description: Option<String>,
  pub status: String,
  pub priority: String,
  pub category_id: Option<String>,
  pub due_date: Option<String>,
  pub created_at: String,
  pub updated_at: String,
  pub completed_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Category {
  pub id: String,
  pub name: String,
  pub color: String,
  pub created_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct AppSettings {
  pub language: String,
  pub theme: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateTodoPayload {
  pub title: String,
  pub description: Option<String>,
  pub priority: String,
  pub category_id: Option<String>,
  pub due_date: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateTodoPayload {
  pub id: String,
  pub title: String,
  pub description: Option<String>,
  pub priority: String,
  pub category_id: Option<String>,
  pub due_date: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateTodoStatusPayload {
  pub id: String,
  pub status: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateCategoryPayload {
  pub name: String,
  pub color: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateLanguagePayload {
  pub language: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateThemePayload {
  pub theme: String,
}
