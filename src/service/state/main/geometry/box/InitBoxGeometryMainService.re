open StateDataMainType;

open GeometryType;

open BoxGeometryType;

let _isInit = (index: int, isInitMap) =>
  switch (isInitMap |> WonderCommonlib.SparseMapService.get(index)) {
  | None => false
  | Some(bool) => bool
  };

let _markIsInit = (index: int, isInit: bool, state: StateDataMainType.state) => {
  let {isInitMap} = state |> RecordBoxGeometryMainService.getRecord;
  isInitMap |> WonderCommonlib.SparseMapService.set(index, isInit) |> ignore;
  state
};

let _getConfig = (configDataMap) => (
  WonderCommonlib.HashMapService.unsafeGet("width", configDataMap),
  WonderCommonlib.HashMapService.unsafeGet("height", configDataMap),
  WonderCommonlib.HashMapService.unsafeGet("depth", configDataMap),
  WonderCommonlib.HashMapService.unsafeGet("widthSegment", configDataMap) |> int_of_float,
  WonderCommonlib.HashMapService.unsafeGet("heightSegment", configDataMap) |> int_of_float,
  WonderCommonlib.HashMapService.unsafeGet("depthSegment", configDataMap) |> int_of_float
);

let _buildFaceData = (width, height, depth) => (
  [|
    /* front */
    [|0, 1, 3|],
    /* back */
    [|4, 5, 7|],
    /* top */
    [|3, 2, 6|],
    /* bottom */
    [|1, 0, 4|],
    /* right */
    [|1, 4, 2|],
    /* left */
    [|5, 0, 6|]
  |],
  [|
    /* front */
    [|0., 0., 1.|],
    /* back */
    [|0., 0., (-1.)|],
    /* top */
    [|0., 1., 0.|],
    /* bottom */
    [|0., (-1.), 0.|],
    /* right */
    [|1., 0., 0.|],
    /* left */
    [|(-1.), 0., 0.|]
  |],
  [|
    (-. width, -. height, depth),
    (width, -. height, depth),
    (width, height, depth),
    (-. width, height, depth),
    (width, -. height, -. depth),
    (-. width, -. height, -. depth),
    (-. width, height, -. depth),
    (width, height, -. depth)
  |]
);

let _getLerpData =
    ((faceAxes, corners), (side, segment), (cornerIndex1, cornerIndex2, segmentIndex)) =>
  Vector3Service.lerp(
    corners[faceAxes[side][cornerIndex1]],
    corners[faceAxes[side][cornerIndex2]],
    float_of_int(segmentIndex) /. float_of_int(segment)
  );

let _generateVertex =
    (
      (side: int, uSegment: int, vSegment: int),
      (faceAxes, corners),
      (uSegmentIndex, vSegmentIndex),
      vertices
    ) => {
  let (vx, vy, vz) =
    Vector3Service.add(
      Vector3Type.Float,
      _getLerpData((faceAxes, corners), (side, uSegment), (0, 1, uSegmentIndex)),
      Vector3Service.sub(
        Vector3Type.Float,
        _getLerpData((faceAxes, corners), (side, vSegment), (0, 2, vSegmentIndex)),
        corners[faceAxes[side][0]]
      )
    );
  vertices |> WonderCommonlib.ArrayService.pushMany([|vx, vy, vz|]) |> ignore
};

let _generateNormal = (side, faceNormals, normals) =>
  normals
  |> WonderCommonlib.ArrayService.pushMany([|
       faceNormals[side][0],
       faceNormals[side][1],
       faceNormals[side][2]
     |])
  |> ignore;

let _generateIndex = ((uSegment, vSegment, offset), (uSegmentIndex, vSegmentIndex), indices) =>
  switch (uSegmentIndex, vSegmentIndex) {
  | (i, j) when i < uSegment && j < vSegment =>
    indices
    |> WonderCommonlib.ArrayService.pushMany([|
         offset + j + i * (uSegment + 1),
         offset + j + (i + 1) * (uSegment + 1),
         offset + j + i * (uSegment + 1) + 1,
         offset + j + (i + 1) * (uSegment + 1),
         offset + j + (i + 1) * (uSegment + 1) + 1,
         offset + j + i * (uSegment + 1) + 1
       |])
    |> ignore
  | (_, _) => ()
  };

let _generateFace =
    (
      (side, uSegment, vSegment) as directionDataTuple,
      (faceAxes, faceNormals, corners),
      (vertices, normals, indices)
    ) => {
  let (side: int, uSegment: int, vSegment: int) = directionDataTuple;
  let offset: int = Js.Array.length(vertices) / 3;
  for (i in 0 to uSegment) {
    for (j in 0 to vSegment) {
      let segmentIndexTuple = (i, j);
      _generateVertex(directionDataTuple, (faceAxes, corners), segmentIndexTuple, vertices);
      _generateNormal(side, faceNormals, normals);
      _generateIndex((uSegment, vSegment, offset), segmentIndexTuple, indices)
    }
  };
  (vertices, normals, indices)
};

let _buildAllFaceDirectionDataTupleArr = (widthSegment, heightSegment, depthSegment) => [|
  (0, widthSegment, heightSegment),
  (1, widthSegment, heightSegment),
  (2, widthSegment, depthSegment),
  (3, widthSegment, depthSegment),
  (4, depthSegment, heightSegment),
  (5, depthSegment, heightSegment)
|];

let _generateAllFaces = (configDataMap) => {
  let (width, height, depth, widthSegment, heightSegment, depthSegment) =
    _getConfig(configDataMap);
  let faceDataTuple = _buildFaceData(width, height, depth);
  _buildAllFaceDirectionDataTupleArr(widthSegment, heightSegment, depthSegment)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (pointsTuple, directionDataTuple) =>
           pointsTuple |> _generateFace(directionDataTuple, faceDataTuple)
       ),
       (
         WonderCommonlib.ArrayService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty()
       )
     )
};

let _computeData = (index: int, record) =>
  switch (ConfigDataBoxGeometryService.getConfigData(index, record)) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_computeData",
        ~description={j|configData should exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|geometry: $index|j}
      )
    )
  | Some(configDataMap) =>
    let (vertices, normals, indices) = _generateAllFaces(configDataMap);
    {vertices, normals, indices}
  };

let initGeometry = (index: int, state: StateDataMainType.state) => {
  let {isInitMap} as boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord;
  if (_isInit(index, isInitMap)) {
    state
  } else {
    let {vertices, normals, indices}: geometryComputeData = _computeData(index, boxGeometryRecord);
    state
    |> VerticesBoxGeometryMainService.setVertices(index, vertices)
    |> NormalsBoxGeometryMainService.setNormals(index, normals)
    |> IndicesBoxGeometryMainService.setIndices(index, indices)
    |> _markIsInit(index, true)
  }
};

let init = (state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not dispose any geometry before init|j},
                ~actual={j|not|j}
              ),
              () =>
                DisposeBoxGeometryMainService.isNotDisposed(
                  state |> RecordBoxGeometryMainService.getRecord
                )
                |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let {index} = state |> RecordBoxGeometryMainService.getRecord;
  ArrayService.range(0, index - 1)
  |> ReduceStateMainService.reduceState(
       [@bs] ((state, geometryIndex: int) => initGeometry(geometryIndex, state)),
       state
     )
};

let handleInitComponent = (index: int, state: StateDataMainType.state) =>
  initGeometry(index, state);