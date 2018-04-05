open BasicCameraViewType;

let isAlive = (cameraView, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(cameraView, disposedIndexArray);

let _disposeData = (cameraView, {gameObjectMap} as record) => {
  ...record,
  gameObjectMap: DisposeComponentService.disposeSparseMapData(cameraView, gameObjectMap)
};

let handleDisposeComponent = (cameraView, {disposedIndexArray} as record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(cameraView, isAlive, record)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  _disposeData(
    cameraView,
    {...record, disposedIndexArray: disposedIndexArray |> ArrayService.push(cameraView)}
  )
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      cameraViewArray: array(ComponentType.component),
      isGameObjectDisposedMap: array(bool),
      {disposedIndexArray} as record
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  cameraViewArray,
                  isAlive,
                  record
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      cameraViewArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs] ((record, cameraView) => record |> _disposeData(cameraView)),
           {...record, disposedIndexArray: disposedIndexArray |> Js.Array.concat(cameraViewArray)}
         )
    }
  );