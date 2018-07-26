

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RestoreShaderFromStateService$Wonderjs from "../../../primitive/shader/RestoreShaderFromStateService.js";

function restore(intersectShaderIndexDataArray, currentState, targetState) {
  var match = currentState[/* glslSenderRecord */30];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* glslSenderRecord */30] = /* record */[
    /* attributeSendDataMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* attributeSendDataMap */0]),
    /* instanceAttributeSendDataMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* instanceAttributeSendDataMap */1]),
    /* uniformCacheMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* uniformCacheMap */2]),
    /* uniformRenderObjectSendModelDataMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* uniformRenderObjectSendModelDataMap */3]),
    /* uniformRenderObjectSendMaterialDataMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* uniformRenderObjectSendMaterialDataMap */4]),
    /* uniformShaderSendNoCachableDataMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* uniformShaderSendNoCachableDataMap */5]),
    /* uniformShaderSendCachableDataMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* uniformShaderSendCachableDataMap */6]),
    /* uniformShaderSendCachableFunctionDataMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* uniformShaderSendCachableFunctionDataMap */7]),
    /* uniformInstanceSendNoCachableDataMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* uniformInstanceSendNoCachableDataMap */8]),
    /* vertexAttribHistoryArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* lastSendMaterialData */undefined,
    /* lastSendGeometryData */undefined
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
