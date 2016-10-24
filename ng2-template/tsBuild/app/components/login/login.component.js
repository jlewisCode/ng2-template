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
var router_1 = require('@angular/router');
var services_1 = require('../../services');
var LoginRoute = (function () {
    function LoginRoute(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    LoginRoute.prototype.login = function () {
        var _this = this;
        this.error = '';
        this.auth.login(this.username, this.password)
            .subscribe(function () { return _this.router.navigate(['/']); }, function (err) { _this.error = 'Incorrect Credentials. Please try again.'; });
    };
    LoginRoute.prototype.resetPassword = function () {
        var _this = this;
        this.auth.resetPassword(this.username)
            .subscribe(function () {
            _this.router.navigate(['/']);
        });
    };
    LoginRoute = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'login.component.html',
            styleUrls: ['./login.component.scss'],
            providers: [],
        }), 
        __metadata('design:paramtypes', [services_1.AuthService, router_1.Router])
    ], LoginRoute);
    return LoginRoute;
}());
exports.LoginRoute = LoginRoute;
//# sourceMappingURL=login.component.js.map