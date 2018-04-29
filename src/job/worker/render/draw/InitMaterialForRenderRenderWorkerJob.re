open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let _initBasicMaterials = (gl, basicMaterialData, isSupportInstance, state) => {
  let {shaderIndices}: RenderWorkerBasicMaterialType.basicMaterialRecord =
    RecordBasicMaterialRenderWorkerService.getRecord(state);
  basicMaterialData##materialDataForWorkerInit
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (initBasicMaterialState, (materialIndex, isSourceInstance)) =>
           [@bs]
           InitInitBasicMaterialService.initMaterial(
             gl,
             (materialIndex, isSourceInstance, isSupportInstance),
             initBasicMaterialState
           )
       ),
       CreateInitBasicMaterialStateRenderWorkerService.createInitMaterialState(state)
     )
  |> ignore;
  state
};

let _initLightMaterials = (gl, lightMaterialData, isSupportInstance, state) => {
  let {shaderIndices}: RenderWorkerLightMaterialType.lightMaterialRecord =
    RecordLightMaterialRenderWorkerService.getRecord(state);
  lightMaterialData##materialDataForWorkerInit
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (initLightMaterialState, (materialIndex, isSourceInstance)) =>
           [@bs]
           InitInitLightMaterialService.initMaterial(
             gl,
             (materialIndex, isSourceInstance, isSupportInstance),
             initLightMaterialState
           )
       ),
       CreateInitLightMaterialStateRenderWorkerService.createInitMaterialState(state)
     )
  |> ignore;
  state
};

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let initData = data##initData;
      let materialData = initData##materialData;
      let basicMaterialData = data##initData##materialData##basicMaterialData;
      let lightMaterialData = data##initData##materialData##lightMaterialData;
      let directionLightData = initData##directionLightData;
      let pointLightData = initData##pointLightData;
      let gl = [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
      let isSupportInstance = JudgeInstanceRenderWorkerService.isSupportInstance(state);
      state
      |> _initBasicMaterials(gl, basicMaterialData, isSupportInstance)
      |> _initLightMaterials(gl, lightMaterialData, isSupportInstance)
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );