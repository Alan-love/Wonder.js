open Js.Typed_array;

open BufferSourceSizeTextureService;

let getDefaultWrapS = () => TextureWrapService.getClampToEdge();

let getDefaultWrapT = () => TextureWrapService.getClampToEdge();

let getDefaultMagFilter = () => TextureFilterService.getLinear();

let getDefaultMinFilter = () => TextureFilterService.getNearest();

let getDefaultFormat = () => TextureFormatService.getRgba();

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getNeedUpdate = () => 1;

let getNotNeedUpdate = () => 0;

let getDefaultIsNeedUpdate = () => getNeedUpdate();

/* let getWrapSsSize = () => 1;

   let getWrapTsSize = () => 1;

   let getMagFiltersSize = () => 1;

   let getMinFiltersSize = () => 1;

   let getFormatsSize = () => 1;

   let getTypesSize = () => 1;

   let getIsNeedUpdatesSize = () => 1; */
let getWrapSsLength = (basicSourceTextureCount) => basicSourceTextureCount * getWrapSsSize();

let getWrapSsOffset = (basicSourceTextureCount) =>
  BufferSourceTextureService.getBasicSourceTextureOffset() + 0;

let getWrapSIndex = (index) => index * getWrapSsSize();

let getWrapTsLength = (basicSourceTextureCount) => basicSourceTextureCount * getWrapTsSize();

let getWrapTsOffset = (basicSourceTextureCount) =>
  getWrapSsOffset(basicSourceTextureCount)
  + getWrapSsLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getWrapTIndex = (index) => index * getWrapTsSize();

let getMagFiltersLength = (basicSourceTextureCount) =>
  basicSourceTextureCount * getMagFiltersSize();

let getMagFiltersOffset = (basicSourceTextureCount) =>
  getWrapTsOffset(basicSourceTextureCount)
  + getWrapTsLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMagFilterIndex = (index) => index * getMagFiltersSize();

let getMinFiltersLength = (basicSourceTextureCount) =>
  basicSourceTextureCount * getMinFiltersSize();

let getMinFiltersOffset = (basicSourceTextureCount) =>
  getMagFiltersOffset(basicSourceTextureCount)
  + getMagFiltersLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMinFilterIndex = (index) => index * getMinFiltersSize();

let getFormatsLength = (basicSourceTextureCount) => basicSourceTextureCount * getFormatsSize();

let getFormatsOffset = (basicSourceTextureCount) =>
  getMinFiltersOffset(basicSourceTextureCount)
  + getMinFiltersLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getFormatIndex = (index) => index * getFormatsSize();

let getTypesLength = (basicSourceTextureCount) => basicSourceTextureCount * getTypesSize();

let getTypesOffset = (basicSourceTextureCount) =>
  getFormatsOffset(basicSourceTextureCount)
  + getFormatsLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getTypeIndex = (index) => index * getTypesSize();

let getIsNeedUpdatesLength = (basicSourceTextureCount) =>
  basicSourceTextureCount * getIsNeedUpdatesSize();

let getIsNeedUpdatesOffset = (basicSourceTextureCount) =>
  getTypesOffset(basicSourceTextureCount)
  + getTypesLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getIsNeedUpdateIndex = (index) => index * getIsNeedUpdatesSize();

let getTotalByteLength = (basicSourceTextureCount) =>
  basicSourceTextureCount
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
    )
  );