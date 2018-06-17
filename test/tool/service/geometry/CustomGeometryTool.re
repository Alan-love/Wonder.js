open StateDataMainType;

open CustomGeometryType;

open CustomGeometryAPI;

let buildInfo = (startIndex, endIndex) => (startIndex, endIndex);

let getInfo = (index, infos) =>
  ReallocatedPointsGeometryService.getInfo(
    BufferCustomGeometryService.getInfoIndex(index),
    infos,
  );

let getRecord = state => RecordCustomGeometryMainService.getRecord(state);

let createGameObject = (state: StateDataMainType.state) => {
  let (state, geometry) = createCustomGeometry(state);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state =
    state
    |> GameObjectAPI.addGameObjectCustomGeometryComponent(
         gameObject,
         geometry,
       );
  (state, gameObject, geometry);
};

let createGameObjectAndSetPointData = (state: StateDataMainType.state) => {
  open Js.Typed_array;
  let (state, geometry) = createCustomGeometry(state);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state =
    state
    |> GameObjectAPI.addGameObjectCustomGeometryComponent(
         gameObject,
         geometry,
       );
  let vertices1 = Float32Array.make([|10.|]);
  let texCoords1 = Float32Array.make([|0.5|]);
  let normals1 = Float32Array.make([|1.|]);
  let indices1 = Uint16Array.make([|2|]);
  let state =
    state
    |> setCustomGeometryVertices(geometry, vertices1)
    |> setCustomGeometryTexCoords(geometry, texCoords1)
    |> setCustomGeometryNormals(geometry, normals1)
    |> setCustomGeometryIndices(geometry, indices1);
  (state, gameObject, geometry, (vertices1, texCoords1, normals1, indices1));
};

let createThreeGameObjectsAndSetPointData = state => {
  open Js.Typed_array;
  let vertices1 = Float32Array.make([|10., 10., 11.|]);
  let vertices2 = Float32Array.make([|3., 2., 3.|]);
  let vertices3 = Float32Array.make([|5., 3., 2.|]);
  let texCoords1 = Float32Array.make([|0.5, 0.5|]);
  let texCoords2 = Float32Array.make([|0., 1.|]);
  let texCoords3 = Float32Array.make([|0., 0.5|]);
  let normals1 = Float32Array.make([|1., 2., 3.|]);
  let normals2 = Float32Array.make([|2., 2., 4.|]);
  let normals3 = Float32Array.make([|5., 1., 2.|]);
  let indices1 = Uint16Array.make([|2, 1, 0|]);
  let indices2 = Uint16Array.make([|2, 0, 1|]);
  let indices3 = Uint16Array.make([|0, 1, 2|]);
  let (state, gameObject1, geometry1) = createGameObject(state);
  let (state, gameObject2, geometry2) = createGameObject(state);
  let (state, gameObject3, geometry3) = createGameObject(state);
  let state =
    state
    |> setCustomGeometryVertices(geometry1, vertices1)
    |> setCustomGeometryVertices(geometry2, vertices2)
    |> setCustomGeometryVertices(geometry3, vertices3)
    |> setCustomGeometryTexCoords(geometry1, texCoords1)
    |> setCustomGeometryTexCoords(geometry2, texCoords2)
    |> setCustomGeometryTexCoords(geometry3, texCoords3)
    |> setCustomGeometryNormals(geometry1, normals1)
    |> setCustomGeometryNormals(geometry2, normals2)
    |> setCustomGeometryNormals(geometry3, normals3)
    |> setCustomGeometryIndices(geometry1, indices1)
    |> setCustomGeometryIndices(geometry2, indices2)
    |> setCustomGeometryIndices(geometry3, indices3);
  (
    state,
    (gameObject1, gameObject2, gameObject3),
    (geometry1, geometry2, geometry3),
    (vertices1, vertices2, vertices3),
    (texCoords1, texCoords2, texCoords3),
    (normals1, normals2, normals3),
    (indices1, indices2, indices3),
  );
};

let getGroupCount = (geometry, state) =>
  GroupCustomGeometryService.getGroupCount(
    geometry,
    state |> RecordCustomGeometryMainService.getRecord,
  );

let isGeometryDisposed = (geometry, state) =>
  !
    DisposeCustomGeometryMainService.isAlive(
      geometry,
      state |> RecordCustomGeometryMainService.getRecord,
    );

let getIndicesCount = (index: int, state: StateRenderType.renderState) =>
  GetCustomGeometryIndicesRenderService.getIndicesCount(. index, state);

let unsafeGetGeometryComponent = (uid: int, {gameObjectRecord}) =>
  GetComponentGameObjectService.unsafeGetGeometryComponent(
    uid,
    gameObjectRecord,
  )
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|type_ is box|j},
                   ~actual={j|not|j},
                 ),
                 () => {
                   let (_, type_) =
                     GetComponentGameObjectService.unsafeGetGeometryComponentData(
                       uid,
                       gameObjectRecord,
                     );
                   type_
                   == CurrentComponentDataMapService.getCustomGeometryType();
                 },
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let _getMainVertexData = (geometry, count, getCustomGeometryVertexFunc, state) => {
  open Js.Typed_array;

  let points = getCustomGeometryVertexFunc(geometry, state);

  let length = points |> Float32Array.length;

  let mainVertexs = Float32Array.fromLength(count);

  length > count ?
    {
      TypeArrayService.fillFloat32ArrayWithOffset(
        mainVertexs,
        Float32Array.slice(~start=0, ~end_=count / 2, points),
        0,
      );

      TypeArrayService.fillFloat32ArrayWithOffset(
        mainVertexs,
        Float32Array.slice(
          ~start=length - count / 2 - 1,
          ~end_=length - 1,
          points,
        ),
        count / 2,
      );

      mainVertexs;
    } :
    points;
};

let getMainVertices = (geometry, state) =>
  _getMainVertexData(
    geometry,
    60,
    CustomGeometryAPI.getCustomGeometryVertices,
    state,
  );

let getMainNormals = (geometry, state) =>
  _getMainVertexData(
    geometry,
    60,
    CustomGeometryAPI.getCustomGeometryNormals,
    state,
  );

let getMainTexCoords = (geometry, state) =>
  _getMainVertexData(
    geometry,
    40,
    CustomGeometryAPI.getCustomGeometryTexCoords,
    state,
  );

let getMainIndices = (geometry, state) => {
  open Js.Typed_array;

  let indices = CustomGeometryAPI.getCustomGeometryIndices(geometry, state);

  let count = 60;

  let length = indices |> Uint16Array.length;

  let mainVertexs = Uint16Array.fromLength(count);

  length > count ?
    {
      TypeArrayService.fillUint16ArrayWithOffset(
        mainVertexs,
        Uint16Array.slice(~start=0, ~end_=count / 2, indices),
        0,
      );

      TypeArrayService.fillUint16ArrayWithOffset(
        mainVertexs,
        Uint16Array.slice(
          ~start=length - count / 2 - 1,
          ~end_=length - 1,
          indices,
        ),
        count / 2,
      );

      mainVertexs;
    } :
    indices;
};