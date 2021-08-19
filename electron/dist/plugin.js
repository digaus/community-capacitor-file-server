'use strict';

var require$$0$1 = require('tslib');
var require$$0 = require('os');
var require$$1 = require('http');
var require$$2 = require('node-static');
var require$$3 = require('electron');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var src = {};

var plugin = {};

Object.defineProperty(plugin, "__esModule", { value: true });
class FileServer {
    constructor() {
        this.Os = null;
        this.Http = null;
        this.StaticServer = null;
        this.RemoteRef = null;
        this.server = null;
        this.Os = require$$0__default['default'];
        this.Http = require$$1__default['default'];
        this.StaticServer = require$$2__default['default'];
        this.RemoteRef = require$$3__default['default'];
    }
    async start(options) {
        const fileServer = new this.StaticServer.Server(options.path);
        this.server = this.Http.createServer((request, response) => {
            request.addListener('end', () => {
                console.log(request);
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
plugin.FileServer = FileServer;

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require$$0__default$1['default'];
tslib_1.__exportStar(plugin, exports);

}(src));

var index = /*@__PURE__*/getDefaultExportFromCjs(src);

module.exports = index;
//# sourceMappingURL=plugin.js.map
