

import * as CreateRenderStateMainService$Wonderjs from "../../../service/state/main/render/CreateRenderStateMainService.js";
import * as SendUniformShaderDataJobUtils$Wonderjs from "../../utils/SendUniformShaderDataJobUtils.js";

function execJob(_, state) {
  SendUniformShaderDataJobUtils$Wonderjs.execJob(CreateRenderStateMainService$Wonderjs.createRenderState(state));
  return state;
}

export {
  execJob ,
  
}
/* CreateRenderStateMainService-Wonderjs Not a pure module */
