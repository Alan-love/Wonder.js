type transformRecord = {
  localToWorldMatrices: Js.Typed_array.Float32Array.t,
  localPositions: Js.Typed_array.Float32Array.t,
  mutable localRotations: Js.Typed_array.Float32Array.t,
  mutable localScales: Js.Typed_array.Float32Array.t,
  localToWorldMatrixCacheMap:
    WonderCommonlib.MutableSparseMapService.t(Js.Typed_array.Float32Array.t),
  normalMatrixCacheMap:
    WonderCommonlib.MutableSparseMapService.t(Js.Typed_array.Float32Array.t),
};