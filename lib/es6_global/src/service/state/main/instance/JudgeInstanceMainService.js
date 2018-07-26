

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectMapService$Wonderjs from "../../../primitive/GameObjectMapService.js";
import * as JudgeInstanceService$Wonderjs from "../../../record/all/instance/JudgeInstanceService.js";
import * as OperateSettingService$Wonderjs from "../../../record/main/setting/OperateSettingService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as HasComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/HasComponentGameObjectService.js";

function isSupportInstance(state) {
  return JudgeInstanceService$Wonderjs.isSupportInstance(OperateSettingService$Wonderjs.unsafeGetGPU(state[/* settingRecord */0])[/* useHardwareInstance */0], state[/* gpuDetectRecord */5]);
}

function isSourceInstance(materialIndex, gameObjectMap, gameObjectRecord) {
  return HasComponentGameObjectService$Wonderjs.hasSourceInstanceComponent(GameObjectMapService$Wonderjs.unsafeGetGameObject(materialIndex, gameObjectMap), gameObjectRecord);
}

function buildMap(index, gameObjectMap, gameObjectRecord) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (map, materialIndex) {
                return SparseMapService$WonderCommonlib.set(materialIndex, isSourceInstance(materialIndex, gameObjectMap, gameObjectRecord), map);
              }), SparseMapService$WonderCommonlib.createEmpty(/* () */0), ArrayService$Wonderjs.range(0, index - 1 | 0));
}

export {
  isSupportInstance ,
  isSourceInstance ,
  buildMap ,
  
}
/* ArrayService-Wonderjs Not a pure module */
