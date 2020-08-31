'use strict';

var ListSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var POConfigCPRepo$Wonderjs = require("../../../POConfigCPRepo.bs.js");
var BufferTransformCPRepoUtils$Wonderjs = require("./utils/BufferTransformCPRepoUtils.bs.js");
var CreateMapComponentCPRepoUtils$Wonderjs = require("../utils/CreateMapComponentCPRepoUtils.bs.js");
var CreateTypeArrayTransformCPRepoUtils$Wonderjs = require("./utils/CreateTypeArrayTransformCPRepoUtils.bs.js");
var OperateTypeArrayTransformCPRepoUtils$Wonderjs = require("./utils/OperateTypeArrayTransformCPRepoUtils.bs.js");

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultLocalScale = param$1[3];
  var defaultLocalRotation = param$1[2];
  var defaultLocalPosition = param$1[1];
  var defaultLocalToWorldMatrix = param$1[0];
  var localScales = param[3];
  var localRotations = param[2];
  var localPositions = param[1];
  var localToWorldMatrices = param[0];
  return ListSt$Wonderjs.reduce(ListSt$Wonderjs.range(0, count - 1 | 0), Result$Wonderjs.succeed(undefined), (function (result, index) {
                return Result$Wonderjs.bind(result, (function (param) {
                              return Result$Wonderjs.bind(OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalToWorldMatrix(index, defaultLocalToWorldMatrix, localToWorldMatrices), (function (param) {
                                            return Result$Wonderjs.bind(OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalPosition(index, defaultLocalPosition, localPositions), (function (param) {
                                                          return Result$Wonderjs.bind(OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalRotation(index, defaultLocalRotation, localRotations), (function (param) {
                                                                        return OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalScale(index, defaultLocalScale, localScales);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
}

function _initBufferData(count, defaultDataTuple) {
  return Result$Wonderjs.bind(BufferTransformCPRepoUtils$Wonderjs.createBuffer(count), (function (buffer) {
                var match = CreateTypeArrayTransformCPRepoUtils$Wonderjs.createTypeArrays(buffer, count);
                var localScales = match[3];
                var localRotations = match[2];
                var localPositions = match[1];
                var localToWorldMatrices = match[0];
                return Result$Wonderjs.mapSuccess(_setAllTypeArrDataToDefault([
                                localToWorldMatrices,
                                localPositions,
                                localRotations,
                                localScales
                              ], count, defaultDataTuple), (function (param) {
                              return [
                                      buffer,
                                      [
                                        localToWorldMatrices,
                                        localPositions,
                                        localRotations,
                                        localScales
                                      ]
                                    ];
                            }));
              }));
}

function createPO(param) {
  var transformCount = POConfigCPRepo$Wonderjs.getTransformCount(undefined);
  var defaultLocalToWorldMatrix = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ];
  var defaultLocalPosition = [
    0,
    0,
    0
  ];
  var defaultLocalRotation = [
    0,
    0,
    0,
    1
  ];
  var defaultLocalScale = [
    1,
    1,
    1
  ];
  return Result$Wonderjs.mapSuccess(_initBufferData(transformCount, [
                  defaultLocalToWorldMatrix,
                  defaultLocalPosition,
                  defaultLocalRotation,
                  defaultLocalScale
                ]), (function (param) {
                var match = param[1];
                return {
                        maxIndex: 0,
                        buffer: param[0],
                        localToWorldMatrices: match[0],
                        localPositions: match[1],
                        localRotations: match[2],
                        localScales: match[3],
                        defaultLocalToWorldMatrix: defaultLocalToWorldMatrix,
                        defaultLocalPosition: defaultLocalPosition,
                        defaultLocalRotation: defaultLocalRotation,
                        defaultLocalScale: defaultLocalScale,
                        parentMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(transformCount),
                        childrenMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(transformCount),
                        gameObjectMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(transformCount),
                        dirtyMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(transformCount)
                      };
              }));
}

exports._setAllTypeArrDataToDefault = _setAllTypeArrDataToDefault;
exports._initBufferData = _initBufferData;
exports.createPO = createPO;
/* POConfigCPRepo-Wonderjs Not a pure module */
