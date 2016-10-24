"use strict";
var rxjs_1 = require('rxjs');
var store_1 = require('../services/store');
var api_config_1 = require('../services/api.config');
;
var AbscractModelService = (function () {
    function AbscractModelService(modelName, endpoint, http) {
        this.modelName = modelName;
        this.endpoint = endpoint;
        this.http = http;
        this.dataStore = store_1.default;
    }
    AbscractModelService.prototype.read = function (id, options) {
        if (options === void 0) { options = { force: false }; }
        var promise = this.dataStore.find(this.modelName, id)
            .then(function (response) { return response; }, function (error) {
            // tslint:disable-next-line:no-console
            return error;
        });
        return rxjs_1.Observable.fromPromise(promise);
    };
    AbscractModelService.prototype.readList = function (params, options) {
        if (options === void 0) { options = { force: false }; }
        var promise = this.dataStore.findAll(this.modelName, params, options);
        return rxjs_1.Observable.fromPromise(promise);
    };
    AbscractModelService.prototype.create = function (attrs, options) {
        var promise = this.dataStore.create(this.modelName, attrs, options);
        return rxjs_1.Observable.fromPromise(promise);
    };
    AbscractModelService.prototype.update = function (id, attrs, options) {
        var promise = this.dataStore.update(this.modelName, id, attrs, options);
        return rxjs_1.Observable.fromPromise(promise);
    };
    AbscractModelService.prototype.destroy = function (id) {
        var promise = this.dataStore.destroy(this.modelName, id)
            .then(function (destroyedId) { return destroyedId; });
        return rxjs_1.Observable.fromPromise(promise);
    };
    AbscractModelService.prototype.getFullUrlPath = function () {
        return api_config_1.default.createWithApiUrl(this.endpoint) + "/";
    };
    AbscractModelService.prototype.detailRoute = function (id, path) {
        var url = "" + this.getFullUrlPath() + id + "/" + path;
        return this.createRouteObj(url);
    };
    AbscractModelService.prototype.listRoute = function (path) {
        return this.createRouteObj(this.getFullUrlPath() + path);
    };
    AbscractModelService.prototype.add = function (data) {
        return this.dataStore.add(this.modelName, data);
    };
    AbscractModelService.prototype.createRouteObj = function (url) {
        return {
            post: this.http.post.bind(this.http, url),
            get: this.http.get.bind(this.http, url),
            put: this.http.put.bind(this.http, url),
        };
    };
    return AbscractModelService;
}());
exports.AbscractModelService = AbscractModelService;
//# sourceMappingURL=abstract.js.map