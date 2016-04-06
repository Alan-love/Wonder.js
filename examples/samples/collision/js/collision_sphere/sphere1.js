var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Sphere1 = (function () {
        function Sphere1(gameObject) {
            this._gameObject = null;
            this._collidingMaterial = null;
            this._originMaterial = null;
            this._gameObject = gameObject;
        }
        Sphere1.prototype.init = function () {
            var gameObject = this._gameObject, geometry = this._gameObject.getComponent(wd.Geometry);
            this._collidingMaterial = wd.LightMaterial.create();
            this._collidingMaterial.color = wd.Color.create("rgb(255,0,0)");
            this._collidingMaterial.geometry = geometry;
            this._collidingMaterial.init();
            this._originMaterial = geometry.material;
            wd.EventManager.fromEvent(wd.EEventName.KEYDOWN)
                .subscribe(function (e) {
                var keyState = e.keyState, x = 0, z = 0, moveSpeedX = 0.5, moveSpeedZ = 0.5;
                if (keyState["a"]) {
                    x = -moveSpeedX;
                }
                else if (keyState["d"]) {
                    x = moveSpeedX;
                }
                else if (keyState["w"]) {
                    z = -moveSpeedZ;
                }
                else if (keyState["s"]) {
                    z = moveSpeedZ;
                }
                gameObject.transform.translate(x, 0, z);
            });
        };
        Sphere1.prototype.onContact = function (collisionObjects) {
            console.log("contact", collisionObjects);
        };
        Sphere1.prototype.onCollisionStart = function (collisionObjects) {
            console.log("collision start", collisionObjects);
            var geometry = this._gameObject.getComponent(wd.Geometry);
            geometry.material = this._collidingMaterial;
        };
        Sphere1.prototype.onCollisionEnd = function () {
            console.log("collision end");
            var geometry = this._gameObject.getComponent(wd.Geometry);
            geometry.material = this._originMaterial;
        };
        Sphere1 = __decorate([
            wd.script("sphere1")
        ], Sphere1);
        return Sphere1;
    }());
    sample.Sphere1 = Sphere1;
})(sample || (sample = {}));
