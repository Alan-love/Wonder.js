open StateDataMainType;

open ArrayBufferViewSourceTextureType;

let getRecord = (state) => state.arrayBufferViewSourceTextureRecord |> OptionService.unsafeGet;

let generateArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, {settingRecord} as state) =>
  IndexSourceTextureMainService.generateArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    state
  );

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(state)
    ),
    getRecord(state).glTextureMap
  );

let isNeedUpdate = (texture, state) =>
  OperateTypeArrayArrayBufferViewSourceTextureService.getIsNeedUpdate(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(state)
    ),
    getRecord(state).isNeedUpdates
  )
  === BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate();

let buildSource = () => Js.Typed_array.Uint8Array.make([|1, 255, 255, 255|]);

let getDefaultWrapS = () => TextureWrapService.getClampToEdge();

let getDefaultWrapT = () => TextureWrapService.getClampToEdge();

let getDefaultMagFilter = () => TextureFilterService.getLinear();

let getDefaultMinFilter = () => TextureFilterService.getNearest();

let getDefaultFormat = () => TextureFormatService.getRgba();

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = () =>
  BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate();

let getDefaultWidth = () => BufferArrayBufferViewSourceTextureService.getDefaultWidth();

let getDefaultHeight = () => BufferArrayBufferViewSourceTextureService.getDefaultHeight();