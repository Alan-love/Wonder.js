

import * as PrecisionAllService$Wonderjs from "../../../service/state/all/glsl/PrecisionAllService.js";

function execJob(_, state) {
  var glslRecord = state[/* glslRecord */27];
  glslRecord[/* precision */0] = PrecisionAllService$Wonderjs.getPrecisionSource(state[/* gpuDetectRecord */5], state[/* glslChunkRecord */31]);
  return state;
}

export {
  execJob ,
  
}
/* PrecisionAllService-Wonderjs Not a pure module */
