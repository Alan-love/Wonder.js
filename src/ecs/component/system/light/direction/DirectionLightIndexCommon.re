/* let getMappedIndex = (index, mappedIndexMap) =>
     mappedIndexMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index);

   let setMappedIndex = (index, mappedIndex, mappedIndexMap) =>
     mappedIndexMap |> WonderCommonlib.SparseMapSystem.set(index, mappedIndex); */
let getMappedIndexMap = (state: StateDataType.state) =>
  DirectionLightStateCommon.getLightData(state).mappedIndexMap;
/* let markDisposed = (index, mappedIndexMap) => setMappedIndex(index, (-1), mappedIndexMap);

   let isDisposed = (mappedIndex) => mappedIndex === -1; */