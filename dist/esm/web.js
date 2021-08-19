import { WebPlugin } from '@capacitor/core';
export class FileServerWeb extends WebPlugin {
    constructor() {
        super({
            name: 'FileServer',
            platforms: ['web'],
        });
    }
    async start(options) {
        console.log('start', options);
        return { ip: null };
    }
    async stop() {
        return;
    }
}
//# sourceMappingURL=web.js.map