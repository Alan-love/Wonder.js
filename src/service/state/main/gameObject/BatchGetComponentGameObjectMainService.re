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

let batchGetGeometryComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.geometryMap);

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