open MainStateDataType;

let create = ({gameObjectRecord} as state) => {
  /* TODO add gameObjectRecord to state */
  let (gameObjectRecord, uid) = CreateGameObjectGameObjectService.create(gameObjectRecord);
  let (state, transform) = CreateTransformMainService.create(state);
  (AddGameObjectComponentMainService.addTransformComponent(uid, transform, state), uid)
};