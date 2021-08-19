var capacitorDevice = (function (exports, core) {
    'use strict';

    const FileServer = core.registerPlugin('FileServer', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.FileServerWeb()),
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

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, capacitorExports));
//# sourceMappingURL=plugin.js.map
