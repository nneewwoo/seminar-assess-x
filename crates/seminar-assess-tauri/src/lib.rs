#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    println!("Hello, world!");
    let tauri_context = tauri::generate_context!();

    tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            tauri::async_runtime::set(tokio::runtime::Handle::current());

            let builder = tauri::Builder::default();

            builder
                .plugin(tauri_plugin_shell::init())
                .plugin(tauri_plugin_dialog::init())
                .build(tauri_context)
                .expect("Failed to build tauri application")
                .run(|app_handle, event| {
                    println!("Running app...");
                    let _ = (app_handle, event);
                });
        })
}
