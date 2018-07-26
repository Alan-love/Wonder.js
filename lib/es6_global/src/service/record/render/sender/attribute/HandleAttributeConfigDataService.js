

import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../state/main/state/IsDebugMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function unsafeGetAttributeSendData(shaderIndex, glslSenderRecord) {
  return Contract$WonderLog.ensureCheck((function (sendData) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("attribute send record exist", "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(sendData);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), SparseMapService$WonderCommonlib.unsafeGet(shaderIndex, glslSenderRecord[/* attributeSendDataMap */0]));
}

function unsafeGetInstanceAttributeSendData(shaderIndex, param) {
  return Contract$WonderLog.ensureCheck((function (sendData) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("instance attribute send record exist", "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(sendData);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), SparseMapService$WonderCommonlib.unsafeGet(shaderIndex, param[/* instanceAttributeSendDataMap */1]));
}

export {
  unsafeGetAttributeSendData ,
  unsafeGetInstanceAttributeSendData ,
  
}
/* Log-WonderLog Not a pure module */
