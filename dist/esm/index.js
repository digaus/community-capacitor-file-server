import { registerPlugin } from '@capacitor/core';
const FileServer = registerPlugin('FileServer', {
    web: () => import('./web').then(m => new m.FileServerWeb()),
    electron: () => window.CapacitorCustomPlatform.plugins.FileServer,
});
export { FileServer };
//# sourceMappingURL=index.js.map