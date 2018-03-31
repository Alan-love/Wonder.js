open MainStateDataType;

open BoxGeometryType;

open PointsGeometryMainService;

open RecordBoxGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

/* let getNormals =
     [@bs]
     ((index, {boxGeometryRecord}) => NormalsService.getNormals(index, boxGeometryRecord.normalsMap));

   let getNormals =
     [@bs]
     (
       (index, {boxGeometryRecord}) =>
         NormalsService.getNormals(index, boxGeometryRecord.normalsMap)
     );

   let setNormalsWithArray = (index: int, record: array(float), state: MainStateDataType.state) => {
     let {normalsMap} as boxGeometryRecord = state.boxGeometryRecord;
     let (typeArrayPoolRecord, normalsMap) =
       setPointsWithArray(
         (index, [@bs] getNormals(index, state), record),
         (
           TypeArrayPoolService.getFloat32TypeArrayFromPool,
           TypeArrayService.fillFloat32Array,
           TypeArrayService.makeFloat32Array
         ),
         (state.typeArrayPoolRecord, normalsMap)
       );
     {...state, typeArrayPoolRecord, boxGeometryRecord: {...boxGeometryRecord, normalsMap}}
   }; */
let getNormals =
  [@bs]
  (
    (mappedIndex, state) => {
      let {normals, normalsInfoArray} = getRecord(state);
      getFloat32PointData(mappedIndex, normals, normalsInfoArray)
    }
  );

let setNormals = (mappedIndex: int, data: array(float), state) => {
  let {normalsInfoArray, normals, normalsOffset} as record = getRecord(state);
  record.normalsOffset =
    setFloat32PointData(
      mappedIndex,
      normalsInfoArray,
      normalsOffset,
      Js.Array.length(data),
      fillFloat32Array(normals, data)
    );
  state |> ensureCheckNotExceedGeometryPointDataBufferCount(normalsOffset)
};

let setNormalsWithTypeArray = (mappedIndex: int, data: Float32Array.t, state) => {
  let {normalsInfoArray, normals, normalsOffset} as record = getRecord(state);
  record.normalsOffset =
    setFloat32PointData(
      mappedIndex,
      normalsInfoArray,
      normalsOffset,
      Float32Array.length(data),
      fillFloat32ArrayWithOffset(normals, data)
    );
  state |> ensureCheckNotExceedGeometryPointDataBufferCount(normalsOffset)
};