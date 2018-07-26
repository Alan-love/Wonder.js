

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GroupCustomGeometryService$Wonderjs from "../../../../record/main/geometry/custom/GroupCustomGeometryService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "./RecordCustomGeometryMainService.js";

function isAlive(geometry, param) {
  var disposedIndexArray = param[/* disposedIndexArray */17];
  return DisposeComponentService$Wonderjs.isAlive(geometry, disposedIndexArray);
}

function _disposeData(geometry, customGeometryRecord) {
  var disposeCount = customGeometryRecord[/* disposeCount */14];
  var disposedIndexArray = customGeometryRecord[/* disposedIndexArray */17];
  var disposedIndexMap = customGeometryRecord[/* disposedIndexMap */18];
  return /* record */[
          /* index */customGeometryRecord[/* index */0],
          /* buffer */customGeometryRecord[/* buffer */1],
          /* vertices */customGeometryRecord[/* vertices */2],
          /* texCoords */customGeometryRecord[/* texCoords */3],
          /* normals */customGeometryRecord[/* normals */4],
          /* indices */customGeometryRecord[/* indices */5],
          /* verticesInfos */customGeometryRecord[/* verticesInfos */6],
          /* texCoordsInfos */customGeometryRecord[/* texCoordsInfos */7],
          /* normalsInfos */customGeometryRecord[/* normalsInfos */8],
          /* indicesInfos */customGeometryRecord[/* indicesInfos */9],
          /* verticesOffset */customGeometryRecord[/* verticesOffset */10],
          /* texCoordsOffset */customGeometryRecord[/* texCoordsOffset */11],
          /* normalsOffset */customGeometryRecord[/* normalsOffset */12],
          /* indicesOffset */customGeometryRecord[/* indicesOffset */13],
          /* disposeCount */disposeCount + 1 | 0,
          /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, customGeometryRecord[/* gameObjectMap */15]),
          /* groupCountMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, customGeometryRecord[/* groupCountMap */16]),
          /* disposedIndexArray */ArrayService$Wonderjs.push(geometry, disposedIndexArray),
          /* disposedIndexMap */SparseMapService$WonderCommonlib.set(geometry, true, disposedIndexMap),
          /* aliveIndexArray */customGeometryRecord[/* aliveIndexArray */19]
        ];
}

function handleBatchDisposeComponent(geometryArray, state) {
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(geometryArray, isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var customGeometryRecord = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, geometry) {
          var customGeometryRecord = param[1];
          var geometryNeedDisposeVboBufferArr = param[0];
          var match = GroupCustomGeometryService$Wonderjs.isGroupGeometry(geometry, customGeometryRecord);
          if (match) {
            return /* tuple */[
                    geometryNeedDisposeVboBufferArr,
                    GroupCustomGeometryService$Wonderjs.decreaseGroupCount(geometry, customGeometryRecord)
                  ];
          } else {
            return /* tuple */[
                    ArrayService$Wonderjs.push(geometry, geometryNeedDisposeVboBufferArr),
                    _disposeData(geometry, customGeometryRecord)
                  ];
          }
        }), /* tuple */[
        /* array */[],
        customGeometryRecord
      ], geometryArray);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* customGeometryRecord */23] = match[1], newrecord),
          match[0]
        ];
}

function isNotDisposed(param) {
  var disposedIndexArray = param[/* disposedIndexArray */17];
  return disposedIndexArray.length === 0;
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  isNotDisposed ,
  
}
/* Contract-WonderLog Not a pure module */
