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
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Event } from "./Event";
import { EEventType } from "./EEventType";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { JudgeUtils } from "../../utils/JudgeUtils";
var CustomEvent = CustomEvent_1 = (function (_super) {
    __extends(CustomEvent, _super);
    function CustomEvent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args[0]) || this;
        _this.type = EEventType.CUSTOM;
        _this.userData = null;
        if (args.length === 2) {
            var userData = args[1];
            _this.userData = userData;
        }
        return _this;
    }
    CustomEvent.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var obj = null;
        if (args.length === 1) {
            obj = new this(args[0]);
        }
        else {
            obj = new this(args[0], args[1]);
        }
        return obj;
    };
    CustomEvent.prototype.copyPublicAttri = function (destination, source) {
        var property = null;
        ExtendUtils.extend(destination, function (item, property) {
            return property.slice(0, 1) !== "_"
                && !JudgeUtils.isFunction(item);
        });
        return destination;
    };
    CustomEvent.prototype.clone = function () {
        var eventObj = CustomEvent_1.create(this.name);
        return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
    };
    CustomEvent.prototype.getDataFromDomEvent = function (event) {
        this.target = event.target;
        this.currentTarget = event.currentTarget;
        this.isStopPropagation = event.isStopPropagation;
    };
    return CustomEvent;
}(Event));
CustomEvent = CustomEvent_1 = __decorate([
    registerClass("CustomEvent")
], CustomEvent);
export { CustomEvent };
var CustomEvent_1;
//# sourceMappingURL=CustomEvent.js.map