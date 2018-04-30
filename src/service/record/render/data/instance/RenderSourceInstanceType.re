open InstanceType;

type sourceInstanceRecord = {
  objectInstanceTransformIndexMap,
  objectInstanceTransformCollections,
  isTransformStatics,
  matrixInstanceBufferCapacityMap,
  matrixFloat32ArrayMap: WonderCommonlib.SparseMapService.t(Js.Typed_array.Float32Array.t),
  isSendTransformMatrixDataMap
};