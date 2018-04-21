open MaterialType;

open BasicMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);

let _disposeData =
    (
      material,
      {shaderIndices, colors, defaultShaderIndex, defaultColor, groupCountMap, gameObjectMap} as record
    ) => {
  let (shaderIndices, groupCountMap, gameObjectMap) =
    DisposeMaterialService.disposeData(
      material,
      (shaderIndices, groupCountMap, gameObjectMap),
      defaultShaderIndex
    );
  {
    ...record,
    shaderIndices,
    colors:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
        BufferBasicMaterialService.getColorIndex(material),
        BufferBasicMaterialService.getColorsSize(),
        defaultColor,
        colors
      ),
    groupCountMap,
    gameObjectMap
  }
};

let _handleDispose = (disposedIndexArray, material, record) =>
  switch (GroupBasicMaterialService.isGroupMaterial(material, record)) {
  | false => {
      ...record |> _disposeData(material),
      disposedIndexArray: DisposeMaterialService.addDisposeIndex(material, disposedIndexArray)
    }
  | true => GroupBasicMaterialService.decreaseGroupCount(material, record)
  };

let handleBatchDisposeComponent =
  [@bs]
  (
    (materialArray: array(material), {disposedIndexArray} as record) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  materialArray,
                  isAlive,
                  record
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      materialArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs] ((record, material) => _handleDispose(disposedIndexArray, material, record)),
           record
         )
    }
  );

let removeDisposedOnesFromMaterialArrayForWorkerInit =
    (materialArray, {materialArrayForWorkerInit} as record) => {
  let materialMap =
    DisposeECSService.buildMapFromArray(
      materialArray,
      WonderCommonlib.SparseMapService.createEmpty()
    );
  {
    ...record,
    materialArrayForWorkerInit:
      record.materialArrayForWorkerInit
      |> Js.Array.filter(
           (material) => ! (materialMap |> WonderCommonlib.SparseMapService.has(material))
         )
  }
};