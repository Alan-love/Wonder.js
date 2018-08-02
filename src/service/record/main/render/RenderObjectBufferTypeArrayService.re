open Js.Typed_array;

let getComponentSize = () => 1;

let getGeometryTypeSize = () => 1;

let getTransformIndicesLength = count => count * getComponentSize();

let getTransformIndicesOffset = count => 0;

let getMaterialIndicesLength = count => count * getComponentSize();

let getMaterialIndicesOffset = count =>
  getTransformIndicesOffset(count)
  + getTransformIndicesLength(count)
  * Uint32Array._BYTES_PER_ELEMENT;

let getMeshRendererIndicesLength = count => count * getComponentSize();

let getMeshRendererIndicesOffset = count =>
  getMaterialIndicesOffset(count)
  + getMaterialIndicesLength(count)
  * Uint32Array._BYTES_PER_ELEMENT;

let getGeometryIndicesLength = count => count * getComponentSize();

let getGeometryIndicesOffset = count =>
  getMeshRendererIndicesOffset(count)
  + getMeshRendererIndicesLength(count)
  * Uint32Array._BYTES_PER_ELEMENT;

let getSourceInstanceIndicesLength = count => count * getComponentSize();

let getSourceInstanceIndicesOffset = count =>
  getGeometryIndicesOffset(count)
  + getGeometryIndicesLength(count)
  * Uint32Array._BYTES_PER_ELEMENT;

let getGeometryTypesLength = count => count * getGeometryTypeSize();

let getGeometryTypesOffset = count =>
  getSourceInstanceIndicesOffset(count)
  + getSourceInstanceIndicesLength(count)
  * Uint32Array._BYTES_PER_ELEMENT;

let getComponentIndex = index => index;

let getGeometryTypeIndex = index => index;

let getComponent = (index, typeArr) =>
  TypeArrayService.getUint32_1(getComponentIndex(index), typeArr);

let setComponent = (index, component, typeArr) =>
  TypeArrayService.setUint32_1(getComponentIndex(index), component, typeArr);

let getGeometryType = (index, typeArr) =>
  TypeArrayService.getUint8_1(getGeometryTypeIndex(index), typeArr);

let setGeometryType = (index, type_, typeArr) =>
  TypeArrayService.setUint8_1(getGeometryTypeIndex(index), type_, typeArr);

let hasSourceInstance = sourceInstance =>
  sourceInstance !== DefaultTypeArrayValueService.getDefaultSourceInstance();