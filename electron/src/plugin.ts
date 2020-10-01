import { WebPlugin } from '@capacitor/core';
import { FileServerPlugin } from './definitions';
const { remote } = require('electron');

export class FileServerElectron extends WebPlugin implements FileServerPlugin {
  Os: any = null;
  Http: any = null;
  StaticServer: any = null;
  RemoteRef: any = null;

  server: any = null;

  constructor() {
    super({
      name: 'FileServer',
      platforms: ['electron'],
    });
    this.Os = require('os');
    this.Http = require('http');
    this.StaticServer = require('node-static');
    this.RemoteRef = remote;
  }

  async start(options: { path: string, port?: number }): Promise<{ ip: string | null }> {
    const fileServer: any = new this.StaticServer.Server(options.path);
    this.server = this.Http.createServer((request: any, response: any) => {
      request.addListener('end', () => {
        fileServer.serve(request, response);
      }).resume();
    }).listen(options.port || 8080);
    var ifs = this.Os.networkInterfaces();
    var ip = Object.keys(ifs)
      .map(x => ifs[x].filter((x: any) => x.family === 'IPv4' && !x.internal)[0])
      .filter(x => x)[0].address;
    return { ip };
  }

  async stop(): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
      this.server.close().once('close', () => resolve());
    });
  }
}

const FileServer = new FileServerElectron();
export { FileServer };
import { registerWebPlugin } from '@capacitor/core';

registerWebPlugin(FileServer);
