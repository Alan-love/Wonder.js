open StateDataType;

let createState = () => {
  bufferConfig: None,
  gpuConfig: None,
  canvasConfig: None,
  workerConfig: None,
  memoryConfig: ConfigMemoryService.create(),
  jobData: JobHelper.create(),
  noWorkerJobConfig: None,
  workerJobConfig: None,
  renderConfigData: None,
  gpuDetectData: {extensionInstancedArrays: None, precision: None},
  viewData: {canvas: None, contextConfig: None},
  initConfig: {isDebug: false},
  sourceInstanceData: SourceInstanceHelper.create(),
  objectInstanceData: ObjectInstanceHelper.create(),
  deviceManagerData: {gl: None, side: None, colorWrite: None, clearColor: None, viewport: None},
  gameObjectRecord: RecordGameObjectService.create(),
  transformRecord: RecordTransformServicie.create(),
  sceneRecord: RecordSceneService.create(),
  basicCameraViewRecord: RecordBasicCameraViewService.create(),
  perspectiveCameraProjectionRecord: RecordPerspectiveCameraProjectionService.create(),
  basicMaterialRecord: RecordBasicMaterialService.create(),
  lightMaterialRecord: RecordLightMaterialService.create(),
  ambientLightRecord: RecordAmbientLightService.create(),
  directionLightRecord: RecordDirectionLightService.create(),
  pointLightRecord: RecordPointLightService.create(),
  boxGeometryRecord: RecordBoxGeometryService.create(),
  meshRendererRecord: RecordMeshRendererService.create(),
  shaderData: ShaderHelper.create(),
  programData: ProgramHelper.create(),
  glslLocationData: GLSLLocationHelper.create(),
  glslSenderData: GLSLSenderHelper.create(),
  glslChunkData: ShaderChunkSystem.create(),
  renderData: RenderDataHelper.create(),
  timeControllerData: TimeControllerHelper.create(),
  vboBufferRecord: VboBufferHelper.create(),
  globalTempRecord: RecordGlobalTempService.create(),
  typeArrayPoolRecord: RecordTypeArrayPoolService.create(),
  workerInstanceData: WorkerInstanceHelper.create(),
  workerDetectData: WorkerDetectHelper.create()
};

let getState = (stateData: stateData) : state =>
  switch stateData.state {
  | None => createState()
  | Some(state) => state
  };

let setState = (stateData: stateData, state: state) => {
  stateData.state = Some(state);
  state
};

let deepCopyForRestore = (state: StateDataType.state) =>
  state
  |> VboBufferSystem.deepCopyForRestore
  |> GLSLSenderSystem.deepCopyForRestore
  /* |> AmbientLightAdmin.deepCopyForRestore
     |> DirectionLightAdmin.deepCopyForRestore
     |> PointLightAdmin.deepCopyForRestore */
  |> ShaderSystem.deepCopyForRestore
  |> ProgramSystem.deepCopyForRestore
  |> GLSLLocationSystem.deepCopyForRestore
  |> DeviceManagerSystem.deepCopyForRestore
  |> SourceInstanceAdmin.deepCopyForRestore
  |> ObjectInstanceAdmin.deepCopyForRestore
  |> (
    (state) => {
      ...state,
      gameObjectRecord: RecordGameObjectService.deepCopyForRestore(state.gameObjectRecord),
      basicCameraViewRecord:
        RecordBasicCameraViewService.deepCopyForRestore(state.basicCameraViewRecord),
      perspectiveCameraProjectionRecord:
        RecordPerspectiveCameraProjectionService.deepCopyForRestore(
          state.perspectiveCameraProjectionRecord
        ),
      meshRendererRecord: RecordMeshRendererService.deepCopyForRestore(state.meshRendererRecord),
      transformRecord: RecordTransformServicie.deepCopyForRestore(state.transformRecord),
      typeArrayPoolRecord: RecordTypeArrayPoolService.deepCopyForRestore(state.typeArrayPoolRecord),
      boxGeometryRecord: RecordBoxGeometryService.deepCopyForRestore(state.boxGeometryRecord),
      basicMaterialRecord: RecordBasicMaterialService.deepCopyForRestore(state.basicMaterialRecord),
      lightMaterialRecord: RecordLightMaterialService.deepCopyForRestore(state.lightMaterialRecord),
      ambientLightRecord: RecordAmbientLightService.deepCopyForRestore(state.ambientLightRecord),
      directionLightRecord:
        RecordDirectionLightService.deepCopyForRestore(state.directionLightRecord),
      pointLightRecord: RecordPointLightService.deepCopyForRestore(state.pointLightRecord)
    }
  );

let _getSharedData = ({typeArrayPoolRecord} as currentState: StateDataType.state) => {
  gl: [@bs] DeviceManagerSystem.unsafeGetGl(currentState),
  float32ArrayPoolMap: TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord),
  uint16ArrayPoolMap: TypeArrayPoolService.getUint16ArrayPoolMap(typeArrayPoolRecord)
};

let restore =
    (stateData: stateData, currentState: StateDataType.state, targetState: StateDataType.state) => {
  let intersectShaderIndexDataArray =
    ShaderSystem.getIntersectShaderIndexDataArray(currentState, targetState);
  let sharedData = _getSharedData(currentState);
  let (targetState, sharedData) =
    targetState |> RestoreBoxGeometryService.restore(currentState, sharedData);
  let (targetState, sharedData) =
    targetState |> RestoreTransformService.restore(currentState, sharedData);
  let (targetState, sharedData) =
    targetState |> SourceInstanceAdmin.restore(currentState, sharedData);
  let targetState = targetState |> DeviceManagerSystem.restore(currentState, sharedData);
  let gl = [@bs] DeviceManagerSystem.unsafeGetGl(targetState);
  /* let targetState = {
       ...targetState,
       typeArrayPoolRecord: RestoreTypeArrayPoolService.restore(currentState, targetState),
       globalTempRecord: RestoreGlobalTempService.restore(currentState, targetState)
     }; */
  targetState
  /* |> TypeArrayPoolService.restore(currentState, sharedData) */
  |> RestoreTypeArrayPoolService.restore(currentState, sharedData)
  |> RestoreGlobalTempService.restore(currentState)
  |> VboBufferSystem.restore(currentState)
  |> ShaderSystem.restore(currentState)
  |> ProgramSystem.restore(intersectShaderIndexDataArray, currentState)
  |> GLSLLocationSystem.restore(intersectShaderIndexDataArray, currentState)
  |> GLSLSenderSystem.restore(intersectShaderIndexDataArray, currentState)
  |> RestoreBasicMaterialService.restore(gl, currentState)
  |> RestoreLightMaterialService.restore(gl, currentState)
  |> RenderDataSystem.restore(currentState)
  /* |> RecordGlobalTempService.restore(currentState) */
  |> setState(stateData)
  /* |> WonderLog.Contract.ensureCheck ((state) => {
      open WonderLog;
      open Contract;
      open Operators;
      test
      (Log.buildAssertMessage(~expect={j|gl exist|j}, ~actual={j|not|j}),
      (
      () => {
     [@bs]DeviceManagerSystem.unsafeGetGl(state)
      })
      );
      }, StateData.stateData.isDebug); */
};