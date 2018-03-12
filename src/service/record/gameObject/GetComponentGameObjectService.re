open GameObjectType;

open ComponentMapService;

let getBasicCameraViewComponent =
  [@bs] ((uid: int, {basicCameraViewMap}) => basicCameraViewMap |> getComponent(uid));

let unsafeGetBasicCameraViewComponent = (uid: int, {basicCameraViewMap}) =>
  basicCameraViewMap |> unsafeGetComponent(uid);

let getPerspectiveCameraProjectionComponent =
  [@bs]
  (
    (uid: int, {perspectiveCameraProjectionMap}) =>
      perspectiveCameraProjectionMap |> getComponent(uid)
  );

let unsafeGetPerspectiveCameraProjectionComponent = (uid: int, {perspectiveCameraProjectionMap}) =>
  perspectiveCameraProjectionMap |> unsafeGetComponent(uid);

let getTransformComponent =
  [@bs] ((uid: int, {transformMap}) => transformMap |> getComponent(uid));

let unsafeGetTransformComponent = (uid: int, {transformMap}) =>
  transformMap |> unsafeGetComponent(uid);

let getBoxGeometryComponent =
  [@bs] ((uid: int, {boxGeometryMap}) => boxGeometryMap |> getComponent(uid));

let unsafeGetBoxGeometryComponent = (uid: int, {boxGeometryMap}) =>
  boxGeometryMap |> unsafeGetComponent(uid);

let getBasicMaterialComponent =
  [@bs] ((uid: int, {basicMaterialMap}) => basicMaterialMap |> getComponent(uid));

let getLightMaterialComponent =
  [@bs] ((uid: int, {lightMaterialMap}) => lightMaterialMap |> getComponent(uid));

let unsafeGetBasicMaterialComponent = (uid: int, {basicMaterialMap}) =>
  basicMaterialMap |> unsafeGetComponent(uid);

let unsafeGetLightMaterialComponent = (uid: int, {lightMaterialMap}) =>
  lightMaterialMap |> unsafeGetComponent(uid);

let getMeshRendererComponent =
  [@bs] ((uid: int, {meshRendererMap}) => meshRendererMap |> getComponent(uid));

let unsafeGetMeshRendererComponent = (uid: int, {meshRendererMap}) =>
  meshRendererMap |> unsafeGetComponent(uid);