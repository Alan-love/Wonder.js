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
Object.defineProperty(exports, "__esModule", { value: true });
var PointLightData_1 = require("../../../component/light/PointLightData");
var WebGL2PointLightData = (function (_super) {
    __extends(WebGL2PointLightData, _super);
    function WebGL2PointLightData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebGL2PointLightData;
}(PointLightData_1.PointLightData));
exports.WebGL2PointLightData = WebGL2PointLightData;
//# sourceMappingURL=PointLightData.js.map