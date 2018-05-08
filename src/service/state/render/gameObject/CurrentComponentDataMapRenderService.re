open VboBufferType;

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
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let hasComponent = (uid, currentComponentDataMap, targetType_) =>
  switch (getComponentData(uid, currentComponentDataMap)) {
  | None => false
  | Some((_, type_)) => type_ === targetType_
  };

let getBoxGeometryType = () => 0;

let getCustomGeometryType = () => 1;

let getCurrentGeometryBufferMapAndGetPointsFuncs = (type_, vboBufferRecord) =>
  switch type_ {
  | type_ when type_ === getBoxGeometryType() => (
      (
        vboBufferRecord.boxGeometryVertexBufferMap,
        vboBufferRecord.boxGeometryTexCoordBufferMap,
        vboBufferRecord.boxGeometryNormalBufferMap,
        vboBufferRecord.boxGeometryElementArrayBufferMap
      ),
      (
        GetBoxGeometryVerticesRenderService.getVertices,
        GetBoxGeometryTexCoordsRenderService.getTexCoords,
        GetBoxGeometryNormalsRenderService.getNormals,
        GetBoxGeometryIndicesRenderService.getIndices
      )
    )
  | type_ when type_ === getCustomGeometryType() => (
      (
        vboBufferRecord.customGeometryVertexBufferMap,
        vboBufferRecord.customGeometryTexCoordBufferMap,
        vboBufferRecord.customGeometryNormalBufferMap,
        vboBufferRecord.customGeometryElementArrayBufferMap
      ),
      (
        GetCustomGeometryVerticesRenderService.getVertices,
        GetCustomGeometryTexCoordsRenderService.getTexCoords,
        GetCustomGeometryNormalsRenderService.getNormals,
        GetCustomGeometryIndicesRenderService.getIndices
      )
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getCurrentGeometryBufferMapAndGetPointsFuncs",
        ~description={j|unknown type_: $type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let getGetIndicesCountFunc = (type_) =>
  switch type_ {
  | type_ when type_ === getBoxGeometryType() => GetBoxGeometryIndicesRenderService.getIndicesCount
  | _ => GetCustomGeometryIndicesRenderService.getIndicesCount
  };