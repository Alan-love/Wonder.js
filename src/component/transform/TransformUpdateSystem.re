open TransformType;

open TransformHierachySystem;

open TransformOperateDataSystem;

/* let _moveFromDirtyListToNormalList (index: int) (transformData: transformData) => {
     transformData.firstDirtyIndex = addFirstDirtyIndex transformData.firstDirtyIndex;
     moveTo index (unsafePopOldIndexList transformData) transformData
   }; */
/* ////todo optimize: if transform not transformed in 5 frames, not move off */
let _cleanDirtyList = (transformData: transformData) =>
  /* dirtyList
     |> ArraySystem.forEach (fun index => _moveFromDirtyListToNormalList index transformData |> ignore); */
  transformData.dirtyList = ArraySystem.createEmpty();

let _transform = ({localToWorldMatrices, localPositions} as transformData, dirtyList: array(int)) => {
  open Matrix4System;
  dirtyList
  |> ArraySystem.forEach(
       (index) => {
         /* todo from rotation, scale */
         let mat = fromTranslation(localPositions, getVector3DataIndex(index));
         switch (getParent(Js.Int.toString(index), transformData)) {
         | Some(parent) =>
           [@bs]
           setLocalToWorldMatricesTypeArr(
             getMatrix4DataIndex(index),
             multiply(localToWorldMatrices, getMatrix4DataIndex(parent), mat, 0),
             localToWorldMatrices
           )
           |> ignore
         | None =>
           [@bs]
           setLocalToWorldMatricesTypeArr(getMatrix4DataIndex(index), mat, localToWorldMatrices)
           |> ignore
         }
       }
     );
  dirtyList
};

let _sortParentBeforeChildInDirtyList = (transformData: transformData, dirtyList: array(int)) => {
  dirtyList |> ArraySystem.fastSort((a, b) => isParent(b, a, transformData) ? 1 : 0);
  /* |> ArraySystem.forEach (
       fun index =>
         switch (getParent (Js.Int.toString index) transformData) {
         | Some parent =>
           if (parent > index) {
             swap parent index transformData |> ignore
           } else {
             ()
           }
         | None => ()
         }
     ); */
  dirtyList
};

let _updateDirtyList = (transformData: transformData, dirtyList: array(int)) => {
  /* requireCheck (
       fun () =>
         Contract.Operators.(
           test
             "firstDirtyIndex should <= maxCount"
             (fun () => transformData.firstDirtyIndex <= getMaxCount ())
         )
     ); */
  dirtyList
  |> _sortParentBeforeChildInDirtyList(transformData)
  |> _transform(transformData)
  |> ignore;
  transformData
};

let update = (transformData: transformData) =>
  /* ArraySystem.range transformData.firstDirtyIndex (getMaxCount () - 1)
     |> _updateDirtyList floatArr_1 transformData
     |> _cleanDirtyList transformData; */
  transformData.dirtyList
  |> ArraySystem.removeDuplicateItems
  |> _updateDirtyList(transformData)
  |> _cleanDirtyList;
