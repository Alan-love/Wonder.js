open StateDataType;

open MaterialType;

open BasicMaterialType;

let getMaterialData = (state: StateDataType.state) => state.basicMaterialData;

/* TODO duplicate */
let deepCopyStateForRestore = (state: StateDataType.state) => {
  let {index, colorMap, groupCountMap, gameObjectMap, disposedIndexArray} =
    state |> getMaterialData;
  {
    ...state,
    basicMaterialData: {
      index,
      shaderIndexMap: [||],
      colorMap: colorMap |> SparseMapSystem.copy,
      groupCountMap: groupCountMap |> SparseMapSystem.copy,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy
    }
  }
};

let restore = (currentState, targetState) => {
  ...targetState,
  basicMaterialData: {...getMaterialData(targetState), shaderIndexMap: [||]}
};