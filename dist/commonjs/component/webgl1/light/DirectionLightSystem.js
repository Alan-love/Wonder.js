"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpecifyLightSystem_1 = require("../../light/SpecifyLightSystem");
var DirectionLightData_1 = require("../../../renderer/webgl1/light/DirectionLightData");
var DirectionLightSystem_1 = require("../../light/DirectionLightSystem");
exports.addComponent = function (component, gameObject) {
    SpecifyLightSystem_1.addComponent(component, gameObject, DirectionLightData_1.WebGL1DirectionLightData);
};
exports.disposeComponent = function (component) {
    DirectionLightSystem_1.disposeComponent(component, DirectionLightData_1.WebGL1DirectionLightData);
};
//# sourceMappingURL=DirectionLightSystem.js.map