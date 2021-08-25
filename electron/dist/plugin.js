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
const os_1 = require$$0__default['default'];
const http_1 = require$$1__default['default'];
const node_static_1 = require$$2__default['default'];
class FileServer {
    constructor() {
        this.server = null;
    }
    async start(options) {
        const fileServer = new node_static_1.Server(options.path);
        this.server = http_1.createServer((request, response) => {
            request.addListener('end', () => {
                fileServer.serve(request, response);
            }).resume();
        }).listen(options.port || 8080);
        var ifs = os_1.networkInterfaces();
        var ip = Object.keys(ifs)
            .map(x => ifs[x].filter((x) => x.family === 'IPv4' && !x.internal)[0])
            .filter(x => x)[0].address;
        console.log('this.server:');
        console.log(this.server.listening);
        return { ip };
    }
    async stop() {
        return new Promise((resolve) => {
            this.server.close().once('close', () => {
                console.log('this.server:');
                console.log(this.server.listening);
                resolve();
            });
        });
    }
}
var FileServer_1 = src.FileServer = FileServer;

exports.FileServer = FileServer_1;
exports['default'] = src;
//# sourceMappingURL=plugin.js.map
