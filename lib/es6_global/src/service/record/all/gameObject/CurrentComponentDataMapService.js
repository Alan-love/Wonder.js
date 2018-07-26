

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getBoxGeometryType() {
  return 0;
}

function getCustomGeometryType() {
  return 1;
}

var getComponentData = SparseMapService$WonderCommonlib.get;

function unsafeGetComponentData(uid, currentComponentDataMap) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has component", "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), SparseMapService$WonderCommonlib.unsafeGet(uid, currentComponentDataMap));
}

export {
  getBoxGeometryType ,
  getCustomGeometryType ,
  getComponentData ,
  unsafeGetComponentData ,
  
}
/* Log-WonderLog Not a pure module */
