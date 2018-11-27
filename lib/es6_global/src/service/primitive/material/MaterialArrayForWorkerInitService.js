

import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as DisposeECSService$Wonderjs from "../ecs/DisposeECSService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function removeDisposedOnesFromMaterialArrayForWorkerInit(materialDataArray, materialArrayForWorkerInit) {
  var match = materialDataArray.length;
  if (match !== 0) {
    var materialMap = DisposeECSService$Wonderjs.buildMapFromArray(materialDataArray.map((function (param) {
                return param[1];
              })), SparseMapService$WonderCommonlib.createEmpty(/* () */0));
    return materialArrayForWorkerInit.filter((function (material) {
                  return !SparseMapService$WonderCommonlib.has(material, materialMap);
                }));
  } else {
    return materialArrayForWorkerInit;
  }
}

function addMaterialToMaterialArrayForWorkerInit(materialIndex, materialArrayForWorkerInit) {
  var match = ArrayService$Wonderjs.unsafeGetLast(materialArrayForWorkerInit) === materialIndex;
  if (match) {
    return materialArrayForWorkerInit;
  } else {
    return ArrayService$Wonderjs.push(materialIndex, materialArrayForWorkerInit);
  }
}

export {
  removeDisposedOnesFromMaterialArrayForWorkerInit ,
  addMaterialToMaterialArrayForWorkerInit ,
  
}
/* ArrayService-Wonderjs Not a pure module */
