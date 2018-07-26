

import * as GameObjectMapService$Wonderjs from "../../../primitive/GameObjectMapService.js";

function getGameObject(meshRenderer, param) {
  return GameObjectMapService$Wonderjs.getGameObject(meshRenderer, param[/* gameObjectMap */3]);
}

function unsafeGetGameObject(meshRenderer, param) {
  return GameObjectMapService$Wonderjs.unsafeGetGameObject(meshRenderer, param[/* gameObjectMap */3]);
}

export {
  getGameObject ,
  unsafeGetGameObject ,
  
}
/* GameObjectMapService-Wonderjs Not a pure module */
