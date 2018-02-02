open DirectionLightType;

let create = (state: StateDataType.state) => [@bs] DirectionLightCreateCommon.create(state);

let getColor = (light, state: StateDataType.state) =>
  DirectionLightOperateCommon.getColor(light, state);

let setColor = (light, color, state: StateDataType.state) =>
  DirectionLightOperateCommon.setColor(light, color, state);

let getIntensity = (light, state: StateDataType.state) =>
  DirectionLightOperateCommon.getIntensity(light, state);

let setIntensity = (light, intensity, state: StateDataType.state) =>
  DirectionLightOperateCommon.setIntensity(light, intensity, state);

let getGameObject = DirectionLightGameObjectCommon.getGameObject;

let unsafeGetGameObject = DirectionLightGameObjectCommon.unsafeGetGameObject;

let getLightData = DirectionLightStateCommon.getLightData;

let deepCopyStateForRestore = DirectionLightStateCommon.deepCopyStateForRestore;

let restore = DirectionLightStateCommon.restore;

let isAlive = DirectionLightDisposeComponentCommon.isAlive;

let getMappedIndex = LightIndexCommon.getMappedIndex;

let setMappedIndex = LightIndexCommon.setMappedIndex;

let getMappedIndexMap = DirectionLightIndexCommon.getMappedIndexMap;

let getLightCount = (state: StateDataType.state) =>
  DirectionLightStateCommon.getLightData(state).index
  /* TODO test */
  |> WonderLog.Contract.ensureCheck(
       (count) => {
         open WonderLog;
         open Contract;
         open Operators;
         let maxCount = DirectionLightHelper.getBufferMaxCount();
         test(
           Log.buildAssertMessage(
             ~expect={j|light count: $count <= max buffer count: $maxCount|j},
             ~actual={j|not|j}
           ),
           () => assertLte(Int, count, maxCount)
         )
       },
       StateData.stateData.isDebug
     );