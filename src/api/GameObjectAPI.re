open StateDataMainType;

open GameObjectType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open GetComponentGameObjectService;

open HasComponentGameObjectService;

open CloneComponentGameObjectMainService;

open AddGameObjectComponentMainService;

open DisposeGameObjectMainService;

open CloneGameObjectMainService;

open CreateGameObjectMainService;

open AliveGameObjectMainService;

let createGameObject = (state: StateDataMainType.state) => create(state);

let _checkGameObjectShouldAlive =
    (gameObject: gameObject, state: StateDataMainType.state) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(
          ~expect={j|gameObject alive|j},
          ~actual={j|not|j},
        ),
        () =>
        isAlive(gameObject, state) |> assertTrue
      )
    )
  );

let addGameObjectBasicCameraViewComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addBasicCameraViewComponent(gameObject, component, state);
};

let disposeGameObjectBasicCameraViewComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeBasicCameraViewComponent(. component, state);
};

let unsafeGetGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetBasicCameraViewComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasBasicCameraViewComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectPerspectiveCameraProjectionComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addPerspectiveCameraProjectionComponent(gameObject, component, state);
};

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposePerspectiveCameraProjectionComponent(. component, state);
};

let unsafeGetGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetPerspectiveCameraProjectionComponent(
    gameObject,
    state.gameObjectRecord,
  );
};

let hasGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectTransformComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addTransformComponent(gameObject, component, state);
};

let disposeGameObjectTransformComponent =
    (
      gameObject: gameObject,
      component: component,
      isKeepOrder,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  isKeepOrder ?
    deferDisposeTransformComponentForKeepOrder(. component, state) :
    deferDisposeTransformComponent(. component, state);
};

let unsafeGetGameObjectTransformComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetTransformComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectTransformComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasTransformComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectBoxGeometryComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addBoxGeometryComponent(gameObject, component, state);
};

let disposeGameObjectBoxGeometryComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeBoxGeometryComponent(. component, state);
};

let hasGameObjectBoxGeometryComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasBoxGeometryComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectCustomGeometryComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addCustomGeometryComponent(gameObject, component, state);
};

let disposeGameObjectCustomGeometryComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeCustomGeometryComponent(. component, state);
};

let unsafeGetGameObjectCustomGeometryComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetCustomGeometryComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectCustomGeometryComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasCustomGeometryComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectBasicMaterialComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addBasicMaterialComponent(gameObject, component, state);
};

let disposeGameObjectBasicMaterialComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeBasicMaterialComponent(. component, state);
};

let unsafeGetGameObjectBasicMaterialComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetBasicMaterialComponent(. gameObject, state.gameObjectRecord);
};

let hasGameObjectBasicMaterialComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasBasicMaterialComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectLightMaterialComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addLightMaterialComponent(gameObject, component, state);
};

let disposeGameObjectLightMaterialComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeLightMaterialComponent(. component, state);
};

let unsafeGetGameObjectLightMaterialComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetLightMaterialComponent(. gameObject, state.gameObjectRecord);
};

let hasGameObjectLightMaterialComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasLightMaterialComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectMeshRendererComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addMeshRendererComponent(gameObject, component, state);
};

let disposeGameObjectMeshRendererComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeMeshRendererComponent(. gameObject, component, state);
};

let unsafeGetGameObjectMeshRendererComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetMeshRendererComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectMeshRendererComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasMeshRendererComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectAmbientLightComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addAmbientLightComponent(gameObject, component, state);
};

let disposeGameObjectAmbientLightComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeAmbientLightComponent(. component, state);
};

let unsafeGetGameObjectAmbientLightComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetAmbientLightComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectAmbientLightComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasAmbientLightComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectDirectionLightComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addDirectionLightComponent(gameObject, component, state);
};

let disposeGameObjectDirectionLightComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeDirectionLightComponent(. component, state);
};

let unsafeGetGameObjectDirectionLightComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetDirectionLightComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectDirectionLightComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasDirectionLightComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectPointLightComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addPointLightComponent(gameObject, component, state);
};

let disposeGameObjectPointLightComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposePointLightComponent(. component, state);
};

let unsafeGetGameObjectPointLightComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetPointLightComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectPointLightComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasPointLightComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectSourceInstanceComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addSourceInstanceComponent(gameObject, component, state);
};

let unsafeGetGameObjectSourceInstanceComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetSourceInstanceComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectSourceInstanceComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasSourceInstanceComponent(gameObject, state.gameObjectRecord);
};

let disposeGameObjectSourceInstanceComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeSourceInstanceComponent(. component, state);
};

let addGameObjectObjectInstanceComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addObjectInstanceComponent(gameObject, component, state);
};

let unsafeGetGameObjectObjectInstanceComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetObjectInstanceComponent(gameObject, state.gameObjectRecord);
};

let disposeGameObjectObjectInstanceComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeObjectInstanceComponent(. component, state);
};

let isGameObjectAlive =
    (gameObject: gameObject, state: StateDataMainType.state) =>
  isAlive(gameObject, state);

let disposeGameObject =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDispose(gameObject, state);
};

let disposeGameObjectKeepOrder =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeKeepOrder(gameObject, state);
};

let initGameObject = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  InitGameObjectMainService.initGameObject(gameObject, state);
};

let batchDisposeGameObject =
    (gameObjectArray: array(gameObject), state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            gameObjectArray
            |> WonderCommonlib.ArrayService.forEach((. gameObject) =>
                 _checkGameObjectShouldAlive(gameObject, state)
               )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferBatchDispose(gameObjectArray, state);
};

let batchDisposeGameObjectKeepOrder =
    (gameObjectArray: array(gameObject), state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            gameObjectArray
            |> WonderCommonlib.ArrayService.forEach((. gameObject) =>
                 _checkGameObjectShouldAlive(gameObject, state)
               )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferBatchDisposeKeepOrder(gameObjectArray, state);
};

let cloneGameObject =
    (
      gameObject: gameObject,
      count: int,
      isShareMaterial: bool,
      state: StateDataMainType.state,
    ) =>
  clone(gameObject, count, isShareMaterial, state);

let unsafeGetGameObjectName =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGameObjectMainService.unsafeGetName(gameObject, state);
};

let setGameObjectName =
    (gameObject: gameObject, name, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGameObjectMainService.setName(. gameObject, name, state);
};