open StateDataMainType;

open FlyCameraControllerType;

let _updateTransform =
    (
      cameraController,
      {flyCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  let transformRecord = RecordTransformMainService.getRecord(state);

  let transform =
    GetComponentGameObjectService.unsafeGetTransformComponent(
      GameObjectFlyCameraControllerService.unsafeGetGameObject(
        cameraController,
        flyCameraControllerRecord,
      ),
      gameObjectRecord,
    );

  let {rotationX, rotationY} =
    OperateFlyCameraControllerService.unsafeGetRotation(
      cameraController,
      flyCameraControllerRecord,
    );

  let (cameraRotationX, cameraRotationY, _) =
    ModelMatrixTransformService.getLocalEulerAnglesTuple(
      transform,
      RecordTransformMainService.getRecord(state).localRotations,
    );

  let cameraLocalPositionTuple =
    ModelMatrixTransformService.getLocalRotationTuple(
      transform,
      RecordTransformMainService.getRecord(state).localRotations,
    )
    |> Vector3Service.transformQuat(
         OperateFlyCameraControllerService.unsafeGetPosition(
           cameraController,
           flyCameraControllerRecord,
         ),
       )
    |> Vector3Service.add(
         Vector3Type.Float,
         ModelMatrixTransformService.getLocalPositionTuple(
           transform,
           RecordTransformMainService.getRecord(state).localPositions,
         ),
       );

  {
    ...state,
    transformRecord:
      Some(
        transformRecord
        |> ModelMatrixTransformService.setLocalPositionByTuple(
             transform,
             cameraLocalPositionTuple,
           )
        |> ModelMatrixTransformService.setLocalEulerAnglesByTuple(
             transform,
             (cameraRotationX -. rotationY, cameraRotationY -. rotationX, 0.),
           ),
      ),
  };
  state;
};

let _clearDirtyArray = ({flyCameraControllerRecord} as state) => {
  ...state,
  flyCameraControllerRecord: {
    ...flyCameraControllerRecord,
    dirtyArray: DirtyArrayService.create(),
  },
};

let update = ({flyCameraControllerRecord} as state) =>
  flyCameraControllerRecord.dirtyArray
  |> WonderCommonlib.ArrayService.removeDuplicateItems
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, dirtyIndex) => _updateTransform(dirtyIndex, state),
       state,
     )
  |> _clearDirtyArray;

let _getAllFlyCameraControllers = ({flyCameraControllerRecord} as state) => {
  let {index, disposedIndexArray}: flyCameraControllerRecord = flyCameraControllerRecord;

  GetAllComponentService.getAllComponents(index, disposedIndexArray);
};

let updateAll = ({flyCameraControllerRecord} as state) =>
  _getAllFlyCameraControllers(state)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, cameraController) =>
         _updateTransform(cameraController, state),
       state,
     )
  |> _clearDirtyArray;