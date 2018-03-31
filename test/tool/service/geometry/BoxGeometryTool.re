open GeometryType;

open BoxGeometryType;

open BoxGeometryAPI;

open MainStateDataType;

let getRecord = (state) => RecordBoxGeometryMainService.getRecord(state);

let buildBoxGeometryConfigDataJsObj =
    (
      ~width=Js.Nullable.undefined,
      ~height=Js.Nullable.undefined,
      ~depth=Js.Nullable.undefined,
      ~widthSegment=Js.Nullable.undefined,
      ~heightSegment=Js.Nullable.undefined,
      ~depthSegment=Js.Nullable.undefined,
      ()
    ) => {
  "width": width,
  "height": height,
  "depth": depth,
  "widthSegment": widthSegment,
  "heightSegment": heightSegment,
  "depthSegment": depthSegment
};

let getIndicesCount = (index: int, state: MainStateDataType.state) =>
  IndicesBoxGeometryMainService.getIndicesCount(index, state);

let buildBufferConfig = (count) => {"boxGeometryPointDataBufferCount": Js.Nullable.return(count)};

let dispose = (geometry, state: MainStateDataType.state) =>
  DisposeBoxGeometryMainService.handleDisposeComponent(geometry, state);

let disposeGeometryByCloseContractCheck = (gameObject, geometry, state) => {
  TestTool.closeContractCheck();
  let state = state |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject, geometry);
  TestTool.openContractCheck();
  state
};

let createStubComputeFuncData = (sandbox, geometry, state: MainStateDataType.state) => {
  open MainStateDataType;
  open Sinon;
  let {computeDataFuncMap} = state |> RecordBoxGeometryMainService.getRecord;
  let computeDataFunc = createEmptyStubWithJsObjSandbox(sandbox);
  computeDataFuncMap |> WonderCommonlib.SparseMapService.set(geometry, computeDataFunc);
  (state, computeDataFunc)
};

let isGeometryDisposed = (geometry, state) =>
  /* open MainStateDataType;
       let {disposedIndexArray} =
     state |> RecordBoxGeometryMainService.getRecord
       disposedIndexArray |> Js.Array.includes(geometry) */
  !
    DisposeBoxGeometryMainService.isAlive(
      geometry,
      state |> RecordBoxGeometryMainService.getRecord
    );

let computeData = (geometry, state: MainStateDataType.state) =>
  CreateBoxGeometryService._computeData(geometry, state |> RecordBoxGeometryMainService.getRecord);

let getDefaultIndicesArray = () => [|
  0,
  2,
  1,
  2,
  3,
  1,
  4,
  6,
  5,
  6,
  7,
  5,
  8,
  10,
  9,
  10,
  11,
  9,
  12,
  14,
  13,
  14,
  15,
  13,
  16,
  18,
  17,
  18,
  19,
  17,
  20,
  22,
  21,
  22,
  23,
  21
|];

let getDefaultIndices = () => Js.Typed_array.Uint16Array.make(getDefaultIndicesArray());

let getDefaultVertices = () =>
  Js.Typed_array.Float32Array.make([|
    (-10.),
    (-10.),
    10.,
    (-10.),
    10.,
    10.,
    10.,
    (-10.),
    10.,
    10.,
    10.,
    10.,
    10.,
    (-10.),
    (-10.),
    10.,
    10.,
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    (-10.),
    10.,
    10.,
    (-10.),
    10.,
    (-10.),
    10.,
    10.,
    10.,
    10.,
    10.,
    (-10.),
    10.,
    (-10.),
    10.,
    10.,
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    10.,
    10.,
    10.,
    10.,
    10.,
    (-10.),
    (-10.),
    10.,
    10.,
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    10.,
    10.
  |]);

let getDefaultNormals = () =>
  Js.Typed_array.Float32Array.make([|
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.
  |]);

let setDefaultConfigData = (geometry: geometry, state: MainStateDataType.state) =>
  state
  |> setBoxGeometryConfigData(
       geometry,
       buildBoxGeometryConfigDataJsObj(
         ~width=Js.Nullable.return(10.),
         ~height=Js.Nullable.return(10.),
         ~depth=Js.Nullable.return(10.),
         ()
       )
     );

let createBoxGeometry = (state: MainStateDataType.state) => {
  let (state, geometry) = createBoxGeometry(state);
  let state = state |> setDefaultConfigData(geometry);
  (state, geometry)
};

let createGameObject = (state: MainStateDataType.state) => {
  let (state, geometry) = createBoxGeometry(state);
  let state = state |> setDefaultConfigData(geometry);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state = state |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry)
};

let setVertices =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: MainStateDataType.state) =>
  VerticesBoxGeometryMainService.setVerticesByTypeArray(geometry, data, state);

let setNormals =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: MainStateDataType.state) =>
  NormalsBoxGeometryMainService.setNormalsByTypeArray(geometry, data, state);

let setIndices =
    (geometry: int, data: Js.Typed_array.Uint16Array.t, state: MainStateDataType.state) =>
  IndicesBoxGeometryMainService.setIndicesByTypeArray(geometry, data, state);

let getGroupCount = (geometry, state) =>
  GroupBoxGeometryService.getGroupCount(geometry, state |> RecordBoxGeometryMainService.getRecord);

let initGeometrys = (state: MainStateDataType.state) => InitBoxGeometryMainService.init(state);

let initGeometry = (geometry, state: MainStateDataType.state) =>
  InitBoxGeometryMainService.initGeometry(geometry, state);

let unsafeGetBoxGeometryComponent = (uid: int, {gameObjectRecord}) =>
  GetComponentGameObjectService.unsafeGetGeometryComponent(uid, gameObjectRecord)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|type_ is box|j}, ~actual={j|not|j}),
                 () => {
                   let (_, type_, _, _) =
                     GetComponentGameObjectService.unsafeGetGeometryComponentData(
                       uid,
                       gameObjectRecord
                     );
                   type_ ==^ CurrentComponentDataMapService.getBoxGeometryType()
                 }
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );
     