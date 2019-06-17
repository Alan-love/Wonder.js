open StateDataMainType;

open SettingType;

open MaterialType;

open BasicMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeMaterialMainService.isAlive(material, disposedIndexArray);

let _disposeData = (material, state) => {
  let {
        shaderIndices,
        colors,
        isDepthTests,
        alphas,
        defaultColor,
        nameMap,
        gameObjectsMap,
      } as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);

  let shaderIndices =
    DisposeMaterialService.disposeData(
      material,
      shaderIndices,
      DefaultTypeArrayValueService.getDefaultShaderIndex(),
    );

  {
    ...state,
    basicMaterialRecord:
      Some({
        ...basicMaterialRecord,
        shaderIndices,
        colors:
          DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
            BufferAllBasicMaterialService.getColorIndex(material),
            BufferAllBasicMaterialService.getColorsSize(),
            defaultColor,
            colors,
          ),
        isDepthTests:
          DisposeTypeArrayService.deleteAndResetUint8(.
            BufferAllBasicMaterialService.getIsDepthTestIndex(material),
            BufferMaterialService.getDefaultIsDepthTest(),
            isDepthTests,
          ),
        alphas:
          DisposeTypeArrayService.deleteAndResetFloat32(.
            BufferAllBasicMaterialService.getAlphaIndex(material),
            BufferAllBasicMaterialService.getDefaultAlpha(),
            alphas,
          ),
        nameMap: nameMap |> disposeSparseMapData(material),
      }),
  };
};

let handleBatchDisposeComponentData =
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

    materialDataMap
    |> WonderCommonlib.MutableSparseMapService.reduceiValid(
         (. state, gameObjectArr, material) => {
           let basicMaterialRecord =
             RecordBasicMaterialMainService.getRecord(state);

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
             {...state, basicMaterialRecord: Some(basicMaterialRecord)} :
             {
               let state = state |> _disposeData(material);

               let basicMaterialRecord =
                 RecordBasicMaterialMainService.getRecord(state);

               {
                 ...state,
                 basicMaterialRecord:
                   Some({
                     ...basicMaterialRecord,
                     disposedIndexArray:
                       DisposeMaterialService.addDisposeIndex(
                         material,
                         basicMaterialRecord.disposedIndexArray,
                       ),
                   }),
               };
             };
         },
         state,
       );
  };

let handleBatchDisposeComponent =
    (materialHasNoGameObjectArray, {settingRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
        materialHasNoGameObjectArray,
        isAlive,
        state |> RecordBasicMaterialMainService.getRecord,
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|material has no gameObject|j},
          ~actual={j|has|j},
        ),
        () => {
          let materialRecord =
            state |> RecordBasicMaterialMainService.getRecord;

          materialHasNoGameObjectArray
          |> Js.Array.filter(material =>
               GameObjectBasicMaterialService.getGameObjects(
                 material,
                 materialRecord,
               )
               |> Js.Option.isSome
             )
          |> Js.Array.length == 0;
        },
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let {disposedIndexArray} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);

  materialHasNoGameObjectArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, material) => {
         let state = state |> _disposeData(material);

         let basicMaterialRecord =
           RecordBasicMaterialMainService.getRecord(state);

         {
           ...state,
           basicMaterialRecord:
             Some({
               ...basicMaterialRecord,
               disposedIndexArray:
                 DisposeMaterialService.addDisposeIndex(
                   material,
                   basicMaterialRecord.disposedIndexArray,
                 ),
             }),
         };
       },
       state,
     );
};