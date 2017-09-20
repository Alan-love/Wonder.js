import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Texture } from "./Texture";
import {
    bindAndUpdate as bindAndUpdateUtils,
    createTypeArrays,
    getBufferCount,
    getMapCount as getMapCountUtils,
    getMaterialTextures,
    getMaxTextureCount,
    getStartTextureIndex
    // initMapManager as initMapManagerUtils
} from "../utils/worker/render_file/texture/mapManagerUtils";
import {
    bindToUnit,
    initData as initTextureData,
    initTexture,
    initTextures,
    needUpdate, addNeedInitTextureIndexForWorker,
    setUniformSamplerName,
    update
} from "./TextureSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { computeBufferLength, deleteSingleValueBySwapAndReset } from "../../utils/typeArrayUtils";
import { createMap, deleteBySwap } from "../../utils/objectUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { forEach } from "../../utils/arrayUtils";

// export const create = (MapManagerData:any) => {
//     var mapManager = new MapManager(),
//         index = generateComponentIndex(MapManagerData);
//
//     mapManager.index = index;
//
//     return mapManager;
// }

export const initMapManagers = (gl: WebGLRenderingContext, TextureData: any) => {
    initTextures(gl, TextureData);
}

export const initMapManager = (gl: WebGLRenderingContext, materialIndex:number, MapManagerData: any, TextureData: any) => {
    forEach(getMaterialTextures(materialIndex, MapManagerData), (textureIndex:number) => {
        initTexture(gl, textureIndex, TextureData);
    });
}

// if(isSupportRenderWorkerAndSharedArrayBuffer()){
//     initMapManager = (gl: WebGLRenderingContext, materialIndex:number, MapManagerData: any, TextureData: any) => {
//        // addNeedInitTextureIndexForWorker(getMaterialTextures(materialIndex, MapManagerData), TextureData);
//     }
// }
// else{
//     initMapManager = (gl: WebGLRenderingContext, materialIndex:number, MapManagerData: any, TextureData: any) => {
//         // initMapManagerUtils(gl, materialIndex, initTexture, MapManagerData, TextureData);
//         forEach(getMaterialTextures(materialIndex, MapManagerData), (textureIndex:number) => {
//             initTexture(gl, textureIndex, TextureData);
//         });
//     }
// }

export const addMap = ensureFunc((returnVal:any, materialIndex: number, map: Texture, count: number, uniformSamplerName: string, MapManagerData: any, TextureData: any) => {
    it("map count shouldn't exceed max count", () => {
        expect(getMapCount(materialIndex, MapManagerData)).lte(getMaxTextureCount());
    });
}, (materialIndex: number, map: Texture, count: number, uniformSamplerName: string, MapManagerData: any, TextureData: any) => {
    var textureIndex = map.index;

    MapManagerData.textureIndices[getStartTextureIndex(materialIndex) + count] = textureIndex;

    MapManagerData.textureCounts[materialIndex] = count + 1;

    _addTextureToMaterialTextureList(materialIndex, textureIndex, MapManagerData);

    setUniformSamplerName(textureIndex, uniformSamplerName, TextureData);
})

const _addTextureToMaterialTextureList = (materialIndex:number, textureIndex:number, MapManagerData:any) => {
    var map = MapManagerData.materialTextureList[materialIndex];

    if(map === void 0){
        map = [textureIndex];

        MapManagerData.materialTextureList[materialIndex] = map;

        return;
    }

    map.push(textureIndex);
}

export const getMaterialTextureList = (MapManagerData:any) => MapManagerData.materialTextureList;

export const getMapCount = getMapCountUtils;

//todo support multi textures

// export const addMapList = (materialIndex: number, mapList: Array<Texture>, MapManagerData:any) => {
//     for(let map of mapList){
//         addMap(materialIndex, map, MapManagerData);
//     }
// }

export const bindAndUpdate = (gl: WebGLRenderingContext, mapCount: number, startTextureIndex: number, definedStartTextureUnitIndex:number, TextureCacheData: any, TextureData: any, MapManagerData: any, GPUDetectData: any) => {
    bindAndUpdateUtils(gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, TextureCacheData, TextureData, MapManagerData, GPUDetectData, bindToUnit, needUpdate, update);
}

/*!
 not dispose texture when dispose map manager(dispose material)!
 because different materials may use same texture, if dispose one material's texture which is shared, then will affect other materials!

 so need user mannually dispose texture one by one!
 */
export const dispose = (materialSourceIndex: number, materialLastComponentIndex: number, MapManagerData: any) => {
    deleteSingleValueBySwapAndReset(materialSourceIndex, materialLastComponentIndex, MapManagerData.textureCounts, 0);

    deleteBySwap(materialSourceIndex, materialLastComponentIndex, MapManagerData.materialTextureList);
}

export const initData = (TextureCacheData: any, TextureData: any, MapManagerData: any) => {
    initTextureData(TextureCacheData, TextureData);

    _initBufferData(MapManagerData);

    MapManagerData.materialTextureList = [];
}

const _initBufferData =(MapManagerData: any) => {
    var buffer: any = null,
        count = getBufferCount(),
        size = Uint32Array.BYTES_PER_ELEMENT + Uint8Array.BYTES_PER_ELEMENT,
        offset: number = null;

    buffer = createSharedArrayBufferOrArrayBuffer(computeBufferLength(count, size));

    offset = createTypeArrays(buffer, count, MapManagerData);

    _setDefaultTypeArrData(count, MapManagerData);

    MapManagerData.buffer = buffer;
}

const _setDefaultTypeArrData =(count: number, MapManagerData: any) => {
}
