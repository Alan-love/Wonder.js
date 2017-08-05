import {
    getUniformData as getUniformDataUtils, initData as initDataUtils, sendBuffer as sendBufferUtils,
    sendFloat1 as sendFloat1Utils, sendFloat3 as sendFloat3Utils, sendInt as sendIntUtils, sendMatrix3 as sendMatrix3Utils, sendMatrix4 as sendMatrix4Utils,
    sendVector3 as sendVector3Utils
} from "../../utils/shader/glslSender/glslSenderUtils";
import { RenderCommandUniformData, UniformCacheMap, UniformShaderLocationMap } from "../../type/dataType";
import { getColorArr3, getOpacity } from "../../../component/material/MaterialSystem";
import { getUniformLocation, isUniformLocationNotExist } from "../location/LocationSystem";
import {
    getEmissionColorArr3,
    getLightModel, getShininess, getSpecularColorArr3
} from "../../../component/material/LightMaterialSystem";
import { Vector3 } from "../../../math/Vector3";

export var getUniformData = (field: string, from: string, renderCommandUniformData: RenderCommandUniformData, MaterialData: any, BasicMaterialData: any, LightMaterialData: any) => {
    return getUniformDataUtils(field, from, renderCommandUniformData, {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialData
    }, {
            BasicMaterialDataFromSystem: BasicMaterialData
        }, {
            getEmissionColorArr3: getEmissionColorArr3,
            getSpecularColorArr3: getSpecularColorArr3,
            getLightModel: getLightModel,
            getShininess: getShininess,
            LightMaterialDataFromSystem: LightMaterialData
        });
};

export var sendBuffer = sendBufferUtils;

export var sendMatrix3 = (gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap) => {
    sendMatrix3Utils(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export var sendMatrix4 = (gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap) => {
    sendMatrix4Utils(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export var sendVector3 = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: Vector3, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendVector3Utils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export var sendInt = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendIntUtils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export var sendFloat1 = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendFloat1Utils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export var sendFloat3 = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: Array<number>, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendFloat3Utils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export var initData = initDataUtils;
