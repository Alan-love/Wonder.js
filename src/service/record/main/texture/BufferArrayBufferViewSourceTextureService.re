open Js.Typed_array;

open BufferSourceSizeTextureService;

let getDefaultWrapS = () => SourceTextureType.CLAMP_TO_EDGE;

let getDefaultWrapT = () => SourceTextureType.CLAMP_TO_EDGE;

let getDefaultMagFilter = () => SourceTextureType.LINEAR;

let getDefaultMinFilter = () => SourceTextureType.NEAREST;

let getDefaultFormat = () => TextureFormatService.getRgba();

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = BufferSourceTextureService.getDefaultIsNeedUpdate;

let getDefaultFlipY = BufferSourceTextureService.getDefaultFlipY;

let getDefaultWidth = () => 0;

let getDefaultHeight = () => 0;

let getWrapSsLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getWrapSsSize();

let getWrapSsOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  BufferSourceTextureService.getArrayBufferViewSourceTextureOffset(
    basicSourceTextureCount,
  )
  + 0;

let getWrapSIndex = index => index * getWrapSsSize();

let getWrapTsLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getWrapTsSize();

let getWrapTsOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getWrapSsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getWrapSsLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getWrapTIndex = index => index * getWrapTsSize();

let getMagFiltersLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getMagFiltersSize();

let getMagFiltersOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getWrapTsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getWrapTsLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMagFilterIndex = index => index * getMagFiltersSize();

let getMinFiltersLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getMinFiltersSize();

let getMinFiltersOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getMagFiltersOffset(
    basicSourceTextureCount,
    arrayBufferViewSourceTextureCount,
  )
  + getMagFiltersLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMinFilterIndex = index => index * getMinFiltersSize();

let getFormatsLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getFormatsSize();

let getFormatsOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getMinFiltersOffset(
    basicSourceTextureCount,
    arrayBufferViewSourceTextureCount,
  )
  + getMinFiltersLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getFormatIndex = index => index * getFormatsSize();

let getTypesLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getTypesSize();

let getTypesOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getFormatsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getFormatsLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getTypeIndex = index => index * getTypesSize();

let getIsNeedUpdatesLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getIsNeedUpdatesSize();

let getIsNeedUpdatesOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getTypesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getTypesLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getIsNeedUpdateIndex = BufferSourceTextureService.getIsNeedUpdateIndex;

let getFlipYsLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getFlipYsSize();

let getFlipYsOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getIsNeedUpdatesOffset(
    basicSourceTextureCount,
    arrayBufferViewSourceTextureCount,
  )
  + getIsNeedUpdatesLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getFlipYIndex = index => index * getFlipYsSize();

let getWidthsLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getWidthsSize();

let getWidthsOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getFlipYsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getFlipYsLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getWidthIndex = index => index * getWidthsSize();

let getHeightsLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount * getHeightsSize();

let getHeightsOffset =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getWidthsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getWidthsLength(arrayBufferViewSourceTextureCount)
  * Uint16Array._BYTES_PER_ELEMENT;

let getHeightIndex = index => index * getHeightsSize();

let getTotalByteLength = arrayBufferViewSourceTextureCount =>
  arrayBufferViewSourceTextureCount
  * (
    Uint8Array._BYTES_PER_ELEMENT
    * (
      getWrapSsSize()
      + getWrapTsSize()
      + getMagFiltersSize()
      + getMinFiltersSize()
      + getFormatsSize()
      + getTypesSize()
      + getIsNeedUpdatesSize()
      + getFlipYsSize()
    )
    + Uint16Array._BYTES_PER_ELEMENT
    * (getWidthsSize() + getHeightsSize())
  );