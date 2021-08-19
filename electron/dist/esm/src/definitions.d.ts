export interface FileServerPlugin {
    start(options: {
        path: string;
        port?: number;
    }): Promise<{
        ip: string | null;
    }>;
    stop(): Promise<void>;
}
