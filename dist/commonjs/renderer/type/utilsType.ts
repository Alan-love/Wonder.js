export type SendUniformDataGLSLSenderDataMap = {
    sendMatrix3: Function;
    sendMatrix4: Function;
    sendVector3: Function;
    sendInt: Function;
    sendFloat1: Function;
    sendFloat3: Function;

    GLSLSenderDataFromSystem: any;
}

export type MaterialForGetUniformDataDataMap = {
    getColorArr3: Function;
    getOpacity: Function;
    MaterialDataFromSystem: any;
}

export type BasicMaterialForGetUniformDataDataMap = {
    BasicMaterialDataFromSystem: any;
}

export type LightMaterialForGetUniformDataDataMap = {
    getSpecularColorArr3: Function;
    getEmissionColorArr3: Function;
    getShininess: Function;
    getLightModel: Function;
    LightMaterialDataFromSystem: any;
}

export type InitShaderDataMap = {
    GPUDetectDataFromSystem: any;
    DeviceManagerDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    ShaderDataFromSystem: any;
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
    MapManagerDataFromSystem: any;
    AmbientLightDataFromSystem: any;
    DirectionLightDataFromSystem: any;
    PointLightDataFromSystem: any;
    VaoDataFromSystem: any;
}
