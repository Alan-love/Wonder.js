open ComponentType;

open MaterialType;

type lightMaterialRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  diffuseColors: Js.Typed_array.Float32Array.t,
  specularColors: Js.Typed_array.Float32Array.t,
  shininess: Js.Typed_array.Float32Array.t,
  textureIndices: Js.Typed_array.Uint32Array.t,
  diffuseMapUnits: Js.Typed_array.Uint8Array.t,
  specularMapUnits: Js.Typed_array.Uint8Array.t,
  textureCountMap: WonderCommonlib.SparseMapService.t(int),
  defaultDiffuseColor: array(float),
  defaultSpecularColor: array(float),
  defaultShininess: float,
  gameObjectMap,
  groupCountMap,
  disposedIndexArray,
  nameMap: WonderCommonlib.SparseMapService.t(string),
  mutable materialArrayForWorkerInit: array(int),
};