'use strict';

var SharedArrayBufferCPRepoUtils$Wonderjs = require("../../utils/SharedArrayBufferCPRepoUtils.bs.js");

function getVertexSize(param) {
  return 3;
}

function getVertexLength(geometryPointCount) {
  return Math.imul(geometryPointCount, 3);
}

function getVerticesOffset(geometryPointCount) {
  return 0;
}

function getNormalsOffset(geometryPointCount) {
  return 0 + Math.imul(Math.imul(geometryPointCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getIndexSize(param) {
  return 1;
}

function getIndicesLength(geometryPointCount) {
  return (geometryPointCount << 0);
}

function getIndicesOffset(geometryPointCount) {
  return getNormalsOffset(geometryPointCount) + Math.imul(Math.imul(geometryPointCount, 3), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getInfoSize(param) {
  return 2;
}

function getVerticesInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getVerticesInfosOffset(geometryPointCount) {
  return getIndicesOffset(geometryPointCount) + Math.imul((geometryPointCount << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getNormalsInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getNormalsInfosOffset(geometryPointCount, geometryCount) {
  return getVerticesInfosOffset(geometryPointCount) + Math.imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getIndicesInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getIndicesInfosOffset(geometryPointCount, geometryCount) {
  return getNormalsInfosOffset(geometryPointCount, geometryCount) + Math.imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getVertexIndex(index) {
  return Math.imul(index, 3);
}

function getIndexIndex(index) {
  return (index << 0);
}

function getInfoIndex(index) {
  return (index << 1);
}

function getTotalByteLength(geometryPointCount, geometryCount) {
  return Math.imul(geometryPointCount, (Math.imul(Float32Array.BYTES_PER_ELEMENT, 3) << 1) + (Uint32Array.BYTES_PER_ELEMENT << 0) | 0) + Math.imul(Math.imul(geometryCount, Uint32Array.BYTES_PER_ELEMENT), 6) | 0;
}

function createBuffer(geometryPointCount, geometryCount) {
  return SharedArrayBufferCPRepoUtils$Wonderjs.newSharedArrayBuffer(getTotalByteLength(geometryPointCount, geometryCount));
}

exports.getVertexSize = getVertexSize;
exports.getVertexLength = getVertexLength;
exports.getVerticesOffset = getVerticesOffset;
exports.getNormalsOffset = getNormalsOffset;
exports.getIndexSize = getIndexSize;
exports.getIndicesLength = getIndicesLength;
exports.getIndicesOffset = getIndicesOffset;
exports.getInfoSize = getInfoSize;
exports.getVerticesInfosLength = getVerticesInfosLength;
exports.getVerticesInfosOffset = getVerticesInfosOffset;
exports.getNormalsInfosLength = getNormalsInfosLength;
exports.getNormalsInfosOffset = getNormalsInfosOffset;
exports.getIndicesInfosLength = getIndicesInfosLength;
exports.getIndicesInfosOffset = getIndicesInfosOffset;
exports.getVertexIndex = getVertexIndex;
exports.getIndexIndex = getIndexIndex;
exports.getInfoIndex = getInfoIndex;
exports.getTotalByteLength = getTotalByteLength;
exports.createBuffer = createBuffer;
/* No side effect */
