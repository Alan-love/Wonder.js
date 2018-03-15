open MainStateDataType;

open TransformType;

open DisposeComponentService;

let isAlive = (transform, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(transform, disposedIndexArray);

let _disposeFromParentAndChildMap = (transform, isKeepOrder, record) => {
  record
  |> HierachyTransformService.unsafeGetChildren(transform)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       ((record, child: transform) => HierachyTransformService.removeFromParentMap(child, record)),
       record
     );
  switch (HierachyTransformService.getParent(transform, record)) {
  | None => record
  | Some(parent) => record |> HierachyTransformService.removeFromChildMap(parent, transform, isKeepOrder)
  }
};

let _disposeData =
    (
      transform: transform,
      maxTypeArrayPoolSize,
      isKeepOrder,
      (
        typeArrayPoolRecord,
        {localToWorldMatrixMap, localPositionMap, parentMap, childMap, dirtyMap, gameObjectMap} as transformRecord
      )
    ) => {
  let transformRecord = _disposeFromParentAndChildMap(transform, isKeepOrder, transformRecord);
  let typeArrayPoolRecord =
    TypeArrayPoolTransformService.addTypeArrayToPool(
      transform,
      maxTypeArrayPoolSize,
      (localToWorldMatrixMap, localPositionMap),
      typeArrayPoolRecord
    );
  (
    typeArrayPoolRecord,
    {
      ...transformRecord,
      localToWorldMatrixMap: localToWorldMatrixMap |> disposeSparseMapData(transform),
      localPositionMap: localPositionMap |> disposeSparseMapData(transform),
      parentMap: parentMap |> disposeSparseMapData(transform),
      childMap: childMap |> disposeSparseMapData(transform),
      dirtyMap: dirtyMap |> disposeSparseMapData(transform),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(transform)
    }
  )
};

let handleDisposeComponent =
    (
      transform: transform,
      maxTypeArrayPoolSize,
      isKeepOrder,
      {typeArrayPoolRecord, transformRecord} as state
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(transform, isAlive, transformRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  let (typeArrayPoolRecord, transformRecord) =
    _disposeData(
      transform,
      maxTypeArrayPoolSize,
      isKeepOrder,
      (typeArrayPoolRecord, transformRecord)
    );
  let {disposedIndexArray} = transformRecord;
  {
    ...state,
    typeArrayPoolRecord,
    transformRecord: {
      ...transformRecord,
      disposedIndexArray: disposedIndexArray |> ArrayService.push(transform)
    }
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      transformArray: array(transform),
      isGameObjectDisposedMap: array(bool),
      maxTypeArrayPoolSize,
      {typeArrayPoolRecord, transformRecord} as state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  transformArray,
                  isAlive,
                  transformRecord
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(MainStateData.stateData)
      );
      let {disposedIndexArray} = transformRecord;
      let transformRecord = {
        ...transformRecord,
        disposedIndexArray: disposedIndexArray |> Js.Array.concat(transformArray)
      };
      /* TODO optimize: batch remove parent,child? */
      let (typeArrayPoolRecord, transformRecord) =
        transformArray
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             (
               (recordTuple, transform) =>
                 _disposeData(transform, maxTypeArrayPoolSize, false, recordTuple)
             ),
             (typeArrayPoolRecord, transformRecord)
           );
      {...state, typeArrayPoolRecord, transformRecord}
    }
  );