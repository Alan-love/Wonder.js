

import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateGlTextureMapService$Wonderjs from "./OperateGlTextureMapService.js";

function initTexture(gl, texture, glTextureMap) {
  var match = OperateGlTextureMapService$Wonderjs.getTexture(texture, glTextureMap);
  if (match !== undefined) {
    return glTextureMap;
  } else {
    return OperateGlTextureMapService$Wonderjs.setTexture(texture, gl.createTexture(), glTextureMap);
  }
}

function initTexturesWithIndexArray(gl, indexInTypeArrayRange, glTextureMap) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (glTextureMap, textureInTypeArray) {
                return initTexture(gl, textureInTypeArray, glTextureMap);
              }), glTextureMap, indexInTypeArrayRange);
}

var initTextures = initTexturesWithIndexArray;

export {
  initTexture ,
  initTexturesWithIndexArray ,
  initTextures ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
