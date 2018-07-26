

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordSceneMainService$Wonderjs from "./RecordSceneMainService.js";

function getAmbientLightColor(state) {
  return RecordSceneMainService$Wonderjs.getRecord(state)[/* ambientLight */1][/* color */0];
}

function setAmbientLightColor(color, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = RecordSceneMainService$Wonderjs.getRecord(state);
  newrecord[/* sceneRecord */12] = /* record */[
    /* currentCameraGameObject */init[/* currentCameraGameObject */0],
    /* ambientLight : record */[/* color */color],
    /* sceneGameObject */init[/* sceneGameObject */2]
  ];
  return newrecord;
}

export {
  getAmbientLightColor ,
  setAmbientLightColor ,
  
}
/* RecordSceneMainService-Wonderjs Not a pure module */
