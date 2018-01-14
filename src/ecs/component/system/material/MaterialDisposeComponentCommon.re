open MaterialType;

open ComponentDisposeComponentCommon;

open MaterialStateCommon;

let isAlive = (material: material, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(material, getMaterialData(state).disposedIndexArray);

let _disposeData = (material: material, state: StateDataType.state) => {
  let {colorMap, shaderIndexMap, groupCountMap, gameObjectMap} as data = getMaterialData(state);
  groupCountMap |> WonderCommonlib.SparseMapSystem.set(material, 0) |> ignore;
  disposeSparseMapData(material, colorMap) |> ignore;
  disposeSparseMapData(material, shaderIndexMap) |> ignore;
  disposeSparseMapData(material, gameObjectMap) |> ignore;
  state
};

let _handleDispose = (disposedIndexArray, material: material, state: StateDataType.state) =>
  switch (MaterialGroupCommon.isGroupMaterial(material, state)) {
  | false =>
    disposedIndexArray |> Js.Array.push(material) |> ignore;
    state |> _disposeData(material)
  | true => MaterialGroupCommon.decreaseGroupCount(material, state)
  };

let handleDisposeComponent = (material: material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAlive(material, isAlive, state)
          )
        )
      ),
    StateData.stateData.isTest
  );
  _handleDispose(getMaterialData(state).disposedIndexArray, material, state)
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (materialArray: array(material), gameObjectUidMap: array(bool), state: StateDataType.state) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                ComponentDisposeComponentCommon.checkComponentShouldAliveWithBatchDispose(
                  materialArray,
                  isAlive,
                  state
                )
              )
            )
          ),
        StateData.stateData.isTest
      );
      let {disposedIndexArray} as data = getMaterialData(state);
      materialArray
      |> ArraySystem.reduceState(
           [@bs] ((state, material) => _handleDispose(disposedIndexArray, material, state)),
           state
         )
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length == 0;