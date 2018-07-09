open StateDataMainType;

open ArcballCameraControllerType;

open DisposeArcballCameraControllerMainService;

open GameObjectArcballCameraControllerService;

open OperateArcballCameraControllerService;

let createArcballCameraController = state => {
  let (arcballCameraControllerRecord, index) =
    CreateArcballCameraControllerService.create(
      state.arcballCameraControllerRecord,
    );
  ({...state, arcballCameraControllerRecord}, index);
};

let unsafeGetArcballCameraControllerGameObject = (cameraController, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraController,
              isAlive,
              state.arcballCameraControllerRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObject(cameraController, state.arcballCameraControllerRecord);
};

let unsafeGetArcballCameraControllerDistance = (cameraController, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraController,
              isAlive,
              state.arcballCameraControllerRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  unsafeGetDistance(cameraController, state.arcballCameraControllerRecord);
};

let setArcballCameraControllerDistance =
    (cameraController, value: float, state) => {
  ...state,
  arcballCameraControllerRecord:
    setDistance(cameraController, value, state.arcballCameraControllerRecord),
};

let unsafeGetArcballCameraControllerMinDistance = (cameraController, state) =>
  state.arcballCameraControllerRecord
  |> unsafeGetMinDistance(cameraController);

let setArcballCameraControllerMinDistance =
    (cameraController, value: float, state) => {
  ...state,
  arcballCameraControllerRecord:
    setMinDistance(
      cameraController,
      value,
      state.arcballCameraControllerRecord,
    ),
};

let unsafeGetArcballCameraControllerWheelSpeed = (cameraController, state) =>
  state.arcballCameraControllerRecord |> unsafeGetWheelSpeed(cameraController);

let setArcballCameraControllerWheelSpeed =
    (cameraController, value: float, state) => {
  ...state,
  arcballCameraControllerRecord:
    setWheelSpeed(
      cameraController,
      value,
      state.arcballCameraControllerRecord,
    ),
};

let unsafeGetArcballCameraControllerPhi = (cameraController, state) =>
  state.arcballCameraControllerRecord |> unsafeGetPhi(cameraController);

let setArcballCameraControllerPhi = (cameraController, value: float, state) => {
  ...state,
  arcballCameraControllerRecord:
    setPhi(cameraController, value, state.arcballCameraControllerRecord),
};

let unsafeGetArcballCameraControllerTheta = (cameraController, state) =>
  state.arcballCameraControllerRecord |> unsafeGetTheta(cameraController);

let setArcballCameraControllerTheta = (cameraController, value: float, state) => {
  ...state,
  arcballCameraControllerRecord:
    setTheta(cameraController, value, state.arcballCameraControllerRecord),
};

let unsafeGetArcballCameraControllerThetaMargin = (cameraController, state) =>
  state.arcballCameraControllerRecord
  |> unsafeGetThetaMargin(cameraController);

let setArcballCameraControllerThetaMargin =
    (cameraController, value: float, state) => {
  ...state,
  arcballCameraControllerRecord:
    setThetaMargin(
      cameraController,
      value,
      state.arcballCameraControllerRecord,
    ),
};

let unsafeGetArcballCameraControllerTarget = (cameraController, state) =>
  state.arcballCameraControllerRecord |> unsafeGetTarget(cameraController);

let setArcballCameraControllerTarget = (cameraController, target, state) => {
  ...state,
  arcballCameraControllerRecord:
    setTarget(cameraController, target, state.arcballCameraControllerRecord),
};

let unsafeGetArcballCameraControllerMoveSpeedX = (cameraController, state) =>
  state.arcballCameraControllerRecord |> unsafeGetMoveSpeedX(cameraController);

let setArcballCameraControllerMoveSpeedX =
    (cameraController, value: float, state) => {
  ...state,
  arcballCameraControllerRecord:
    setMoveSpeedX(
      cameraController,
      value,
      state.arcballCameraControllerRecord,
    ),
};

let unsafeGetArcballCameraControllerMoveSpeedY = (cameraController, state) =>
  state.arcballCameraControllerRecord |> unsafeGetMoveSpeedY(cameraController);

let setArcballCameraControllerMoveSpeedY =
    (cameraController, value: float, state) => {
  ...state,
  arcballCameraControllerRecord:
    setMoveSpeedY(
      cameraController,
      value,
      state.arcballCameraControllerRecord,
    ),
};

let unsafeGetArcballCameraControllerRotateSpeed = (cameraController, state) =>
  state.arcballCameraControllerRecord
  |> unsafeGetRotateSpeed(cameraController);

let setArcballCameraControllerRotateSpeed =
    (cameraController, value: float, state) => {
  ...state,
  arcballCameraControllerRecord:
    setRotateSpeed(
      cameraController,
      value,
      state.arcballCameraControllerRecord,
    ),
};