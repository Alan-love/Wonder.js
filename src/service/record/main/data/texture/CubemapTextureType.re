type cubemapTexture = int;

type cubemapTextureRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  wrapSs: Js.Typed_array.Uint8Array.t,
  wrapTs: Js.Typed_array.Uint8Array.t,
  magFilters: Js.Typed_array.Uint8Array.t,
  minFilters: Js.Typed_array.Uint8Array.t,
  pxFormats: Js.Typed_array.Uint8Array.t,
  nxFormats: Js.Typed_array.Uint8Array.t,
  pyFormats: Js.Typed_array.Uint8Array.t,
  nyFormats: Js.Typed_array.Uint8Array.t,
  pzFormats: Js.Typed_array.Uint8Array.t,
  nzFormats: Js.Typed_array.Uint8Array.t,
  pxTypes: Js.Typed_array.Uint8Array.t,
  nxTypes: Js.Typed_array.Uint8Array.t,
  pyTypes: Js.Typed_array.Uint8Array.t,
  nyTypes: Js.Typed_array.Uint8Array.t,
  pzTypes: Js.Typed_array.Uint8Array.t,
  nzTypes: Js.Typed_array.Uint8Array.t,
  isNeedUpdates: Js.Typed_array.Uint8Array.t,
  flipYs: Js.Typed_array.Uint8Array.t,
  pxSourceMap:
    WonderCommonlib.MutableSparseMapService.t(
      WonderWebgl.DomExtendType.imageElement,
    ),
  nxSourceMap:
    WonderCommonlib.MutableSparseMapService.t(
      WonderWebgl.DomExtendType.imageElement,
    ),
  pySourceMap:
    WonderCommonlib.MutableSparseMapService.t(
      WonderWebgl.DomExtendType.imageElement,
    ),
  nySourceMap:
    WonderCommonlib.MutableSparseMapService.t(
      WonderWebgl.DomExtendType.imageElement,
    ),
  pzSourceMap:
    WonderCommonlib.MutableSparseMapService.t(
      WonderWebgl.DomExtendType.imageElement,
    ),
  nzSourceMap:
    WonderCommonlib.MutableSparseMapService.t(
      WonderWebgl.DomExtendType.imageElement,
    ),
  glTextureMap:
    WonderCommonlib.MutableSparseMapService.t(WonderWebgl.GlType.texture),
  disposedIndexArray: array(cubemapTexture),
  /* needAddedSourceArray:
     array(
       (
         cubemapTexture,
         WonderWebgl.DomExtendType.imageElement,
         WonderWebgl.DomExtendType.imageElement,
         WonderWebgl.DomExtendType.imageElement,
         WonderWebgl.DomExtendType.imageElement,
         WonderWebgl.DomExtendType.imageElement,
         WonderWebgl.DomExtendType.imageElement,
       ),
     ), */
  needAddedPXSourceArray:
    array((cubemapTexture, WonderWebgl.DomExtendType.imageElement)),
  needAddedNXSourceArray:
    array((cubemapTexture, WonderWebgl.DomExtendType.imageElement)),
  needAddedPYSourceArray:
    array((cubemapTexture, WonderWebgl.DomExtendType.imageElement)),
  needAddedNYSourceArray:
    array((cubemapTexture, WonderWebgl.DomExtendType.imageElement)),
  needAddedPZSourceArray:
    array((cubemapTexture, WonderWebgl.DomExtendType.imageElement)),
  needAddedNZSourceArray:
    array((cubemapTexture, WonderWebgl.DomExtendType.imageElement)),
  needInitedTextureIndexArray: array(cubemapTexture),
  needDisposedTextureIndexArray: array(cubemapTexture),
  nameMap: WonderCommonlib.MutableSparseMapService.t(string),
  materialsMap:
    WonderCommonlib.MutableSparseMapService.t(
      array((int, MaterialType.materialType)),
    ),
};