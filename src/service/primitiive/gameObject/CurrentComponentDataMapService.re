let addToMap = (uid, componentData, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.set(uid, componentData, currentComponentDataMap);

let removeFromMap = (uid, currentComponentDataMap) =>
  currentComponentDataMap
  |> Obj.magic
  |> WonderCommonlib.SparseMapService.deleteVal(uid)
  |> Obj.magic;

let getComponentData = (uid, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.get(uid, currentComponentDataMap);

let unsafeGetComponentData = (uid, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.unsafeGet(uid, currentComponentDataMap)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|has component|j}, ~actual={j|not|j}),
                 () => r |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );

let hasComponent = (uid, currentComponentDataMap, targetType_) =>
  switch (getComponentData(uid, currentComponentDataMap)) {
  | None => false
  | Some((_, type_)) => type_ === targetType_
  };

let getBoxGeometryType = () => 0;

let getCustomGeometryType = () => 1;

let getGetIndicesCountFunc = (type_) =>
  switch type_ {
  | type_ when type_ === getBoxGeometryType() => IndicesBoxGeometryMainService.getIndicesCount
  | _ => IndicesCustomGeometryMainService.getIndicesCount
  };