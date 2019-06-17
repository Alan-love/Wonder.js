open StateDataMainType;

open BasicSourceTextureType;

let getRecord = state =>
  state.basicSourceTextureRecord |> OptionService.unsafeGet;

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

let isNeedUpdate = (texture, state) =>
  OperateTypeArrayAllBasicSourceTextureService.getIsNeedUpdate(.
    texture,
    getRecord(state).isNeedUpdates,
  )
  === BufferSourceTextureService.getNeedUpdate();

let getDefaultTextureIndex = () =>
  TextureIndexService.getDefaultTextureIndex();

let getNearest = () => SourceTextureTool.getNearest();

let getNearestMipmapNearest = () =>
  SourceTextureTool.getNearestMipmapNearest();

let getLinear = () => SourceTextureTool.getLinear();

let getNearestMipmapLinear = () => SourceTextureTool.getNearestMipmapLinear();

let getLinearMipmapNearest = () => SourceTextureTool.getLinearMipmapNearest();

let getLinearMipmapLinear = () => SourceTextureTool.getLinearMipmapLinear();

let getRgb = () => SourceTextureType.Rgb;

let getRgba = () => SourceTextureType.Rgba;

let getAlpha = () => SourceTextureType.Alpha;

let getUnsignedByte = () => TextureTypeService.getUnsignedByte();

let getUnsignedShort565 = () => TextureTypeService.getUnsignedShort565();

let buildSource = (width, height) => {"width": width, "height": height};

let getDefaultWrapS = () => BufferBasicSourceTextureService.getDefaultWrapS();

let getDefaultWrapT = () => BufferBasicSourceTextureService.getDefaultWrapT();

let getDefaultMagFilter = () =>
  BufferBasicSourceTextureService.getDefaultMagFilter();

let getDefaultMinFilter = () =>
  BufferBasicSourceTextureService.getDefaultMinFilter();

let getDefaultFormat = () => SourceTextureType.Rgba;

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = () =>
  BufferBasicSourceTextureService.getDefaultIsNeedUpdate();

let getNeedUpdate = BufferSourceTextureService.getNeedUpdate;

let getNotNeedUpdate = BufferSourceTextureService.getNotNeedUpdate;

let getIsNeedUpdate = (texture, state) =>
  OperateBasicSourceTextureMainService.getIsNeedUpdate(texture, state)
  === BufferSourceTextureService.getNeedUpdate();

let setIsNeedUpdate = (texture, isNeedUpdate, state) =>
  OperateBasicSourceTextureMainService.setIsNeedUpdate(
    texture,
    isNeedUpdate ?
      BufferSourceTextureService.getNeedUpdate() :
      BufferSourceTextureService.getNotNeedUpdate(),
    state,
  );

let getMaterialDataArr = (texture, state) =>
  MaterialsMapService.getMaterialDataArr(
    texture,
    RecordBasicSourceTextureMainService.getRecord(state).materialsMap,
  );

let unsafeGetMaterialDataArr = (texture, state) =>
  getMaterialDataArr(texture, state) |> OptionService.unsafeGet;

/* let setBindTextureUnitMap = (texture, unit, state) => {
     let basicSourceTextureRecord =
       RecordBasicSourceTextureMainService.getRecord(state);

     {
       ...state,
       basicSourceTextureRecord:
         Some({
           ...basicSourceTextureRecord,
           bindTextureUnitMap:
             basicSourceTextureRecord.bindTextureUnitMap
             |> WonderCommonlib.MutableSparseMapService.set(texture, unit),
         }),
     };
   }; */

let getBasicSourceTextureSource = (texture, state: StateDataMainType.state) => {
  let {sourceMap} = RecordBasicSourceTextureMainService.getRecord(state);

  TextureSourceMapService.getSource(texture, sourceMap);
};

let getNeedAddedSourceArray = state =>
  RecordBasicSourceTextureMainService.getRecord(state).needAddedSourceArray;

let getNeedInitedTextureIndexArray = state =>
  RecordBasicSourceTextureMainService.getRecord(state).
    needInitedTextureIndexArray;

let getDisposedIndexArray = state =>
  RecordBasicSourceTextureMainService.getRecord(state).disposedIndexArray;

let getMaterialDataArr = (texture, state) =>
  MaterialsMapService.getMaterialDataArr(
    texture,
    RecordBasicSourceTextureMainService.getRecord(state).materialsMap,
  );

let hasMaterial = (texture, material, state) =>
  switch (getMaterialDataArr(texture, state)) {
  | Some(arr) =>
    arr
    |> Js.Array.find(((materialInData, _)) => materialInData === material)
    |> Js.Option.isSome
  | _ => false
  };

let isAlive = (texture, engineState) =>
  DisposeBasicSourceTextureMainService.isAlive(
    texture,
    RecordBasicSourceTextureMainService.getRecord(engineState),
  );