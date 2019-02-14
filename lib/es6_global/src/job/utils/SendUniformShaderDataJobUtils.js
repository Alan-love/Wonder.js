

import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../service/record/all/location/GLSLLocationService.js";
import * as DeviceManagerService$Wonderjs from "../../service/record/all/device/DeviceManagerService.js";
import * as UseProgramRenderService$Wonderjs from "../../service/state/render/program/UseProgramRenderService.js";
import * as OperateCameraRenderService$Wonderjs from "../../service/state/render/camera/OperateCameraRenderService.js";
import * as HandleUniformShaderCachableService$Wonderjs from "../../service/record/all/sender/uniform/HandleUniformShaderCachableService.js";
import * as HandleUniformShaderNoCachableService$Wonderjs from "../../service/record/all/sender/uniform/HandleUniformShaderNoCachableService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../service/state/render/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../service/state/render/send_render_data/CreateSendRenederDataSubStateRenderService.js";
import * as HandleUniformShaderCachableFunctionService$Wonderjs from "../../service/record/all/sender/uniform/HandleUniformShaderCachableFunctionService.js";

var _useProgram = UseProgramRenderService$Wonderjs.useByShaderIndex;

function execJob(renderState) {
  var match = !OperateCameraRenderService$Wonderjs.hasCameraRecord(renderState);
  if (match) {
    return renderState;
  } else {
    var gl = DeviceManagerService$Wonderjs.unsafeGetGl(renderState[/* deviceManagerRecord */18]);
    var renderState$1 = HandleUniformShaderNoCachableService$Wonderjs.reduceiValidShaderSendNoCachableData(renderState[/* glslSenderRecord */3], (function (renderState, dataArr, shaderIndex) {
            var renderState$1 = UseProgramRenderService$Wonderjs.useByShaderIndex(gl, shaderIndex, renderState);
            ArrayService$WonderCommonlib.reduceOneParam((function (getRenderDataSubState, param) {
                    var pos = param[/* pos */0];
                    var match = GLSLLocationService$Wonderjs.isUniformLocationExist(pos);
                    if (match) {
                      param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](getRenderDataSubState));
                    }
                    return getRenderDataSubState;
                  }), CreateGetRenederDataSubStateRenderService$Wonderjs.createState(renderState$1), dataArr);
            return renderState$1;
          }), renderState);
    var renderState$2 = HandleUniformShaderCachableService$Wonderjs.reduceiValidShaderSendCachableData(renderState$1[/* glslSenderRecord */3], (function (renderState, dataArr, shaderIndex) {
            var renderState$1 = UseProgramRenderService$Wonderjs.useByShaderIndex(gl, shaderIndex, renderState);
            ArrayService$WonderCommonlib.reduceOneParam((function (getRenderDataSubState, param) {
                    param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
                          param[/* name */1],
                          param[/* pos */2]
                        ], param[/* getDataFunc */3](getRenderDataSubState));
                    return getRenderDataSubState;
                  }), CreateGetRenederDataSubStateRenderService$Wonderjs.createState(renderState$1), dataArr);
            return renderState$1;
          }), renderState$1);
    return HandleUniformShaderCachableFunctionService$Wonderjs.reduceiValidShaderSendCachableFunctionData(renderState$2[/* glslSenderRecord */3], (function (renderState, dataArr, shaderIndex) {
                  var renderState$1 = UseProgramRenderService$Wonderjs.useByShaderIndex(gl, shaderIndex, renderState);
                  ArrayService$WonderCommonlib.reduceOneParam((function (sendRenderDataSubState, param) {
                          param[/* sendCachableFunctionDataFunc */3](gl, /* tuple */[
                                param[/* program */0],
                                param[/* shaderCacheMap */1],
                                param[/* locationMap */2]
                              ], sendRenderDataSubState);
                          return sendRenderDataSubState;
                        }), CreateSendRenederDataSubStateRenderService$Wonderjs.createState(renderState$1), dataArr);
                  return renderState$1;
                }), renderState$2);
  }
}

export {
  _useProgram ,
  execJob ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
