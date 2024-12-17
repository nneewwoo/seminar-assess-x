use std::sync::OnceLock;

use tauri::{AppHandle, Listener, Manager};
use tauri_plugin_dialog::DialogExt;

static APP_HANDLE: OnceLock<AppHandle> = OnceLock::new();

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let tauri_context = tauri::generate_context!();

    tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            tauri::async_runtime::set(tokio::runtime::Handle::current());

            let builder = tauri::Builder::default()
                .setup(|app| {
                    APP_HANDLE.set(app.app_handle().to_owned()).unwrap();

                    tauri::async_runtime::spawn(async move {
                        if let Err(e) = handle_setup() {
                            eprintln!("Error in setup: {}", e);
                        }
                    });

                    Ok(())
                })
                .plugin(tauri_plugin_dialog::init())
                .invoke_handler(tauri::generate_handler![session_invalid_dialog]);

            builder
                .build(tauri_context)
                .expect("Failed to build tauri application")
                .run(|app_handle, event| {
                    let _ = (app_handle, event);
                });
        })
}

fn handle_setup() -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = APP_HANDLE.get().unwrap();

    let _ = app_handle.listen("has-internet", move |event| {
        let has_internet = event.payload();

        if has_internet.eq_ignore_ascii_case("false") {
            app_handle
                .dialog()
                .message("This app needs internet connection to work.")
                .title("No internet connection")
                .buttons(tauri_plugin_dialog::MessageDialogButtons::Ok)
                .blocking_show();
            app_handle.exit(0);
        }
    });

    Ok(())
}

#[tauri::command]
fn session_invalid_dialog() {
    let app_handle = APP_HANDLE.get().unwrap();

    app_handle.dialog()
    .message("You haven't used the app for at least 30 days. For your security, we've automatically logged you out.")
    .title("Session expired")
    .buttons(tauri_plugin_dialog::MessageDialogButtons::Ok)
    .blocking_show();
}
