type textureRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  wrapSs: Js.Typed_array.Uint8Array.t,
  wrapTs: Js.Typed_array.Uint8Array.t,
  magFilters: Js.Typed_array.Uint8Array.t,
  minFilters: Js.Typed_array.Uint8Array.t,
  isNeedUpdates: Js.Typed_array.Uint8Array.t,
  sourceMap: WonderCommonlib.SparseMapService.t(DomType.imageElement),
  glTextureMap: WonderCommonlib.SparseMapService.t(GlType.texture),
  bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.t(int),
  disposedIndexArray: array(int),
  needAddedSourceArray: array((int, DomType.imageElement)),
  needInitedTextureIndexArray: array(int)
};