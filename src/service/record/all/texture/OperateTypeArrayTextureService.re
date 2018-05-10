open BufferTextureService;

let getWidth = (index, typeArr) => TypeArrayService.getUint16_1(getWidthIndex(index), typeArr);

let setWidth = (index, data, typeArr) =>
  TypeArrayService.setUint16_1(getWidthIndex(index), data, typeArr);

let getHeight = (index, typeArr) => TypeArrayService.getUint16_1(getHeightIndex(index), typeArr);

let setHeight = (index, data, typeArr) =>
  TypeArrayService.setUint16_1(getHeightIndex(index), data, typeArr);

let getIsNeedUpdate = (index, typeArr) =>
  TypeArrayService.getUint8_1(getIsNeedUpdateIndex(index), typeArr);

let setIsNeedUpdate = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getIsNeedUpdateIndex(index), data, typeArr);

/* TODO get from typeArrays */
let getWrapS = (gl) => gl |> Gl.getClampToEdge;

let getWrapT = (gl) => gl |> Gl.getClampToEdge;

let getMagFilter = (gl) => gl |> Gl.getLinear;

let getMinFilter = (gl) => gl |> Gl.getNearest;

let getFormat = (gl) => gl |> Gl.getRgba;

let getType = (gl) => gl |> Gl.getUnsignedByte;

let getFlipY = () => Js.true_;