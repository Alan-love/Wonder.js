import { getUniformData as getUniformDataUtils, initData as initDataUtils, sendBuffer as sendBufferUtils, sendFloat1 as sendFloat1Utils, sendFloat3 as sendFloat3Utils, sendInt as sendIntUtils, sendMatrix3 as sendMatrix3Utils, sendMatrix4 as sendMatrix4Utils, sendVector3 as sendVector3Utils } from "../../../../utils/shader/glslSender/glslSenderUtils";
import { getColorArr3, getOpacity } from "../../material/MaterialWorkerSystem";
import { getEmissionColorArr3, getLightModel, getShininess, getSpecularColorArr3 } from "../../material/LightMaterialWorkerSystem";
import { getUniformLocation, isUniformLocationNotExist } from "../location/LocationWorkerSystem";
export var getUniformData = function (field, from, renderCommandUniformData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData) {
    return getUniformDataUtils(field, from, renderCommandUniformData, {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialWorkerData
    }, {
        BasicMaterialDataFromSystem: BasicMaterialWorkerData
    }, {
        getEmissionColorArr3: getEmissionColorArr3,
        getSpecularColorArr3: getSpecularColorArr3,
        getLightModel: getLightModel,
        getShininess: getShininess,
        LightMaterialDataFromSystem: LightMaterialWorkerData
    });
};
export var sendBuffer = sendBufferUtils;
export var sendMatrix3 = function (gl, program, name, data, uniformLocationMap) {
    sendMatrix3Utils(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
export var sendMatrix4 = function (gl, program, name, data, uniformLocationMap) {
    sendMatrix4Utils(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
export var sendVector3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    sendVector3Utils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
export var sendInt = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    sendIntUtils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
export var sendFloat1 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    sendFloat1Utils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
export var sendFloat3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    sendFloat3Utils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
export var initData = initDataUtils;
//# sourceMappingURL=GLSLSenderWorkerSystem.js.map