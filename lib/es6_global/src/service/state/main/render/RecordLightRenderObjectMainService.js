

import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../external/Worker.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as CreateTypeArrayRenderObjectService$Wonderjs from "../../../record/all/render/CreateTypeArrayRenderObjectService.js";
import * as RenderObjectBufferTypeArrayService$Wonderjs from "../../../record/main/render/RenderObjectBufferTypeArrayService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* lightRenderObjectRecord */1]);
}

function _initBufferData(count) {
  var buffer = Worker$Wonderjs.newSharedArrayBuffer(Caml_int32.imul(count, Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, Caml_int32.imul(RenderObjectBufferTypeArrayService$Wonderjs.getComponentSize(/* () */0), 5)) + Caml_int32.imul(Uint8Array.BYTES_PER_ELEMENT, RenderObjectBufferTypeArrayService$Wonderjs.getGeometryTypeSize(/* () */0)) | 0));
  return /* tuple */[
          buffer,
          CreateTypeArrayRenderObjectService$Wonderjs.setAllTypeArrDataToDefault(count, CreateTypeArrayRenderObjectService$Wonderjs.createTypeArrays(buffer, count))
        ];
}

function create(state) {
  var lightMaterialCount = BufferSettingService$Wonderjs.getLightMaterialCount(state[/* settingRecord */0]);
  var match = _initBufferData(lightMaterialCount);
  var match$1 = match[1];
  return /* record */[
          /* buffer */match[0],
          /* count */lightMaterialCount,
          /* transformIndices */match$1[0],
          /* materialIndices */match$1[1],
          /* geometryIndices */match$1[2],
          /* geometryTypes */match$1[4],
          /* sourceInstanceIndices */match$1[3]
        ];
}

export {
  getRecord ,
  _initBufferData ,
  create ,
  
}
/* Worker-Wonderjs Not a pure module */
