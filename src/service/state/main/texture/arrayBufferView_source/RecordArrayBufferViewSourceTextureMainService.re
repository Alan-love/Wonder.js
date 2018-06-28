open StateDataMainType;

open SourceTextureType;

open ArrayBufferViewSourceTextureType;

open BufferSourceSizeTextureService;

open BufferArrayBufferViewSourceTextureService;

let getRecord = ({arrayBufferViewSourceTextureRecord}) =>
  arrayBufferViewSourceTextureRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      arrayBufferViewSourceTextureCount: int,
      arrayBufferViewSourceTextureIndexOffset,
      (
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
        flipYs,
        widths,
        heights,
      ),
    ) => {
  let defaultWrapS = getDefaultWrapS() |> SourceTextureType.wrapToUint8;
  let defaultWrapT = getDefaultWrapT() |> SourceTextureType.wrapToUint8;
  let defaultMagFilter =
    getDefaultMagFilter() |> SourceTextureType.filterToUint8;
  let defaultMinFilter =
    getDefaultMinFilter() |> SourceTextureType.filterToUint8;
  let defaultFormat = getDefaultFormat();
  let defaultType = getDefaultType();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  let defaultFlipY = getDefaultFlipY();
  let defaultWidth = getDefaultWidth();
  let defaultHeight = getDefaultHeight();
  ArrayService.range(0, arrayBufferViewSourceTextureCount - 1)
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
           widths,
           heights,
         ),
         indexInTypeArray,
       ) => (
         OperateTypeArrayArrayBufferViewSourceTextureService.setWrapS(
           indexInTypeArray,
           defaultWrapS,
           wrapSs,
         ),
         OperateTypeArrayArrayBufferViewSourceTextureService.setWrapT(
           indexInTypeArray,
           defaultWrapT,
           wrapTs,
         ),
         OperateTypeArrayArrayBufferViewSourceTextureService.setMagFilter(
           indexInTypeArray,
           defaultMagFilter,
           magFilters,
         ),
         OperateTypeArrayArrayBufferViewSourceTextureService.setMinFilter(
           indexInTypeArray,
           defaultMinFilter,
           minFilters,
         ),
         OperateTypeArrayArrayBufferViewSourceTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           formats,
         ),
         OperateTypeArrayArrayBufferViewSourceTextureService.setType(
           indexInTypeArray,
           defaultType,
           types,
         ),
         OperateTypeArrayArrayBufferViewSourceTextureService.setIsNeedUpdate(
           indexInTypeArray,
           defaultIsNeedUpdate,
           isNeedUpdates,
         ),
         OperateTypeArrayArrayBufferViewSourceTextureService.setFlipY(
           indexInTypeArray,
           defaultFlipY,
           flipYs,
         ),
         OperateTypeArrayArrayBufferViewSourceTextureService.setWidth(
           indexInTypeArray,
           defaultWidth,
           widths,
         ),
         OperateTypeArrayArrayBufferViewSourceTextureService.setHeight(
           indexInTypeArray,
           defaultHeight,
           heights,
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
         widths,
         heights,
       ),
     );
};

let _initBufferData =
    (
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount,
      buffer,
      arrayBufferViewSourceTextureIndexOffset,
    ) => {
  let (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
    widths,
    heights,
  ) =
    CreateTypeArrayArrayBufferViewSourceTextureService.createTypeArrays(
      buffer,
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount,
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
    widths,
    heights,
  )
  |> setAllTypeArrDataToDefault(
       arrayBufferViewSourceTextureCount,
       arrayBufferViewSourceTextureIndexOffset,
     );
};

let create = ({settingRecord} as state) => {
  let basicSourceTextureCount =
    BufferSettingService.getBasicSourceTextureCount(settingRecord);
  let arrayBufferViewSourceTextureCount =
    BufferSettingService.getArrayBufferViewSourceTextureCount(settingRecord);
  let {buffer} = RecordSourceTextureMainService.getRecord(state);
  let (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
    widths,
    heights,
  ) =
    _initBufferData(
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount,
      buffer,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    );
  state.arrayBufferViewSourceTextureRecord =
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
      widths,
      heights,
      sourceMap: WonderCommonlib.SparseMapService.createEmpty(),
      nameMap: WonderCommonlib.SparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.SparseMapService.createEmpty(),
      bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedSourceArray: [||],
      needInitedTextureIndexArray: [||],
    });
  state;
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        /* index,
           buffer, */
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
        flipYs,
        widths,
        heights,
        nameMap,
        sourceMap,
        glTextureMap,
        bindTextureUnitCacheMap,
        disposedIndexArray,
        needAddedSourceArray,
        needInitedTextureIndexArray,
      } as record =
    state |> getRecord;
  {
    ...state,
    arrayBufferViewSourceTextureRecord:
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
        widths:
          widths
          |> CopyTypeArrayService.copyUint16ArrayWithEndIndex(
               index * getWidthsSize(),
             ),
        heights:
          heights
          |> CopyTypeArrayService.copyUint16ArrayWithEndIndex(
               index * getHeightsSize(),
             ),
        nameMap: nameMap |> SparseMapService.copy,
        sourceMap: sourceMap |> SparseMapService.copy,
        glTextureMap: glTextureMap |> SparseMapService.copy,
        bindTextureUnitCacheMap:
          WonderCommonlib.SparseMapService.createEmpty(),
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        needAddedSourceArray: needAddedSourceArray |> Js.Array.copy,
        needInitedTextureIndexArray:
          needInitedTextureIndexArray |> Js.Array.copy,
      }),
  };
};