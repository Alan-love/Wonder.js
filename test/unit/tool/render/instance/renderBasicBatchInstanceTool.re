let createSourceInstanceGameObject = (sandbox, count, state) => {
  let (state, gameObject, geometry, material, meshRenderer) =
    RenderJobsTool.prepareGameObject(sandbox, state);
  let (state, sourceInstance) = SourceInstance.createSourceInstance(state);
  let state = state |> GameObject.addGameObjectSourceInstanceComponent(gameObject, sourceInstance);
  let (state, objectInstanceGameObjectList) =
    ArraySystem.range(0, count - 1)
    |> ArraySystem.reduceOneParam(
         [@bs]
         (
           ((state, objectInstanceGameObjectList), _) => {
             let (state, objectInstanceGameObject) =
               SourceInstance.createInstance(sourceInstance, state);
             (state, [objectInstanceGameObject, ...objectInstanceGameObjectList])
           }
         ),
         (state, [])
       );
  (state, gameObject, geometry, objectInstanceGameObjectList)
};

let prepare = (sandbox, count, state) => {
  let state = state |> InstanceTool.setGpuDetectDataAllowBatchInstance;
  let (state, gameObject, componentTuple, objectInstanceGameObjectList) =
    createSourceInstanceGameObject(sandbox, count, state);
  let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
  (state, gameObject, componentTuple, objectInstanceGameObjectList)
};

let render = (state: StateDataType.state) => state |> WebGLRenderTool.render;