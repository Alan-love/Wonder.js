open BasicCameraViewType;

let isActive = (cameraView, {isActiveMap}) =>
  switch (isActiveMap |> WonderCommonlib.SparseMapService.get(cameraView)) {
  | None => false
  | Some(isActive) => isActive
  };

let _setAllNotActive = isActiveMap =>
  isActiveMap |> SparseMapService.mapValid((. value) => false);

let active = (cameraView, {isActiveMap} as record) => {
  ...record,
  isActiveMap:
    _setAllNotActive(isActiveMap)
    |> WonderCommonlib.SparseMapService.set(cameraView, true),
};

let unactive = (cameraView, {isActiveMap} as record) => {
  ...record,
  isActiveMap:
    isActiveMap |> WonderCommonlib.SparseMapService.set(cameraView, false),
};

let setActive = (cameraView, active, {isActiveMap} as record) => {
  ...record,
  isActiveMap:
    isActiveMap |> WonderCommonlib.SparseMapService.set(cameraView, active),
};

let _getActiveCameraViews = ({isActiveMap} as record) =>
  isActiveMap
  |> SparseMapService.reducei(
       (. arr, isActive, cameraView) =>
         isActive === true ? arr |> ArrayService.push(cameraView) : arr,
       [||],
     )
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|only has one active cameraView at most|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 r |> SparseMapService.length <= 1
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let getActiveCameraView = ({isActiveMap} as record) =>
  switch (_getActiveCameraViews(record)) {
  | arr when Js.Array.length(arr) === 0 => None
  | arr => arr |> ArrayService.unsafeGetFirst |. Some
  };