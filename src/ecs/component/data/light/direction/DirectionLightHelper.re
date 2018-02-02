open DirectionLightType;

open StateDataType;

open Js.Typed_array;

let getBufferMaxCount = () => 4;

let getColorDataSize = () => 3;

let getIntensityDataSize = () => 1;

let _getColorIndex = (index) => index * getColorDataSize();

let _getIntensityIndex = (index) => index * getIntensityDataSize();

let getColor = (index, typeArr) => TypeArrayUtils.getFloat3(_getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayUtils.setFloat3(_getColorIndex(index), color, typeArr);

let getIntensity = (index, typeArr) =>
  TypeArrayUtils.getFloat3(_getIntensityIndex(index), typeArr);

let setIntensity = (index, intensity, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, intensity);
  typeArr
};

let getDefaultColor = () => [|1., 1., 1.|];

let getDefaultIntensity = () => 1.;

let _setDefaultTypeArrData = (count: int, (buffer, colors, intensities)) => {
  let defaultColor = getDefaultColor();
  let defaultIntensity = getDefaultIntensity();
  let rec _set = ((index, count, data), setFunc, typeArr) =>
    switch index {
    | index when index >= count => typeArr
    | index =>
      [@bs] setFunc(index, data, typeArr) |> _set((index + 1, count, data |> Obj.magic), setFunc)
    };
  (
    buffer,
    WonderCommonlib.ArraySystem.range(0, count - 1)
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           ((colors, intensities), index) => (
             setColor(index, defaultColor, colors),
             setIntensity(index, defaultIntensity, intensities)
           )
         ),
         (colors, intensities)
       )
  )
};

let getColorsOffset = () => 0;

let getColorsLength = () => getBufferMaxCount() * getColorDataSize();

let getIntensitiesOffset = () => getColorsLength() * Float32Array._BYTES_PER_ELEMENT;

let getIntensitiesLength = () => getBufferMaxCount() * getIntensityDataSize();

let _initBufferData = () => {
  let count = getBufferMaxCount();
  let buffer =
    ArrayBuffer.make(
      count * Float32Array._BYTES_PER_ELEMENT * (getColorDataSize() + getIntensityDataSize())
    );
  let colors =
    Float32Array.fromBufferRange(buffer, ~offset=getColorsOffset(), ~length=getColorsLength());
  let intensities =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getIntensitiesOffset(),
      ~length=getIntensitiesLength()
    );
  (buffer, colors, intensities) |> _setDefaultTypeArrData(count)
};

let initData = () => {
  let (buffer, (colors, intensities)) = _initBufferData();
  {
    index: 0,
    buffer,
    colors,
    intensities,
    mappedIndexMap: WonderCommonlib.SparseMapSystem.createEmpty(),
    gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty()
  }
};