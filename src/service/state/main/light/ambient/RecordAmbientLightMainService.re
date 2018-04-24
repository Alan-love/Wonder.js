open StateDataMainType;

open AmbientLightType;

open BufferAmbientLightService;

let getColor = (index, typeArr) => TypeArrayService.getFloat3(getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayService.setFloat3(getColorIndex(index), color, typeArr);

let getDefaultColor = () => [|1., 1., 1.|];

let _setDefaultTypeArrData = (count: int, (buffer, colors)) => {
  let defaultColor = getDefaultColor();
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
  let buffer = createBuffer(count);
  let offset = ref(0);
  let typeArrayLength = count * getColorsSize();
  let colors = CreateTypeArrayAmbientLightService.createTypeArrays(buffer, count);
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

let deepCopyForRestore = ({ambientLightRecord} as state) => {
  let {index, buffer, colors, gameObjectMap, mappedIndexMap} = ambientLightRecord;
  {
    ...state,
    ambientLightRecord: {
      ...ambientLightRecord,
      index,
      buffer:
        CopyArrayBufferService.copyArrayBuffer(
          buffer,
          BufferAmbientLightService.getTotalByteLength(index)
        ),
      mappedIndexMap: mappedIndexMap |> SparseMapService.copy,
      gameObjectMap: gameObjectMap |> SparseMapService.copy
    }
  }
};