import { Color } from "../../../../../structure/Color";
import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../../../common/operateBufferDataUtils";
import {
    cleanDirty, getColorDataSize as getSpecifyLightColorDataSize, getDirtyDataSize,
    isDirty
} from "./specifyLightUtils";

export const getColorArr3 = (index: number, AmbientLightDataFromSystem: any) => {
    return getColorArr3Utils(index, AmbientLightDataFromSystem);
}

export const getColorDataSize = getSpecifyLightColorDataSize;

export const createTypeArrays = (buffer: any, count: number, AmbientLightDataFromSystem: any) => {
    var offset = 0;

    AmbientLightDataFromSystem.colors = new Float32Array(buffer, 0, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    AmbientLightDataFromSystem.isColorDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();
}

export const isColorDirty = (index: number, AmbientLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, AmbientLightDataFromSystem.isColorDirtys));
}

export const cleanColorDirty = (index: number, AmbientLightDataFromSystem: any) => {
    cleanDirty(index, AmbientLightDataFromSystem.isColorDirtys);
}
