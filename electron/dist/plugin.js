'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0 = require('os');
var require$$1 = require('http');
var require$$2 = require('node-static');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);

var src = {};

Object.defineProperty(src, "__esModule", { value: true });
class FileServer {
    constructor() {
        this.Os = null;
        this.Http = null;
        this.StaticServer = null;
        this.server = null;
        this.Os = require$$0__default['default'];
        this.Http = require$$1__default['default'];
        this.StaticServer = require$$2__default['default'];
    }
    async start(options) {
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
    }
    async stop() {
        return new Promise((resolve) => {
            this.server.close().once('close', () => resolve());
        });
    }
}
var FileServer_1 = src.FileServer = FileServer;

exports.FileServer = FileServer_1;
exports['default'] = src;
//# sourceMappingURL=plugin.js.map
