open StateDataMainType;

open StateDataMainType;

open ComponentMapService;

open BasicCameraViewType;

let batchGetBasicCameraViewComponent =
    (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.basicCameraViewMap);

let batchGetPerspectiveCameraProjectionComponent =
    (uidArray: array(int), {gameObjectRecord} as state) =>
  batchGetComponent(
    uidArray,
    gameObjectRecord.perspectiveCameraProjectionMap,
  );

let batchGetArcballCameraControllerComponent =
    (uidArray: array(int), {gameObjectRecord} as state) =>
  batchGetComponent(uidArray, gameObjectRecord.arcballCameraControllerMap);

let batchGetTransformComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.transformMap);

let batchGetGeometryComponentData =
    (uidArray: array(int), {gameObjectRecord}) => {
  let geometryDataMap = gameObjectRecord.geometryDataMap;
  let boxGeometryType = CurrentComponentDataMapService.getBoxGeometryType();
  let customGeometryType =
    CurrentComponentDataMapService.getCustomGeometryType();
  uidArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (boxGeometryArr, customGeometryArr) as arrTuple, uid) =>
         switch (
           geometryDataMap
           |> CurrentComponentDataMapService.getComponentData(uid)
         ) {
         | None => arrTuple
         | Some((component, type_)) =>
           switch (type_) {
           | type_ when type_ === boxGeometryType =>
             boxGeometryArr |> ArrayService.push(component) |> ignore
           | type_ when type_ === customGeometryType =>
             customGeometryArr |> ArrayService.push(component) |> ignore
           | _ =>
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="unknown type_",
                 ~description={j||j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j|type_: $type_|j},
               ),
             )
           };
           arrTuple;
         },
       ([||], [||]),
     );
};

let batchGetBasicMaterialComponent =
    (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.basicMaterialMap);

let batchGetLightMaterialComponent =
    (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.lightMaterialMap);

let batchGetMeshRendererComponent =
    (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.meshRendererMap);

let batchGetDirectionLightComponent =
    (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.directionLightMap);

let batchGetPointLightComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.pointLightMap);

let batchGetSourceInstanceComponent =
    (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.sourceInstanceMap);

let batchGetObjectInstanceComponent =
    (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.objectInstanceMap);