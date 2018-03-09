open GameObjectType;

open ComponentMapService;

let hasBasicCameraViewComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.basicCameraViewMap);

let hasPerspectiveCameraProjectionComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.perspectiveCameraProjectionMap);