import { Map } from "immutable";
import {  bindGBufferTargets, init as initGBuffer, sendGBufferTargetData  } from "./gbuffer/gBufferUtils";
import { init as initDeferLightPass } from "./light/deferLightPassUtils";
import { use } from "../../../utils/shader/shaderUtils";
import { draw as deferDraw } from "./draw/deferDrawRenderCommandBufferUtils";
import { IMaterialConfig } from "../../../data/material_config";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import { RenderCommandBufferForDrawData } from "../../../type/dataType";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { WebGL2DrawFuncDataMap, WebGL2SendUniformDataDataMap } from "../../type/utilsType";
import { getNoMaterialShaderIndex } from "../shaderUtils";

export var init = (gl:any, GBufferDataFromSystem:any, DeferLightPassDataFromSystem:any, ShaderDataFromSystem:any, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) => {
    initGBuffer(gl, GBufferDataFromSystem);
    initDeferLightPass(gl, DeferLightPassDataFromSystem);

    //todo optimize: when switch to defer shading, bind and send gbuffer textures

    bindGBufferTargets(gl, GBufferDataFromSystem);

    let shaderIndex = getNoMaterialShaderIndex("DeferLightPass", ShaderDataFromSystem);

    let program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    sendGBufferTargetData(gl, program);
}

export var draw = (gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:WebGL2DrawFuncDataMap, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, sendDataMap:WebGL2SendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    deferDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData);
}
