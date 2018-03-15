open AmbientLightType;

let getBufferMaxCount = () => 3;

let getColorDataSize = () => 3;

let _getColorIndex = (index) => index * getColorDataSize();

let getColor = (index, typeArr) => TypeArrayService.getFloat3(_getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayService.setFloat3(_getColorIndex(index), color, typeArr);

let getDefaultColor = () => [|1., 1., 1.|];

let _setDefaultTypeArrData = (count: int, (buffer, colors)) => {
  let defaultColor = getDefaultColor();
  let rec _set = ((index, count, record), setFunc, typeArr) =>
    switch index {
    | index when index >= count => typeArr
    | index =>
      [@bs] setFunc(index, record, typeArr)
      |> _set((index + 1, count, record |> Obj.magic), setFunc)
    };
  (
    buffer,
    WonderCommonlib.ArrayService.range(0, count - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs] ((colors, index) => setColor(index, defaultColor, colors)),
         colors
       )
  )
};

let _initBufferData = () => {
  open Js.Typed_array;
  let count = getBufferMaxCount();
  let buffer = ArrayBuffer.make(count * Float32Array._BYTES_PER_ELEMENT * getColorDataSize());
  let offset = ref(0);
  let typeArrayLength = count * getColorDataSize();
  let colors = Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=typeArrayLength);
  offset := typeArrayLength * Float32Array._BYTES_PER_ELEMENT;
  (buffer, colors) |> _setDefaultTypeArrData(count)
};

let create = () => {
  let (buffer, colors) = _initBufferData();
  {
    index: 0,
    buffer,
    colors,
    mappedIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
    gameObjectMap: WonderCommonlib.SparseMapService.createEmpty()
  }
};

let deepCopyForRestore = ({index, buffer, colors, gameObjectMap}) => {
  let copiedBuffer = CopyTypeArrayService.copyArrayBuffer(buffer);
  {
    index,
    buffer: copiedBuffer,
    colors: CopyTypeArrayService.copyFloat32TypeArrayFromBuffer(copiedBuffer),
    mappedIndexMap: gameObjectMap |> SparseMapService.copy,
    gameObjectMap: gameObjectMap |> SparseMapService.copy
  }
};