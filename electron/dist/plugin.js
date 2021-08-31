'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0 = require('http');
var require$$1 = require('node-static');
var require$$2 = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);

var src = {};

Object.defineProperty(src, "__esModule", { value: true });
exports.FileServer = src.FileServer = void 0;
const http_1 = require$$0__default['default'];
const node_static_1 = require$$1__default['default'];
const os_1 = require$$2__default['default'];
class FileServer {
    constructor() {
        this.server = null;
    }
    async start(options) {
        return new Promise((resolve, reject) => {
            const fileServer = new node_static_1.Server(options.path);
            this.server = http_1.createServer((request, response) => {
                request.addListener('end', () => {
                    fileServer.serve(request, response);
                }).resume();
            }).listen(options.port || 8080, () => {
                const ifs = os_1.networkInterfaces();
                const ip = Object.keys(ifs)
                    .map((key) => ifs[key].filter((x) => x.family === 'IPv4' && !x.internal)[0])
                    .filter(x => x)[0].address;
                console.log('this.server:');
                console.log(this.server.listening);
                resolve({ ip });
            });
            this.server.once('error', (err) => {
                console.log('There was an error starting the server in the error listener:', err);
                reject(err);
            });
        });
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
exports.FileServer = src.FileServer = FileServer;

exports['default'] = src;
//# sourceMappingURL=plugin.js.map
