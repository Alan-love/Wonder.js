open StateDataMainType;

let getDirection = (index, {gameObjectRecord, globalTempRecord} as state) =>
  UpdateTransformMainService.updateAndGetEulerAnglesTuple(
    GetComponentGameObjectService.unsafeGetTransformComponent(
      GameObjectDirectionLightService.unsafeGetGameObject(
        index,
        RecordDirectionLightMainService.getRecord(state),
      ),
      gameObjectRecord,
    ),
    globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  )
  |> QuaternionService.setFromEulerAngles
  |> Vector3Service.transformQuat((0., 0., 1.));

let buildDirectionMap = (getDirectionFunc, state) =>
  RecordDirectionLightMainService.getRecord(state).renderLightArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, i) =>
         map
         |> WonderCommonlib.MutableSparseMapService.set(
              i,
              getDirectionFunc(i, state),
            ),
       WonderCommonlib.MutableSparseMapService.createEmpty(),
     );