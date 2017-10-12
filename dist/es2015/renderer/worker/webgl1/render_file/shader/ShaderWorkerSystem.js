import { getGL } from "../../../both_file/device/DeviceManagerWorkerSystem";
import { getMapCount } from "../../../render_file/texture/MapManagerWorkerSystem";
import { bindIndexBuffer as bindIndexBufferUtils, initData as initDataUtils, initMaterialShader as initMaterialShaderUtils, initNoMaterialShader as initNoMaterialShaderUtils } from "../../../../webgl1/utils/worker/render_file/shader/shaderUtils";
import { buildGLSLSource } from "./ShaderSourceBuildWorkerSystem";
import { hasDiffuseMap, hasSpecularMap } from "../../../render_file/material/LightMaterialWorkerSystem";
import { getIndices, getNormals, getTexCoords, getVertices } from "../../../render_file/geometry/GeometryWorkerSystem";
export var initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, initShaderDataMap) {
    initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};
export var initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, initShaderDataMap) {
    return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};
var _buildInitShaderFuncDataMap = function () {
    return {
        buildGLSLSource: buildGLSLSource,
        getGL: getGL,
        getMapCount: getMapCount,
        hasSpecularMap: hasSpecularMap,
        hasDiffuseMap: hasDiffuseMap,
        getVertices: getVertices,
        getNormals: getNormals,
        getTexCoords: getTexCoords,
        getIndices: getIndices
    };
};
export var bindIndexBuffer = function (gl, geometryIndex, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData) {
    bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
};
export var initData = initDataUtils;
//# sourceMappingURL=ShaderWorkerSystem.js.map