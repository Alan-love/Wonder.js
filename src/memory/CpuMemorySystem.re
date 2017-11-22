open GameObjectType;

open Contract;

open StateDataType;

open GeometryType;

let reAllocateGameObject = (state: StateDataType.state) => {
  let {
        aliveUidArray,
        disposedUidMap,
        transformMap,
        meshRendererMap,
        geometryMap,
        materialMap,
        cameraControllerMap
      } as data =
    GameObjectStateUtils.getGameObjectData(state);
  let newTransformMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newMeshRendererMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newGeometryMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newCameraControllerMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newMaterialMap = WonderCommonlib.HashMapSystem.createEmpty();
  /* todo optimize? */
  let newAliveUidArray =
    aliveUidArray
    |> Js.Array.reduce(
         (newAliveUidArray, aliveUid) =>
           switch (MemoryUtils.isDisposed(aliveUid, disposedUidMap)) {
           | false =>
             newAliveUidArray |> Js.Array.push(aliveUid);
             newAliveUidArray
           | true => newAliveUidArray
           },
         [||]
       );
  newAliveUidArray
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (uid) => {
           newTransformMap
           |> WonderCommonlib.HashMapSystem.set(
                uid,
                transformMap |> WonderCommonlib.HashMapSystem.unsafeGet(uid)
              )
           |> ignore;
           switch (meshRendererMap |> WonderCommonlib.HashMapSystem.get(uid)) {
           | None => ()
           | Some(meshRenderer) =>
             newMeshRendererMap |> WonderCommonlib.HashMapSystem.set(uid, meshRenderer) |> ignore
           };
           switch (geometryMap |> WonderCommonlib.HashMapSystem.get(uid)) {
           | None => ()
           | Some(geometry) =>
             newGeometryMap |> WonderCommonlib.HashMapSystem.set(uid, geometry) |> ignore
           };
           switch (materialMap |> WonderCommonlib.HashMapSystem.get(uid)) {
           | None => ()
           | Some(material) =>
             newMaterialMap |> WonderCommonlib.HashMapSystem.set(uid, material) |> ignore
           };
           switch (cameraControllerMap |> WonderCommonlib.HashMapSystem.get(uid)) {
           | None => ()
           | Some(cameraController) =>
             newCameraControllerMap
             |> WonderCommonlib.HashMapSystem.set(uid, cameraController)
             |> ignore
           }
         }
       )
     );
  data.disposedUidMap = WonderCommonlib.HashMapSystem.createEmpty();
  data.aliveUidArray = newAliveUidArray;
  data.transformMap = newTransformMap;
  data.meshRendererMap = newMeshRendererMap;
  /* todo test */
  data.geometryMap = newGeometryMap;
  data.materialMap = newMaterialMap;
  data.cameraControllerMap = newCameraControllerMap;
  state
};

let _updateInfoArray =
    /* ensureFunc((returnVal: any, newInfoArray, newIndexInArrayBuffer, info: GeometryInfo, offset: number) => {
           it("info.startIndex should >= 0", () => {
               expect(newInfoArray[newIndexInArrayBuffer].startIndex).gte(0);
           });
       }, */
    (newInfoArray, newIndex: int, {startIndex, endIndex}, offset: int) => {
  let increment = endIndex - startIndex;
  Array.unsafe_set(
    newInfoArray,
    newIndex,
    GeometryOperateDataUtils.buildInfo(offset, offset + increment)
  );
  newInfoArray
  /* |> ensureCheck ((r) => {
     open Contract.Operators;
     test
     ("startIndex should >= 0",
     (
     () => {
     r.startIndex >= 0
     })
     );
     });

              test("endIndex should >= startIndex", () => r.endIndex >= r.startIndex) */
};

let _fillFloat32Array =
    (targetTypeArr, targetStartIndex, sourceTypeArr, sourceStartIndex, endIndex) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "targetStartIndex should <= sourceStartIndex",
          () => targetStartIndex <= sourceStartIndex
        )
      )
  );
  let typeArrIndex = ref(targetStartIndex);
  for (i in sourceStartIndex to endIndex - 1) {
    Js.Typed_array.Float32Array.unsafe_set(
      targetTypeArr,
      typeArrIndex^,
      Js.Typed_array.Float32Array.unsafe_get(sourceTypeArr, i)
    );
    typeArrIndex := succ(typeArrIndex^)
  };
  typeArrIndex^
};

