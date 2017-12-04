open TransformType;

open TransformStateSystem;

let handleCloneComponent =
    (sourceComponent: transform, countRangeArr: array(int), state: StateDataType.state) => {
  let componentArr = [||];
  let data = getTransformData(state);
  let localPosition = TransformOperateDataSystem.getLocalPosition(sourceComponent, data);
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let index = TransformCreateSystem.create(data);
             data
             |> TransformOperateDataSystem.setLocalPosition(index, localPosition)
             |> TransformDirtySystem.mark(index, true)
             |> ignore;
             componentArr |> Js.Array.push(index) |> ignore;
             state
           }
         ),
         state
       );
  TransformDirtySystem.mark(sourceComponent, true, data) |> ignore;
  (state, componentArr)
};