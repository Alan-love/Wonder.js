open TransformType;

open Contract;

open StateDataType;

open TransformDirtyCommon;

open TransformHierachyCommon;

open TransformStateCommon;

let getData = getTransformData;

let handleAddComponent = TransformAddComponentCommon.handleAddComponent;

let handleDisposeComponent = TransformDisposeComponentCommon.handleDisposeComponent;

let handleBatchDisposeComponent = TransformDisposeComponentCommon.handleBatchDisposeComponent;

let handleCloneComponent = TransformCloneComponentCommon.handleCloneComponent;

let isAlive = (transform: transform, state: StateDataType.state) =>
  TransformDisposeComponentCommon.isAlive(transform, state);

let create = (state: StateDataType.state) => TransformUtils.create(state);

let getParent = (child: transform, state: StateDataType.state) =>
  TransformHierachyCommon.getParent(child, getTransformData(state));

let setParentNotMarkDirty =
    (parent: option(transform), child: transform, transformData) =>
  transformData |> TransformHierachyCommon.setParent(parent, child);

let setParent = (parent: Js.nullable(transform), child: transform, state: StateDataType.state) => {
  getTransformData(state) |> setParentNotMarkDirty(Js.toOption(parent), child) |> markHierachyDirty(child) |> ignore;
  state
};

let getChildren = (transform: transform, state: StateDataType.state) =>
  getTransformData(state) |> unsafeGetChildren(transform) |> Js.Array.copy;

let unsafeGetChildren = (transform: transform, transformData) =>
  unsafeGetChildren(transform, transformData);

let getLocalPositionTypeArray = (transform: transform, state: StateDataType.state) =>
  TransformOperateCommon.getLocalPositionTypeArray(
    transform,
    getTransformData(state).localPositionMap
  );

let getLocalPositionTuple = (transform: transform, state: StateDataType.state) =>
  TransformOperateCommon.getLocalPositionTuple(
    transform,
    getTransformData(state).localPositionMap
  );

let setLocalPositionByTypeArray = (transform: transform, localPosition, state: StateDataType.state) => {
  state
  |> getTransformData
  |> TransformOperateCommon.setLocalPositionByTypeArray(transform, localPosition)
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let setLocalPositionByTuple = (transform: transform, localPosition, state: StateDataType.state) => {
  state
  |> getTransformData
  |> TransformOperateCommon.setLocalPositionByTuple(transform, localPosition)
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let getPositionTypeArray = (transform: transform, state: StateDataType.state) =>
  TransformOperateCommon.getPositionTypeArray(transform, state);

let getPositionTuple = (transform: transform, state: StateDataType.state) =>
  TransformOperateCommon.getPositionTuple(transform, state);

let setPositionByTypeArray = (transform: transform, position, state: StateDataType.state) => {
  TransformOperateCommon.setPositionByTypeArray(
    transform,
    position,
    getTransformData(state),
    state
  )
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let setPositionByTuple = (transform: transform, position: position, state: StateDataType.state) => {
  TransformOperateCommon.setPositionByTuple(transform, position, getTransformData(state), state)
  |> markHierachyDirty(transform)
  |> ignore;
  state
};

let getLocalToWorldMatrixTypeArray = (transform: transform, state: StateDataType.state) =>
  TransformUtils.getLocalToWorldMatrixTypeArray(transform, state);

let getGameObject = (transform: transform, state: StateDataType.state) =>
  TransformGameObjectCommon.getGameObject(transform, getTransformData(state));

let initData = (state: StateDataType.state) => {
  /* let maxCount = TransformBufferCommon.getMaxCount(state); */
  /* let (buffer, localPositions, localToWorldMatrices) =
     TransformBufferCommon.initBufferData(maxCount); */
  state.transformData =
    Some
      /* buffer,
         localToWorldMatrices,
         localPositions, */
      ({
        index: 0,
        parentMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        childMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        dirtyMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        localToWorldMatrixMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        localPositionMap: WonderCommonlib.SparseMapSystem.createEmpty(),
        disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
      });
  state
};