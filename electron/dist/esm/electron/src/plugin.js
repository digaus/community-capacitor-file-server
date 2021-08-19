import { __awaiter } from "tslib";
import { registerPlugin, WebPlugin } from '@capacitor/core';
const { remote } = require('electron');
export class FileServerElectron extends WebPlugin {
    constructor() {
        super({
            name: 'FileServer',
            platforms: ['electron'],
        });
        this.Os = null;
        this.Http = null;
        this.StaticServer = null;
        this.RemoteRef = null;
        this.server = null;
        this.Os = require('os');
        this.Http = require('http');
        this.StaticServer = require('node-static');
        this.RemoteRef = remote;
    }
    start(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileServer = new this.StaticServer.Server(options.path);
            this.server = this.Http.createServer((request, response) => {
                request.addListener('end', () => {
                    fileServer.serve(request, response);
                }).resume();
            }).listen(options.port || 8080);
            var ifs = this.Os.networkInterfaces();
            var ip = Object.keys(ifs)
                .map(x => ifs[x].filter((x) => x.family === 'IPv4' && !x.internal)[0])
                .filter(x => x)[0].address;
            return { ip };
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.server.close().once('close', () => resolve());
            });
        });
    }
}
const FileServer = registerPlugin('FileServer', {
    electron: () => import('./plugin').then(m => new m.FileServerElectron()),
});
export { FileServer };
//# sourceMappingURL=plugin.js.map