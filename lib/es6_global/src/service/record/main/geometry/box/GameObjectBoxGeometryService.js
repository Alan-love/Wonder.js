

import * as GameObjectMapService$Wonderjs from "../../../../primitive/GameObjectMapService.js";

function getGameObject(geometry, param) {
  return GameObjectMapService$Wonderjs.getGameObject(geometry, param[/* gameObjectMap */5]);
}

function unsafeGetGameObject(geometry, param) {
  return GameObjectMapService$Wonderjs.unsafeGetGameObject(geometry, param[/* gameObjectMap */5]);
}

export {
  getGameObject ,
  unsafeGetGameObject ,
  
}
/* GameObjectMapService-Wonderjs Not a pure module */
