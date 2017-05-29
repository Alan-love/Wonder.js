"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ThreeDTransformData_1 = require("./ThreeDTransformData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ThreeDTransform_1 = require("./ThreeDTransform");
var DataUtils_1 = require("../../utils/DataUtils");
var Matrix4_1 = require("../../math/Matrix4");
var Vector3_1 = require("../../math/Vector3");
var cacheUtils_1 = require("../../utils/cacheUtils");
var ComponentSystem_1 = require("../ComponentSystem");
var objectUtils_1 = require("../../utils/objectUtils");
var updateSystem_1 = require("./updateSystem");
var dirtySystem_1 = require("./dirtySystem");
var hierarchySystem_1 = require("./hierarchySystem");
var operateDataSystem_1 = require("./operateDataSystem");
var isTransformSystem_1 = require("./isTransformSystem");
var utils_1 = require("./utils");
var contractUtils_1 = require("./contractUtils");
var batchSystem_1 = require("./batchSystem");
var cacheSystem_1 = require("./cacheSystem");
var memoryUtils_1 = require("../../utils/memoryUtils");
var LinkList_1 = require("./LinkList");
var GlobalTempData_1 = require("../../definition/GlobalTempData");
var wonder_expect_js_1 = require("wonder-expect.js");
exports.addAddComponentHandle = function (_class) {
    ComponentSystem_1.addAddComponentHandle(_class, exports.addComponent);
};
exports.addDisposeHandle = function (_class) {
    ComponentSystem_1.addDisposeHandle(_class, exports.disposeComponent);
};
exports.create = contract_1.ensureFunc(function (transform, ThreeDTransformData) {
    contract_1.it("componentMap should has data", function () {
        wonder_expect_js_1.expect(hierarchySystem_1.getChildren(transform.uid, ThreeDTransformData)).exist;
    });
}, function (ThreeDTransformData) {
    var transform = new ThreeDTransform_1.ThreeDTransform(), index = _generateIndexInArrayBuffer(ThreeDTransformData), uid = _buildUID(ThreeDTransformData);
    transform.index = index;
    transform.uid = uid;
    _createTempData(uid, ThreeDTransformData);
    _setTransformMap(index, transform, ThreeDTransformData);
    hierarchySystem_1.setChildren(uid, [], ThreeDTransformData);
    ThreeDTransformData.aliveUIDArray.push(uid);
    return transform;
});
var _buildUID = function (ThreeDTransformData) {
    return ThreeDTransformData.uid++;
};
var _generateIndexInArrayBuffer = function (ThreeDTransformData) {
    return dirtySystem_1.generateNotUsedIndexInArrayBuffer(ThreeDTransformData);
};
var _createTempData = function (uid, ThreeDTransformData) {
    ThreeDTransformData.tempMap[uid] = {
        position: Vector3_1.Vector3.create(),
        localPosition: Vector3_1.Vector3.create(),
        localToWorldMatrix: Matrix4_1.Matrix4.create()
    };
    return ThreeDTransformData;
};
exports.checkShouldAlive = function (component, ThreeDTransformData) {
    ComponentSystem_1.checkComponentShouldAlive(component, ThreeDTransformData, function (component, ThreeDTransformData) {
        return hierarchySystem_1.isChildrenExist(hierarchySystem_1.getChildren(component.uid, ThreeDTransformData));
    });
};
exports.init = function (GlobalTempData, ThreeDTransformData, state) {
    return exports.update(null, GlobalTempData, ThreeDTransformData, state);
};
exports.addComponent = function (transform, gameObject) {
    var indexInArrayBuffer = transform.index, uid = transform.uid;
    ComponentSystem_1.addComponentToGameObjectMap(ThreeDTransformData_1.ThreeDTransformData.gameObjectMap, uid, gameObject);
    return dirtySystem_1.addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData_1.ThreeDTransformData);
};
exports.disposeComponent = function (transform) {
    var indexInArrayBuffer = transform.index, uid = transform.uid;
    if (dirtySystem_1.isNotDirty(indexInArrayBuffer, ThreeDTransformData_1.ThreeDTransformData.firstDirtyIndex)) {
        _disposeFromNormalList(indexInArrayBuffer, uid, GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData);
    }
    else {
        _disposeFromDirtyList(indexInArrayBuffer, uid, GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData);
    }
    ThreeDTransformData_1.ThreeDTransformData.disposeCount += 1;
    if (memoryUtils_1.isDisposeTooManyComponents(ThreeDTransformData_1.ThreeDTransformData.disposeCount)) {
        memoryUtils_1.reAllocateThreeDTransformMap(ThreeDTransformData_1.ThreeDTransformData);
        ThreeDTransformData_1.ThreeDTransformData.disposeCount = 0;
    }
};
exports.getGameObject = function (uid, ThreeDTransformData) { return ComponentSystem_1.getComponentGameObject(ThreeDTransformData.gameObjectMap, uid); };
exports.getParent = function (transform, ThreeDTransformData) {
    var parent = hierarchySystem_1.getParent(transform.uid, ThreeDTransformData);
    if (objectUtils_1.isValidMapValue(parent)) {
        return parent;
    }
    return null;
};
exports.setParent = function (transform, parent, ThreeDTransformData) { return hierarchySystem_1.setParent(transform, parent, ThreeDTransformData); };
exports.getLocalToWorldMatrix = contract_1.requireCheckFunc(function (transform, mat, ThreeTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheUtils_1.cacheFunc(function (transform, mat, ThreeTransformData) {
    return objectUtils_1.isValidMapValue(cacheSystem_1.getLocalToWorldMatrixCache(transform.uid, ThreeTransformData));
}, function (transform, mat, ThreeTransformData) {
    return cacheSystem_1.getLocalToWorldMatrixCache(transform.uid, ThreeTransformData);
}, function (transform, mat, ThreeTransformData, returnedMat) {
    cacheSystem_1.setLocalToWorldMatrixCache(transform.uid, returnedMat, ThreeTransformData);
}, function (transform, mat, ThreeTransformData) {
    return DataUtils_1.DataUtils.createMatrix4ByIndex(mat, ThreeDTransformData_1.ThreeDTransformData.localToWorldMatrices, operateDataSystem_1.getMatrix4DataIndexInArrayBuffer(transform.index));
}));
exports.getPosition = contract_1.requireCheckFunc(function (transform, ThreeTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheUtils_1.cacheFunc(function (transform, ThreeTransformData) {
    return objectUtils_1.isValidMapValue(cacheSystem_1.getPositionCache(transform.uid, ThreeTransformData));
}, function (transform, ThreeTransformData) {
    return cacheSystem_1.getPositionCache(transform.uid, ThreeTransformData);
}, function (transform, ThreeTransformData, position) {
    cacheSystem_1.setPositionCache(transform.uid, position, ThreeTransformData);
}, function (transform, ThreeTransformData) {
    var indexInArrayBuffer = operateDataSystem_1.getMatrix4DataIndexInArrayBuffer(transform.index), localToWorldMatrices = ThreeTransformData.localToWorldMatrices;
    return _getTempData(transform.uid, ThreeDTransformData_1.ThreeDTransformData).position.set(localToWorldMatrices[indexInArrayBuffer + 12], localToWorldMatrices[indexInArrayBuffer + 13], localToWorldMatrices[indexInArrayBuffer + 14]);
}));
var _setTransformMap = function (indexInArrayBuffer, transform, ThreeDTransformData) { return ThreeDTransformData.transformMap[indexInArrayBuffer] = transform; };
exports.setPosition = contract_1.requireCheckFunc(function (transform, position, GlobalTempData, ThreeTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeTransformData);
}, function (transform, position, GlobalTempData, ThreeTransformData) {
    var indexInArrayBuffer = transform.index, uid = transform.uid, parent = hierarchySystem_1.getParent(uid, ThreeDTransformData_1.ThreeDTransformData), vec3IndexInArrayBuffer = operateDataSystem_1.getVector3DataIndexInArrayBuffer(indexInArrayBuffer);
    operateDataSystem_1.setPositionData(indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeTransformData);
    isTransformSystem_1.setIsTranslate(uid, true, ThreeTransformData);
    return dirtySystem_1.addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
});
exports.setBatchDatas = function (batchData, GlobalTempData, ThreeTransformData) { return batchSystem_1.setBatchDatas(batchData, GlobalTempData, ThreeDTransformData_1.ThreeDTransformData); };
exports.getLocalPosition = contract_1.requireCheckFunc(function (transform, ThreeTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheUtils_1.cacheFunc(function (transform, ThreeTransformData) {
    return objectUtils_1.isValidMapValue(cacheSystem_1.getLocalPositionCache(transform.uid, ThreeTransformData));
}, function (transform, ThreeTransformData) {
    return cacheSystem_1.getLocalPositionCache(transform.uid, ThreeTransformData);
}, function (transform, ThreeTransformData, position) {
    cacheSystem_1.setLocalPositionCache(transform.uid, position, ThreeTransformData);
}, function (transform, ThreeTransformData) {
    return DataUtils_1.DataUtils.createVector3ByIndex(_getTempData(transform.uid, ThreeDTransformData_1.ThreeDTransformData).localPosition, ThreeDTransformData_1.ThreeDTransformData.localPositions, operateDataSystem_1.getVector3DataIndexInArrayBuffer(transform.index));
}));
exports.setLocalPosition = contract_1.requireCheckFunc(function (transform, position, ThreeTransformData) {
    contractUtils_1.checkTransformShouldAlive(transform, ThreeTransformData);
}, function (transform, position, ThreeTransformData) {
    var indexInArrayBuffer = transform.index, uid = transform.uid, vec3IndexInArrayBuffer = operateDataSystem_1.getVector3DataIndexInArrayBuffer(indexInArrayBuffer);
    operateDataSystem_1.setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeTransformData);
    isTransformSystem_1.setIsTranslate(uid, true, ThreeTransformData);
    return dirtySystem_1.addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
});
exports.update = function (elapsed, GlobalTempData, ThreeDTransformData, state) {
    return updateSystem_1.update(elapsed, GlobalTempData, ThreeDTransformData, state);
};
var _disposeItemInDataContainer = function (indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData) {
    var mat = GlobalTempData.matrix4_1.setIdentity(), positionVec = GlobalTempData.vector3_1.set(0, 0, 0), qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);
    operateDataSystem_1.setTransformDataInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData);
    hierarchySystem_1.removeHierarchyData(uid, ThreeDTransformData);
    _disposeMapDatas(indexInArrayBuffer, uid, ThreeDTransformData);
    return ThreeDTransformData;
};
var _disposeMapDatas = function (indexInArrayBuffer, uid, ThreeDTransformData) {
    objectUtils_1.deleteVal(indexInArrayBuffer, ThreeDTransformData.transformMap);
};
var _disposeFromNormalList = function (indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData) {
    dirtySystem_1.addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexLinkList);
    return _disposeItemInDataContainer(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
};
var _disposeFromDirtyList = function (indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData) {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    operateDataSystem_1.swap(indexInArrayBuffer, firstDirtyIndex, ThreeDTransformData);
    _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData, ThreeDTransformData);
    ThreeDTransformData.firstDirtyIndex = dirtySystem_1.addFirstDirtyIndex(ThreeDTransformData);
};
var _addDefaultTransformData = function (GlobalTempData, ThreeDTransformData) {
    var count = ThreeDTransformData.count, mat = GlobalTempData.matrix4_1.setIdentity(), positionVec = GlobalTempData.vector3_1.set(0, 0, 0), qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);
    for (var i = utils_1.getStartIndexInArrayBuffer(); i < count; i++) {
        operateDataSystem_1.setTransformDataInTypeArr(i, mat, qua, positionVec, scaleVec, ThreeDTransformData);
    }
};
exports.getTempLocalToWorldMatrix = function (transform, ThreeDTransformData) { return _getTempData(transform.uid, ThreeDTransformData).localToWorldMatrix; };
var _getTempData = function (uid, ThreeDTransformData) {
    var tempData = ThreeDTransformData.tempMap[uid];
    if (objectUtils_1.isNotValidMapValue(tempData)) {
        tempData = {};
        ThreeDTransformData.tempMap[uid] = tempData;
    }
    return tempData;
};
exports.initData = function (GlobalTempData, ThreeDTransformData) {
    var buffer = null, count = ThreeDTransformData.count, size = Float32Array.BYTES_PER_ELEMENT * (16 + 3 + 4 + 3);
    ThreeDTransformData.buffer = new ArrayBuffer(count * size);
    buffer = ThreeDTransformData.buffer;
    ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, 0, count * operateDataSystem_1.getMatrix4DataSize());
    ThreeDTransformData.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * operateDataSystem_1.getMatrix4DataSize(), count * operateDataSystem_1.getVector3DataSize());
    ThreeDTransformData.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (operateDataSystem_1.getMatrix4DataSize() + operateDataSystem_1.getVector3DataSize()), count * operateDataSystem_1.getQuaternionDataSize());
    ThreeDTransformData.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (operateDataSystem_1.getMatrix4DataSize() + operateDataSystem_1.getVector3DataSize() + operateDataSystem_1.getQuaternionDataSize()), count * operateDataSystem_1.getVector3DataSize());
    ThreeDTransformData.notUsedIndexLinkList = LinkList_1.LinkList.create();
    ThreeDTransformData.parentMap = objectUtils_1.createMap();
    ThreeDTransformData.childrenMap = objectUtils_1.createMap();
    ThreeDTransformData.isTranslateMap = objectUtils_1.createMap();
    ThreeDTransformData.cacheMap = objectUtils_1.createMap();
    ThreeDTransformData.tempMap = objectUtils_1.createMap();
    ThreeDTransformData.transformMap = objectUtils_1.createMap();
    ThreeDTransformData.gameObjectMap = objectUtils_1.createMap();
    ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.count;
    ThreeDTransformData.indexInArrayBuffer = utils_1.getStartIndexInArrayBuffer();
    ThreeDTransformData.uid = 0;
    ThreeDTransformData.disposeCount = 0;
    ThreeDTransformData.isClearCacheMap = false;
    ThreeDTransformData.aliveUIDArray = [];
    _addDefaultTransformData(GlobalTempData, ThreeDTransformData);
};
//# sourceMappingURL=ThreeDTransformSystem.js.map