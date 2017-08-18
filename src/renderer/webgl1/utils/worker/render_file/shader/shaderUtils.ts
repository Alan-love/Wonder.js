import { addSendAttributeConfig, addSendUniformConfig, addVaoConfig } from "./glslSender/glslSenderUtils";
import { IWebGL1ShaderLibConfig, IWebGL1ShaderLibContentGenerator } from "../../../../../worker/webgl1/both_file/data/shaderLib_generator";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { Map } from "immutable";
import { getMaterialShaderLibNameArr } from "./shaderSourceBuildUtils";
import { getMaterialShaderLibConfig } from "../../../../data/MaterialConfigSystem";
import { IMaterialConfig, IShaderLibItem, MaterialShaderLibConfig } from "../../../../../data/material_config_interface";
import { genereateShaderIndex, initShader as initShaderUtils } from "../../../../../utils/shader/shaderUtils";
import { getProgram } from "../../../../../utils/worker/render_file/shader/program/programUtils";
import { initShader, isProgramExist, registerProgram } from "../../../../../utils/shader/program/programUtils";
import { setEmptyLocationMap } from "../../../../../utils/shader/location/locationUtils";
import { getOrCreateBuffer } from "../../../../../utils/buffer/indexBufferUtils";
import { WebGL1InitShaderFuncDataMap } from "../../../../type/utilsType";
import { bindVao as bindVaoUtils, createVao, unbindVao } from "../vao/vaoUtils";
import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import {
    createAndInitArrayBuffer,
    createAndInitIndexBuffer
} from "../../../../../utils/worker/render_file/shader/shaderUtils";
import { hasExtension } from "../../../../../utils/device/gpuDetectUtils";
import { getExtensionVao } from "../device/gpuDetectUtils";
import { getAttribLocation } from "./location/locationUtils";

export var initNoMaterialShader = (state: Map<any, any>, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderFuncDataMap: WebGL1InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    initShaderUtils(state, null, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
}

export var initMaterialShader = (state: Map<any, any>, materialIndex:number, shaderName:string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderFuncDataMap: WebGL1InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    return initShaderUtils(state, materialIndex, shaderName, getMaterialShaderLibConfig(shaderName, material_config), material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
}

var _init = (state: Map<any, any>, materialIndex:number|null, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderFuncDataMap: WebGL1InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var {
            ShaderDataFromSystem,
            DeviceManagerDataFromSystem,
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem,
            GPUDetectDataFromSystem
        } = initShaderDataMap,
        materialShaderLibNameArr = getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap),
        shaderIndex = genereateShaderIndex(ShaderDataFromSystem),
        program = getProgram(shaderIndex, ProgramDataFromSystem),
        shaderLibDataFromSystem: IWebGL1ShaderLibConfig = null,
        gl = null;

    if (isProgramExist(program)) {
        return shaderIndex;
    }

    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;

    let {
        vsSource,
        fsSource
    } = initShaderFuncDataMap.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap);

    gl = initShaderFuncDataMap.getGL(DeviceManagerDataFromSystem, state);

    program = gl.createProgram();

    registerProgram(shaderIndex, ProgramDataFromSystem, program);
    initShader(program, vsSource, fsSource, gl);

    setEmptyLocationMap(shaderIndex, LocationDataFromSystem);

    if(hasExtension(getExtensionVao(GPUDetectDataFromSystem))){
        addVaoConfig(gl, shaderIndex, program, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.attributeLocationMap, GLSLSenderDataFromSystem.vaoConfigMap, initShaderFuncDataMap);
    }
    else{
        addSendAttributeConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    }

    addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);

    return shaderIndex;
}

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, getIndicesFunc: Function, ProgramDataFromSystem: any, GeometryWorkerDataFromSystem: any, IndexBufferDataFromSystem: any) => {
    var buffer = getOrCreateBuffer(gl, geometryIndex, getIndicesFunc, GeometryWorkerDataFromSystem, IndexBufferDataFromSystem);

    if (ProgramDataFromSystem.lastBindedIndexBuffer === buffer) {
        return;
    }

    ProgramDataFromSystem.lastBindedIndexBuffer = buffer;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
}

export var bindVao = (extension:any, vao: WebGLVertexArrayObject, ProgramDataFromSystem: any) => {
    if (ProgramDataFromSystem.lastBindedVao === vao) {
        return;
    }

    ProgramDataFromSystem.lastBindedVao = vao;

    bindVaoUtils(extension, vao);
}

export var createAndInitVao = (gl: any, extension:any, geometryIndex: number, vaos: Array<WebGLVertexArrayObject>, {
    positionLocation,
    normalLocation,
    texCoordLocation,

    getVertices,
    getNormals,
    getTexCoords,
    getIndices
}, GeometryDataFromSystem: any) => {
    var vao = createVao(extension);

    vaos[geometryIndex] = vao;

    bindVaoUtils(extension, vao);

    if (!!getVertices) {
        createAndInitArrayBuffer(gl, getVertices(geometryIndex, GeometryDataFromSystem), positionLocation, 3);
    }

    if (!!getNormals) {
        createAndInitArrayBuffer(gl, getNormals(geometryIndex, GeometryDataFromSystem), normalLocation, 3);
    }

    if (!!getTexCoords) {
        createAndInitArrayBuffer(gl, getTexCoords(geometryIndex, GeometryDataFromSystem), texCoordLocation, 2);
    }

    createAndInitIndexBuffer(gl, getIndices(geometryIndex, GeometryDataFromSystem));

    unbindVao(extension);

    return vao;
}
