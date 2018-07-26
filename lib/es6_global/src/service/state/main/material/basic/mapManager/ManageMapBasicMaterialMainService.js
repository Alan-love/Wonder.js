

import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../../../atom/OptionService.js";
import * as BufferSettingService$Wonderjs from "../../../../../record/main/setting/BufferSettingService.js";
import * as ManagerMapMaterialMainService$Wonderjs from "../../mapManager/ManagerMapMaterialMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../RecordBasicMaterialMainService.js";
import * as OperateTypeArrayBasicMaterialService$Wonderjs from "../../../../../record/all/material/basic/OperateTypeArrayBasicMaterialService.js";

function getMap(material, state) {
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  return ManagerMapMaterialMainService$Wonderjs.getMap(material, BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]), /* tuple */[
              OperateTypeArrayBasicMaterialService$Wonderjs.getMapUnit,
              OperateTypeArrayBasicMaterialService$Wonderjs.getTextureIndex
            ], /* tuple */[
              match[/* textureIndices */4],
              match[/* mapUnits */5]
            ]);
}

function unsafeGetMap(material, state) {
  return OptionService$Wonderjs.unsafeGet(getMap(material, state));
}

function setMap(material, texture, state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var match = ManagerMapMaterialMainService$Wonderjs.setMap(material, texture, /* tuple */[
        OperateTypeArrayBasicMaterialService$Wonderjs.getMapUnit,
        OperateTypeArrayBasicMaterialService$Wonderjs.setMapUnit,
        OperateTypeArrayBasicMaterialService$Wonderjs.setTextureIndex
      ], /* tuple */[
        BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]),
        basicMaterialRecord[/* textureIndices */4],
        basicMaterialRecord[/* mapUnits */5],
        basicMaterialRecord[/* textureCountMap */6]
      ]);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */basicMaterialRecord[/* index */0],
    /* buffer */basicMaterialRecord[/* buffer */1],
    /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
    /* colors */basicMaterialRecord[/* colors */3],
    /* textureIndices */match[0],
    /* mapUnits */match[1],
    /* textureCountMap */match[2],
    /* defaultColor */basicMaterialRecord[/* defaultColor */7],
    /* gameObjectMap */basicMaterialRecord[/* gameObjectMap */8],
    /* groupCountMap */basicMaterialRecord[/* groupCountMap */9],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */10],
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */11]
  ];
  return newrecord;
}

function hasMap(material, state) {
  return Js_option.isSome(getMap(material, state));
}

export {
  getMap ,
  unsafeGetMap ,
  setMap ,
  hasMap ,
  
}
/* OptionService-Wonderjs Not a pure module */
