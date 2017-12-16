open ComponentSystem;

open SourceInstanceType;

open SourceInstanceStateCommon;

let create = (state: StateDataType.state) => {
  let {index, objectInstanceArrayMap, disposedIndexArray} as data = getSourceInstanceData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty())|>ignore;
  let state =
    state
    |> SourceInstanceStaticCommon.markModelMatrixIsStatic(index, true)
    |> SourceInstanceStaticCommon.markSendModelMatrix(index, false);
  (state, index)
};