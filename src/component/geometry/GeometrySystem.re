open ComponentSystem;

open Js.Typed_array;

open Contract;

open TypeArrayUtils;

open GeometryStateUtils;

open GeometryType;

open StateDataType;

open Gl;

/* let getMaxCount = (state: StateDataType.state) =>
   BufferConfigSystem.getConfig(state).geometryDataBufferCount; */
let create = (state: StateDataType.state) => {
  /* let {index, disposedIndexArray} as data = getGeometryData(state);
     let index = generateIndex(getMaxCount(state), index, disposedIndexArray); */
  let {index, indexMap} as data = getGeometryData(state);
  data.index = succ(index);
  GeometryIndexUtils.setIndexToIndexMap(Js.Int.toString(index), index, indexMap) |> ignore;
  (state, index)
  /* |> ensureCheck(
       ((state, _)) => {
         open Contract.Operators;
         let {index} = getGeometryData(state);
         let maxCount = getMaxCount(state);
         test(
           {j|have create too many components(the count of transforms shouldn't exceed $maxCount)|j},
           () => index <= maxCount
         )
       }
     ) */
};

/* let _ensureCheckNotExceedGeometryPointDataBufferCount = (offset: int, state: StateDataType.state) =>
     state
     |> ensureCheck(
          (state) =>
            Contract.Operators.(
              test(
                "should not exceed geometryPointDataBufferCount",
                () => offset <= BufferConfigSystem.getConfig(state).geometryPointDataBufferCount
              )
            )
        );

   let _buildInfo = (startIndex: int, endIndex: int) => {startIndex, endIndex};

   let _getFloat32PointData = (index: int, points: Float32Array.t, infoArray) =>
     switch infoArray[index] {
     | None => ExceptionHandleSystem.throwMessage({j|infoArray[$index] should exist|j})
     | Some({startIndex, endIndex}) => getFloat32ArrSubarray(points, startIndex, endIndex)
     };

   let _setFloat32PointData =
       (
         index: int,
         data: Js.Array.t(float),
         points: Float32Array.t,
         infoArray: geometryInfoArray,
         offset: int
       ) => {
     let count = Js.Array.length(data);
     let startIndex = offset;
     let newOffset = offset + count;
     Array.unsafe_set(infoArray, index, Some(_buildInfo(startIndex, newOffset)));
     fillFloat32Arr(points, data, startIndex);
     newOffset
   };

   let _getUint16PointData = (index: int, points: Uint16Array.t, infoArray) => {
     requireCheck(
       () =>
         Contract.Operators.(test("info should exist", () => index <= Js.Array.length(infoArray) - 1))
     );
     switch infoArray[index] {
     | None => ExceptionHandleSystem.throwMessage({j|infoArray[$index] should exist|j})
     | Some({startIndex, endIndex}) => getUint16ArrSubarray(points, startIndex, endIndex)
     }
   };

   let _setUint16PointData =
       (index: int, data: Js.Array.t(int), points: Uint16Array.t, infoArray, offset: int) => {
     let count = Js.Array.length(data);
     let startIndex = offset;
     let newOffset = offset + count;
     Array.unsafe_set(infoArray, index, Some(_buildInfo(startIndex, newOffset)));
     fillUint16Arr(points, data, startIndex);
     newOffset
   }; */
/* let getVertices = GeometryOperateDataUtils.getVertices;

   let setVertices = GeometryOperateDataUtils.setVertices;

   let getIndices = GeometryOperateDataUtils.getIndices;

   let setIndices = GeometryOperateDataUtils.setIndices; */
let getVertices = (index: int, state: StateDataType.state) =>
  GeometryOperateDataUtils.getVertices(
    GeometryIndexUtils.getIndexFromIndexMap(
      Js.Int.toString(index),
      GeometryIndexUtils.getIndexMap(state)
    ),
    state
  );

let setVertices = (index: int, data: Js.Array.t(float), state: StateDataType.state) =>
  GeometryOperateDataUtils.setVertices(
    GeometryIndexUtils.getIndexFromIndexMap(
      Js.Int.toString(index),
      GeometryIndexUtils.getIndexMap(state)
    ),
    data,
    state
  );

let getIndices = (index: int, state: StateDataType.state) =>
  GeometryOperateDataUtils.getIndices(
    GeometryIndexUtils.getIndexFromIndexMap(
      Js.Int.toString(index),
      GeometryIndexUtils.getIndexMap(state)
    ),
    state
  );

