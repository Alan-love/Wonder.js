open MainStateDataType;

let getOrCreateVertexArrayBuffer = (geometryIndex: int, state: MainStateDataType.state) =>
  GetVboBufferMainService.getOrCreateBuffer(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.vertexBufferMap),
    ([@bs] ArrayBufferMainService.createBuffer, [@bs] VerticesGeometryMainService.unsafeGetVertices),
    state
  );

let getOrCreateNormalArrayBuffer = (geometryIndex: int, state: MainStateDataType.state) =>
  GetVboBufferMainService.getOrCreateBuffer(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.normalBufferMap),
    ([@bs] ArrayBufferMainService.createBuffer, [@bs] NormalsGeometryMainService.unsafeGetNormals),
    state
  );

let getOrCreateElementArrayBuffer = (geometryIndex: int, state: MainStateDataType.state) =>
  GetVboBufferMainService.getOrCreateBuffer(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.elementArrayBufferMap),
    ([@bs] ElementArrayBufferMainService.createBuffer, [@bs] IndicesGeometryMainService.unsafeGetIndices),
    state
  );

let getOrCreateInstanceBuffer =
    (sourceInstanceIndex: int, defaultCapacity, state: MainStateDataType.state) =>
  InstanceBufferMainService.getOrCreateBuffer(
    ([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), sourceInstanceIndex, defaultCapacity),
    (
      state.sourceInstanceRecord.matrixInstanceBufferCapacityMap,
      state.vboBufferRecord.matrixInstanceBufferMap
    ),
    state
  );

let passBufferShouldExistCheckWhenDisposeGeometry = (geometryIndex, state: MainStateDataType.state) => {
  open VboBufferType;
  let {vertexBufferMap, normalBufferMap, elementArrayBufferMap} =
    state.vboBufferRecord;
  WonderCommonlib.SparseMapSystem.set(geometryIndex, Obj.magic(0), vertexBufferMap);
  WonderCommonlib.SparseMapSystem.set(geometryIndex, Obj.magic(1), normalBufferMap);
  WonderCommonlib.SparseMapSystem.set(geometryIndex, Obj.magic(2), elementArrayBufferMap);
  state
};

let passBufferShouldExistCheckWhenDisposeSourceInstance =
    (sourceInstanceIndex, state: MainStateDataType.state) => {
  open VboBufferType;
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  WonderCommonlib.SparseMapSystem.set(sourceInstanceIndex, Obj.magic(0), matrixInstanceBufferMap);
  state
};

let getVboBufferRecord = (state) => state.vboBufferRecord;

let prepareCreatedBuffer = (sandbox, state) => {
  open Sinon;
  let arrayBuffer1 = Obj.magic(20);
  let arrayBuffer2 = Obj.magic(21);
  let arrayBuffer3 = Obj.magic(22);
  let arrayBuffer4 = Obj.magic(23);
  let elementArrayBuffer1 = Obj.magic(12);
  let elementArrayBuffer2 = Obj.magic(13);
  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
  createBuffer |> onCall(0) |> returns(arrayBuffer1);
  createBuffer |> onCall(1) |> returns(arrayBuffer2);
  createBuffer |> onCall(2) |> returns(elementArrayBuffer1);
  createBuffer |> onCall(3) |> returns(arrayBuffer3);
  createBuffer |> onCall(4) |> returns(arrayBuffer4);
  createBuffer |> onCall(5) |> returns(elementArrayBuffer2);
  let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
  (
    state,
    (arrayBuffer1, arrayBuffer2, arrayBuffer3, arrayBuffer4),
    (elementArrayBuffer1, elementArrayBuffer2),
    createBuffer
  )
};

let getOrCreateAllBuffers = (geometry, state) => (
  getOrCreateVertexArrayBuffer(geometry, state),
  getOrCreateNormalArrayBuffer(geometry, state),
  getOrCreateElementArrayBuffer(geometry, state)
);