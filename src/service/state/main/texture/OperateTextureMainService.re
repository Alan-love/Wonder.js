open StateDataMainType;

open TextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} = RecordTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, sourceMap)
};

let setSource = (texture, source, state) => {
  let {sourceMap} = RecordTextureMainService.getRecord(state);
  TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
  state
};

let getWrapS = (texture, state) => {
  let {wrapSs} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.getWrapS(texture, wrapSs)
};

let setWrapS = (texture, wrapS, state) => {
  let {wrapSs} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.setWrapS(texture, wrapS, wrapSs) |> ignore;
  state
};

let getWrapT = (texture, state) => {
  let {wrapTs} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.getWrapT(texture, wrapTs)
};

let setWrapT = (texture, wrapT, state) => {
  let {wrapTs} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.setWrapT(texture, wrapT, wrapTs) |> ignore;
  state
};

let getMagFilter = (texture, state) => {
  let {magFilters} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.getMagFilter(texture, magFilters)
};

let setMagFilter = (texture, filter, state) => {
  let {magFilters} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.setMagFilter(texture, filter, magFilters) |> ignore;
  state
};

let getMinFilter = (texture, state) => {
  let {minFilters} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.getMinFilter(texture, minFilters)
};

let setMinFilter = (texture, filter, state) => {
  let {minFilters} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.setMinFilter(texture, filter, minFilters) |> ignore;
  state
};

let getWidth = (texture, state) => {
  let {sourceMap} = RecordTextureMainService.getRecord(state);
  switch (TextureSourceMapService.getSource(texture, sourceMap)) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getWidth",
        ~description={j|source should exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  | Some(source) => TextureSizeService.getWidth(source)
  }
};

let getHeight = (texture, state) => {
  let {sourceMap} = RecordTextureMainService.getRecord(state);
  switch (TextureSourceMapService.getSource(texture, sourceMap)) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getHeight",
        ~description={j|source should exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  | Some(source) => TextureSizeService.getHeight(source)
  }
};