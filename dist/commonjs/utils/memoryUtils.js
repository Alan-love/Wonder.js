"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectUtils_1 = require("./objectUtils");
var cacheSystem_1 = require("../component/transform/cacheSystem");
var TagSystem_1 = require("../component/tag/TagSystem");
var arrayUtils_1 = require("./arrayUtils");
var MemoryConfig_1 = require("../config/MemoryConfig");
exports.isDisposeTooManyComponents = function (disposeCount) {
    return disposeCount >= MemoryConfig_1.MemoryConfig.maxComponentDisposeCount;
};
var _setMapVal = function (map, uid, val) {
    map[uid] = val;
};
exports.reAllocateThreeDTransformMap = function (ThreeDTransformData) {
    var val = null, newParentMap = {}, newChildrenMap = {}, newIsTranslateMap = {}, newGameObjectMap = {}, newTempMap = {}, newAliveUIDArray = [], aliveUIDArray = ThreeDTransformData.aliveUIDArray, parentMap = ThreeDTransformData.parentMap, childrenMap = ThreeDTransformData.childrenMap, isTranslateMap = ThreeDTransformData.isTranslateMap, gameObjectMap = ThreeDTransformData.gameObjectMap, tempMap = ThreeDTransformData.tempMap;
    cacheSystem_1.clearCacheMap(ThreeDTransformData);
    for (var _i = 0, aliveUIDArray_1 = aliveUIDArray; _i < aliveUIDArray_1.length; _i++) {
        var uid = aliveUIDArray_1[_i];
        val = childrenMap[uid];
        if (objectUtils_1.isNotValidMapValue(val)) {
            continue;
        }
        newAliveUIDArray.push(uid);
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
    ThreeDTransformData.aliveUIDArray = newAliveUIDArray;
};
exports.reAllocateGameObjectMap = function (GameObjectData) {
    var val = null, newParentMap = {}, newChildrenMap = {}, newComponentMap = {}, newAliveUIDArray = [], aliveUIDArray = GameObjectData.aliveUIDArray, parentMap = GameObjectData.parentMap, childrenMap = GameObjectData.childrenMap, componentMap = GameObjectData.componentMap;
    for (var _i = 0, aliveUIDArray_2 = aliveUIDArray; _i < aliveUIDArray_2.length; _i++) {
        var uid = aliveUIDArray_2[_i];
        val = componentMap[uid];
        if (objectUtils_1.isNotValidMapValue(val)) {
            continue;
        }
        newAliveUIDArray.push(uid);
        _setMapVal(newComponentMap, uid, val);
        val = parentMap[uid];
        _setMapVal(newParentMap, uid, val);
        val = childrenMap[uid];
        _setMapVal(newChildrenMap, uid, val);
    }
    GameObjectData.parentMap = newParentMap;
    GameObjectData.childrenMap = newChildrenMap;
    GameObjectData.componentMap = newComponentMap;
    GameObjectData.aliveUIDArray = newAliveUIDArray;
};
exports.reAllocateTagMap = function (TagData) {
    var usedSlotCountMap = TagData.usedSlotCountMap, slotCountMap = TagData.slotCountMap, indexMap = TagData.indexMap, tagArray = TagData.tagArray, gameObjectMap = TagData.gameObjectMap, indexInTagArrayMap = TagData.indexInTagArrayMap, tagMap = TagData.tagMap, newIndexInTagArrayMap = [0], newTagArray = [], newGameObjectMap = objectUtils_1.createMap(), newUsedSlotCountMap = [], newSlotCountMap = [], newIndexMap = [], newTagMap = objectUtils_1.createMap(), newIndexInTagArray = 0, newIndexInTagArrayInMap = null, newIndex = 0, newLastIndexInTagArray = 0, hasNewData = false, tagIndex = null;
    for (var _i = 0, indexInTagArrayMap_1 = indexInTagArrayMap; _i < indexInTagArrayMap_1.length; _i++) {
        var indexInTagArray = indexInTagArrayMap_1[_i];
        var index = indexMap[indexInTagArray];
        if (arrayUtils_1.isNotValidVal(index)) {
            continue;
        }
        hasNewData = true;
        var currentUsedSlotCount = TagSystem_1.getUsedSlotCount(index, usedSlotCountMap), tag = tagMap[index];
        newGameObjectMap[newIndex] = gameObjectMap[index];
        newSlotCountMap[newIndex] = TagSystem_1.getSlotCount(index, slotCountMap);
        newUsedSlotCountMap[newIndex] = currentUsedSlotCount;
        newIndexInTagArrayInMap = newIndexInTagArray;
        newIndexInTagArrayMap[newIndex] = newIndexInTagArrayInMap;
        tag.index = newIndex;
        newTagMap[newIndex] = tag;
        for (var i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++) {
            newTagArray[newIndexInTagArray] = tagArray[i];
            newIndexMap[newIndexInTagArray] = newIndex;
            newIndexInTagArray += 1;
        }
        newIndex += 1;
    }
    if (hasNewData) {
        newIndex -= 1;
        newLastIndexInTagArray = newIndexInTagArrayInMap + TagSystem_1.getSlotCount(newIndex, newSlotCountMap);
        tagIndex = newIndex + 1;
    }
    else {
        tagIndex = 0;
    }
    TagSystem_1.setNextIndexInTagArrayMap(newIndex, newSlotCountMap[newIndex], newIndexInTagArrayMap);
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
//# sourceMappingURL=memoryUtils.js.map