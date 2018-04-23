open StateDataMainType;

open MaterialType;

open BasicMaterialType;

let initMaterials = (materialIndexArr, gl, {gameObjectRecord} as state) => {
  let gameObjectMap = RecordBasicMaterialMainService.getRecord(state).gameObjectMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  let {index, disposedIndexArray, shaderIndices} = RecordBasicMaterialMainService.getRecord(state);
  materialIndexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, materialIndex: int) =>
           [@bs]
           InitInitBasicMaterialService.initMaterial(
             gl,
             (
               materialIndex,
               JudgeInstanceMainService.isSourceInstance(
                 materialIndex,
                 gameObjectMap,
                 gameObjectRecord
               ),
               isSupportInstance
             ),
             state
           )
       ),
       CreateInitBasicMaterialStateMainService.createInitMaterialState(
         (index, disposedIndexArray, shaderIndices),
         state
       )
     )
  |> ignore;
  state
};

/* TODO fix light material */
let handleInitComponent = (materialIndex: int, {gameObjectRecord} as state) => {
  let {shaderIndices} = RecordBasicMaterialMainService.getRecord(state);
  InitInitBasicMaterialService.isNeedInitMaterial(materialIndex, shaderIndices) ?
    WorkerDetectMainService.isUseWorker(state) ?
      {
        let {materialArrayForWorkerInit} = RecordBasicMaterialMainService.getRecord(state);
        materialArrayForWorkerInit |> ArrayService.push(materialIndex) |> ignore;
        state
      } :
      {
        let gl = [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
        let gameObjectMap = RecordBasicMaterialMainService.getRecord(state).gameObjectMap;
        let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
        let {index, disposedIndexArray, shaderIndices} =
          RecordBasicMaterialMainService.getRecord(state);
        [@bs]
        InitInitBasicMaterialService.initMaterial(
          gl,
          (
            materialIndex,
            JudgeInstanceMainService.isSourceInstance(
              materialIndex,
              gameObjectMap,
              gameObjectRecord
            ),
            isSupportInstance
          ),
          CreateInitBasicMaterialStateMainService.createInitMaterialState(
            (index, disposedIndexArray, shaderIndices),
            state
          )
        )
        |> ignore;
        state
      } :
    state
};