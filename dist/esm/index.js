import { registerPlugin } from '@capacitor/core';
const FileServer = registerPlugin('FileServer', {
    web: () => import('./web').then(m => new m.FileServerWeb()),
});
export { FileServer };
//# sourceMappingURL=index.js.map