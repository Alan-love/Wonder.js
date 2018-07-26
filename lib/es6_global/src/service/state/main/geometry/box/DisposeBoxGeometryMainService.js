

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as GroupBoxGeometryService$Wonderjs from "../../../../record/main/geometry/box/GroupBoxGeometryService.js";
import * as RecordBoxGeometryMainService$Wonderjs from "./RecordBoxGeometryMainService.js";

function isAlive(geometry, param) {
  var disposedIndexArray = param[/* disposedIndexArray */7];
  return DisposeComponentService$Wonderjs.isAlive(geometry, disposedIndexArray);
}

function _disposeData(geometry, boxGeometryRecord) {
  var disposedIndexArray = boxGeometryRecord[/* disposedIndexArray */7];
  return /* record */[
          /* index */boxGeometryRecord[/* index */0],
          /* vertices */boxGeometryRecord[/* vertices */1],
          /* texCoords */boxGeometryRecord[/* texCoords */2],
          /* normals */boxGeometryRecord[/* normals */3],
          /* indices */boxGeometryRecord[/* indices */4],
          /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, boxGeometryRecord[/* gameObjectMap */5]),
          /* groupCountMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, boxGeometryRecord[/* groupCountMap */6]),
          /* disposedIndexArray */ArrayService$Wonderjs.push(geometry, disposedIndexArray)
        ];
}

function handleBatchDisposeComponent(geometryArray, state) {
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(geometryArray, isAlive, RecordBoxGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var boxGeometryRecord = RecordBoxGeometryMainService$Wonderjs.getRecord(state);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, geometry) {
          var boxGeometryRecord = param[1];
          var geometryNeedDisposeVboBufferArr = param[0];
          var match = GroupBoxGeometryService$Wonderjs.isGroupGeometry(geometry, boxGeometryRecord);
          if (match) {
            return /* tuple */[
                    geometryNeedDisposeVboBufferArr,
                    GroupBoxGeometryService$Wonderjs.decreaseGroupCount(geometry, boxGeometryRecord)
                  ];
          } else {
            return /* tuple */[
                    ArrayService$Wonderjs.push(geometry, geometryNeedDisposeVboBufferArr),
                    _disposeData(geometry, boxGeometryRecord)
                  ];
          }
        }), /* tuple */[
        /* array */[],
        boxGeometryRecord
      ], geometryArray);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* boxGeometryRecord */22] = match[1], newrecord),
          match[0]
        ];
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
