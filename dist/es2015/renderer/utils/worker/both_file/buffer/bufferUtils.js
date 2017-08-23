export var disposeGeometryVboBuffers = function (disposedIndexArray, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, disposeArrayBuffer, disposeIndexBuffer) {
    for (var _i = 0, disposedIndexArray_1 = disposedIndexArray; _i < disposedIndexArray_1.length; _i++) {
        var index = disposedIndexArray_1[_i];
        disposeArrayBuffer(index, ArrayBufferDataFromSystem);
        disposeIndexBuffer(index, IndexBufferDataFromSystem);
    }
};
//# sourceMappingURL=bufferUtils.js.map