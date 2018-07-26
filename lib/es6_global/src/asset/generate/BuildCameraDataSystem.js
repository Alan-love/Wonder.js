

import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "./GenerateCommon.js";
import * as SparseMapService$Wonderjs from "../../service/atom/SparseMapService.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as FrustumPerspectiveCameraProjectionService$Wonderjs from "../../service/record/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionService.js";

function _convertDegreeToRadians(angle) {
  return angle * Math.PI / 180;
}

function build(cameraDataMap, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  Contract$WonderLog.requireCheck((function () {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(cameraDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return SparseMapService$Wonderjs.reduceValid((function (cameraDataArr, perspectiveCameraProjection) {
                return ArrayService$Wonderjs.push(/* record */[
                            /* type_ */"perspective",
                            /* perspective : record */[
                              /* near */FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetNear(perspectiveCameraProjection, perspectiveCameraProjectionRecord),
                              /* far */FrustumPerspectiveCameraProjectionService$Wonderjs.getFar(perspectiveCameraProjection, perspectiveCameraProjectionRecord),
                              /* fovy */_convertDegreeToRadians(FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetFovy(perspectiveCameraProjection, perspectiveCameraProjectionRecord)),
                              /* aspect */FrustumPerspectiveCameraProjectionService$Wonderjs.getAspect(perspectiveCameraProjection, perspectiveCameraProjectionRecord)
                            ]
                          ], cameraDataArr);
              }), /* array */[], cameraDataMap);
}

export {
  _convertDegreeToRadians ,
  build ,
  
}
/* Contract-WonderLog Not a pure module */
