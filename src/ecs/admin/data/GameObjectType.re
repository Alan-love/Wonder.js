open TransformType;

open CameraControllerType;

open GeometryType;

open MeshRendererType;

open MaterialType;

open SourceInstanceType;

open ObjectInstanceType;

type gameObject = int;

type gameObjectDisposedUidMap = array(bool);

type gameObjectAliveUidArray = array(gameObject);

type gameObjectComponentData = array(ComponentType.component);

type gameObjectTransformMap = array(transform);

type gameObjectCameraControllerMap = array(cameraController);

type gameObjectGeometryMap = array(geometry);

type gameObjectMeshRendererMap = array(meshRenderer);

type gameObjectMaterialMap = array(material);

type gameObjectSourceInstanceMap = array(sourceInstance);

type gameObjectObjectInstanceMap = array(objectInstance);

type gameObjectData = {
  mutable uid: int,
  mutable disposeCount: int,
  mutable disposedUidMap: gameObjectDisposedUidMap,
  mutable aliveUidArray: gameObjectAliveUidArray,
  mutable transformMap: gameObjectTransformMap,
  mutable cameraControllerMap: gameObjectCameraControllerMap,
  mutable geometryMap: gameObjectGeometryMap,
  mutable meshRendererMap: gameObjectMeshRendererMap,
  mutable materialMap: gameObjectMaterialMap,
  mutable sourceInstanceMap: gameObjectSourceInstanceMap,
  mutable objectInstanceMap: gameObjectObjectInstanceMap
};