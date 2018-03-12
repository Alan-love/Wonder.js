open GameObjectType;

open ComponentMapService;

let hasBasicCameraViewComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.basicCameraViewMap);

let hasPerspectiveCameraProjectionComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.perspectiveCameraProjectionMap);

let hasMeshRendererComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.meshRendererMap);

let hasTransformComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.transformMap);

let hasBoxGeometryComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.boxGeometryMap);

let hasBasicMaterialComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.basicMaterialMap);

let hasLightMaterialComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.lightMaterialMap);