open Js.Typed_array;

let getInt32_1 = (index: int, typeArray: Uint32Array.t) =>
  Uint32Array.unsafe_get(typeArray, index);

let getFloat1 = (index: int, typeArray: Float32Array.t) =>
  Float32Array.unsafe_get(typeArray, index);

let getFloat3 = (index: int, typeArray: Float32Array.t) => [|
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2)
|];

let getFloat3TypeArray = (index: int, typeArray: Float32Array.t) =>
  Float32Array.subarray(~start=index, ~end_=index + 3, typeArray);

let getFloat3Tuple = (index: int, typeArray: Float32Array.t) => (
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2)
);

let setInt32_1 = (index: int, value: int, typeArray: Uint32Array.t) => {
  Uint32Array.unsafe_set(typeArray, index, value);
  typeArray
};

let setFloat1 = (index: int, value, typeArray: Float32Array.t) => {
  Float32Array.unsafe_set(typeArray, index, value);
  typeArray
};

let setFloat3 = (index: int, record: Js.Array.t(float), typeArray: Float32Array.t) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let len = record |> Js.Array.length;
      test(
        Log.buildAssertMessage(~expect={j|record.length === 3|j}, ~actual={j|is $len|j}),
        () => len == 3
      )
    },
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  /* Float32Array.setArrayOffset(record, index, typeArray); */
  for (i in index to index + 2) {
    Float32Array.unsafe_set(typeArray, i, Array.unsafe_get(record, i - index))
  };
  typeArray
};

let setFloat3ByTuple = (index: int, (x, y, z), typeArray: Float32Array.t) => {
  Float32Array.unsafe_set(typeArray, index, x);
  Float32Array.unsafe_set(typeArray, index + 1, y);
  Float32Array.unsafe_set(typeArray, index + 2, z);
  typeArray
};

let getFloat16 = (index: int, typeArray: Float32Array.t) => [|
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2),
  Float32Array.unsafe_get(typeArray, index + 3),
  Float32Array.unsafe_get(typeArray, index + 4),
  Float32Array.unsafe_get(typeArray, index + 5),
  Float32Array.unsafe_get(typeArray, index + 6),
  Float32Array.unsafe_get(typeArray, index + 7),
  Float32Array.unsafe_get(typeArray, index + 8),
  Float32Array.unsafe_get(typeArray, index + 9),
  Float32Array.unsafe_get(typeArray, index + 10),
  Float32Array.unsafe_get(typeArray, index + 11),
  Float32Array.unsafe_get(typeArray, index + 12),
  Float32Array.unsafe_get(typeArray, index + 13),
  Float32Array.unsafe_get(typeArray, index + 14),
  Float32Array.unsafe_get(typeArray, index + 15)
|];

let getFloat16TypeArray = (index: int, typeArray: Float32Array.t) =>
  Float32Array.subarray(~start=index, ~end_=index + 16, typeArray);

let setFloat16 = (index: int, record: Js.Array.t(float), typeArray: Float32Array.t) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let len = record |> Js.Array.length;
      test(
        Log.buildAssertMessage(~expect={j|record.length === 16|j}, ~actual={j|is $len|j}),
        () => len == 16
      )
    },
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  /* Float32Array.setArrayOffset(record, index, typeArray); */
  for (i in index to index + 15) {
    Float32Array.unsafe_set(typeArray, i, Array.unsafe_get(record, i - index))
  };
  typeArray
};

/* let getUint16ArraySingleVale = (index: int, typeArray: Uint16Array.t) =>
     Uint16Array.unsafe_get(typeArray, index);

   let setUint16ArraySingleVale = (index: int, record: int, typeArray: Uint16Array.t) =>
     Uint16Array.unsafe_set(typeArray, index, record); */
let fillFloat32Array = (typeArray: Float32Array.t, dataArr: Js.Array.t(float), startIndex: int) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let actualLen = Js.Array.length(dataArr) + startIndex;
      let range = Float32Array.length(typeArray);
      test(
        Log.buildAssertMessage(
          ~expect={j|not exceed Float32Array range:$range|j},
          ~actual={j|is $actualLen|j}
        ),
        () => actualLen <= range
      )
    },
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  let dataArrIndex = ref(0);
  for (i in startIndex to startIndex + Js.Array.length(dataArr) |> pred) {
    /* Js.Typed_array.Float32Array.unsafe_set(typeArray, i, dataArr[dataArrIndex^]); */
    Js.Typed_array.Float32Array.unsafe_set(typeArray, i, Array.unsafe_get(dataArr, dataArrIndex^));
    dataArrIndex := succ(dataArrIndex^)
  };
  typeArray
};

