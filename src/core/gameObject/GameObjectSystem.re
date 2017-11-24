open UidUtils;

open ComponentType;

open StateDataType;

open GameObjectType;

let hasCameraControllerComponent = GameObjectComponentUtils.hasCameraControllerComponent;

let getCameraControllerComponent = GameObjectComponentUtils.getCameraControllerComponent;

let addCameraControllerComponent = GameObjectComponentUtils.addCameraControllerComponent;

let disposeCameraControllerComponent = GameObjectComponentUtils.disposeCameraControllerComponent;

let hasTransformComponent = GameObjectComponentUtils.hasTransformComponent;

let getTransformComponent = GameObjectComponentUtils.getTransformComponent;

let addTransformComponent = GameObjectComponentUtils.addTransformComponent;

let disposeTransformComponent = GameObjectComponentUtils.disposeTransformComponent;

let hasGeometryComponent = GameObjectComponentUtils.hasGeometryComponent;

let getGeometryComponent = GameObjectComponentUtils.getGeometryComponent;

let addGeometryComponent = GameObjectComponentUtils.addGeometryComponent;

let disposeGeometryComponent = GameObjectComponentUtils.disposeGeometryComponent;

let hasMeshRendererComponent = GameObjectComponentUtils.hasMeshRendererComponent;

let getMeshRendererComponent = GameObjectComponentUtils.getMeshRendererComponent;

let addMeshRendererComponent = GameObjectComponentUtils.addMeshRendererComponent;

let disposeMeshRendererComponent = GameObjectComponentUtils.disposeMeshRendererComponent;

let hasMaterialComponent = GameObjectComponentUtils.hasMaterialComponent;

let getMaterialComponent = GameObjectComponentUtils.getMaterialComponent;

let addMaterialComponent = GameObjectComponentUtils.addMaterialComponent;

let disposeMaterialComponent = GameObjectComponentUtils.disposeMaterialComponent;

/* todo refactor: move to gameObjectCreateUtils*/
let create = (state: StateDataType.state) => {
  /* let {uid, aliveUidArray} as data = GameObjectStateUtils.getGameObjectData(state);
     let newUIdStr = Js.Int.toString(uid);
     data.uid = increase(uid);
     aliveUidArray |> Js.Array.push(newUIdStr) |> ignore; */
  let (state, uidStr) = GameObjectCreateUtils.create(state);
  /* todo refactor: use TransformXXXUtils */
  let (state, transform) = TransformSystem.create(state);
  (addTransformComponent(uidStr, transform, state), uidStr)
};

let dispose = (uid: string, state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateUtils.getGameObjectData(state);
  data.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.HashMapSystem.set(uid, true) |> ignore;
  let state =
    switch (getTransformComponent(uid, state)) {
    | Some(transform) => disposeTransformComponent(uid, transform, state)
    | None => state
    };
  let state =
    switch (getMeshRendererComponent(uid, state)) {
    | Some(meshRenderer) => disposeMeshRendererComponent(uid, meshRenderer, state)
    | None => state
    };
  let state =
    switch (getMaterialComponent(uid, state)) {
    | Some(material) => disposeMaterialComponent(uid, material, state)
    | None => state
    };
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) => disposeGeometryComponent(uid, geometry, state)
    | None => state
    };
  let state =
    switch (getCameraControllerComponent(uid, state)) {
    | Some(cameraController) => disposeCameraControllerComponent(uid, cameraController, state)
    | None => state
    };
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  }
};

let batchDispose = (uidArray: array(string), state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateUtils.getGameObjectData(state);
  let uidMap = WonderCommonlib.HashMapSystem.createEmpty();
  uidArray
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (uid) => {
           /* todo optimize remove? */
           uidMap |> WonderCommonlib.HashMapSystem.set(uid, true) |> ignore;
           disposedUidMap |> WonderCommonlib.HashMapSystem.set(uid, true) |> ignore
         }
       )
     );
  data.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  let state =
    state
    |> GameObjectComponentUtils.batchGetMeshRendererComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeMeshRendererComponent(uidMap, state)
    |> GameObjectComponentUtils.batchGetTransformComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeTransformComponent(uidMap, state)
    |> GameObjectComponentUtils.batchGetMaterialComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeMaterialComponent(uidMap, state)
    |> GameObjectComponentUtils.batchGetGeometryComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeGeometryComponent(uidMap, state)
    |> GameObjectComponentUtils.batchGetCameraControllerComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeCameraControllerComponent(uidMap, state);
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  }
};

