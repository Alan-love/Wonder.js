import { createMap, deleteVal, isNotValidMapValue, isValidMapValue } from "./objectUtils";
import { clearCacheMap } from "../component/transform/cacheSystem";
import { getSlotCount, getUsedSlotCount, setNextIndexInTagArrayMap } from "../component/tag/TagSystem";
import { isNotValidVal, isValidVal } from "./arrayUtils";
import { MemoryConfig } from "../config/MemoryConfig";
import { ensureFunc, it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Component } from "../component/Component";
import { checkIndexShouldEqualCount } from "../component/utils/contractUtils";
import { GeometryInfo, GeometryInfoList } from "../definition/type/geometryType";
import { set } from "./typeArrayUtils";
import {
    getChildren as getGameObjectChildren, isAlive as isGameObjectAlive,
    setChildren as setGameObjectChildren
} from "../core/entityObject/gameObject/GameObjectSystem";
import { isNotUndefined } from "./JudgeUtils";
import { isAlive as isThreeDTransformAlive } from "../component/transform/ThreeDTransformSystem";
import {
    getChildren as getThreeDTransformChildren,
    setChildren as setThreeDTransformChildren
} from "../component/transform/hierarchySystem";

export const isDisposeTooManyComponents = (disposeCount: number, maxComponentDisposeCount: number = MemoryConfig.maxComponentDisposeCount) => {
    return disposeCount >= maxComponentDisposeCount;
}

const _setMapVal = (map: object, key: number, val: any) => {
    map[key] = val;
}

const _setArrayVal = (arr: Array<any>, index: number, val: any) => {
    arr[index] = val;
}

export const reAllocateThreeDTransform = (ThreeDTransformData: any) => {
    var val: any = null,
        newParentMap = createMap(),
        newChildrenMap = createMap(),
        newIsTranslateMap = createMap(),
        newGameObjectMap = createMap(),
        newTempMap = createMap(),
        newAliveUIdArray: Array<number> = [],
        aliveUIdArray = ThreeDTransformData.aliveUIdArray,
        parentMap = ThreeDTransformData.parentMap,
        childrenMap = ThreeDTransformData.childrenMap,
        isTranslateMap = ThreeDTransformData.isTranslateMap,
        gameObjectMap = ThreeDTransformData.gameObjectMap,
        tempMap = ThreeDTransformData.tempMap;

    clearCacheMap(ThreeDTransformData);


    let disposedUIdArr = [],
        actualAliveUIdArr = [];

    for (let uid of aliveUIdArray) {
        val = childrenMap[uid];

        if (isNotValidMapValue(val)) {
            disposedUIdArr.push(uid);
        }
        else {
            actualAliveUIdArr.push(uid);
        }
    }

    _cleanChildrenMap(disposedUIdArr, parentMap, isThreeDTransformAlive, getThreeDTransformChildren, setThreeDTransformChildren, ThreeDTransformData);

    for (let uid of actualAliveUIdArr) {
        val = childrenMap[uid];

        newAliveUIdArray.push(uid);

        _setMapVal(newChildrenMap, uid, val);

        val = tempMap[uid];
        _setMapVal(newTempMap, uid, val);

        val = parentMap[uid];
        _setMapVal(newParentMap, uid, val);

        val = isTranslateMap[uid];
        _setMapVal(newIsTranslateMap, uid, val);

        val = gameObjectMap[uid];
        _setMapVal(newGameObjectMap, uid, val);
    }

    ThreeDTransformData.parentMap = newParentMap;
    ThreeDTransformData.childrenMap = newChildrenMap;
    ThreeDTransformData.isTranslateMap = newIsTranslateMap;
    ThreeDTransformData.tempMap = newTempMap;
    ThreeDTransformData.gameObjectMap = newGameObjectMap;

    ThreeDTransformData.aliveUIdArray = newAliveUIdArray;
}

