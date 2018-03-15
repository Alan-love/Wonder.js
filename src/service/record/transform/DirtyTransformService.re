open TransformType;

let mark = (transform: transform, isDirty, {dirtyMap} as record) => {
  dirtyMap |> WonderCommonlib.SparseMapService.set(transform, isDirty) |> ignore;
  record
  /* ...record,
     dirtyMap: dirtyMap |> WonderCommonlib.SparseMapService.set(transform, isDirty) */
};

let isDirty = (transform: transform, {dirtyMap} as record) =>
  dirtyMap
  |> WonderCommonlib.SparseMapService.unsafeGet(transform)
  |> WonderLog.Contract.ensureCheck(
       (isDirty) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|return bool|j}, ~actual={j|not|j}),
                 () => {
                   isDirty |> assertNullableExist;
                   isDirty |> assertIsBool
                 }
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );