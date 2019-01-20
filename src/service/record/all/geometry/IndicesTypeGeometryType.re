open GeometryType;

let getIndicesType = (index, indicesTypeMap) =>
  indicesTypeMap |> WonderCommonlib.MutableSparseMapService.get(index);

let unsafeGetIndicesType = (index, indicesTypeMap) =>
  getIndicesType(index, indicesTypeMap) |> OptionService.unsafeGet;

let setIndicesType = (index, indicesType, indicesTypeMap) =>
  indicesTypeMap |> WonderCommonlib.MutableSparseMapService.set(index, indicesType);