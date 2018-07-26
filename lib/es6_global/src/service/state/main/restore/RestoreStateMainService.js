

import * as DeviceManagerService$Wonderjs from "../../../record/all/device/DeviceManagerService.js";
import * as StateDataMainService$Wonderjs from "../state/StateDataMainService.js";
import * as TypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/TypeArrayPoolService.js";
import * as RestoreRenderMainService$Wonderjs from "./RestoreRenderMainService.js";
import * as RestoreShaderMainService$Wonderjs from "./RestoreShaderMainService.js";
import * as RestoreProgramMainService$Wonderjs from "./RestoreProgramMainService.js";
import * as RestoreTransformMainService$Wonderjs from "./RestoreTransformMainService.js";
import * as RestoreVboBufferMainService$Wonderjs from "./RestoreVboBufferMainService.js";
import * as RestoreGLSLSenderMainService$Wonderjs from "./RestoreGLSLSenderMainService.js";
import * as RestoreGlobalTempMainService$Wonderjs from "./RestoreGlobalTempMainService.js";
import * as RestorePointLightMainService$Wonderjs from "./RestorePointLightMainService.js";
import * as RestoreGLSLLocationMainService$Wonderjs from "./RestoreGLSLLocationMainService.js";
import * as IntersectShaderIndexMainService$Wonderjs from "../shader/IntersectShaderIndexMainService.js";
import * as RestoreBasicMaterialMainService$Wonderjs from "./RestoreBasicMaterialMainService.js";
import * as RestoreDeviceManagerMainService$Wonderjs from "./RestoreDeviceManagerMainService.js";
import * as RestoreLightMaterialMainService$Wonderjs from "./RestoreLightMaterialMainService.js";
import * as RestoreSourceTextureMainService$Wonderjs from "./RestoreSourceTextureMainService.js";
import * as RestoreTypeArrayPoolMainService$Wonderjs from "./RestoreTypeArrayPoolMainService.js";
import * as RestoreCustomGeometryMainService$Wonderjs from "./RestoreCustomGeometryMainService.js";
import * as RestoreDirectionLightMainService$Wonderjs from "./RestoreDirectionLightMainService.js";
import * as RestoreSourceInstanceMainService$Wonderjs from "./RestoreSourceInstanceMainService.js";
import * as RestoreBasicSourceTextureMainService$Wonderjs from "./RestoreBasicSourceTextureMainService.js";
import * as RestoreArrayBufferViewSourceTextureMainService$Wonderjs from "./RestoreArrayBufferViewSourceTextureMainService.js";

function _getSharedData(currentState) {
  var typeArrayPoolRecord = currentState[/* typeArrayPoolRecord */36];
  return /* record */[
          /* gl */DeviceManagerService$Wonderjs.unsafeGetGl(currentState[/* deviceManagerRecord */9]),
          /* float32ArrayPoolMap */TypeArrayPoolService$Wonderjs.getFloat32ArrayPoolMap(typeArrayPoolRecord),
          /* uint16ArrayPoolMap */TypeArrayPoolService$Wonderjs.getUint16ArrayPoolMap(typeArrayPoolRecord)
        ];
}

function restore(stateData, currentState, targetState) {
  var intersectShaderIndexDataArray = IntersectShaderIndexMainService$Wonderjs.getIntersectShaderIndexDataArray(currentState, targetState);
  var sharedData = _getSharedData(currentState);
  var match = RestoreSourceInstanceMainService$Wonderjs.restore(currentState, sharedData, targetState);
  var sharedData$1 = match[1];
  var targetState$1 = RestoreDeviceManagerMainService$Wonderjs.restore(currentState, sharedData$1, match[0]);
  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(targetState$1[/* deviceManagerRecord */9]);
  return StateDataMainService$Wonderjs.setState(stateData, RestoreArrayBufferViewSourceTextureMainService$Wonderjs.restore(currentState, RestoreBasicSourceTextureMainService$Wonderjs.restore(currentState, RestoreSourceTextureMainService$Wonderjs.restore(currentState, RestorePointLightMainService$Wonderjs.restore(currentState, RestoreDirectionLightMainService$Wonderjs.restore(currentState, RestoreCustomGeometryMainService$Wonderjs.restore(currentState, RestoreTransformMainService$Wonderjs.restore(currentState, RestoreRenderMainService$Wonderjs.restore(currentState, RestoreLightMaterialMainService$Wonderjs.restore(gl, currentState, RestoreBasicMaterialMainService$Wonderjs.restore(gl, currentState, RestoreGLSLSenderMainService$Wonderjs.restore(intersectShaderIndexDataArray, currentState, RestoreGLSLLocationMainService$Wonderjs.restore(intersectShaderIndexDataArray, currentState, RestoreProgramMainService$Wonderjs.restore(intersectShaderIndexDataArray, currentState, RestoreShaderMainService$Wonderjs.restore(currentState, RestoreVboBufferMainService$Wonderjs.restore(currentState, RestoreGlobalTempMainService$Wonderjs.restore(currentState, RestoreTypeArrayPoolMainService$Wonderjs.restore(currentState, sharedData$1, targetState$1))))))))))))))))));
}

export {
  _getSharedData ,
  restore ,
  
}
/* DeviceManagerService-Wonderjs Not a pure module */
