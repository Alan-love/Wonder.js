"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkerDetectSystem_1 = require("../../../device/WorkerDetectSystem");
var DeviceManagerSystem_1 = require("../../device/DeviceManagerSystem");
var MapManagerSystem_1 = require("../../texture/MapManagerSystem");
var shaderUtils_1 = require("../utils/worker/render_file/shader/shaderUtils");
var ShaderSourceBuildSystem_1 = require("./ShaderSourceBuildSystem");
var LightMaterialSystem_1 = require("../../../component/material/LightMaterialSystem");
var GeometrySystem_1 = require("../../../component/geometry/GeometrySystem");
exports.initNoMaterialShader = null;
exports.initMaterialShader = null;
exports.bindIndexBuffer = null;
if (!WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, initShaderDataMap) {
        shaderUtils_1.initNoMaterialShader(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap_1(), initShaderDataMap);
    };
    exports.initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, initShaderDataMap) {
        return shaderUtils_1.initMaterialShader(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap_1(), initShaderDataMap);
    };
    exports.bindIndexBuffer = function (gl, geometryIndex, ProgramData, GeometryData, IndexBufferData) {
        shaderUtils_1.bindIndexBuffer(gl, geometryIndex, GeometrySystem_1.getIndices, ProgramData, GeometryData, IndexBufferData);
    };
    var _buildInitShaderFuncDataMap_1 = function () {
        return {
            buildGLSLSource: ShaderSourceBuildSystem_1.buildGLSLSource,
            getGL: DeviceManagerSystem_1.getGL,
            getMapCount: MapManagerSystem_1.getMapCount,
            hasSpecularMap: LightMaterialSystem_1.hasSpecularMap,
            hasDiffuseMap: LightMaterialSystem_1.hasDiffuseMap,
            getVertices: GeometrySystem_1.getVertices,
            getNormals: GeometrySystem_1.getNormals,
            getTexCoords: GeometrySystem_1.getTexCoords,
            getIndices: GeometrySystem_1.getIndices
        };
    };
}
exports.initData = shaderUtils_1.initData;
//# sourceMappingURL=ShaderSystem.js.map