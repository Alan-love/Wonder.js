open GameObjectType;

open ObjectInstanceType;

open StateDataType;

open Contract;

open ComponentDisposeComponentCommon;

open ObjectInstanceStateCommon;

let isAlive = (objectInstance: objectInstance, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(
    objectInstance,
    getObjectInstanceData(state).disposedIndexArray
  );

let _unsafeGetSourceInstance = (objectInstance: objectInstance, {sourceInstanceMap}) =>
  sourceInstanceMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(objectInstance)
  |> ensureCheck(
       (sourceInstance) =>
         Contract.Operators.(
           test("sourceInstance should exist", () => sourceInstance |> assertNullableExist)
         )
     );

let _disposeData = (objectInstance: objectInstance, state: StateDataType.state) => {
  let {sourceInstanceMap, gameObjectMap} = getObjectInstanceData(state);
  disposeSparseMapData(objectInstance, sourceInstanceMap) |> ignore;
  disposeSparseMapData(objectInstance, gameObjectMap) |> ignore;
  state
};

let handleDisposeComponent = (objectInstance: objectInstance, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentCommon.checkComponentShouldAlive(objectInstance, isAlive, state)
      )
  );
  let ({disposedIndexArray} as data): objectInstanceData = getObjectInstanceData(state);
  disposedIndexArray |> Js.Array.push(objectInstance) |> ignore;
  state
  |> InstanceDisposeComponentUtils.disposeObjectInstance(
       _unsafeGetSourceInstance(objectInstance, data),
       ObjectInstanceGameObjectCommon.unsafeGetGameObject(objectInstance, state)
     )
  |> _disposeData(objectInstance)
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      objectInstanceArray: array(objectInstance),
      gameObjectUidMap: array(bool),
      state: StateDataType.state
    ) => {
      requireCheck(
        () => {
          open Contract.Operators;
          objectInstanceArray
          |> WonderCommonlib.ArraySystem.forEach(
               [@bs]
               (
                 (objectInstance) =>
                   ComponentDisposeComponentCommon.checkComponentShouldAlive(
                     objectInstance,
                     isAlive,
                     state
                   )
               )
             );
          test(
            "objectInstanceArray should has one objectInstance at least",
            () => objectInstanceArray |> Js.Array.length > 0
          );
          test(
            "all objectInstance should belong to the same sourceInstance",
            () => {
              let data = getObjectInstanceData(state);
              let sourceInstance = _unsafeGetSourceInstance(objectInstanceArray[0], data);
              objectInstanceArray
              |> WonderCommonlib.ArraySystem.forEach(
                   [@bs]
                   ((objectInstance) => _unsafeGetSourceInstance(objectInstance, data) == sourceInstance)
                 )
            }
          )
        }
      );
      let ({disposedIndexArray} as data): objectInstanceData = getObjectInstanceData(state);
      data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(objectInstanceArray);
      let disposedUidArr =
        objectInstanceArray
        |> Js.Array.map(
             (objectInstance) =>
               ObjectInstanceGameObjectCommon.unsafeGetGameObject(objectInstance, state)
           );
      let disposedUidMap =
        ECSDisposeUtils.buildMapFromArray(
          disposedUidArr,
          WonderCommonlib.SparseMapSystem.createEmpty()
        );
      let sourceInstance = _unsafeGetSourceInstance(objectInstanceArray[0], data);
      let state =
        InstanceDisposeComponentUtils.batchDisposeObjectInstance(
          sourceInstance,
          disposedUidMap,
          disposedUidArr,
          state
        );
      objectInstanceArray
      |> ArraySystem.reduceState(
           [@bs] ((state, objectInstance) => state |> _disposeData(objectInstance)),
           state
         )
    }
  );