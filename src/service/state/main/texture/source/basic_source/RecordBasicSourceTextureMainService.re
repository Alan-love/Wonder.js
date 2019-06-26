open StateDataMainType;

open TextureType;

open BufferSizeTextureService;

open BufferSizeTextureService;

open BufferSizeTextureService;

open BasicSourceTextureType;

open BufferBasicSourceTextureService;

let getRecord = ({basicSourceTextureRecord}) =>
  basicSourceTextureRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      basicSourceTextureCount: int,
      (
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
        flipYs,
      ),
    ) => {
  let defaultWrapS = getDefaultWrapS() |> TextureType.wrapToUint8;
  let defaultWrapT = getDefaultWrapT() |> TextureType.wrapToUint8;
  let defaultMagFilter = getDefaultMagFilter() |> TextureType.filterToUint8;
  let defaultMinFilter = getDefaultMinFilter() |> TextureType.filterToUint8;
  let defaultFormat = getDefaultFormat() |> TextureType.formatToUint8;
  let defaultType = getDefaultType();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  let defaultFlipY = getDefaultFlipY();
  WonderCommonlib.ArrayService.range(0, basicSourceTextureCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (
           wrapSs,
           wrapTs,
           magFilters,
           minFilters,
           formats,
           types,
           isNeedUpdates,
           flipYs,
         ),
         indexInTypeArray,
       ) => (
         OperateTypeArrayAllBasicSourceTextureService.setWrapS(
           indexInTypeArray,
           defaultWrapS,
           wrapSs,
         ),
         OperateTypeArrayAllBasicSourceTextureService.setWrapT(
           indexInTypeArray,
           defaultWrapT,
           wrapTs,
         ),
         OperateTypeArrayAllBasicSourceTextureService.setMagFilter(
           indexInTypeArray,
           defaultMagFilter,
           magFilters,
         ),
         OperateTypeArrayAllBasicSourceTextureService.setMinFilter(
           indexInTypeArray,
           defaultMinFilter,
           minFilters,
         ),
         OperateTypeArrayAllBasicSourceTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           formats,
         ),
         OperateTypeArrayAllBasicSourceTextureService.setType(
           indexInTypeArray,
           defaultType,
           types,
         ),
         OperateTypeArrayAllBasicSourceTextureService.setIsNeedUpdate(
           indexInTypeArray,
           defaultIsNeedUpdate,
           isNeedUpdates,
         ),
         OperateTypeArrayAllBasicSourceTextureService.setFlipY(
           indexInTypeArray,
           defaultFlipY,
           flipYs,
         ),
       ),
       (
         wrapSs,
         wrapTs,
         magFilters,
         minFilters,
         formats,
         types,
         isNeedUpdates,
         flipYs,
       ),
     );
};

let _initBufferData = (basicSourceTextureCount, buffer) => {
  let (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
  ) =
    CreateTypeArrayAllBasicSourceTextureService.createTypeArrays(
      buffer,
      basicSourceTextureCount,
    );
  (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
  )
  |> setAllTypeArrDataToDefault(basicSourceTextureCount);
};

let create = ({settingRecord} as state) => {
  let basicSourceTextureCount =
    BufferSettingService.getBasicSourceTextureCount(settingRecord);
  let {buffer}: SourceTextureType.sourceTextureRecord =
    RecordSourceTextureMainService.getRecord(state);
  let (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
  ) =
    _initBufferData(basicSourceTextureCount, buffer);
  state.basicSourceTextureRecord =
    Some({
      index: 0,
      wrapSs,
      wrapTs,
      magFilters,
      minFilters,
      formats,
      types,
      isNeedUpdates,
      flipYs,
      nameMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      materialsMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      sourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedSourceArray: WonderCommonlib.ArrayService.createEmpty(),
      needInitedTextureIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      needDisposedTextureIndexArray:
        WonderCommonlib.ArrayService.createEmpty(),
    });
  state;
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
        flipYs,
        nameMap,
        materialsMap,
        sourceMap,
        glTextureMap,
        disposedIndexArray,
        needAddedSourceArray,
        needInitedTextureIndexArray,
        needDisposedTextureIndexArray,
      } as record =
    state |> getRecord;
  {
    ...state,
    basicSourceTextureRecord:
      Some({
        ...record,
        index,
        wrapSs:
          wrapSs
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getWrapSsSize(),
             ),
        wrapTs:
          wrapTs
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getWrapTsSize(),
             ),
        magFilters:
          magFilters
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getMagFiltersSize(),
             ),
        minFilters:
          minFilters
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getMinFiltersSize(),
             ),
        formats:
          formats
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFormatsSize(),
             ),
        types:
          types
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getTypesSize(),
             ),
        isNeedUpdates:
          isNeedUpdates
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getIsNeedUpdatesSize(),
             ),
        flipYs:
          flipYs
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFlipYsSize(),
             ),
        nameMap: nameMap |> WonderCommonlib.MutableSparseMapService.copy,
        materialsMap:
          materialsMap |> WonderCommonlib.MutableSparseMapService.copy,
        sourceMap: sourceMap |> WonderCommonlib.MutableSparseMapService.copy,
        glTextureMap:
          glTextureMap |> WonderCommonlib.MutableSparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        needAddedSourceArray: needAddedSourceArray |> Js.Array.copy,
        needInitedTextureIndexArray:
          needInitedTextureIndexArray |> Js.Array.copy,
        needDisposedTextureIndexArray:
          needDisposedTextureIndexArray |> Js.Array.copy,
      }),
  };
};