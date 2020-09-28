declare module '@capacitor/core' {
  interface PluginRegistry {
    FileServer: FileServerPlugin;
  }
}

export interface FileServerPlugin {
  start(options: { path: string }): Promise<{ ip: string | null }>;
}
