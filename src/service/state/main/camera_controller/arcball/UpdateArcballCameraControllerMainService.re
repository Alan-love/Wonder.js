open StateDataMainType;

open OperateArcballCameraControllerService;

let _updateTransform =
    (
      cameraController,
      {arcballCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  let transformRecord = RecordTransformMainService.getRecord(state);

  let transform =
    GetComponentGameObjectService.unsafeGetTransformComponent(
      GameObjectArcballCameraControllerService.unsafeGetGameObject(
        cameraController,
        arcballCameraControllerRecord,
      ),
      gameObjectRecord,
    );

  let distance =
    unsafeGetDistance(cameraController, arcballCameraControllerRecord);

  let phi = unsafeGetPhi(cameraController, arcballCameraControllerRecord);

  let theta = unsafeGetTheta(cameraController, arcballCameraControllerRecord);

  let (x, y, z) as target =
    unsafeGetTarget(cameraController, arcballCameraControllerRecord);

  let state = {
    ...state,
    transformRecord:
      Some(
        ModelMatrixTransformService.setLocalPositionByTuple(
          transform,
          (
            distance *. Js.Math.cos(phi) *. Js.Math.sin(theta) +. x,
            distance *. Js.Math.cos(theta) +. y,
            distance *. Js.Math.sin(phi) *. Js.Math.sin(theta) +. z,
          ),
          transformRecord,
        ),
      ),
  };

  LookAtTransfromMainService.lookAt(~transform, ~target, ~state, ());
};

let _clearDirtyArray = ({arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord: {
    ...arcballCameraControllerRecord,
    dirtyArray: DirtyArrayService.create(),
  },
};

let update = ({arcballCameraControllerRecord} as state) =>
  arcballCameraControllerRecord.dirtyArray
  |> WonderCommonlib.ArrayService.removeDuplicateItems
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, dirtyIndex) => _updateTransform(dirtyIndex, state),
       state,
     )
  |> _clearDirtyArray;

let _getAllArcballCameraControllers =
    ({arcballCameraControllerRecord} as state) => {
  let {index, disposedIndexArray}: arcballCameraControllerRecord = arcballCameraControllerRecord;

  GetAllComponentService.getAllComponents(index, disposedIndexArray);
};

let updateAll = ({arcballCameraControllerRecord} as state) =>
  _getAllArcballCameraControllers(state)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, cameraController) =>
         _updateTransform(cameraController, state),
       state,
     )
  |> _clearDirtyArray;