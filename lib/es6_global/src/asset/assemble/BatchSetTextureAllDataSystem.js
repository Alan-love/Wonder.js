

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../service/record/main/setting/BufferSettingService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as TextureCountMapMaterialService$Wonderjs from "../../service/record/main/material/TextureCountMapMaterialService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";
import * as OperateTypeArrayLightMaterialService$Wonderjs from "../../service/record/all/material/light/OperateTypeArrayLightMaterialService.js";

function _batchSetNewMap(param, param$1, param$2) {
  var textureCountPerMaterial = param$2[0];
  var setTextureIndexFunc = param$1[1];
  var setMapUnitFunc = param$1[0];
  var mapCount = param[2];
  var textureArr = param[1];
  var newTextureCount = mapCount + 1 | 0;
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, material, index) {
                var texture = textureArr[index];
                return /* tuple */[
                        setTextureIndexFunc(/* tuple */[
                              material,
                              mapCount,
                              textureCountPerMaterial
                            ], texture, param[0]),
                        setMapUnitFunc(material, mapCount, param[1]),
                        TextureCountMapMaterialService$Wonderjs.setCount(material, newTextureCount, param[2])
                      ];
              }), /* tuple */[
              param$2[1],
              param$2[2],
              param$2[3]
            ], param[0]);
}

function _batchSetNewDiffueMaps(diffuseMapLightMaterials, lightMaterialDiffuseMaps, state) {
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var match = _batchSetNewMap(/* tuple */[
        diffuseMapLightMaterials,
        lightMaterialDiffuseMaps,
        0
      ], /* tuple */[
        OperateTypeArrayLightMaterialService$Wonderjs.setDiffuseMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setTextureIndex
      ], /* tuple */[
        BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]),
        lightMaterialRecord[/* textureIndices */6],
        lightMaterialRecord[/* diffuseMapUnits */7],
        lightMaterialRecord[/* textureCountMap */9]
      ]);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* textureIndices */match[0],
    /* diffuseMapUnits */match[1],
    /* specularMapUnits */lightMaterialRecord[/* specularMapUnits */8],
    /* textureCountMap */match[2],
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
    /* gameObjectMap */lightMaterialRecord[/* gameObjectMap */13],
    /* groupCountMap */lightMaterialRecord[/* groupCountMap */14],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */15],
    /* nameMap */lightMaterialRecord[/* nameMap */16],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */17]
  ];
  return newrecord;
}

function _batchSetBasicSourceTextureData(samplerBasicSourceTextures, arrayBufferViewSourceTextureSamplers, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, arrayBufferViewSourceTexture, index) {
                var match = arrayBufferViewSourceTextureSamplers[index];
                return OperateBasicSourceTextureMainService$Wonderjs.setMinFilter(arrayBufferViewSourceTexture, match[/* minFilter */1], OperateBasicSourceTextureMainService$Wonderjs.setMagFilter(arrayBufferViewSourceTexture, match[/* magFilter */0], OperateBasicSourceTextureMainService$Wonderjs.setWrapT(arrayBufferViewSourceTexture, match[/* wrapT */3], OperateBasicSourceTextureMainService$Wonderjs.setWrapS(arrayBufferViewSourceTexture, match[/* wrapS */2], state))));
              }), state, samplerBasicSourceTextures);
}

function _batchSetBasicSourceTextureSources(imageBasicSourceTextures, basicSourceTextureImages, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, basicSourceTexture, index) {
                var image = basicSourceTextureImages[index];
                return OperateBasicSourceTextureMainService$Wonderjs.setSource(basicSourceTexture, image, state);
              }), state, imageBasicSourceTextures);
}

function batchSet(param, state) {
  var match = param[2];
  var match$1 = param[1];
  var match$2 = param[0];
  return _batchSetBasicSourceTextureSources(match[0], match[1], _batchSetBasicSourceTextureData(match$1[0], match$1[1], _batchSetNewDiffueMaps(match$2[0], match$2[1], state)));
}

function batchSetFormat(basicSourceTextureArr, basicSourceTextures, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, basicSourceTexture, index) {
                return OperateBasicSourceTextureMainService$Wonderjs.setFormat(basicSourceTexture, basicSourceTextures[index][/* format */1], state);
              }), state, basicSourceTextureArr);
}

export {
  _batchSetNewMap ,
  _batchSetNewDiffueMaps ,
  _batchSetBasicSourceTextureData ,
  _batchSetBasicSourceTextureSources ,
  batchSet ,
  batchSetFormat ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
