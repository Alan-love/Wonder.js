open StateDataMainType;

open SettingType;

open MaterialType;

open BasicMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeMaterialMainService.isAlive(material, disposedIndexArray);

/*!
  not dispose texture when dispose material!
  because different materials may use same texture, if dispose one material's texture which is shared, then will affect other materials!

  so need user mannually dispose texture!
  */
let _disposeData =
    (
      material,
      textureCountPerMaterial,
      {
        shaderIndices,
        colors,
        textureIndices,
        mapUnits,
        isDepthTests,
        alphas,
        emptyMapUnitArrayMap,
        defaultColor,
        nameMap,
        gameObjectsMap,
      } as basicMaterialRecord,
    ) => {
  let shaderIndices =
    DisposeMaterialService.disposeData(
      material,
      shaderIndices,
      DefaultTypeArrayValueService.getDefaultShaderIndex(),
    );

  {
    ...basicMaterialRecord,
    shaderIndices,
    colors:
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
        BufferBasicMaterialService.getColorIndex(material),
        BufferBasicMaterialService.getColorsSize(),
        defaultColor,
        colors,
      ),
    textureIndices:
      DisposeMaterialMainService.disposeTextureIndices(
        material,
        textureCountPerMaterial,
        textureIndices,
      ),
    mapUnits:
      DisposeTypeArrayService.deleteAndResetUint8(.
        BufferBasicMaterialService.getMapUnitIndex(material),
        MapUnitService.getDefaultUnit(),
        mapUnits,
      ),
    isDepthTests:
      DisposeTypeArrayService.deleteAndResetUint8(.
        BufferBasicMaterialService.getIsDepthTestIndex(material),
        BufferMaterialService.getDefaultIsDepthTest(),
        isDepthTests,
      ),
    alphas:
      DisposeTypeArrayService.deleteAndResetFloat32(.
        BufferBasicMaterialService.getAlphaIndex(material),
        BufferBasicMaterialService.getDefaultAlpha(),
        alphas,
      ),
    emptyMapUnitArrayMap:
      emptyMapUnitArrayMap |> disposeSparseMapData(material),
    nameMap: nameMap |> disposeSparseMapData(material),
  };
};

let handleBatchDisposeComponent =
  (. materialDataMap, {settingRecord} as state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                materialDataMap
                |> WonderCommonlib.MutableSparseMapService.getValidKeys,
                isAlive,
                RecordBasicMaterialMainService.getRecord(state),
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    let {disposedIndexArray} as basicMaterialRecord =
      RecordBasicMaterialMainService.getRecord(state);
    let textureCountPerMaterial =
      BufferSettingService.getTextureCountPerMaterial(settingRecord);

    materialDataMap
    |> WonderCommonlib.MutableSparseMapService.reduceiValid(
         (. basicMaterialRecord, gameObjectArr, material) => {
           let basicMaterialRecord =
             GroupBasicMaterialService.batchRemoveGameObjects(
               gameObjectArr,
               material,
               basicMaterialRecord,
             );

           GroupBasicMaterialService.isGroupBasicMaterial(
             material,
             basicMaterialRecord,
           ) ?
             basicMaterialRecord :
             {
               ...
                 basicMaterialRecord
                 |> _disposeData(material, textureCountPerMaterial),
               disposedIndexArray:
                 DisposeMaterialService.addDisposeIndex(
                   material,
                   disposedIndexArray,
                 ),
             };
         },
         basicMaterialRecord,
       )
    |> ignore;

    state;
  };