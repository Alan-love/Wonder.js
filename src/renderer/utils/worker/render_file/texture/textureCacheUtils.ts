import { expect } from "wonder-expect.js";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { getMaxTextureUnit } from "../../../device/gpuDetectUtils";

export const isCached = (unitIndex: number, textureIndex: number, TextureCacheDataFromSystem: any, GPUDetectDataFromSystem: any) => {
    return _getActiveTexture(unitIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) === textureIndex;
}

const _getActiveTexture = requireCheckFunc((unitIndex: number, TextureCacheDataFromSystem: any, GPUDetectDataFromSystem: any) => {
    _checkUnit(unitIndex, GPUDetectDataFromSystem);
}, (unitIndex: number, TextureCacheDataFromSystem: any, GPUDetectDataFromSystem: any) => {
    return TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex];
})

export const addActiveTexture = requireCheckFunc((unitIndex: number, textureIndex: number, TextureCacheDataFromSystem: any, GPUDetectDataFromSystem: any) => {
    _checkUnit(unitIndex, GPUDetectDataFromSystem);
}, (unitIndex: number, textureIndex: number, TextureCacheDataFromSystem: any, GPUDetectDataFromSystem: any) => {
    TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex] = textureIndex;
})

const _checkUnit = (unitIndex: number, GPUDetectDataFromSystem: any) => {
    var maxTextureUnit = getMaxTextureUnit(GPUDetectDataFromSystem);

    it(`texture unitIndex should >= 0, but actual is ${unitIndex}`, () => {
        expect(unitIndex).gte(0);
    });
    it(`trying to cache ${unitIndex} texture unitIndexs, but GPU only supports ${maxTextureUnit} unitIndexs`, () => {
        expect(unitIndex).lt(maxTextureUnit);
    });
}

export const clearAllBindTextureUnitCache = (TextureCacheDataFromSystem: any) => {
    TextureCacheDataFromSystem.bindTextureUnitCache = [];
}

export const initData = (TextureCacheDataFromSystem: any) => {
    TextureCacheDataFromSystem.bindTextureUnitCache = [];
}
