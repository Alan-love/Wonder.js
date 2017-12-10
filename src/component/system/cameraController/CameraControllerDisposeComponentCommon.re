open CameraControllerType;

open CameraControllerStateCommon;

open Contract;

let isAlive = (cameraController: cameraController, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(
    cameraController,
    getCameraControllerData(state).disposedIndexArray
  );

let handleDisposeComponent = (cameraController: cameraController, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentCommon.checkComponentShouldAlive(cameraController, isAlive, state)
      )
  );
  let {disposedIndexArray} = getCameraControllerData(state);
  disposedIndexArray |> Js.Array.push(cameraController) |> ignore;
  state
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      cameraControllerArray: array(cameraController),
      gameObjectUidMap: array(bool),
      state: StateDataType.state
    ) => {
      requireCheck(
        () =>
          Contract.Operators.(
            cameraControllerArray
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs]
                 (
                   (cameraController) =>
                     ComponentDisposeComponentCommon.checkComponentShouldAlive(
                       cameraController,
                       isAlive,
                       state
                     )
                 )
               )
          )
      );
      let {disposedIndexArray} as data = getCameraControllerData(state);
      data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(cameraControllerArray);
      state
    }
  );