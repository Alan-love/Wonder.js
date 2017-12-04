let getMappedIndex = (index, mappedIndexMap) =>
  mappedIndexMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index);

let setMappedIndex = (index, mappedIndex, mappedIndexMap) =>
  mappedIndexMap |> WonderCommonlib.SparseMapSystem.set(index, mappedIndex);

let getMappedIndexMap = (state: StateDataType.state) =>
  GeometryStateSystem.getGeometryData(state).mappedIndexMap;