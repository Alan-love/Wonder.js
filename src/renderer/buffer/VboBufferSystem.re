open VboBufferType;

let getOrCreateBuffer =
    (
      gl,
      geometryIndex: int,
      mappedGeometryIndex: int,
      group,
      bufferMap,
      createBuffer,
      getDataFunc,
      state: StateDataType.state
    ) =>
  switch (WonderCommonlib.SparseMapSystem.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      [@bs] createBuffer(gl, group, [@bs] getDataFunc(mappedGeometryIndex, state), state);
    bufferMap |> WonderCommonlib.SparseMapSystem.set(geometryIndex, buffer) |> ignore;
    buffer
  };

let addBufferToPool = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferPoolSystem.addBufferToPool(geometryIndex, state);

let initData = () => {
  vertexBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  elementArrayBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  vertexArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  groupVertexArrayBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  groupElementArrayBufferMap: WonderCommonlib.SparseMapSystem.createEmpty()
};