export const reAllocateGameObject = (GameObjectData: any) => {
    let val: any = null,
        newParentMap = createMap(),
        newChildrenMap = createMap(),
        newComponentMap = createMap(),
        newAliveUIdArray: Array<number> = [],
        aliveUIdArray = GameObjectData.aliveUIdArray,
        parentMap = GameObjectData.parentMap,
        childrenMap = GameObjectData.childrenMap,
        componentMap = GameObjectData.componentMap,
        disposedUIdArr = [],
        actualAliveUIdArr = [];

    for (let uid of aliveUIdArray) {
        val = componentMap[uid];

        if (isNotValidMapValue(val)) {
            disposedUIdArr.push(uid);
        }
        else {
            actualAliveUIdArr.push(uid);
        }
    }

    _cleanChildrenMap(disposedUIdArr, parentMap, isGameObjectAlive, getGameObjectChildren, setGameObjectChildren, GameObjectData);

    for (let uid of actualAliveUIdArr) {
        val = componentMap[uid];

        newAliveUIdArray.push(uid);

        _setMapVal(newComponentMap, uid, val);

        val = parentMap[uid];
        _setMapVal(newParentMap, uid, val);

        val = childrenMap[uid];
        _setMapVal(newChildrenMap, uid, val);
    }

    GameObjectData.parentMap = newParentMap;
    GameObjectData.childrenMap = newChildrenMap;
    GameObjectData.componentMap = newComponentMap;
    GameObjectData.aliveUIdArray = newAliveUIdArray;
};

const _cleanChildrenMap = (disposedUIdArr: Array<number>, parentMap: object, isAlive: Function, getChildren: Function, setChildren: Function, Data: any) => {
    var isCleanedParentMap = createMap();

    for (let uid of disposedUIdArr) {
        let parent = parentMap[uid];

        if (_isParentExist(parent)) {
            let parentUId = parent.uid;

            if (isValidMapValue(isCleanedParentMap[parentUId])) {
                continue;
            }

            _cleanChildren(parentUId, isAlive, getChildren, setChildren, Data);

            deleteVal(uid, parentMap);
        }
    }
}

const _cleanChildren = (parentUId: number, isAlive: Function, getChildren: Function, setChildren: Function, Data: any) => {
    var children = getChildren(parentUId, Data);

    if (!_isChildrenExist(children)) {
        return;
    }

    let newChildren: Array<Component> = [];

    for (let i = 0, len = children.length; i < len; ++i) {
        let child = children[i];

        if (isAlive(child, Data)) {
            newChildren.push(child);
        }
    }

    setChildren(parentUId, newChildren, Data);
};

const _isParentExist = (parent: Component) => isNotUndefined(parent);

const _isChildrenExist = (children: Array<Component>) => isNotUndefined(children);

export const reAllocateTag = (TagData: any) => {
    var usedSlotCountMap = TagData.usedSlotCountMap,
        slotCountMap = TagData.slotCountMap,
        indexMap = TagData.indexMap,
        tagArray = TagData.tagArray,
        gameObjectMap = TagData.gameObjectMap,
        indexInTagArrayMap = TagData.indexInTagArrayMap,
        tagMap = TagData.tagMap,
        newIndexInTagArrayMap: Array<number> = [0],
        newTagArray = [],
        newGameObjectMap = createMap(),
        newUsedSlotCountMap = [],
        newSlotCountMap = [],
        newIndexMap = [],
        newTagMap = createMap(),
        newIndexInTagArray = 0,
        newIndexInTagArrayInMap = null,
        newIndex = 0,
        newLastIndexInTagArray = 0,
        hasNewData = false,
        tagIndex: number = null;

    for (let indexInTagArray of indexInTagArrayMap) {
        let index = indexMap[indexInTagArray];

        if (isNotValidVal(index)) {
            continue;
        }

        hasNewData = true;

        let currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap),
            tag = tagMap[index];

        newGameObjectMap[newIndex] = gameObjectMap[index];
        newSlotCountMap[newIndex] = getSlotCount(index, slotCountMap);
        newUsedSlotCountMap[newIndex] = currentUsedSlotCount;

        newIndexInTagArrayInMap = newIndexInTagArray;
        newIndexInTagArrayMap[newIndex] = newIndexInTagArrayInMap;

        tag.index = newIndex;
        newTagMap[newIndex] = tag;

        for (let i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++) {
            newTagArray[newIndexInTagArray] = tagArray[i];

            newIndexMap[newIndexInTagArray] = newIndex;

            newIndexInTagArray += 1;
        }

        newIndex += 1;
    }

    if (hasNewData) {
        newIndex -= 1;

        newLastIndexInTagArray = newIndexInTagArrayInMap + getSlotCount(newIndex, newSlotCountMap);

        tagIndex = newIndex + 1;
    }
    else {
        tagIndex = 0;
    }

    setNextIndexInTagArrayMap(newIndex, newSlotCountMap[newIndex], newIndexInTagArrayMap);

    TagData.slotCountMap = newSlotCountMap;
    TagData.usedSlotCountMap = newUsedSlotCountMap;
    TagData.gameObjectMap = newGameObjectMap;
    TagData.tagMap = newTagMap;

    TagData.indexMap = newIndexMap;

    TagData.indexInTagArrayMap = newIndexInTagArrayMap;

    TagData.lastIndexInTagArray = newLastIndexInTagArray;
    TagData.tagArray = newTagArray;

    TagData.index = tagIndex;
};

