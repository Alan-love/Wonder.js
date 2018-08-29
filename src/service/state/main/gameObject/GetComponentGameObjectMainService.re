open StateDataMainType;

open GameObjectType;

open ComponentMapService;

let _getAllComponents = (disposedUidMap, componentMap) =>
  componentMap
  |> Js.Array.filteri((component, uid) =>
       ! (disposedUidMap |> WonderCommonlib.SparseMapService.has(uid))
       && Obj.magic(component) !== Js.Undefined.empty
     );

let getAllGeometryComponents = ({gameObjectRecord}) => {
  let {geometryMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, geometryMap);
};

let getAllArcballCameraControllerComponents = ({gameObjectRecord}) => {
  let {arcballCameraControllerMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, arcballCameraControllerMap);
};

let getAllBasicMaterialComponents = ({gameObjectRecord}) => {
  let {disposedUidMap, basicMaterialMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, basicMaterialMap);
};

let getAllLightMaterialComponents = ({gameObjectRecord}) => {
  let {lightMaterialMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, lightMaterialMap);
};

let getAllBasicCameraViewComponents = ({gameObjectRecord}) => {
  let {disposedUidMap, basicCameraViewMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, basicCameraViewMap);
};

let getAllPerspectiveCameraProjectionComponents = ({gameObjectRecord}) => {
  let {disposedUidMap, perspectiveCameraProjectionMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, perspectiveCameraProjectionMap);
};

let getAllDirectionLightComponents = ({gameObjectRecord}) => {
  let {directionLightMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, directionLightMap);
};

let getAllPointLightComponents = ({gameObjectRecord}) => {
  let {pointLightMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, pointLightMap);
};