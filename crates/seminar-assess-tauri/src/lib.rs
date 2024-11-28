#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let context = tauri::generate_context!();

    let builder = tauri::Builder::default();

    builder
        .plugin(tauri_plugin_shell::init())
        .run(context)
        .expect("error while running tauri application");
}
