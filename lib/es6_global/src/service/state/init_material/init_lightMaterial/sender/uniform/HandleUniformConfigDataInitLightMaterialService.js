

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OptionService$Wonderjs from "../../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../../../record/all/location/GLSLLocationService.js";
import * as HandleModelUniformConfigDataService$Wonderjs from "../../../../../record/render/sender/uniform/model/HandleModelUniformConfigDataService.js";
import * as HandleCameraUniformConfigDataService$Wonderjs from "../../../../../record/render/sender/uniform/camera/HandleCameraUniformConfigDataService.js";
import * as HandleLightUniformConfigDataAllService$Wonderjs from "../../../../all/sender/uniform/light/HandleLightUniformConfigDataAllService.js";
import * as HandleMaterialUniformConfigDataService$Wonderjs from "../../../../../record/render/sender/uniform/material/HandleMaterialUniformConfigDataService.js";
import * as HandleUniformConfigDataInitMaterialService$Wonderjs from "../../../sender/uniform/HandleUniformConfigDataInitMaterialService.js";

function _readUniforms(param, sendDataArrTuple, uniforms) {
  var uniformCacheMap = param[3];
  var uniformLocationMap = param[2];
  var program = param[1];
  var gl = param[0];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(uniforms);
  if (match) {
    return sendDataArrTuple;
  } else {
    return ArrayService$WonderCommonlib.reduceOneParam((function (sendDataArrTuple, param) {
                  var from = param[/* from */3];
                  var type_ = param[/* type_ */2];
                  var field = param[/* field */1];
                  var name = param[/* name */0];
                  switch (from) {
                    case "ambientLight" : 
                        return HandleLightUniformConfigDataAllService$Wonderjs.addAmbientLightSendData(/* tuple */[
                                    field,
                                    program,
                                    uniformCacheMap,
                                    uniformLocationMap
                                  ], sendDataArrTuple);
                    case "basicMaterial" : 
                        return HandleMaterialUniformConfigDataService$Wonderjs.addBasicMaterialSendData(/* tuple */[
                                    field,
                                    GLSLLocationService$Wonderjs.getUniformLocation(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "camera" : 
                        return HandleCameraUniformConfigDataService$Wonderjs.addCameraSendData(/* tuple */[
                                    field,
                                    GLSLLocationService$Wonderjs.getUniformLocation(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "directionLight" : 
                        return HandleLightUniformConfigDataAllService$Wonderjs.addDirectionLightSendData(/* tuple */[
                                    field,
                                    program,
                                    uniformCacheMap,
                                    uniformLocationMap
                                  ], sendDataArrTuple);
                    case "lightMaterial" : 
                        return HandleMaterialUniformConfigDataService$Wonderjs.addLightMaterialSendData(/* tuple */[
                                    field,
                                    GLSLLocationService$Wonderjs.getUniformLocation(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "model" : 
                        return HandleModelUniformConfigDataService$Wonderjs.addModelSendData(/* tuple */[
                                    field,
                                    GLSLLocationService$Wonderjs.getUniformLocation(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "pointLight" : 
                        return HandleLightUniformConfigDataAllService$Wonderjs.addPointLightSendData(/* tuple */[
                                    field,
                                    program,
                                    uniformCacheMap,
                                    uniformLocationMap
                                  ], sendDataArrTuple);
                    default:
                      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_readUniforms", "unknow from:" + (String(from) + ""), "", "", ""));
                  }
                }), sendDataArrTuple, OptionService$Wonderjs.unsafeGetJsonSerializedValue(uniforms));
  }
}

function _readUniformSendData(shaderLibDataArr, gl, program, param) {
  return HandleUniformConfigDataInitMaterialService$Wonderjs.readUniformSendData(shaderLibDataArr, /* tuple */[
              gl,
              program
            ], _readUniforms, /* tuple */[
              param[0],
              param[1]
            ]);
}

function addUniformSendData(gl, param, recordTuple) {
  return HandleUniformConfigDataInitMaterialService$Wonderjs.addUniformSendData(gl, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], _readUniformSendData, recordTuple);
}

export {
  _readUniforms ,
  _readUniformSendData ,
  addUniformSendData ,
  
}
/* Log-WonderLog Not a pure module */
