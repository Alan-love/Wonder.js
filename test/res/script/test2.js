var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../dist/wd.all.d.ts"/>
var sample;
(function (sample) {
    var Test2 = (function () {
        function Test2(gameObject) {
            this.gameObject = null;
            this.gameObject = gameObject;
        }
        Test2.prototype.init = function () {
        };
        Test2.prototype.update = function (time) {
            this.gameObject.scriptList.getChild("test").update(time);
        };
        Test2.prototype.onEnter = function () {
        };
        Test2.prototype.onStartLoop = function () {
        };
        Test2.prototype.onEndLoop = function () {
        };
        Test2.prototype.onExit = function () {
        };
        Test2.prototype.onDispose = function () {
        };
        Test2 = __decorate([
            wd.script("test2")
        ], Test2);
        return Test2;
    }());
    sample.Test2 = Test2;
})(sample || (sample = {}));
//# sourceMappingURL=test2.js.map