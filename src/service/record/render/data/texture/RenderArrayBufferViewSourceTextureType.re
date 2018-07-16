type arrayBufferViewSourceTextureRecord = {
  wrapSs: Js.Typed_array.Uint8Array.t,
  wrapTs: Js.Typed_array.Uint8Array.t,
  magFilters: Js.Typed_array.Uint8Array.t,
  minFilters: Js.Typed_array.Uint8Array.t,
  formats: Js.Typed_array.Uint8Array.t,
  types: Js.Typed_array.Uint8Array.t,
  isNeedUpdates: Js.Typed_array.Uint8Array.t,
  flipYs: Js.Typed_array.Uint8Array.t,
  widths: Js.Typed_array.Uint16Array.t,
  heights: Js.Typed_array.Uint16Array.t,
  sourceMap: WonderCommonlib.SparseMapService.t(Js.Typed_array.Uint8Array.t),
  glTextureMap: WonderCommonlib.SparseMapService.t(WonderWebgl.GlType.texture),
  bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.t(int),
  setFlipYFunc: (WonderWebgl.GlType.webgl1Context, bool, BrowserDetectType.browserDetectRecord) => unit,
  textureIndexOffset: int
};