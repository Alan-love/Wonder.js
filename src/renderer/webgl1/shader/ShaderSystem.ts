import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { Map } from "immutable";
import { IWebGL1ShaderLibContentGenerator } from "../../worker/webgl1/both_file/data/shaderLib_generator";
import { InitShaderDataMap } from "../../type/utilsType";
import { getGL } from "../../device/DeviceManagerSystem";
import { getMapCount } from "../../texture/MapManagerSystem";
import {
    initNoMaterialShader as initNoMaterialShaderUtils, initMaterialShader as initMaterialShaderUtils,
    bindIndexBuffer as bindIndexBufferUtils, initData as initDataUtils
} from "../utils/worker/render_file/shader/shaderUtils";
import { buildGLSLSource } from "./ShaderSourceBuildSystem";
import { IMaterialConfig, MaterialShaderLibConfig } from "../../data/material_config_interface";
import { hasDiffuseMap, hasSpecularMap } from "../../../component/material/LightMaterialSystem";
import { getIndices, getNormals, getTexCoords, getVertices } from "../../../component/geometry/GeometrySystem";

export var initNoMaterialShader = null;

export var initMaterialShader = null;

export var bindIndexBuffer = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    initNoMaterialShader = (state: Map<any, any>, shaderName: string, materialShaderLibConfig: MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
        initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };

    initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
        return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };

    bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ProgramData: any, GeometryData: any, IndexBufferData: any) => {
        bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramData, GeometryData, IndexBufferData);
    }

    const _buildInitShaderFuncDataMap =() => {
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
        }
    }
}

export const initData = initDataUtils;
