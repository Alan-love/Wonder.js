import { getColorDataSize } from "./materialUtils";
import { getLightMaterialBufferStartIndex } from "./bufferUtils";
import { getColorArr3Data, getSingleSizeData } from "../common/operateBufferDataUtils";
import { isValidMapValue } from "../../../utils/objectUtils";

export var getShadingDataSize = () => 1;

export var getLightModelDataSize = () => 1;

export var getShininessDataSize = () => 1;

export var getSpecularColorArr3 = (materialIndex: number, LightMaterialDataFromSystem: any) => {
    return getColorArr3Data(materialIndex, LightMaterialDataFromSystem.specularColors);
}

export var getEmissionColorArr3 = (materialIndex: number, LightMaterialDataFromSystem: any) => {
    return getColorArr3Data(materialIndex, LightMaterialDataFromSystem.emissionColors);
}

export var getShininess = (materialIndex: number, LightMaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shininess);
}

export var getShading = (materialIndex: number, LightMaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shadings);
}

export var getLightModel = (materialIndex: number, LightMaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.lightModels);
}

export var hasDiffuseMap = (materialIndex:number, LightMaterialDataFromSystem: any) => {
    return _isLightMapExist(LightMaterialDataFromSystem.diffuseMapMap[materialIndex]);
}

export var hasSpecularMap = (materialIndex:number, LightMaterialDataFromSystem: any) => {
    return _isLightMapExist(LightMaterialDataFromSystem.specularMapMap[materialIndex]);
}

var _isLightMapExist = (mapIndex: number) => isValidMapValue(mapIndex);

export var computeLightBufferIndex = (index: number) => index - getLightMaterialBufferStartIndex();


export var createTypeArrays = (buffer: any, offset: number, count: number, LightMaterialDataFromSystem: any) => {
    LightMaterialDataFromSystem.specularColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    LightMaterialDataFromSystem.emissionColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    LightMaterialDataFromSystem.shininess = new Float32Array(buffer, offset, count * getShininessDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getShininessDataSize();

    LightMaterialDataFromSystem.shadings = new Uint8Array(buffer, offset, count * getShadingDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getShadingDataSize();

    LightMaterialDataFromSystem.lightModels = new Uint8Array(buffer, offset, count * getLightModelDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getLightModelDataSize();

    return offset;
}

export var getClassName = () => "LightMaterial";
