open ComponentType;

type sourceInstance = int;

type objectInstanceListMap = array(array(int));

type modelMatrixFloat32ArrayMap = array(Js.Typed_array.Float32Array.t);

type modelMatrixInstanceBufferCapacityMap = array(int);

type isModelMatrixStaticMap = array(bool);

type isSendModelMatrixDataMap = array(bool);

type sourceInstanceData = {
  mutable index: int,
  mutable objectInstanceListMap,
  modelMatrixFloat32ArrayMap,
  modelMatrixInstanceBufferCapacityMap,
  isModelMatrixStaticMap,
  isSendModelMatrixDataMap,
  mutable disposedIndexArray: array(sourceInstance),
  gameObjectMap
};