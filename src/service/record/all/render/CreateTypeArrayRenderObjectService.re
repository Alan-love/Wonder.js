open Js.Typed_array;

open RenderObjectBufferTypeArrayService;

let createTypeArrays = (buffer, count) => { 
  
  (
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTransformIndicesOffset(count),
    ~length=getTransformIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMaterialIndicesOffset(count),
    ~length=getMaterialIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getGeometryIndicesOffset(count),
    ~length=getGeometryIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSourceInstanceIndicesOffset(count),
    ~length=getSourceInstanceIndicesLength(count)
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getGeometryTypesOffset(count),
    ~length=getGeometryTypesLength(count)
  )
) };

let setAllTypeArrDataToDefault = (count: int, typeArrTuple) => {
  let defaultSourceInstance = DefaultTypeArrayValueService.getDefaultSourceInstance();
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (
           (
             transformIndices,
             materialIndices,
             geometryIndices,
             sourceInstanceIndices,
             geometryTypes
           ),
           index
         ) => (
           transformIndices,
           materialIndices,
           geometryIndices,
           setComponent(index, defaultSourceInstance, sourceInstanceIndices),
           geometryTypes
         )
       ),
       typeArrTuple
     )
};