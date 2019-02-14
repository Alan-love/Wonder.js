open GameObjectType;

let create = () => {
  uid: 0,
  nameMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  disposeCount: 0,
  disposedUidMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  disposedUidArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedUidArrayForKeepOrder: WonderCommonlib.ArrayService.createEmpty(),
  disposedUidArrayForKeepOrderRemoveGeometry:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedUidArrayForDisposeGeometryRemoveMaterial:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedBasicCameraViewArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedTransformArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedTransformArrayForKeepOrder:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedPerspectiveCameraProjectionArray:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedArcballCameraControllerArray:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedBasicMaterialDataArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedLightMaterialDataArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedGeometryDataArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedSourceInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedObjectInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedDirectionLightArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedPointLightArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedMeshRendererComponentArray:
    WonderCommonlib.ArrayService.createEmpty(),
  aliveUidArray: WonderCommonlib.ArrayService.createEmpty(),
  geometryMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  transformMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  basicCameraViewMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  perspectiveCameraProjectionMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  arcballCameraControllerMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  meshRendererMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  basicMaterialMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  lightMaterialMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  sourceInstanceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  objectInstanceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  directionLightMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  pointLightMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
};

let deepCopyForRestore =
    (
      {
        uid,
        nameMap,
        disposeCount,
        disposedUidMap,
        disposedUidArray,
        disposedUidArrayForKeepOrder,
        disposedUidArrayForKeepOrderRemoveGeometry,
        disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
        disposedUidArrayForDisposeGeometryRemoveMaterial,
        disposedBasicCameraViewArray,
        disposedTransformArray,
        disposedTransformArrayForKeepOrder,
        disposedPerspectiveCameraProjectionArray,
        disposedArcballCameraControllerArray,
        disposedBasicMaterialDataArray,
        disposedLightMaterialDataArray,
        disposedGeometryDataArray,
        disposedSourceInstanceArray,
        disposedObjectInstanceArray,
        disposedDirectionLightArray,
        disposedPointLightArray,
        disposedMeshRendererComponentArray,
        aliveUidArray,
        geometryMap,
        transformMap,
        basicCameraViewMap,
        perspectiveCameraProjectionMap,
        arcballCameraControllerMap,
        meshRendererMap,
        basicMaterialMap,
        lightMaterialMap,
        sourceInstanceMap,
        objectInstanceMap,
        directionLightMap,
        pointLightMap,
      } as record,
    ) => {
  ...record,
  uid,
  nameMap: nameMap |> WonderCommonlib.MutableSparseMapService.copy,
  disposeCount,
  disposedUidMap: disposedUidMap |> WonderCommonlib.MutableSparseMapService.copy,
  disposedUidArray: disposedUidArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedUidArrayForKeepOrder:
    disposedUidArrayForKeepOrder |> WonderCommonlib.MutableSparseMapService.copy,
  disposedUidArrayForKeepOrderRemoveGeometry:
    disposedUidArrayForKeepOrderRemoveGeometry |> WonderCommonlib.MutableSparseMapService.copy,
  disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial:
    disposedUidArrayForKeepOrderRemoveGeometry |> WonderCommonlib.MutableSparseMapService.copy,
  disposedUidArrayForDisposeGeometryRemoveMaterial:
    disposedUidArrayForDisposeGeometryRemoveMaterial |> WonderCommonlib.MutableSparseMapService.copy,
  disposedBasicCameraViewArray:
    disposedBasicCameraViewArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedTransformArray: disposedTransformArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedTransformArrayForKeepOrder:
    disposedTransformArrayForKeepOrder |> WonderCommonlib.MutableSparseMapService.copy,
  disposedPerspectiveCameraProjectionArray:
    disposedPerspectiveCameraProjectionArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedArcballCameraControllerArray:
    disposedPerspectiveCameraProjectionArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedBasicMaterialDataArray:
    disposedBasicMaterialDataArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedLightMaterialDataArray:
    disposedLightMaterialDataArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedGeometryDataArray:
    disposedGeometryDataArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedSourceInstanceArray:
    disposedSourceInstanceArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedObjectInstanceArray:
    disposedObjectInstanceArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedDirectionLightArray:
    disposedDirectionLightArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedPointLightArray: disposedPointLightArray |> WonderCommonlib.MutableSparseMapService.copy,
  disposedMeshRendererComponentArray:
    disposedMeshRendererComponentArray |> WonderCommonlib.MutableSparseMapService.copy,
  aliveUidArray: aliveUidArray |> WonderCommonlib.MutableSparseMapService.copy,
  geometryMap: geometryMap |> WonderCommonlib.MutableSparseMapService.copy,
  transformMap: transformMap |> WonderCommonlib.MutableSparseMapService.copy,
  basicCameraViewMap: basicCameraViewMap |> WonderCommonlib.MutableSparseMapService.copy,
  perspectiveCameraProjectionMap:
    perspectiveCameraProjectionMap |> WonderCommonlib.MutableSparseMapService.copy,
  arcballCameraControllerMap:
    arcballCameraControllerMap |> WonderCommonlib.MutableSparseMapService.copy,
  meshRendererMap: meshRendererMap |> WonderCommonlib.MutableSparseMapService.copy,
  basicMaterialMap: basicMaterialMap |> WonderCommonlib.MutableSparseMapService.copy,
  lightMaterialMap: lightMaterialMap |> WonderCommonlib.MutableSparseMapService.copy,
  sourceInstanceMap: sourceInstanceMap |> WonderCommonlib.MutableSparseMapService.copy,
  objectInstanceMap: objectInstanceMap |> WonderCommonlib.MutableSparseMapService.copy,
  directionLightMap: directionLightMap |> WonderCommonlib.MutableSparseMapService.copy,
  pointLightMap: pointLightMap |> WonderCommonlib.MutableSparseMapService.copy,
};