export const reAllocateGeometry = ensureFunc((returnVal: any, GeometryData: any) => {
    checkIndexShouldEqualCount(GeometryData);
}, (GeometryData: any) => {
    let val: any = null,
        // hasNewData = false,
        index = GeometryData.index,
        vertices = GeometryData.vertices,
        normals = GeometryData.normals,
        texCoords = GeometryData.texCoords,
        indices = GeometryData.indices,
        verticesInfoList = GeometryData.verticesInfoList,
        normalsInfoList = GeometryData.normalsInfoList,
        texCoordsInfoList = GeometryData.texCoordsInfoList,
        indicesInfoList = GeometryData.indicesInfoList,
        gameObjectMap = GeometryData.gameObjectMap,
        geometryMap = GeometryData.geometryMap,
        computeDataFuncMap = GeometryData.computeDataFuncMap,
        configDataMap = GeometryData.configDataMap,
        verticesCacheMap = GeometryData.verticesCacheMap,
        normalsCacheMap = GeometryData.normalsCacheMap,
        texCoordsCacheMap = GeometryData.texCoordsCacheMap,
        indicesCacheMap = GeometryData.indicesCacheMap,
        newIndexInArrayBuffer = 0,
        newVerticesOffset = 0,
        newNormalsOffset = 0,
        newTexCoordsOffset = 0,
        newIndicesOffset = 0,
        newVertivesInfoList = [],
        newNormalsInfoList = [],
        newTexCoordsInfoList = [],
        newIndicesInfoList = [],
        newGameObjectMap = createMap(),
        newGeometryMap = createMap(),
        newComputeDatafuncMap = createMap(),
        newConfigDataMap: Array<number> = [],
        newVerticesCacheMap: Array<number> = [],
        newNormalsCacheMap: Array<number> = [],
        newTexCoordsCacheMap: Array<number> = [],
        newIndicesCacheMap: Array<number> = [],
        newVertices: Array<number> = [],
        newNormals: Array<number> = [],
        newTexCoords: Array<number> = [],
        newIndices: Array<number> = [],
        disposedIndexArray: Array<number> = [];

    for (let i = 0; i < index; i++) {
        val = geometryMap[i];
        // val = gameObjectMap[i];

        if (isNotValidMapValue(val)) {
            disposedIndexArray.push(i);
            continue;
        }

        let verticesInfo = verticesInfoList[i],
            normalsInfo = normalsInfoList[i],
            texCoordsInfo = texCoordsInfoList[i],
            indicesInfo = indicesInfoList[i];

        // hasNewData = true;

        _updateInfoList(newVertivesInfoList, newIndexInArrayBuffer, verticesInfo, newVerticesOffset);

        if (isValidVal(normalsInfo)) {
            _updateInfoList(newNormalsInfoList, newIndexInArrayBuffer, normalsInfo, newNormalsOffset);
        }

        if (isValidVal(texCoordsInfo)) {
            _updateInfoList(newTexCoordsInfoList, newIndexInArrayBuffer, texCoordsInfo, newTexCoordsOffset);
        }

        _updateInfoList(newIndicesInfoList, newIndexInArrayBuffer, indicesInfo, newIndicesOffset);

        newVerticesOffset = _fillTypeArr(newVertices, newVerticesOffset, vertices, verticesInfo.startIndex, verticesInfo.endIndex);

        if (isValidVal(normalsInfo)) {
            newNormalsOffset = _fillTypeArr(newNormals, newNormalsOffset, normals, normalsInfo.startIndex, normalsInfo.endIndex);
        }

        if (isValidVal(texCoordsInfo)) {
            newTexCoordsOffset = _fillTypeArr(newTexCoords, newTexCoordsOffset, texCoords, texCoordsInfo.startIndex, texCoordsInfo.endIndex);
        }

        newIndicesOffset = _fillTypeArr(newIndices, newIndicesOffset, indices, indicesInfo.startIndex, indicesInfo.endIndex);

        _updateComponentIndex(geometryMap, newGeometryMap, i, newIndexInArrayBuffer);

        val = computeDataFuncMap[i];
        _setMapVal(newComputeDatafuncMap, newIndexInArrayBuffer, val);

        val = configDataMap[i];
        _setMapVal(newConfigDataMap, newIndexInArrayBuffer, val);

        val = verticesCacheMap[i];
        _setMapVal(newVerticesCacheMap, newIndexInArrayBuffer, val);

        val = normalsCacheMap[i];
        _setMapVal(newNormalsCacheMap, newIndexInArrayBuffer, val);

        val = texCoordsCacheMap[i];
        _setMapVal(newTexCoordsCacheMap, newIndexInArrayBuffer, val);

        val = indicesCacheMap[i];
        _setMapVal(newIndicesCacheMap, newIndexInArrayBuffer, val);

        val = geometryMap[i];
        _setMapVal(newGeometryMap, newIndexInArrayBuffer, val);

        val = gameObjectMap[i];
        _setMapVal(newGameObjectMap, newIndexInArrayBuffer, val);

        newIndexInArrayBuffer += 1;
    }

    set(GeometryData.vertices, newVertices);
    set(GeometryData.normals, newNormals);
    set(GeometryData.texCoords, newTexCoords);
    set(GeometryData.indices, newIndices);

    GeometryData.gameObjectMap = newGameObjectMap;
    GeometryData.verticesInfoList = newVertivesInfoList;
    GeometryData.normalsInfoList = newNormalsInfoList;
    GeometryData.texCoordsInfoList = newTexCoordsInfoList;
    GeometryData.indicesInfoList = newIndicesInfoList;
    GeometryData.geometryMap = newGeometryMap;
    GeometryData.computeDataFuncMap = newComputeDatafuncMap;
    GeometryData.configDataMap = newConfigDataMap;
    GeometryData.verticesCacheMap = newVerticesCacheMap;
    GeometryData.normalsCacheMap = newNormalsCacheMap;
    GeometryData.texCoordsCacheMap = newTexCoordsCacheMap;
    GeometryData.indicesCacheMap = newIndicesCacheMap;

    GeometryData.verticesOffset = newVerticesOffset;
    GeometryData.normalsOffset = newNormalsOffset;
    GeometryData.texCoordsOffset = newTexCoordsOffset;
    GeometryData.indicesOffset = newIndicesOffset;

    GeometryData.index = newIndexInArrayBuffer;

    return disposedIndexArray;
})

