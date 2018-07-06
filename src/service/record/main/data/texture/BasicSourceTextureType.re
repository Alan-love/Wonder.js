type basicSourceTextureRecord = {
  index: int,
  /* buffer: WorkerType.sharedArrayBuffer, */
  wrapSs: Js.Typed_array.Uint8Array.t,
  wrapTs: Js.Typed_array.Uint8Array.t,
  magFilters: Js.Typed_array.Uint8Array.t,
  minFilters: Js.Typed_array.Uint8Array.t,
  formats: Js.Typed_array.Uint8Array.t,
  types: Js.Typed_array.Uint8Array.t,
  isNeedUpdates: Js.Typed_array.Uint8Array.t,
  flipYs: Js.Typed_array.Uint8Array.t,
  sourceMap: WonderCommonlib.SparseMapService.t(DomExtendType.imageElement),
  glTextureMap: WonderCommonlib.SparseMapService.t(GlType.texture),
  bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.t(int),
  disposedIndexArray: array(int),
  needAddedSourceArray: array((int, DomExtendType.imageElement)),
  needInitedTextureIndexArray: array(int),
  nameMap: WonderCommonlib.SparseMapService.t(string)
};