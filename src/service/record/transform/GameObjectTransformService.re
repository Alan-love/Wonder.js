open TransformType;

open ComponentSystem;

let getGameObject = (transform, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(transform, gameObjectMap);

let unsafeGetGameObject = (transform, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(transform, gameObjectMap);