/* {
                   cloneChildren:true,
                   cloneGeometry:true
                   ////shareGeometry:false
   } */
/* let clone = (uid: string,  state: StateDataType.state, config:Js.t({..}), ~count:int=1,  ()) => { */
let clone = (uid: string, state: StateDataType.state, count: int) => {
  let countRangeArr = ArraySystem.range(0, count - 1);
  let totalClonedGameObjectArr = [||];
  let rec _clone =
          (
            uid: string,
            transform,
            countRangeArr,
            clonedParentTransformArr,
            totalClonedGameObjectArr,
            state: StateDataType.state
          ) => {
    let clonedGameObjectArr = [||];
    let state =
      countRangeArr
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, _) => {
               let (state, gameObject) = GameObjectCreateUtils.create(state);
               clonedGameObjectArr |> Js.Array.push(gameObject) |> ignore;
               state
             }
           ),
           state
         );
    totalClonedGameObjectArr |> Js.Array.push(clonedGameObjectArr) |> ignore;
    let state =
      switch (getMeshRendererComponent(uid, state)) {
      | Some(meshRenderer) =>
        let (state, clonedMeshRendererArr) =
          GameObjectComponentUtils.cloneMeshRendererComponent(meshRenderer, countRangeArr, state);
        state
        |> GameObjectComponentUtils.batchAddMeshRendererComponent(
             clonedGameObjectArr,
             clonedMeshRendererArr
           )
      | None => state
      };
    let state =
      switch (getGeometryComponent(uid, state)) {
      | Some(geometry) =>
        let (state, clonedGeometryArr) =
          GameObjectComponentUtils.cloneGeometryComponent(
            GeometryIndexUtils.getMappedIndex(
              Js.Int.toString(geometry),
              GeometryIndexUtils.getMappedIndexMap(state)
            ),
            countRangeArr,
            state
          );
        state
        |> GameObjectComponentUtils.batchAddGeometryComponent(
             clonedGameObjectArr,
             clonedGeometryArr
           )
      | None => state
      };
    let state =
      switch (getMaterialComponent(uid, state)) {
      | Some(meshRenderer) =>
        let (state, clonedMaterialArr) =
          GameObjectComponentUtils.cloneMaterialComponent(meshRenderer, countRangeArr, state);
        state
        |> GameObjectComponentUtils.batchAddMaterialComponent(
             clonedGameObjectArr,
             clonedMaterialArr
           )
      | None => state
      };
    /* let (state, transform, clonedTransformArr) = {
         /* switch (getTransformComponent(uid, state)) {
            | Some(transform) =>
              let (state, clonedTransformArr) =
                GameObjectComponentUtils.cloneTransformComponent(transform, countRangeArr, state);
              /* todo optimize compare: add in each loop? */
              (
                state
                |> GameObjectComponentUtils.batchAddTransformComponent(
                     clonedGameObjectArr,
                     clonedTransformArr
                   ),
                   transform,
                clonedTransformArr
              )
            | None => ExceptionHandleSystem.throwMessage("transform component should exist in gameObject")
            }; */
         let (state, clonedTransformArr) =
           GameObjectComponentUtils.cloneTransformComponent(transform, countRangeArr, state);
         /* todo optimize compare: add in each loop? */
         (
           state
           |> GameObjectComponentUtils.batchAddTransformComponent(
                clonedGameObjectArr,
                clonedTransformArr
              ),
           transform,
           clonedTransformArr
         )
       }; */
    let (state, clonedTransformArr) =
      GameObjectComponentUtils.cloneTransformComponent(transform, countRangeArr, state);
    /* todo optimize compare: add in each loop? */
    let state =
      state
      |> GameObjectComponentUtils.batchAddTransformComponent(
           clonedGameObjectArr,
           clonedTransformArr
         );
    /* DebugUtils.log(transform) |> ignore; */
    /* clonedParentTransformArr */
    /* let transformData = TransformStateUtils.getTransformData(state); */
    clonedParentTransformArr
    /* |> DebugUtils.log */
    |> ArraySystem.reduceOneParami(
         [@bs]
         (
           (transformData, clonedParentTransform, i) =>
             transformData
             |> TransformHierachySystem.setParent(
                  Some(clonedParentTransform),
                  clonedTransformArr[i]
                )
         ),
         TransformStateUtils.getTransformData(state)
       );
    /* DebugUtils.log(("child:", clonedTransformArr )) |> ignore; */
    /* todo optimize: use loop */
    TransformHierachySystem.unsafeGetChildren(
      Js.Int.toString(transform),
      TransformStateUtils.getTransformData(state)
    )
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, childTransform) =>
             /* DebugUtils.log(( transform, childTransform )) |> ignore; */
             /* let transformData = TransformStateUtils.getTransformData(state); */
             /* let transformData =
                transformData |> TransformHierachySystem.setParent(Some(transform), childTransform); */
             state
             |> _clone(
                  TransformStateUtils.getTransformData(state)
                  |> TransformGameObjectUtils.getGameObject(childTransform)
                  |> Js.Option.getExn,
                  childTransform,
                  countRangeArr,
                  clonedTransformArr,
                  totalClonedGameObjectArr
                )
         ),
         state
       )
  };
  /* clonedTransformArr |>  */
  /* let (state, clonedGameObjectArr) = countRangeArr |>


                  /* todo optimize compare: set in each loop? */
     countRangeArr |> WonderCommonlib.ArraySystem.forEachi((_, index) => {
       let (state, gameObject) = GameObjectCreateUtils.create(state);

       GameObjectComponentUtils.addTransformComponent(gameObject, clonedTransformArr[index]);
       GameObjectComponentUtils.addTransformComponent(gameObject, clonedTransformArr[index]);
     }); */
  (
    _clone(
      uid,
      getTransformComponent(uid, state) |> Js.Option.getExn,
      countRangeArr,
      [||],
      totalClonedGameObjectArr,
      state
    ),
    totalClonedGameObjectArr
  )
};

