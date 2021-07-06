import { WebPlugin } from '@capacitor/core';
import { FileServerPlugin } from './definitions';
export declare class FileServerElectron extends WebPlugin implements FileServerPlugin {
    Os: any;
    Http: any;
    StaticServer: any;
    RemoteRef: any;
    server: any;
    constructor();
    start(options: {
        path: string;
        port?: number;
    }): Promise<{
        ip: string | null;
    }>;
    stop(): Promise<void>;
}
declare const FileServer: FileServerElectron;
export { FileServer };
