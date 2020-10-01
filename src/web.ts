import { WebPlugin } from '@capacitor/core';
import { FileServerPlugin } from './definitions';

export class FileServerWeb extends WebPlugin implements FileServerPlugin {
  constructor() {
    super({
      name: 'FileServer',
      platforms: ['web'],
    });
  }

  async start(options: { path: string, port: number }): Promise<{ ip: string | null }> {
    console.log('start', options);
    return { ip: null };
  }
  async stop(): Promise<void> {
    return;
  }
}

const FileServer = new FileServerWeb();

export { FileServer };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FileServer);
