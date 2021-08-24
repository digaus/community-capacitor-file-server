import { registerPlugin } from '@capacitor/core';
import type { FileServerPlugin } from './definitions';

const FileServer: FileServerPlugin = registerPlugin<FileServerPlugin>('FileServer', {
    web: () => import('./web').then(m => new m.FileServerWeb()),
    electron: () => (window as any).CapacitorCustomPlatform.plugins.FileServer,
});
export * from './definitions';

export { FileServer };