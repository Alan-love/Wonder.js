

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as HandleUniformConfigDataMapService$Wonderjs from "../../../../primitive/sender/HandleUniformConfigDataMapService.js";

function addUniformSendDataByType(param, param$1, sendDataFunc) {
  return /* tuple */[
          param$1[0],
          param$1[1],
          param$1[2],
          param$1[3],
          ArrayService$Wonderjs.push(/* record */[
                /* program */param[0],
                /* shaderCacheMap */param[1],
                /* locationMap */param[2],
                /* sendCachableFunctionDataFunc */sendDataFunc
              ], param$1[4]),
          param$1[5]
        ];
}

function setToUniformSendMap(shaderIndex, uniformShaderSendCachableFunctionDataMap, shaderSendCachableFunctionDataArr) {
  return SparseMapService$WonderCommonlib.set(shaderIndex, shaderSendCachableFunctionDataArr, uniformShaderSendCachableFunctionDataMap);
}

function unsafeGetUniformSendData(shaderIndex, glslSenderRecord) {
  return HandleUniformConfigDataMapService$Wonderjs.unsafeGetUniformSendData(shaderIndex, glslSenderRecord[/* uniformShaderSendCachableFunctionDataMap */7]);
}

export {
  addUniformSendDataByType ,
  setToUniformSendMap ,
  unsafeGetUniformSendData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
