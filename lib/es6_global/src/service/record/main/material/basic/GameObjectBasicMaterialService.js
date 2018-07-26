

import * as GameObjectMapService$Wonderjs from "../../../../primitive/GameObjectMapService.js";

function getGameObject(material, param) {
  return GameObjectMapService$Wonderjs.getGameObject(material, param[/* gameObjectMap */8]);
}

function unsafeGetGameObject(material, param) {
  return GameObjectMapService$Wonderjs.unsafeGetGameObject(material, param[/* gameObjectMap */8]);
}

export {
  getGameObject ,
  unsafeGetGameObject ,
  
}
/* GameObjectMapService-Wonderjs Not a pure module */
