'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const FileServer = core.registerPlugin('FileServer', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.FileServerWeb()),
    electron: () => window.CapacitorCustomPlatform.plugins.FileServer,
});

class FileServerWeb extends core.WebPlugin {
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

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FileServerWeb: FileServerWeb
});

exports.FileServer = FileServer;
//# sourceMappingURL=plugin.cjs.js.map
