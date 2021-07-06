import { WebPlugin } from '@capacitor/core';
import { FileServerPlugin } from './definitions';
export declare class FileServerWeb extends WebPlugin implements FileServerPlugin {
    constructor();
    start(options: {
        path: string;
        port?: number;
    }): Promise<{
        ip: string | null;
    }>;
    stop(): Promise<void>;
}
declare const FileServer: FileServerWeb;
export { FileServer };
