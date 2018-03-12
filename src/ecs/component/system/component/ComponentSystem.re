open ComponentType;

let getComponentGameObject = (component: component, gameObjectMap) =>
  WonderCommonlib.SparseMapSystem.get(component, gameObjectMap);

let unsafeGetComponentGameObject = (component: component, gameObjectMap) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(component, gameObjectMap)
  |> WonderLog.Contract.ensureCheck(
       (gameObject) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|component's gameObject exist|j},
                   ~actual={j|not|j}
                 ),
                 () => gameObject |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );

let checkComponentShouldAlive = (component: component, isAliveFunc, state: StateDataType.state) =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(~expect={j|component alive|j}, ~actual={j|not|j}),
          () => isAliveFunc(component, state) |> assertTrue
        )
      )
    )
  );

let _getDisposedIndex = (disposedIndexArray) => (
  disposedIndexArray,
  disposedIndexArray |> Js.Array.pop
);

let generateIndex = (index, disposedIndexArray) =>
  switch (_getDisposedIndex(disposedIndexArray)) {
  | (disposedIndexArray, None) => (index, succ(index), disposedIndexArray)
  | (disposedIndexArray, Some(disposedIndex)) => (disposedIndex, index, disposedIndexArray)
  };