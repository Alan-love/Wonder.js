open TransformType;

open Matrix4Service;

open HierachyTransformService;

open ModelMatrixTransformService;

open DirtyTransformService;

let _clearCache = (transform, {normalMatrixCacheMap} as record) => {
  normalMatrixCacheMap |> Obj.magic |> WonderCommonlib.SparseMapService.deleteVal(transform) |> ignore;
  record
};

let rec update = (transform: transform, globalTempRecord, {localPositions} as transformRecord) =>
  switch (isDirty(transform, transformRecord)) {
  | false => transformRecord
  | true =>
    /* TODO perf: translation not clear normalMatrixCacheMap, only rotation/scale clear */
    let transformRecord = mark(transform, false, transformRecord) |> _clearCache(transform);
    switch (getParent(transform, transformRecord)) {
    | Some(parent) =>
      let transformRecord = transformRecord |> update(parent, globalTempRecord);
      multiply(
        getLocalToWorldMatrixTypeArray(parent, transformRecord.localToWorldMatrices),
        fromTranslation(
          getLocalPositionTypeArray(transform, localPositions),
          GlobalTempService.getFloat32Array1(globalTempRecord)
        ),
        getLocalToWorldMatrixTypeArray(transform, transformRecord.localToWorldMatrices)
      )
      |> ignore;
      transformRecord
    | None =>
      fromTranslation(
        getLocalPositionTypeArray(transform, localPositions),
        getLocalToWorldMatrixTypeArray(transform, transformRecord.localToWorldMatrices)
      )
      |> ignore;
      transformRecord
    }
  };

let _updateAndGetPosition = (transform: transform, getTranslationFunc, globalTempRecord, record) =>
  Js.Typed_array.(
    [@bs]
    getTranslationFunc(
      getLocalToWorldMatrixTypeArray(
        transform,
        update(transform, globalTempRecord, record).localToWorldMatrices
      )
    )
  );

let updateAndGetPositionTypeArray = (transform: transform, globalTempRecord, record) =>
  _updateAndGetPosition(
    transform,
    Matrix4Service.getTranslationTypeArray,
    globalTempRecord,
    record
  );

let updateAndGetPositionTuple = (transform: transform, globalTempRecord, record) =>
  _updateAndGetPosition(transform, Matrix4Service.getTranslationTuple, globalTempRecord, record);

let updateAndGetLocalToWorldMatrixTypeArray = (transform: transform, globalTempRecord, record) => {
  let record = update(transform, globalTempRecord, record);
  record.localToWorldMatrices |> getLocalToWorldMatrixTypeArray(transform)
};

let updateAndGetNormalMatrixTypeArray = (transform: transform, globalTempRecord, record) => {
  let {localToWorldMatrices, normalMatrixCacheMap} = update(transform, globalTempRecord, record);
  getNormalMatrixTypeArray(transform, localToWorldMatrices, normalMatrixCacheMap)
};

let updateAndSetPositionByTuple =
    (transform: transform, position: position, globalTempRecord, record) =>
  (
    switch (getParent(transform, record)) {
    | None => setLocalPositionByTuple(transform, position, record)
    | Some(parent) =>
      let record = update(parent, globalTempRecord, record);
      setPositionByTuple(
        transform: transform,
        parent,
        position: position,
        (globalTempRecord, record)
      )
    /* setLocalPositionByTuple(
         transform,
         Vector3Service.transformMat4Tuple(
           position,
           invert(
             getLocalToWorldMatrixTypeArray(parent, record.localToWorldMatrixMap),
             GlobalTempService.getFloat32Array1(globalTempRecord)
           )
         ),
         record
       ) */
    }
  )
  |> markHierachyDirty(transform);