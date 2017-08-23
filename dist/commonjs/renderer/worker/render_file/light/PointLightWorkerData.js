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
var SpecifyLightWorkerData_1 = require("./SpecifyLightWorkerData");
var PointLightWorkerData = (function (_super) {
    __extends(PointLightWorkerData, _super);
    function PointLightWorkerData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointLightWorkerData.intensities = null;
    PointLightWorkerData.constants = null;
    PointLightWorkerData.linears = null;
    PointLightWorkerData.quadratics = null;
    PointLightWorkerData.ranges = null;
    PointLightWorkerData.isPositionDirtys = null;
    PointLightWorkerData.isIntensityDirtys = null;
    PointLightWorkerData.isAttenuationDirtys = null;
    return PointLightWorkerData;
}(SpecifyLightWorkerData_1.SpecifyLightWorkerData));
exports.PointLightWorkerData = PointLightWorkerData;
//# sourceMappingURL=PointLightWorkerData.js.map