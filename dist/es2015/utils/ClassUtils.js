var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ensure, it } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
var ClassUtils = (function () {
    function ClassUtils() {
    }
    ClassUtils.getClassNameByInstance = function (obj) {
        return obj.constructor["className"];
    };
    ClassUtils.getClassNameByClass = function (_class) {
        return _class["className"];
    };
    ClassUtils.addClass = function (className, _class) {
        this._classMap[className] = _class;
    };
    ClassUtils.addClassNameAttributeToClass = function (className, _class) {
        _class["className"] = className;
    };
    ClassUtils.getClass = function (className) {
        return this._classMap[className];
    };
    return ClassUtils;
}());
export { ClassUtils };
ClassUtils._classMap = {};
__decorate([
    ensure(function (className) {
        it("should exist class name", function () {
            expect(className).exist;
            expect(className !== "").true;
        });
    })
], ClassUtils, "getClassNameByInstance", null);
__decorate([
    ensure(function (className) {
        it("should exist class name", function () {
            expect(className).exist;
            expect(className !== "").true;
        });
    })
], ClassUtils, "getClassNameByClass", null);
//# sourceMappingURL=ClassUtils.js.map