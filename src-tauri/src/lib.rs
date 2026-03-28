use tauri::Manager;

mod commands;
mod db;
mod models;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      let database = db::init_database(app.handle())?;
      app.manage(database);

      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
      commands::list_todos,
      commands::create_todo,
      commands::update_todo,
      commands::update_todo_status,
      commands::delete_todo,
      commands::list_categories,
      commands::create_category
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
