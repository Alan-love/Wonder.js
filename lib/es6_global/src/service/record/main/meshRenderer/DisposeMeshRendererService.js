

import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";

var _batchRemoveFromRenderArray = DisposeComponentService$Wonderjs.batchRemoveFromArray;

function isAlive(meshRenderer, param) {
  return DisposeComponentService$Wonderjs.isAlive(meshRenderer, param[/* disposedIndexArray */4]);
}

function _disposeData(meshRenderer, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* basicMaterialRenderGameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(meshRenderer, record[/* basicMaterialRenderGameObjectMap */1]),
          /* lightMaterialRenderGameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(meshRenderer, record[/* lightMaterialRenderGameObjectMap */2]),
          /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(meshRenderer, record[/* gameObjectMap */3]),
          /* disposedIndexArray */record[/* disposedIndexArray */4]
        ];
}

function handleBatchDisposeComponent(meshRendererArray, record) {
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(meshRendererArray, isAlive, record);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = meshRendererArray.length;
  if (match !== 0) {
    var record_000 = /* index */record[/* index */0];
    var record_001 = /* basicMaterialRenderGameObjectMap */record[/* basicMaterialRenderGameObjectMap */1];
    var record_002 = /* lightMaterialRenderGameObjectMap */record[/* lightMaterialRenderGameObjectMap */2];
    var record_003 = /* gameObjectMap */record[/* gameObjectMap */3];
    var record_004 = /* disposedIndexArray */record[/* disposedIndexArray */4].concat(meshRendererArray);
    var record$1 = /* record */[
      record_000,
      record_001,
      record_002,
      record_003,
      record_004
    ];
    return ArrayService$WonderCommonlib.reduceOneParam((function (record, meshRenderer) {
                  return _disposeData(meshRenderer, record);
                }), record$1, meshRendererArray);
  } else {
    return record;
  }
}

export {
  _batchRemoveFromRenderArray ,
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
