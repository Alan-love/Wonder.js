open BasicCameraViewType;

open TransformType;

let isBasicCameraView = (basicCameraView) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(basicCameraView) >= 0
};

let getWorldToCameraMatrix = (transform, state: StateDataMainType.state) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    RecordTransformMainService.getRecord(state);
  [@bs]
  ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(
    transform,
    localToWorldMatrices,
    localToWorldMatrixCacheMap
  )
  |> VMatrixService.getWorldToCameraMatrix
};

let getPosition = (transform, state: StateDataMainType.state) =>
  UpdateTransformMainService.updateAndGetPositionTuple(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord
  );
/* let getCurrentBasicCameraView = BasicCameraViewSystem.getCurrentBasicCameraView; */
/* let testBuildPMatrix = (stateFunc, execFunc) =>
   Wonder_jest.(
     BasicCameraViewAPI.(
       Expect.(
         Expect.Operators.(
           test(
             "build dirty basicCameraViews' pMatrix",
             () => {
               let (state, basicCameraView) = createBasicCameraViewPerspectiveCamera(stateFunc());
               let state = state |> execFunc;
               state
               |> unsafeGetPerspectiveCameraProjectionPMatrix(basicCameraView)
               |>
               expect == Js.Typed_array.Float32Array.make([|
                           1.7320508075688776,
                           0.,
                           0.,
                           0.,
                           0.,
                           1.7320508075688776,
                           0.,
                           0.,
                           0.,
                           0.,
                           (-1.0002000200020003),
                           (-1.),
                           0.,
                           0.,
                           (-0.2000200020002),
                           0.
                         |])
             }
           )
         )
       )
     )
   ); */