let isAlive = (uid: string, state: StateDataType.state) => {
  let {transformMap, disposedUidMap} = GameObjectStateUtils.getGameObjectData(state);
  disposedUidMap |> HashMapSystem.has(uid) ?
    false : transformMap |> HashMapSystem.has(uid) ? true : false
};

let initGameObject = (uid: string, state: StateDataType.state) => {
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) =>
      GeometryInitComponentUtils.handleInitComponent(
        GeometryIndexUtils.getMappedIndex(
          Js.Int.toString(geometry),
          GeometryIndexUtils.getMappedIndexMap(state)
        ),
        state
      )
    | None => state
    };
  let state =
    switch (getMaterialComponent(uid, state)) {
    | Some(material) =>
      MaterialInitComponentUtils.handleInitComponent(
        [@bs] DeviceManagerSystem.getGl(state),
        material,
        state
      )
    | None => state
    };
  state
};

let initData = () => {
  uid: 0,
  disposeCount: 0,
  disposedUidMap: WonderCommonlib.HashMapSystem.createEmpty(),
  aliveUidArray: WonderCommonlib.ArraySystem.createEmpty(),
  transformMap: WonderCommonlib.HashMapSystem.createEmpty(),
  cameraControllerMap: WonderCommonlib.HashMapSystem.createEmpty(),
  geometryMap: WonderCommonlib.HashMapSystem.createEmpty(),
  meshRendererMap: WonderCommonlib.HashMapSystem.createEmpty(),
  materialMap: WonderCommonlib.HashMapSystem.createEmpty()
};