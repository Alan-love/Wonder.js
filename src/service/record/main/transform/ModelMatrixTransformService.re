open Js.Typed_array;

open TypeArrayService;

open TransformType;

open HierachyTransformService;

open Matrix4Service;

let getLocalToWorldMatrixTypeArray =
    (transform: transform, localToWorldMatrices, localToWorldMatrixCacheMap) =>
  switch (localToWorldMatrixCacheMap |> WonderCommonlib.SparseMapService.get(transform)) {
  | Some(matrix) => (matrix, localToWorldMatrixCacheMap)
  | None =>
    let matrix =
      RecordTransformMainService.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices);
    (matrix, WonderCommonlib.SparseMapService.set(transform, matrix, localToWorldMatrixCacheMap))
  };

/* TODO duplicate with getLocalToWorldMatrixTypeArray */
let getNormalMatrixTypeArray =
    (
      transform: transform,
      localToWorldMatrices,
      (localToWorldMatrixCacheMap, normalMatrixCacheMap)
    ) =>
  switch (normalMatrixCacheMap |> WonderCommonlib.SparseMapService.get(transform)) {
  | Some(matrix) => (matrix, (localToWorldMatrixCacheMap, normalMatrixCacheMap))
  | None =>
    let (matrix, localToWorldMatrixCacheMap) =
      getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap);
    let matrix =
      Matrix4Service.invertTo3x3(matrix, Matrix3Service.createIdentityMatrix3())
      |> Matrix3Service.transposeSelf;
    (
      matrix,
      (
        localToWorldMatrixCacheMap,
        WonderCommonlib.SparseMapService.set(transform, matrix, normalMatrixCacheMap)
      )
    )
  };

let getLocalPositionTypeArray = (transform: transform, localPositions) =>
  RecordTransformMainService.getLocalPositionTypeArray(transform, localPositions);

/* |> WonderLog.Contract.ensureCheck(
     (localPosition) =>
       WonderLog.(
         Contract.(
           Operators.(
             test(
               Log.buildAssertMessage(~expect={j|localPosition exist|j}, ~actual={j|not|j}),
               () => localPosition |> assertNullableExist
             )
           )
         )
       ),
     IsDebugMainService.getIsDebug(StateDataMain.stateData)
   ); */
let getLocalPositionTuple = (transform: transform, localPositions) =>
  RecordTransformMainService.getLocalPositionTuple(transform, localPositions);

let setLocalPositionByTuple = (transform: transform, dataTuple, {localPositions} as record) => {
  RecordTransformMainService.setLocalPositionByTuple(transform, dataTuple, localPositions)
  |> ignore;
  record |> markHierachyDirty(transform)
};

/* let setPositionByTypeArray = (transform: transform, position, record, state: StateDataMainType.state) =>
   switch (getParent(transform, record)) {
   | None =>
     setLocalPositionByTypeArray(transform, position, record) |> ignore;
     record
   | Some(parent) =>
     let record = update(parent, state) |> getTransformData;
     Vector3Service.transformMat4TypeArray(
       position,
       invert(
         getLocalToWorldMatrixTypeArray(parent, record.localToWorldMatrices),
         GlobalTempService.getFloat32Array1(state)
       ),
       getLocalPositionTypeArray(transform, record.localPositions)
     )
     |> ignore;
     record
   }; */
let setPositionByTuple =
    (
      transform: transform,
      parent,
      position: position,
      (globalTempRecord, {localToWorldMatrices, localToWorldMatrixCacheMap} as record)
    ) => {
  let (localToWorldMatrix, _) =
    getLocalToWorldMatrixTypeArray(
      parent,
      record.localToWorldMatrices,
      localToWorldMatrixCacheMap
    );
  setLocalPositionByTuple(
    transform,
    Vector3Service.transformMat4Tuple(
      position,
      invert(localToWorldMatrix, GlobalTempService.getFloat32Array1(globalTempRecord))
    ),
    record
  )
};