

import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as MappedIndexService$Wonderjs from "../../../primitive/MappedIndexService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";

var isAlive = MappedIndexService$Wonderjs.isComponentAlive;

var disposeData = DisposeComponentService$Wonderjs.disposeSparseMapData;

function _swapIndex(mappedSourceIndex, lastComponentIndex, mappedIndexMap) {
  var match = mappedSourceIndex >= lastComponentIndex;
  if (match) {
    return mappedIndexMap;
  } else {
    return MappedIndexService$Wonderjs.setMappedIndex(lastComponentIndex, mappedSourceIndex, mappedIndexMap);
  }
}

function swapData(param, param$1, deleteBySwapAndResetTypeArrFunc, typeArr) {
  var dataSize = param$1[1];
  var lastComponentIndex = param[1];
  var mappedSourceIndex = param[0];
  var match = mappedSourceIndex >= lastComponentIndex;
  if (match) {
    return typeArr;
  } else {
    return deleteBySwapAndResetTypeArrFunc(/* tuple */[
                Caml_int32.imul(mappedSourceIndex, dataSize),
                Caml_int32.imul(lastComponentIndex, dataSize)
              ], typeArr, dataSize, param$1[2]);
  }
}

function setMappedIndexMap(sourceIndex, mappedSourceIndex, lastComponentIndex, mappedIndexMap) {
  return MappedIndexService$Wonderjs.markDisposed(sourceIndex, _swapIndex(mappedSourceIndex, lastComponentIndex, mappedIndexMap));
}

function handleDisposeComponent(light, param, record) {
  var isAliveFunc = param[0];
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAlive(light, isAliveFunc, record);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return param[1](light, record);
}

function handleBatchDisposeComponent(lightArray, param, record) {
  var handleDisposeFunc = param[1];
  var isAliveFunc = param[0];
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(lightArray, isAliveFunc, record);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ArrayService$WonderCommonlib.reduceOneParam((function (record, light) {
                return handleDisposeFunc(light, record);
              }), record, lightArray);
}

export {
  isAlive ,
  disposeData ,
  _swapIndex ,
  swapData ,
  setMappedIndexMap ,
  handleDisposeComponent ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