let fillFloat32ArrayWithOffset = (targetTypeArr, sourceTypeArr: Float32Array.t, offset) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(~expect={j|offset should >= 0|j}, ~actual={j|is $offset|j}),
        () => offset >= 0
      );
      let sourceTypeArrLen = Float32Array.length(sourceTypeArr);
      let targetTypeArrLen = Float32Array.length(targetTypeArr);
      test(
        Log.buildAssertMessage(
          ~expect={j|sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen|j},
          ~actual={j||j}
        ),
        () => sourceTypeArrLen + offset <= targetTypeArrLen
      )
    },
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  targetTypeArr |> Float32Array.setArrayOffset(Obj.magic(sourceTypeArr), offset)
};

let getFloat32ArrSubarray = (typeArray: Float32Array.t, startIndex: int, endIndex: int) =>
  Float32Array.subarray(~start=startIndex, ~end_=endIndex, typeArray);

let fillUint16Array = (typeArray: Uint16Array.t, dataArr: Js.Array.t(int), startIndex: int) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let actualLen = Js.Array.length(dataArr) + startIndex;
      let range = Uint16Array.length(typeArray);
      test(
        Log.buildAssertMessage(
          ~expect={j|not exceed Uint16Array range:$range|j},
          ~actual={j|is $actualLen|j}
        ),
        () => actualLen <= range
      )
    },
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  let dataArrIndex = ref(0);
  for (i in startIndex to startIndex + Js.Array.length(dataArr) |> pred) {
    Js.Typed_array.Uint16Array.unsafe_set(typeArray, i, Array.unsafe_get(dataArr, dataArrIndex^));
    dataArrIndex := succ(dataArrIndex^)
  };
  typeArray
};

let fillUint16ArrWithOffset = (targetTypeArr, sourceTypeArr, offset) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(~expect={j|offset should >= 0|j}, ~actual={j|is $offset|j}),
        () => offset >= 0
      );
      let sourceTypeArrLen = Uint16Array.length(sourceTypeArr);
      let targetTypeArrLen = Uint16Array.length(targetTypeArr);
      test(
        Log.buildAssertMessage(
          ~expect={j|sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen|j},
          ~actual={j||j}
        ),
        () => sourceTypeArrLen + offset <= targetTypeArrLen
      )
    },
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  targetTypeArr |> Uint16Array.setArrayOffset(Obj.magic(sourceTypeArr), offset)
};

let getUint16ArrSubarray = (typeArray: Uint16Array.t, startIndex: int, endIndex: int) =>
  Uint16Array.subarray(~start=startIndex, ~end_=endIndex, typeArray);

let _setFloat32ArrayWithFloat32Array =
  [@bs]
  (
    (targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
      Js.Typed_array.Float32Array.unsafe_set(
        targetTypeArr,
        typeArrIndex,
        Js.Typed_array.Float32Array.unsafe_get(sourceTypeArr, i)
      )
  );

let _setUint16ArrayWithUint16Array =
  [@bs]
  (
    (targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
      Js.Typed_array.Uint16Array.unsafe_set(
        targetTypeArr,
        typeArrIndex,
        Js.Typed_array.Uint16Array.unsafe_get(sourceTypeArr, i)
      )
  );

let _fillTypeArrayWithTypeArray =
    (
      (targetTypeArr, targetStartIndex),
      (sourceTypeArr, sourceStartIndex),
      endIndex,
      _setTypeArrayWithTypeArray
    ) => {
  let typeArrIndex = ref(targetStartIndex);
  for (i in sourceStartIndex to endIndex - 1) {
    [@bs] _setTypeArrayWithTypeArray(targetTypeArr, sourceTypeArr, typeArrIndex^, i);
    typeArrIndex := succ(typeArrIndex^)
  };
  typeArrIndex^
};

let fillUint16ArrayWithUint16Array = (targetData, sourceData, endIndex) =>
  _fillTypeArrayWithTypeArray(targetData, sourceData, endIndex, _setUint16ArrayWithUint16Array);

let fillFloat32ArrayWithFloat32Array = (targetData, sourceData, endIndex) =>
  _fillTypeArrayWithTypeArray(targetData, sourceData, endIndex, _setFloat32ArrayWithFloat32Array);

let makeFloat32Array = [@bs] ((record) => Float32Array.make(record));

let makeUint16Array = [@bs] ((record) => Uint16Array.make(record));