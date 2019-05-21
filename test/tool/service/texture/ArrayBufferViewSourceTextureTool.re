open StateDataMainType;

open ArrayBufferViewSourceTextureType;

let getRecord = state =>
  state.arrayBufferViewSourceTextureRecord |> OptionService.unsafeGet;

let generateArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, {settingRecord} as state) =>
  IndexSourceTextureMainService.generateArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    state,
  );

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    getRecord(state).glTextureMap,
  );

let isNeedUpdate = (texture, state) =>
  OperateTypeArrayArrayBufferViewSourceTextureService.getIsNeedUpdate(.
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    getRecord(state).isNeedUpdates,
  )
  === BufferSourceTextureService.getNeedUpdate();

let buildSource = () => Js.Typed_array.Uint8Array.make([|1, 255, 255, 255|]);

let buildSource2 = () => Js.Typed_array.Uint8Array.make([|2, 255, 255, 100|]);

let getDefaultWrapS = () => BufferBasicSourceTextureService.getDefaultWrapS();

let getDefaultWrapT = () => BufferBasicSourceTextureService.getDefaultWrapT();

let getDefaultMagFilter = () =>
  BufferBasicSourceTextureService.getDefaultMagFilter();

let getDefaultMinFilter = () =>
  BufferBasicSourceTextureService.getDefaultMinFilter();

let getDefaultFormat = () =>
  BufferBasicSourceTextureService.getDefaultFormat();

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = () =>
  BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate();

let getDefaultWidth = () =>
  BufferArrayBufferViewSourceTextureService.getDefaultWidth();

let getDefaultHeight = () =>
  BufferArrayBufferViewSourceTextureService.getDefaultHeight();

let getMaterialDataArr = (texture, state) =>
  MaterialsMapService.getMaterialDataArr(
    texture,
    RecordArrayBufferViewSourceTextureMainService.getRecord(state).
      materialsMap,
  );

let getBindTextureUnitCacheMap = (texture, state) => {
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);

  arrayBufferViewSourceTextureRecord.bindTextureUnitCacheMap
  |> WonderCommonlib.MutableSparseMapService.get(texture);
};

let setBindTextureUnitCacheMap = (texture, unit, state) => {
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);

  {
    ...state,
    arrayBufferViewSourceTextureRecord:
      Some({
        ...arrayBufferViewSourceTextureRecord,
        bindTextureUnitCacheMap:
          arrayBufferViewSourceTextureRecord.bindTextureUnitCacheMap
          |> WonderCommonlib.MutableSparseMapService.set(texture, unit),
      }),
  };
};

let unsafeGetMaterialDataArr = (texture, state) =>
  getMaterialDataArr(texture, state) |> OptionService.unsafeGet;

let getNeedAddedSourceArray = state =>
  RecordArrayBufferViewSourceTextureMainService.getRecord(state).
    needAddedSourceArray;

let getNeedInitedTextureIndexArray = state =>
  RecordArrayBufferViewSourceTextureMainService.getRecord(state).
    needInitedTextureIndexArray;

let getArrayBufferViewSourceTextureName =
    (texture, state: StateDataMainType.state) =>
  NameArrayBufferViewSourceTextureMainService.getName(texture, state);

let getArrayBufferViewSourceTextureSource =
    (texture, state: StateDataMainType.state) => {
  let {sourceMap} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);

  TextureSourceMapService.getSource(texture, sourceMap);
};

let getTexture = (texture, state) =>
  OperateGlTextureMapService.getTexture(
    texture,
    getRecord(state).glTextureMap,
  );

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(
    texture,
    getRecord(state).glTextureMap,
  );

let setGlTexture = (texture, glTexture, state) => {
  OperateGlTextureMapService.setTexture(
    texture,
    glTexture,
    getRecord(state).glTextureMap,
  );

  state;
};