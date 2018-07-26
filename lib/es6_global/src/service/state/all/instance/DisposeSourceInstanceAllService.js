

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/TypeArrayPoolService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function disposeMatrixFloat32ArrayMap(sourceInstance, maxBigTypeArrayPoolSize, matrixFloat32ArrayMap, typeArrayPoolRecord) {
  var match = SparseMapService$WonderCommonlib.get(sourceInstance, matrixFloat32ArrayMap);
  if (match !== undefined) {
    TypeArrayPoolService$Wonderjs.addFloat32TypeArrayToPool(Js_primitive.valFromOption(match), maxBigTypeArrayPoolSize, TypeArrayPoolService$Wonderjs.getFloat32ArrayPoolMap(typeArrayPoolRecord));
  }
  return DisposeComponentService$Wonderjs.disposeSparseMapData(sourceInstance, matrixFloat32ArrayMap);
}

var disposeMatrixInstanceBufferCapacityMap = DisposeComponentService$Wonderjs.disposeSparseMapData;

var disposeIsSendTransformMatrixDataMap = DisposeComponentService$Wonderjs.disposeSparseMapData;

export {
  disposeMatrixFloat32ArrayMap ,
  disposeMatrixInstanceBufferCapacityMap ,
  disposeIsSendTransformMatrixDataMap ,
  
}
/* TypeArrayPoolService-Wonderjs Not a pure module */
