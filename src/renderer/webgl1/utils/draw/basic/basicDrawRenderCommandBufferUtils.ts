import { DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { getMatrix4DataSize } from "../../../../../utils/typeArrayUtils";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../data/material_config";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import {
    drawGameObjects,
    updateSendMatrixFloat32ArrayData
} from "../../../../utils/draw/drawRenderCommandBufferUtils";
import { IWebGL1DrawFuncDataMap } from "../../../interface/IDraw";
import { WebGL1BasicSendUniformDataDataMap } from "../../../type/utilsType";
import { BasicRenderCommandBufferForDrawData } from "../../../../type/dataType";
import { buildRenderCommandUniformData } from "../../../../utils/draw/basic/basicDrawRenderCommandBufferUtils";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL1DrawFuncDataMap, drawDataMap: DrawDataMap, sendDataMap:WebGL1BasicSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData) => {
    var {
            BasicDrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        {
            vMatrices,
            pMatrices
        } = bufferData,
        mat4Length = getMatrix4DataSize(),
        {
            mMatrixFloatArrayForSend,
            vMatrixFloatArrayForSend,
         pMatrixFloatArrayForSend
        } = BasicDrawRenderCommandBufferDataFromSystem;

    updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);

    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "BasicRender", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend), bufferData);

    return state;
};
