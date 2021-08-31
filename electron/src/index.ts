import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { Server as StaticServer } from 'node-static';
import { NetworkInterfaceInfo, networkInterfaces } from 'os';

import type { FileServerPlugin } from '../../src/definitions';
export class FileServer implements FileServerPlugin {
    
    private server: Server = null;

    async start(options: { path: string, port?: number }): Promise<{ ip: string | null }> {
        return new Promise<{ ip: string | null }>((resolve: (result: { ip: string | null }) => void, reject: (err: any) => void) => {
            const fileServer: StaticServer = new StaticServer(options.path);
            this.server = createServer((request: IncomingMessage, response: ServerResponse) => {
                request.addListener('end', () => {
                    fileServer.serve(request, response);
                }).resume();
            }).listen(options.port || 8080, () => { 
                const ifs: { [key: string]: NetworkInterfaceInfo[] } = networkInterfaces();
                const ip: string = Object.keys(ifs)
                    .map((key: string) => ifs[key].filter((x: NetworkInterfaceInfo) => x.family === 'IPv4' && !x.internal)[0])
                    .filter(x => x)[0].address;
                console.log('this.server:');
                console.log(this.server.listening);
                resolve({ ip });
            });
            this.server.once('error', (err) => {
                console.log(
                  'There was an error starting the server in the error listener:',
                  err
                );
                reject(err);
            });
            
        });  
    }

    async stop(): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            this.server.close().once('close', () => {
                console.log('this.server:');
                console.log(this.server.listening);
                resolve();
            });
        });
    }
}