const _updateComponentIndex = (componentMap: object, newComponentMap: object, oldIndex: number, newIndex: number) => {
    let component: Component = componentMap[oldIndex];

    component.index = newIndex;
    newComponentMap[newIndex] = component;
}

const _fillTypeArr = requireCheckFunc((targetTypeArr: Float32Array | Uint32Array | Uint16Array, targetStartIndex: number, sourceTypeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    // it("targetStartIndex should <= sourceStartIndex", () => {
    //     expect(targetStartIndex).lte(startIndex);
    // })
}, (targetTypeArr: Float32Array | Uint32Array | Uint16Array, targetStartIndex: number, sourceTypeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    var typeArrIndex = targetStartIndex;

    for (let i = startIndex; i < endIndex; i++) {
        targetTypeArr[typeArrIndex] = sourceTypeArr[i];
        typeArrIndex += 1;
    }

    return typeArrIndex;
})

const _updateInfoList = ensureFunc((returnVal: any, newInfoList, newIndexInArrayBuffer, info: GeometryInfo, offset: number) => {
    it("info.startIndex should >= 0", () => {
        expect(newInfoList[newIndexInArrayBuffer].startIndex).gte(0);
    });
}, (newInfoList: GeometryInfoList, newIndexInArrayBuffer: number, info: GeometryInfo, offset: number) => {
    var increment = info.endIndex - info.startIndex;

    _setArrayVal(newInfoList, newIndexInArrayBuffer, {
        startIndex: offset,
        endIndex: offset + increment
    });
})
