// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as PrecisionMainService$Wonderjs from "../../../service/state/main/glsl/PrecisionMainService.js";

function execJob(_, state) {
  var glslRecord = state[/* glslRecord */23];
  glslRecord[/* precision */0] = /* Some */[PrecisionMainService$Wonderjs.getPrecisionSource(state)];
  return state;
}

export {
  execJob ,
  
}
/* PrecisionMainService-Wonderjs Not a pure module */