open GameObjectComponentCommon;

let _hasComponent = (uid: int, componentMap) : bool => componentMap |> hasComponent(uid);

let hasSourceInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap);

let hasObjectInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).objectInstanceMap);

let hasCameraControllerComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).cameraControllerMap);

let hasGeometryComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).geometryMap);

let hasMeshRendererComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).meshRendererMap);

let hasMaterialComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).materialMap);

let hasTransformComponent = (uid: int, state: StateDataType.state) : bool =>
  _hasComponent(uid, GameObjectStateCommon.getGameObjectData(state).transformMap);