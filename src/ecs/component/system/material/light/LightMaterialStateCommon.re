open StateDataType;

open LightMaterialType;

let getMaterialData = (state: StateDataType.state) => state.lightMaterialData;

let deepCopyForRestore = (state: StateDataType.state) => {
  let {
    index,
    diffuseColorMap,
    specularColorMap,
    shininessMap,
    groupCountMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getMaterialData;
  {
    ...state,
    lightMaterialData: {
      index,
      shaderIndexMap: [||],
      diffuseColorMap: diffuseColorMap |> SparseMapSystem.copy,
      specularColorMap: specularColorMap |> SparseMapSystem.copy,
      shininessMap: shininessMap |> SparseMapSystem.copy,
      groupCountMap: groupCountMap |> SparseMapSystem.copy,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy
    }
  }
};

let restore = (currentState, targetState) => {
  ...targetState,
  lightMaterialData: {...getMaterialData(targetState), shaderIndexMap: [||]}
};