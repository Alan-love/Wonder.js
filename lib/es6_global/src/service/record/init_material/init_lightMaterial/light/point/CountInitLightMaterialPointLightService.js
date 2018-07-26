

import * as CountLightService$Wonderjs from "../../../../all/light/CountLightService.js";
import * as BufferPointLightService$Wonderjs from "../../../../main/light/point/BufferPointLightService.js";

function getLightCount(param) {
  return CountLightService$Wonderjs.getLightCount(param[/* index */0], BufferPointLightService$Wonderjs.getBufferMaxCount(/* () */0));
}

export {
  getLightCount ,
  
}
/* CountLightService-Wonderjs Not a pure module */
