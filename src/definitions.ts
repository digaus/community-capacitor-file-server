declare module '@capacitor/core' {
  interface PluginRegistry {
    FileServer: FileServerPlugin;
  }
}

export interface FileServerPlugin {
  start(options: { path: string, port: number }): Promise<{ ip: string | null }>;
  stop(): Promise<void>;

}
