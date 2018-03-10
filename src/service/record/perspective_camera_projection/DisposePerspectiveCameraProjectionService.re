open PerspectiveCameraProjectionType;

let isAlive = (cameraView, {disposedIndexArray}) =>
  ComponentDisposeComponentCommon.isAlive(cameraView, disposedIndexArray);

let _disposeRecord =
    (
      cameraProjection,
      {gameObjectMap, dirtyArray, pMatrixMap, nearMap, farMap, fovyMap, aspectMap} as record
    ) => {
  ...record,
  dirtyArray: DisposeComponentService.disposeSparseMapData(cameraProjection, dirtyArray),
  pMatrixMap: DisposeComponentService.disposeSparseMapData(cameraProjection, pMatrixMap),
  nearMap: DisposeComponentService.disposeSparseMapData(cameraProjection, nearMap),
  farMap: DisposeComponentService.disposeSparseMapData(cameraProjection, farMap),
  fovyMap: DisposeComponentService.disposeSparseMapData(cameraProjection, fovyMap),
  aspectMap: DisposeComponentService.disposeSparseMapData(cameraProjection, aspectMap),
  gameObjectMap:
    DisposeComponentService.disposeSparseMapData(cameraProjection, gameObjectMap)
};

let handleDisposeComponent = (cameraProjection, {disposedIndexArray} as record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(
              cameraProjection,
              isAlive,
              record
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  _disposeRecord(
    cameraProjection,
    {...record, disposedIndexArray: disposedIndexArray |> ArrayService.push(cameraProjection)}
  )
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      cameraProjectionArray: array(ComponentType.component),
      isGameObjectDisposedMap: array(bool),
      {disposedIndexArray} as record
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  cameraProjectionArray,
                  isAlive,
                  record
                )
              )
            )
          ),
        StateData.stateData.isDebug
      );
      cameraProjectionArray
      |> WonderCommonlib.ArraySystem.reduceOneParam(
           [@bs] ((record, cameraProjection) => record |> _disposeRecord(cameraProjection)),
           {
             ...record,
             disposedIndexArray: disposedIndexArray |> Js.Array.concat(cameraProjectionArray)
           }
         )
    }
  );