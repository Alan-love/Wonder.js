open ComponentType;

open TransformType;

open GeometryType;

open MeshRendererType;

open MaterialType;

open SourceInstanceType;

open ObjectInstanceType;

type gameObject = int;

type gameObjectDisposedUidMap = array(bool);

type gameObjectAliveUidArray = array(gameObject);

type gameObjectComponentData = array(component);

type gameObjectTransformMap = array(transform);

type gameObjectCameraViewMap = array(component);

type gameObjectCameraProjectionMap = array(component);

type gameObjectGeometryMap = array(geometry);

type gameObjectMeshRendererMap = array(meshRenderer);

type gameObjectMaterialMap = array(material);

type gameObjectSourceInstanceMap = array(sourceInstance);

type gameObjectObjectInstanceMap = array(objectInstance);

type gameObjectLightMap = array(int);

type gameObjectRecord = {
  mutable uid: int,
  mutable disposeCount: int,
  mutable disposedUidMap: gameObjectDisposedUidMap,
  mutable aliveUidArray: gameObjectAliveUidArray,
  mutable transformMap: gameObjectTransformMap,
  mutable basicCameraViewMap: gameObjectCameraViewMap,
  mutable perspectiveCameraProjectionMap: gameObjectCameraProjectionMap,
  mutable geometryMap: gameObjectGeometryMap,
  mutable meshRendererMap: gameObjectMeshRendererMap,
  mutable basicMaterialMap: gameObjectMaterialMap,
  mutable lightMaterialMap: gameObjectMaterialMap,
  mutable sourceInstanceMap: gameObjectSourceInstanceMap,
  mutable objectInstanceMap: gameObjectObjectInstanceMap,
  mutable ambientLightMap: gameObjectLightMap,
  mutable directionLightMap: gameObjectLightMap,
  mutable pointLightMap: gameObjectLightMap
};