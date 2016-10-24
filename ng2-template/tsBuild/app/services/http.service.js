"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
    HttpService.prototype.resetHeaders = function () {
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    };
    HttpService.prototype.updateHeader = function (key, value) {
        this.headers[key] = value;
    };
    HttpService.prototype.clearToken = function (key) {
        delete this.headers[key];
    };
    HttpService.prototype.get = function (url) {
        return this.request('get', url);
    };
    HttpService.prototype.post = function (url, body) {
        if (body === void 0) { body = {}; }
        return this.request('post', url, body);
    };
    HttpService.prototype.put = function (url, body) {
        if (body === void 0) { body = {}; }
        return this.request('put', url, body);
    };
    HttpService.prototype.delete = function (url, body) {
        if (body === void 0) { body = {}; }
        return this.request('delete', url, body);
    };
    HttpService.prototype.request = function (method, url, body) {
        if (body === void 0) { body = {}; }
        var headers = new http_1.Headers(this.headers);
        var endsInSlashOrParams = /.*\/$|.*\?.*/g;
        if (!endsInSlashOrParams.test(url)) {
            url += '/';
        }
        var options = new http_1.RequestOptions({ headers: headers });
        var obs;
        if (method.toLowerCase() === 'get') {
            obs = this.http[method](url, options);
        }
        else {
            obs = this.http[method](url, body, options);
        }
        return obs.map(function (res) {
            try {
                return res.json();
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.log(e);
            }
            return {};
        });
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map