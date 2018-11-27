

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as Matrix4Service$Wonderjs from "../atom/Matrix4Service.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function unsafeGetPMatrix(index, pMatrixMap) {
  return Contract$WonderLog.ensureCheck((function (pMatrix) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("pMatrix exist", "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(pMatrix);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), SparseMapService$WonderCommonlib.unsafeGet(index, pMatrixMap));
}

function setDefaultPMatrix(index, pMatrixMap) {
  return SparseMapService$WonderCommonlib.set(index, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0), pMatrixMap);
}

export {
  unsafeGetPMatrix ,
  setDefaultPMatrix ,
  
}
/* Log-WonderLog Not a pure module */
