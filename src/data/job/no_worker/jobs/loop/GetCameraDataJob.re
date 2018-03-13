open StateDataType;

open RenderType;

let _getCameraData =
    (
      {
        basicCameraViewRecord,
        perspectiveCameraProjectionRecord,
        sceneRecord,
        transformRecord,
        globalTempRecord,
        gameObjectRecord
      } as state
    ) =>
  switch (CameraSceneService.getCurrentCameraGameObject(basicCameraViewRecord, sceneRecord)) {
  | None => None
  | Some(currentCameraGameObject) =>
    let transform =
      GetComponentGameObjectService.unsafeGetTransformComponent(
        currentCameraGameObject,
        gameObjectRecord
      );
    /* OperateRenderService.isFirstRender(state) ?
       Some({
         vMatrix:
           CacheType.New(BasicCameraViewSystem.getWorldToCameraMatrixByTransform(transform, state)),
         pMatrix: CacheType.New(BasicCameraViewSystem.getPMatrix(currentBasicCameraView, state))
       }) :
       Some({
         vMatrix:
           TransformSystem.isDirty(transform, state) ?
             CacheType.New(
               BasicCameraViewSystem.getWorldToCameraMatrixByTransform(transform, state)
             ) :
             CacheType.Cache,
         pMatrix:
           BasicCameraViewSystem.isDirty(currentBasicCameraView, state) ?
             CacheType.New(BasicCameraViewSystem.getPMatrix(currentBasicCameraView, state)) :
             CacheType.Cache
       }) */
    Some({
      vMatrix:
        VMatrixService.getWorldToCameraMatrix(
          UpdateTransformService.updateAndGetLocalToWorldMatrixTypeArray(
            transform,
            globalTempRecord,
            transformRecord
          )
        ),
      pMatrix:
        PMatrixService.unsafeGetPMatrix(
          GetComponentGameObjectService.unsafeGetPerspectiveCameraProjectionComponent(
            currentCameraGameObject,
            gameObjectRecord
          ),
          perspectiveCameraProjectionRecord.pMatrixMap
        ),
      position:
        UpdateTransformService.updateAndGetPositionTuple(
          transform,
          globalTempRecord,
          transformRecord
        )
    })
  };

let execJob = (_, _, state) => OperateRenderService.setCameraData(_getCameraData(state), state);