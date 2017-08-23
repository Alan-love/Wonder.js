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
var SpecifyLightData_1 = require("./SpecifyLightData");
var PointLightData = (function (_super) {
    __extends(PointLightData, _super);
    function PointLightData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointLightData.intensities = null;
    PointLightData.constants = null;
    PointLightData.linears = null;
    PointLightData.quadratics = null;
    PointLightData.ranges = null;
    PointLightData.isPositionDirtys = null;
    PointLightData.isIntensityDirtys = null;
    PointLightData.isAttenuationDirtys = null;
    PointLightData.defaultIntensity = null;
    PointLightData.defaultConstant = null;
    PointLightData.defaultLinear = null;
    PointLightData.defaultQuadratic = null;
    PointLightData.defaultRange = null;
    return PointLightData;
}(SpecifyLightData_1.SpecifyLightData));
exports.PointLightData = PointLightData;
//# sourceMappingURL=PointLightData.js.map