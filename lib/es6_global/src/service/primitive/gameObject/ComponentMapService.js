

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

var getComponent = SparseMapService$WonderCommonlib.get;

function unsafeGetComponent(uid, componentMap) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("component exist", "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), SparseMapService$WonderCommonlib.unsafeGet(uid, componentMap));
}

function hasComponent(uid, componentMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(uid, componentMap) !== undefined;
}

function addComponent(uid, component, componentMap) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("this type of the component shouldn\'t be added before", "not"), (function () {
                        return Contract$WonderLog.assertFalse(hasComponent(uid, componentMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  SparseMapService$WonderCommonlib.set(uid, component, componentMap);
  return /* () */0;
}

var removeComponent = SparseMapService$WonderCommonlib.deleteVal;

var hasComponent$1 = hasComponent;

function batchGetComponent(uidArray, componentMap) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr, uid) {
                var match = SparseMapService$WonderCommonlib.get(uid, componentMap);
                if (match !== undefined) {
                  return ArrayService$Wonderjs.push(match, arr);
                } else {
                  return arr;
                }
              }), /* array */[], uidArray);
}

function batchDisposeComponentWithUidMap(uidMap, componentRecord, handleFunc, componentArray) {
  return handleFunc(componentArray, uidMap, componentRecord);
}

function batchDisposeComponent(componentRecord, handleFunc, componentArray) {
  return handleFunc(componentArray, componentRecord);
}

export {
  getComponent ,
  unsafeGetComponent ,
  addComponent ,
  removeComponent ,
  hasComponent$1 as hasComponent,
  batchGetComponent ,
  batchDisposeComponentWithUidMap ,
  batchDisposeComponent ,
  
}
/* Log-WonderLog Not a pure module */
