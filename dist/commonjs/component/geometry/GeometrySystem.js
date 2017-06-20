"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GPUDetector_1 = require("../../renderer/device/GPUDetector");
var contract_1 = require("../../definition/typescript/decorator/contract");
var EBufferType_1 = require("../../renderer/enum/EBufferType");
var objectUtils_1 = require("../../utils/objectUtils");
var ComponentSystem_1 = require("../ComponentSystem");
var GeometryData_1 = require("./GeometryData");
var geometryUtils_1 = require("../../renderer/utils/geometry/geometryUtils");
var memoryUtils_1 = require("../../utils/memoryUtils");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var arrayUtils_1 = require("../../utils/arrayUtils");
var wonder_expect_js_1 = require("wonder-expect.js");
var ArrayBufferData_1 = require("../../renderer/buffer/ArrayBufferData");
var IndexBufferData_1 = require("../../renderer/buffer/IndexBufferData");
var BufferSystem_1 = require("../../renderer/worker/both_file/buffer/BufferSystem");
var ArrayBufferSystem_1 = require("../../renderer/buffer/ArrayBufferSystem");
var IndexBufferSystem_1 = require("../../renderer/buffer/IndexBufferSystem");
exports.addAddComponentHandle = function (_class) {
    ComponentSystem_1.addAddComponentHandle(_class, exports.addComponent);
};
exports.addDisposeHandle = function (_class) {
    ComponentSystem_1.addDisposeHandle(_class, exports.disposeComponent);
};
exports.addInitHandle = function (_class) {
    ComponentSystem_1.addInitHandle(_class, exports.initGeometry);
};
exports.create = contract_1.requireCheckFunc(function (geometry, GeometryData) {
}, function (geometry, GeometryData) {
    var index = ComponentSystem_1.generateComponentIndex(GeometryData);
    geometry.index = index;
    GeometryData.count += 1;
    GeometryData.geometryMap[index] = geometry;
    return geometry;
});
exports.init = function (GeometryData, state) {
    for (var i = 0, count = GeometryData.count; i < count; i++) {
        exports.initGeometry(i, state);
    }
    _markIsInit(GeometryData);
    return state;
};
exports.initGeometry = function (index, state) {
    var computeDataFunc = GeometryData_1.GeometryData.computeDataFuncMap[index];
    if (_isComputeDataFuncNotExist(computeDataFunc)) {
        return;
    }
    var _a = computeDataFunc(index, GeometryData_1.GeometryData), vertices = _a.vertices, indices = _a.indices;
    exports.setVertices(index, vertices, GeometryData_1.GeometryData);
    exports.setIndices(index, indices, GeometryData_1.GeometryData);
};
var _isComputeDataFuncNotExist = function (func) { return objectUtils_1.isNotValidMapValue(func); };
exports.getVertices = function (index, GeometryData) {
    return _getPointData(index, GeometryData.vertices, GeometryData.verticesCacheMap, GeometryData.verticesInfoList);
};
exports.setVertices = contract_1.requireCheckFunc(function (index, vertices, GeometryData) {
}, function (index, vertices, GeometryData) {
    GeometryData.verticesOffset = _setPointData(index, vertices, geometryUtils_1.getVertexDataSize(), GeometryData.vertices, GeometryData.verticesCacheMap, GeometryData.verticesInfoList, GeometryData.verticesWorkerInfoList, GeometryData.verticesOffset, GeometryData);
});
exports.getIndices = function (index, GeometryData) {
    return _getPointData(index, GeometryData.indices, GeometryData.indicesCacheMap, GeometryData.indicesInfoList);
};
exports.setIndices = contract_1.requireCheckFunc(function (index, indices, GeometryData) {
}, function (index, indices, GeometryData) {
    GeometryData.indicesOffset = _setPointData(index, indices, geometryUtils_1.getIndexDataSize(), GeometryData.indices, GeometryData.indicesCacheMap, GeometryData.indicesInfoList, GeometryData.indicesWorkerInfoList, GeometryData.indicesOffset, GeometryData);
});
var _getPointData = contract_1.requireCheckFunc(function (index, points, cacheMap, infoList) {
    contract_1.it("infoList[index] should exist", function () {
        wonder_expect_js_1.expect(infoList[index]).exist;
    });
}, function (index, points, cacheMap, infoList) {
    var dataArr = cacheMap[index];
    if (objectUtils_1.isValidMapValue(dataArr)) {
        return dataArr;
    }
    var info = infoList[index];
    dataArr = typeArrayUtils_1.getSubarray(points, info.startIndex, info.endIndex);
    cacheMap[index] = dataArr;
    return dataArr;
});
var _setPointData = function (index, dataArr, dataSize, points, cacheMap, infoList, workerInfoList, offset, GeometryData) {
    var count = dataArr.length, startIndex = offset;
    offset += count;
    infoList[index] = _buildInfo(startIndex, offset);
    _fillTypeArr(points, dataArr, startIndex, count);
    _removeCache(index, cacheMap);
    if (_isInit(GeometryData)) {
        _addWorkerInfo(workerInfoList, index, startIndex, offset);
    }
    return offset;
};
var _fillTypeArr = contract_1.requireCheckFunc(function (typeArr, dataArr, startIndex, count) {
    contract_1.it("should not exceed type arr's length", function () {
        wonder_expect_js_1.expect(count + startIndex).lte(typeArr.length);
    });
}, function (typeArr, dataArr, startIndex, count) {
    for (var i = 0; i < count; i++) {
        typeArr[i + startIndex] = dataArr[i];
    }
});
var _removeCache = function (index, cacheMap) {
    objectUtils_1.deleteVal(index, cacheMap);
};
var _buildInfo = function (startIndex, endIndex) {
    return {
        startIndex: startIndex,
        endIndex: endIndex
    };
};
exports.addComponent = function (component, gameObject) {
    ComponentSystem_1.addComponentToGameObjectMap(GeometryData_1.GeometryData.gameObjectMap, component.index, gameObject);
};
exports.disposeComponent = function (component) {
    var sourceIndex = component.index;
    ComponentSystem_1.deleteComponent(sourceIndex, GeometryData_1.GeometryData.geometryMap);
    GeometryData_1.GeometryData.count -= 1;
    GeometryData_1.GeometryData.disposeCount += 1;
    GeometryData_1.GeometryData.isReallocate = false;
    if (memoryUtils_1.isDisposeTooManyComponents(GeometryData_1.GeometryData.disposeCount) || _isBufferNearlyFull(GeometryData_1.GeometryData)) {
        var disposedIndexArray = memoryUtils_1.reAllocateGeometry(GeometryData_1.GeometryData);
        _disposeBuffers(disposedIndexArray);
        exports.clearWorkerInfoList(GeometryData_1.GeometryData);
        GeometryData_1.GeometryData.isReallocate = true;
        GeometryData_1.GeometryData.disposeCount = 0;
    }
};
var _disposeBuffers = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    _disposeBuffers = contract_1.requireCheckFunc(function (disposedIndexArray) {
        contract_1.it("should not add data twice in one frame", function () {
            wonder_expect_js_1.expect(GeometryData_1.GeometryData.disposedGeometryIndexArray.length).equal(0);
        });
    }, function (disposedIndexArray) {
        GeometryData_1.GeometryData.disposedGeometryIndexArray = disposedIndexArray;
    });
}
else {
    _disposeBuffers = function (disposedIndexArray) {
        BufferSystem_1.disposeGeometryBuffers(disposedIndexArray, ArrayBufferData_1.ArrayBufferData, IndexBufferData_1.IndexBufferData, ArrayBufferSystem_1.disposeBuffer, IndexBufferSystem_1.disposeBuffer);
    };
}
exports.isReallocate = function (GeometryData) {
    return GeometryData.isReallocate;
};
var _isBufferNearlyFull = function (GeometryData) {
    var infoList = GeometryData.indicesInfoList, lastInfo = infoList[infoList.length - 1];
    if (arrayUtils_1.isNotValidVal(lastInfo)) {
        return false;
    }
    return lastInfo.endIndex >= GeometryData.maxDisposeIndex;
};
exports.getGameObject = function (index, Data) {
    return ComponentSystem_1.getComponentGameObject(Data.gameObjectMap, index);
};
exports.getConfigData = function (index, GeometryData) {
    return GeometryData.configDataMap[index];
};
var _checkIsIndicesBufferNeed32BitsByConfig = function (DataBufferConfig) {
    if (DataBufferConfig.geometryIndicesBufferBits === 16) {
        return false;
    }
    return GPUDetector_1.GPUDetector.getInstance().extensionUintIndices === true;
};
exports.isIndicesBufferNeed32BitsByData = function (GeometryData) {
    return GeometryData.indexType === EBufferType_1.EBufferType.UNSIGNED_INT;
};
var _markIsInit = function (GeometryData) {
    GeometryData.isInit = true;
};
var _isInit = function (GeometryData) {
    return GeometryData.isInit;
};
exports.clearWorkerInfoList = function (GeometryData) {
    GeometryData.verticesWorkerInfoList = [];
    GeometryData.indicesWorkerInfoList = [];
};
exports.hasNewPointData = function (GeometryData) {
    return GeometryData.verticesWorkerInfoList.length > 0;
};
exports.hasDisposedGeometryIndexArrayData = function (GeometryData) {
    return GeometryData.disposedGeometryIndexArray.length > 0;
};
exports.clearDisposedGeometryIndexArray = function (GeometryData) {
    GeometryData.disposedGeometryIndexArray = [];
};
var _addWorkerInfo = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    _addWorkerInfo = function (infoList, index, startIndex, endIndex) {
        infoList.push(_buildWorkerInfo(index, startIndex, endIndex));
    };
}
else {
    _addWorkerInfo = function (infoList, index, startIndex, endIndex) {
    };
}
var _buildWorkerInfo = function (index, startIndex, endIndex) {
    return {
        index: index,
        startIndex: startIndex,
        endIndex: endIndex
    };
};
exports.initData = function (DataBufferConfig, GeometryData) {
    var isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32BitsByConfig(DataBufferConfig), indicesArrayBytes = null;
    if (isIndicesBufferNeed32Bits) {
        indicesArrayBytes = Uint32Array.BYTES_PER_ELEMENT;
        GeometryData.indexType = EBufferType_1.EBufferType.UNSIGNED_INT;
    }
    else {
        indicesArrayBytes = Uint16Array.BYTES_PER_ELEMENT;
        GeometryData.indexType = EBufferType_1.EBufferType.UNSIGNED_SHORT;
    }
    GeometryData.indexTypeSize = indicesArrayBytes;
    GeometryData.configDataMap = objectUtils_1.createMap();
    GeometryData.verticesCacheMap = objectUtils_1.createMap();
    GeometryData.indicesCacheMap = objectUtils_1.createMap();
    GeometryData.computeDataFuncMap = objectUtils_1.createMap();
    GeometryData.gameObjectMap = objectUtils_1.createMap();
    GeometryData.geometryMap = objectUtils_1.createMap();
    GeometryData.index = 0;
    GeometryData.count = 0;
    _initBufferData(indicesArrayBytes, geometryUtils_1.getUIntArrayClass(GeometryData.indexType), DataBufferConfig, GeometryData);
    GeometryData.verticesInfoList = [];
    GeometryData.indicesInfoList = [];
    GeometryData.verticesWorkerInfoList = [];
    GeometryData.indicesWorkerInfoList = [];
    GeometryData.disposedGeometryIndexArray = [];
    GeometryData.verticesOffset = 0;
    GeometryData.indicesOffset = 0;
    GeometryData.disposeCount = 0;
    GeometryData.isReallocate = false;
};
var _initBufferData = function (indicesArrayBytes, UintArray, DataBufferConfig, GeometryData) {
    var buffer = null, count = DataBufferConfig.geometryDataBufferCount, size = Float32Array.BYTES_PER_ELEMENT * geometryUtils_1.getVertexDataSize() + indicesArrayBytes * geometryUtils_1.getIndexDataSize();
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size);
    geometryUtils_1.createBufferViews(buffer, count, UintArray, GeometryData);
    GeometryData.buffer = buffer;
    GeometryData.maxDisposeIndex = GeometryData.indices.length * 0.9;
};
exports.getIndexType = null;
exports.getIndexTypeSize = null;
exports.hasIndices = null;
exports.getDrawMode = null;
exports.getVerticesCount = null;
exports.getIndicesCount = null;
if (!WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.getIndexType = geometryUtils_1.getIndexType;
    exports.getIndexTypeSize = geometryUtils_1.getIndexTypeSize;
    exports.hasIndices = function (index, GeometryData) { return geometryUtils_1.hasIndices(index, exports.getIndices, GeometryData); };
    exports.getDrawMode = geometryUtils_1.getDrawMode;
    exports.getVerticesCount = function (index, GeometryData) { return geometryUtils_1.getVerticesCount(index, exports.getVertices, GeometryData); };
    exports.getIndicesCount = function (index, GeometryData) { return geometryUtils_1.getIndicesCount(index, exports.getIndices, GeometryData); };
}
//# sourceMappingURL=GeometrySystem.js.map