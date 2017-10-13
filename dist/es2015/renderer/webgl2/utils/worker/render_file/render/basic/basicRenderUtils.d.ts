import { InitShaderDataMap } from "../../../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../../worker/both_file/data/render_config";
import { IWebGL2BasicDrawFuncDataMap } from "../../../../../interface/IDraw";
import { BasicRenderCommandBufferForDrawData, CameraRenderCommandBufferForDrawData } from "../../../../../../utils/worker/render_file/type/dataType";
import { IWebGL2BasicSendUniformDataDataMap, IWebGL2DrawDataMap } from "../../interface/IUtils";
export declare const render: (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap: IWebGL2BasicDrawFuncDataMap, drawDataMap: IWebGL2DrawDataMap, sendDataMap: IWebGL2BasicSendUniformDataDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, cameraData: CameraRenderCommandBufferForDrawData) => void;
