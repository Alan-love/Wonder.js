import { SendUniformDataGLSLSenderDataMap } from "../../type/utilsType";

export type WebGL1LightSendUniformDataDataMap = {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
    ambientLightData: WebGL1SendUniformDataAmbientLightDataMap;
    directionLightData: WebGL1SendUniformDataDirectionLightDataMap;
    pointLightData: WebGL1SendUniformDataPointLightDataMap;
}

export type WebGL1BasicSendUniformDataDataMap = {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
}

export type WebGL1SendUniformDataAmbientLightDataMap = {
    getColorArr3: Function;

    AmbientLightDataFromSystem: any;
}

export type WebGL1SendUniformDataDirectionLightDataMap = {
    getColorArr3: Function;
    getIntensity: Function;
    getPosition: Function;

    DirectionLightDataFromSystem: any;
}

export type WebGL1SendUniformDataPointLightDataMap = {
    getColorArr3: Function;
    getIntensity: Function;
    getConstant: Function;
    getLinear: Function;
    getQuadratic: Function;
    getRange: Function;
    getPosition: Function;

    PointLightDataFromSystem: any;
}

export type WebGL1InitShaderFuncDataMap = {
    buildGLSLSource: Function;
    getGL: Function;
    getMapCount: Function;
    hasSpecularMap: Function;
}

export type WebGL1DrawDataMap = {
    DeviceManagerDataFromSystem: any;
    TextureDataFromSystem: any;
    TextureCacheDataFromSystem: any;
    MapManagerDataFromSystem: any;
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
    AmbientLightDataFromSystem: any;
    DirectionLightDataFromSystem: any;
    PointLightDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    GeometryDataFromSystem: any;
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
    BasicDrawRenderCommandBufferDataFromSystem: any;
    LightDrawRenderCommandBufferDataFromSystem: any;
}
