

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function unsafeGetInstanceBuffer(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* instanceBuffer */1]);
}

function getSourceInstanceCount(record) {
  return unsafeGetInstanceBuffer(record)[/* sourceInstanceCount */0];
}

function getObjectInstanceCountPerSourceInstance(record) {
  return unsafeGetInstanceBuffer(record)[/* objectInstanceCountPerSourceInstance */1];
}

function getTextureCountPerMaterial(param) {
  return param[/* textureCountPerMaterial */2];
}

function unsafeGetBasicSourceTextureCount(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* basicSourceTextureCount */3]);
}

function unsafeGetArrayBufferViewSourceTextureCount(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* arrayBufferViewSourceTextureCount */4]);
}

export {
  unsafeGetInstanceBuffer ,
  getSourceInstanceCount ,
  getObjectInstanceCountPerSourceInstance ,
  getTextureCountPerMaterial ,
  unsafeGetBasicSourceTextureCount ,
  unsafeGetArrayBufferViewSourceTextureCount ,
  
}
/* OptionService-Wonderjs Not a pure module */
