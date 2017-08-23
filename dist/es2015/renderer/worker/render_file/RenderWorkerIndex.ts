import { onerrorHandler, onmessageHandler } from "./RenderWorkerSystem";

onerror = (msg: string, fileName: string, lineno: number) => {
    onerrorHandler(msg, fileName, lineno);
};

onmessage = (e) => {
    onmessageHandler(e);
};

/*!
export for unit test
 */
export { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
export { ArrayBufferWorkerData } from "./buffer/ArrayBufferWorkerData";
export { IndexBufferWorkerData } from "./buffer/IndexBufferWorkerData";
export { DataBufferConfig } from "../../../config/DataBufferConfig";
export { GeometryWorkerData } from "./geometry/GeometryWorkerData";
export { AmbientLightWorkerData } from "./light/AmbientLightWorkerData";
export { ERenderWorkerState } from "../both_file/ERenderWorkerState";
export { InitConfigWorkerData } from "./config/InitConfigWorkerData";
export { TextureWorkerData } from "./texture/TextureWorkerData";
export { LightMaterialWorkerData } from "./material/LightMaterialWorkerData";
export { WebGLDetectWorkerData } from "./device/WebGLDetectWorkerData";
export { WebGL1DirectionLightWorkerData } from "../webgl1/render_file/light/DirectionLightWorkerData";
export { WebGL2DirectionLightWorkerData } from "../webgl2/render_file/light/DirectionLightWorkerData";
export { WebGL1PointLightWorkerData } from "../webgl1/render_file/light/PointLightWorkerData";
export { WebGL2PointLightWorkerData } from "../webgl2/render_file/light/PointLightWorkerData";
export { GPUDetectWorkerData } from "./device/GPUDetectWorkerData";
export { BasicDrawRenderCommandBufferWorkerData } from "./draw/basic/BasicDrawRenderCommandBufferWorkerData";
export { LightDrawRenderCommandBufferWorkerData } from "./draw/light/LightDrawRenderCommandBufferWorkerData";
export { Log } from "../../../utils/Log";
export { WebGL1GLSLSenderWorkerData } from "../webgl1/render_file/shader/glslSender/GLSLSenderWorkerData";
export { WebGL2GLSLSenderWorkerData } from "../webgl2/render_file/shader/glslSender/GLSLSenderWorkerData";
export { WebGL1ProgramWorkerData } from "../webgl1/render_file/shader/program/ProgramWorkerData";
export { WebGL2ProgramWorkerData } from "../webgl2/render_file/shader/program/ProgramWorkerData";
export { VaoWorkerData } from "./vao/VaoWorkerData";
export { WebGL1LocationWorkerData } from "../webgl1/render_file/shader/location/LocationWorkerData";
export { WebGL2LocationWorkerData } from "../webgl2/render_file/shader/location/LocationWorkerData";
export { WebGL1ShaderWorkerData } from "../webgl1/render_file/shader/ShaderWorkerData";
export { WebGL2ShaderWorkerData } from "../webgl2/render_file/shader/ShaderWorkerData";
export { StateWorkerData } from "./state/StateWorkerData";
