import type { FileServerPlugin } from '../../src/definitions';
import { networkInterfaces } from 'os';
import { createServer, Server } from 'http';
import { Server as StaticServer } from 'node-static';

export class FileServer implements FileServerPlugin {
  server: Server = null;

  async start(options: { path: string, port?: number }): Promise<{ ip: string | null }> {
    const fileServer: any = new StaticServer(options.path);
    this.server = createServer((request: any, response: any) => {
      request.addListener('end', () => {
        fileServer.serve(request, response);
      }).resume();
    }).listen(options.port || 8080);
    var ifs = networkInterfaces();
    var ip = Object.keys(ifs)
      .map(x => ifs[x].filter((x: any) => x.family === 'IPv4' && !x.internal)[0])
      .filter(x => x)[0].address;
    console.log('this.server:');
    console.log(this.server.listening);
    return { ip };
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
