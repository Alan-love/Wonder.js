open StateDataMainType;

open GameObjectType;

let _disposeComponents = ({settingRecord, gameObjectRecord} as state) => {
  let {
    disposedBasicCameraViewArray,
    disposedTransformArray,
    disposedTransformArrayForKeepOrder,
    disposedPerspectiveCameraProjectionArray,
    disposedBasicMaterialArray,
    disposedLightMaterialArray,
    disposedBoxGeometryArray,
    disposedCustomGeometryArray,
    disposedSourceInstanceArray,
    disposedObjectInstanceArray,
    disposedAmbientLightArray,
    disposedDirectionLightArray,
    disposedPointLightArray,
    disposedMeshRendererComponentArray,
    disposedMeshRendererUidArray
  } = gameObjectRecord;
  let state =
    disposedBasicCameraViewArray
    |> DisposeComponentGameObjectMainService.batchDisposeBasicCameraViewComponent(state);
  let state =
    disposedPerspectiveCameraProjectionArray
    |> DisposeComponentGameObjectMainService.batchDisposePerspectiveCameraProjectionComponent(
         state
       );
  let state =
    disposedTransformArray
    |> DisposeComponentGameObjectMainService.batchDisposeTransformComponent(state, false);
  let state =
    disposedTransformArrayForKeepOrder
    |> DisposeComponentGameObjectMainService.batchDisposeTransformComponent(state, true);
  let state =
    disposedBasicMaterialArray
    |> DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent(state);
  let state =
    disposedLightMaterialArray
    |> DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(state);
  let (state, boxGeometryNeedDisposeVboBufferArr) =
    disposedBoxGeometryArray
    |> DisposeComponentGameObjectMainService.batchDisposeBoxGeometryComponent(state);
  let (state, customGeometryNeedDisposeVboBufferArr) =
    disposedCustomGeometryArray
    |> DisposeComponentGameObjectMainService.batchDisposeCustomGeometryComponent(state);
  let state =
    disposedSourceInstanceArray
    |> DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
         state,
         false,
         DisposeGameObjectMainService.batchDispose
       );
  let state =
    disposedObjectInstanceArray
    |> DisposeComponentGameObjectMainService.batchDisposeObjectInstanceComponent(state);
  let state =
    disposedAmbientLightArray
    |> DisposeComponentGameObjectMainService.batchDisposeAmbientLightComponent(state);
  let state =
    disposedDirectionLightArray
    |> DisposeComponentGameObjectMainService.batchDisposeDirectionLightComponent(state);
  let state =
    disposedPointLightArray
    |> DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(state);
  let state =
    disposedMeshRendererComponentArray
    |> DisposeComponentGameObjectMainService.batchDisposeMeshRendererComponent(
         DisposeECSService.buildMapFromArray(
           disposedMeshRendererUidArray,
           WonderCommonlib.SparseMapService.createEmpty()
         ),
         state
       );
  (state, boxGeometryNeedDisposeVboBufferArr, customGeometryNeedDisposeVboBufferArr)
};

let _disposeGameObjects = ({gameObjectRecord} as state) => {
  let {disposedUidArray, disposedUidArrayForKeepOrder} = gameObjectRecord;
  let (
    state,
    boxGeometryNeedDisposeVboBufferArrForNotKeepOrder,
    customGeometryNeedDisposeVboBufferArrForNotKeepOrder
  ) =
    state |> DisposeGameObjectMainService.batchDispose(disposedUidArray, false);
  let (
    state,
    boxGeometryNeedDisposeVboBufferArrForKeepOrder,
    customGeometryNeedDisposeVboBufferArrForKeepOrder
  ) =
    state |> DisposeGameObjectMainService.batchDispose(disposedUidArrayForKeepOrder, true);
  let state = state |> DisposeGameObjectMainService.clearDeferDisposeData;
  (
    state,
    boxGeometryNeedDisposeVboBufferArrForNotKeepOrder
    |> Js.Array.concat(boxGeometryNeedDisposeVboBufferArrForKeepOrder),
    customGeometryNeedDisposeVboBufferArrForNotKeepOrder
    |> Js.Array.concat(customGeometryNeedDisposeVboBufferArrForKeepOrder)
  )
};

let execJob = (state) => {
  let (
    state,
    boxGeometryNeedDisposeVboBufferArrFromComponent,
    customGeometryNeedDisposeVboBufferArrFromComponent
  ) =
    state |> _disposeComponents;
  let (
    state,
    boxGeometryNeedDisposeVboBufferArrFromGameObject,
    customGeometryNeedDisposeVboBufferArrFromGameObject
  ) =
    state |> _disposeGameObjects;
  (
    state,
    boxGeometryNeedDisposeVboBufferArrFromComponent
    |> Js.Array.concat(boxGeometryNeedDisposeVboBufferArrFromGameObject),
    customGeometryNeedDisposeVboBufferArrFromComponent
    |> Js.Array.concat(customGeometryNeedDisposeVboBufferArrFromGameObject)
  )
};