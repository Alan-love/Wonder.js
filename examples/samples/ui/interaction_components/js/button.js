var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var Button = wd.Button;
    var PlainFont = wd.PlainFont;
    var EventHandler = (function () {
        function EventHandler(entityObject) {
            this._entityObject = null;
            this._entityObject = entityObject;
        }
        EventHandler.prototype.init = function () {
            // can set Button Font here
            var font = this._entityObject.getComponent(Button).getFontObject().getComponent(PlainFont);
            font.fontSize = 30;
        };
        EventHandler.prototype.onMouseClick = function (e) {
            if (this._entityObject.getComponent(Button).isDisabled()) {
                return;
            }
            console.log("click");
        };
        EventHandler = __decorate([
            wd.script("eventHandler")
        ], EventHandler);
        return EventHandler;
    })();
    sample.EventHandler = EventHandler;
})(sample || (sample = {}));
