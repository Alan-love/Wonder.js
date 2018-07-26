

import * as HashMapService$Wonderjs from "../../../atom/HashMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function getIntersectShaderIndexDataArray(currentState, targetState) {
  var match = currentState[/* shaderRecord */26];
  var currentShaderIndexMap = match[/* shaderIndexMap */1];
  var match$1 = targetState[/* shaderRecord */26];
  var targetShaderIndexMap = match$1[/* shaderIndexMap */1];
  return ArrayService$WonderCommonlib.reduceOneParam((function (dataArr, param) {
                dataArr.push(/* tuple */[
                      HashMapService$WonderCommonlib.unsafeGet(param[0], currentShaderIndexMap),
                      param[1]
                    ]);
                return dataArr;
              }), /* array */[], HashMapService$Wonderjs.entries(targetShaderIndexMap).filter((function (param) {
                    return HashMapService$WonderCommonlib.has(param[0], currentShaderIndexMap);
                  })));
}

export {
  getIntersectShaderIndexDataArray ,
  
}
/* HashMapService-Wonderjs Not a pure module */
