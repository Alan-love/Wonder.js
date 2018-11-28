

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordRenderMainService$Wonderjs from "../render/RecordRenderMainService.js";

function restore(_, targetState) {
  var match = RecordRenderMainService$Wonderjs.getRecord(targetState);
  var basicRenderObjectRecord = match[/* basicRenderObjectRecord */0];
  var lightRenderObjectRecord = match[/* lightRenderObjectRecord */1];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* renderRecord */31] = /* record */[
    /* basicRenderObjectRecord */basicRenderObjectRecord,
    /* lightRenderObjectRecord */lightRenderObjectRecord,
    /* cameraRecord */undefined
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* RecordRenderMainService-Wonderjs Not a pure module */
