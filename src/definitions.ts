declare module '@capacitor/core/dist/esm/core-plugin-definitions' {
  interface PluginRegistry {
    FileServer: FileServerPlugin;
  }
}

export interface FileServerPlugin {
  start(options: { path: string, port?: number }): Promise<{ ip: string | null }>;
  stop(): Promise<void>;

}