let _fillUint16Array = (targetTypeArr, targetStartIndex, sourceTypeArr, sourceStartIndex, endIndex) => {
  let typeArrIndex = ref(targetStartIndex);
  for (i in sourceStartIndex to endIndex - 1) {
    Js.Typed_array.Uint16Array.unsafe_set(
      targetTypeArr,
      typeArrIndex^,
      Js.Typed_array.Uint16Array.unsafe_get(sourceTypeArr, i)
    );
    typeArrIndex := succ(typeArrIndex^)
  };
  typeArrIndex^
};

let reAllocateGeometry = (state: StateDataType.state) => {
  let {
        index,
        vertices,
        indices,
        verticesInfoArray,
        indicesInfoArray,
        configDataMap,
        computeDataFuncMap,
        gameObjectMap,
        indicesCountCacheMap,
        verticesCountCacheMap,
        disposedIndexMap
      } as data =
    GeometryStateUtils.getGeometryData(state);
  let newIndex = ref(0);
  let newIndexMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newComputeDataFuncMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newConfigDataMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newGameObjectMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newIndicesCountCacheMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newVerticesCountCacheMap = WonderCommonlib.HashMapSystem.createEmpty();
  let newVerticesInfoArray = WonderCommonlib.ArraySystem.createEmpty();
  let newIndicesInfoArray = WonderCommonlib.ArraySystem.createEmpty();
  let newVerticesOffset = ref(0);
  let newIndicesOffset = ref(0);
  ArraySystem.range(0, index - 1)
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (index) =>
           MemoryUtils.isDisposed(Js.Int.toString(index), disposedIndexMap) ?
             () :
             {
               let indexStr = Js.Int.toString(index);
               let newIndexStr = Js.Int.toString(newIndex^);
               let verticesInfo = GeometryOperateDataUtils.getInfo(verticesInfoArray, newIndex^);
               let indicesInfo = GeometryOperateDataUtils.getInfo(indicesInfoArray, newIndex^);
               GeometryIndexUtils.setIndexToIndexMap(indexStr, newIndex^, newIndexMap) |> ignore;
               _updateInfoArray(newVerticesInfoArray, newIndex^, verticesInfo, newVerticesOffset^);
               _updateInfoArray(newIndicesInfoArray, newIndex^, indicesInfo, newIndicesOffset^);
               newVerticesOffset :=
                 _fillFloat32Array(
                   vertices,
                   newVerticesOffset^,
                   vertices,
                   verticesInfo.startIndex,
                   verticesInfo.endIndex
                 );
               newIndicesOffset :=
                 _fillUint16Array(
                   indices,
                   newIndicesOffset^,
                   indices,
                   indicesInfo.startIndex,
                   indicesInfo.endIndex
                 );
               newConfigDataMap
               |> WonderCommonlib.HashMapSystem.set(
                    newIndexStr,
                    configDataMap |> WonderCommonlib.HashMapSystem.unsafeGet(indexStr)
                  )
               |> ignore;
               newComputeDataFuncMap
               |> WonderCommonlib.HashMapSystem.set(
                    newIndexStr,
                    computeDataFuncMap |> WonderCommonlib.HashMapSystem.unsafeGet(indexStr)
                  )
               |> ignore;
               newGameObjectMap
               |> WonderCommonlib.HashMapSystem.set(
                    newIndexStr,
                    gameObjectMap |> WonderCommonlib.HashMapSystem.unsafeGet(indexStr)
                  )
               |> ignore;
               newIndicesCountCacheMap
               |> WonderCommonlib.HashMapSystem.set(
                    newIndexStr,
                    indicesCountCacheMap |> WonderCommonlib.HashMapSystem.unsafeGet(indexStr)
                  )
               |> ignore;
               newVerticesCountCacheMap
               |> WonderCommonlib.HashMapSystem.set(
                    newIndexStr,
                    verticesCountCacheMap |> WonderCommonlib.HashMapSystem.unsafeGet(indexStr)
                  )
               |> ignore;
               newIndex := succ(newIndex^)
             }
       )
     );
  data.index = newIndex^;
  data.indexMap = newIndexMap;
  data.verticesOffset = newVerticesOffset^;
  data.indicesOffset = newIndicesOffset^;
  data.verticesInfoArray = newVerticesInfoArray;
  data.indicesInfoArray = newIndicesInfoArray;
  data.configDataMap = newConfigDataMap;
  data.computeDataFuncMap = newComputeDataFuncMap;
  data.gameObjectMap = newGameObjectMap;
  data.indicesCountCacheMap = newIndicesCountCacheMap;
  data.verticesCountCacheMap = newVerticesCountCacheMap;
  /* data.disposedIndexMap = WonderCommonlib.HashMapSystem.createEmpty(); */
  state
};