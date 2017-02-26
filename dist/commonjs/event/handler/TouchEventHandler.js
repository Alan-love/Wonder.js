"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var singleton_1 = require("../../definition/typescript/decorator/singleton");
var PointEventHandler_1 = require("./PointEventHandler");
var EventNameHandler_1 = require("../object/EventNameHandler");
var TouchEvent_1 = require("../object/TouchEvent");
var Variable_1 = require("../../definition/Variable");
var TouchEventHandler = (function (_super) {
    __extends(TouchEventHandler, _super);
    function TouchEventHandler() {
        return _super.call(this) || this;
    }
    TouchEventHandler.getInstance = function () { };
    TouchEventHandler.prototype.addEngineHandler = function (eventName, handler) {
        var resultHandler = null;
        switch (eventName) {
            case EventNameHandler_1.EEventName.TOUCHMOVE:
                resultHandler = this.handleMove(handler);
                break;
            default:
                resultHandler = handler;
                break;
        }
        return resultHandler;
    };
    TouchEventHandler.prototype.createEventObject = function (dom, event, eventName) {
        var obj = TouchEvent_1.TouchEvent.create(event ? event : Variable_1.root.event, eventName);
        obj.target = dom;
        return obj;
    };
    return TouchEventHandler;
}(PointEventHandler_1.PointEventHandler));
TouchEventHandler = __decorate([
    singleton_1.singleton(),
    registerClass_1.registerClass("TouchEventHandler")
], TouchEventHandler);
exports.TouchEventHandler = TouchEventHandler;
//# sourceMappingURL=TouchEventHandler.js.map