let setIndices = (index: int, data: Js.Array.t(int), state: StateDataType.state) =>
  GeometryOperateDataUtils.setIndices(
    GeometryIndexUtils.getIndexFromIndexMap(
      Js.Int.toString(index),
      GeometryIndexUtils.getIndexMap(state)
    ),
    data,
    state
  );

let getVerticesCount = (index: int, state: StateDataType.state) =>
  Float32Array.length(
    getVertices(
      GeometryIndexUtils.getIndexFromIndexMap(
        Js.Int.toString(index),
        GeometryIndexUtils.getIndexMap(state)
      ),
      state
    )
  );

let getIndicesCount = (index: int, state: StateDataType.state) =>
  Uint16Array.length(
    getIndices(
      GeometryIndexUtils.getIndexFromIndexMap(
        Js.Int.toString(index),
        GeometryIndexUtils.getIndexMap(state)
      ),
      state
    )
  );

let hasIndices = (index: int, state: StateDataType.state) =>
  getIndicesCount(
    GeometryIndexUtils.getIndexFromIndexMap(
      Js.Int.toString(index),
      GeometryIndexUtils.getIndexMap(state)
    ),
    state
  )
  > 0;

let getVerticesCount = (index: int, state: StateDataType.state) =>
  Float32Array.length(
    getVertices(
      GeometryIndexUtils.getIndexFromIndexMap(
        Js.Int.toString(index),
        GeometryIndexUtils.getIndexMap(state)
      ),
      state
    )
  );

let getDrawMode = (gl) => getTriangles(gl);

/* todo handle UInt32Array */
let getIndexType = (gl) => getUnsignedShort(gl);

let getIndexTypeSize = (gl) => Uint16Array._BYTES_PER_ELEMENT;

let init = (state: StateDataType.state) => {
  let {index} = getGeometryData(state);
  /* todo check shouldn't dispose geometry before init */
  ArraySystem.range(0, index - 1)
  |> Js.Array.forEach(
       (geometryIndex: int) =>
         GeometryInitComponentUtils.initGeometry(geometryIndex, state) |> ignore
     );
  state
};

let getConfigData = (geometry: geometry, state: StateDataType.state) =>
  JsObjUtils.(
    getGeometryData(state).configDataMap
    |> WonderCommonlib.HashMapSystem.get(Js.Int.toString(geometry))
  );

let getGameObject = (geometry: geometry, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(geometry, getGeometryData(state).gameObjectMap);

let getVertexDataSize = () => 3;

let getIndexDataSize = () => 1;

let _createTypeArrays = (buffer, count: int) => {
  let offset = ref(0);
  let vertices =
    Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=count * getVertexDataSize());
  offset := count * Float32Array._BYTES_PER_ELEMENT * getVertexDataSize();
  let indices =
    Uint16Array.fromBufferRange(buffer, ~offset=offset^, ~length=count * getIndexDataSize());
  offset := count * Uint16Array._BYTES_PER_ELEMENT * getIndexDataSize();
  (buffer, vertices, indices)
};

let _getBufferSize = () =>
  Float32Array._BYTES_PER_ELEMENT
  * getVertexDataSize()
  + Uint16Array._BYTES_PER_ELEMENT
  * getIndexDataSize();

let _getBufferCount = (state: StateDataType.state) =>
  BufferConfigSystem.getConfig(state).geometryPointDataBufferCount;

let _getBufferLength = (state: StateDataType.state) => _getBufferCount(state) * _getBufferSize();

let _initBufferData = (state: StateDataType.state) => {
  let buffer = ArrayBuffer.make(_getBufferLength(state));
  let count = _getBufferCount(state);
  _createTypeArrays(buffer, count)
};

let initData = (state: StateDataType.state) => {
  let (buffer, vertices, indices) = _initBufferData(state);
  state.geometryData =
    Some({
      index: 0,
      buffer,
      vertices,
      indices,
      verticesInfoArray: WonderCommonlib.ArraySystem.createEmpty(),
      indicesInfoArray: WonderCommonlib.ArraySystem.createEmpty(),
      verticesOffset: 0,
      indicesOffset: 0,
      configDataMap: WonderCommonlib.HashMapSystem.createEmpty(),
      computeDataFuncMap: WonderCommonlib.HashMapSystem.createEmpty(),
      gameObjectMap: WonderCommonlib.HashMapSystem.createEmpty(),
      disposeCount: 0,
      disposedIndexMap: WonderCommonlib.HashMapSystem.createEmpty(),
      indexMap: WonderCommonlib.HashMapSystem.createEmpty()
    });
  state
};