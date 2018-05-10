open StateDataMainType;

open BasicMaterialType;

open SettingType;

open SettingGPUType;

let _buildMaterialData = (buffer, index, disposedIndexArray, isSourceInstanceMap) => {
  "buffer": buffer,
  "index": index,
  "disposedIndexArray": disposedIndexArray,
  "isSourceInstanceMap": isSourceInstanceMap
};

let _buildData = (operateType, canvas, stateData) => {
  let {
        settingRecord,
        workerInstanceRecord,
        gameObjectRecord,
        ambientLightRecord,
        directionLightRecord,
        pointLightRecord
      } as state =
    StateDataMainService.unsafeGetState(stateData);
  let {useHardwareInstance} = OperateSettingService.unsafeGetGPU(settingRecord);
  let {maxBigTypeArrayPoolSize} = OperateSettingService.unsafeGetMemory(settingRecord);
  let buffer = BufferSettingService.unsafeGetBuffer(settingRecord);
  let renderConfigRecord = RecordRenderConfigMainService.getRecord(state);
  let transformRecord = RecordTransformMainService.getRecord(state);
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  let boxGeometryRecord = RecordBoxGeometryMainService.getRecord(state);
  let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state);
  let sourceInstanceRecord = RecordSourceInstanceMainService.getRecord(state);
  let (x, y, width, height, _, _) = ScreenService.queryFullScreenData();
  {
    "operateType": operateType,
    "canvas": canvas,
    "contextConfig": OperateSettingService.unsafeGetContext(settingRecord),
    "isDebug": IsDebugMainService.getIsDebug(stateData),
    "viewportData": [|x, y, width, height|],
    "bufferData": {
      "customGeometryPointDataBufferCount": buffer.customGeometryPointDataBufferCount,
      "transformDataBufferCount": buffer.transformDataBufferCount,
      "basicMaterialDataBufferCount": buffer.basicMaterialDataBufferCount,
      "lightMaterialDataBufferCount": buffer.lightMaterialDataBufferCount,
      "textureCountPerMaterial": buffer.textureCountPerMaterial
    },
    "gpuData": {"useHardwareInstance": useHardwareInstance},
    "memoryData": {"maxBigTypeArrayPoolSize": maxBigTypeArrayPoolSize},
    "instanceBufferData": {
      "sourceInstanceCount": BufferSettingService.getSourceInstanceCount(settingRecord),
      "objectInstanceCountPerSourceInstance":
        BufferSettingService.getObjectInstanceCountPerSourceInstance(settingRecord)
    },
    "workerDetectData": {"isUseWorker": WorkerDetectMainService.isUseWorker(state)},
    "renderConfigData": {
      "shaders":
        GetDataRenderConfigService.getShaders(renderConfigRecord) |> Obj.magic |> Js.Json.stringify,
      "shaderLibs":
        GetDataRenderConfigService.getShaderLibs(renderConfigRecord)
        |> Obj.magic
        |> Js.Json.stringify
    },
    "transformData": {"buffer": transformRecord |> CopyTransformService.unsafeGetCopiedBuffer},
    "basicMaterialData":
      _buildMaterialData(
        basicMaterialRecord.buffer,
        basicMaterialRecord.index,
        basicMaterialRecord.disposedIndexArray,
        JudgeInstanceMainService.buildMap(
          basicMaterialRecord.index,
          RecordBasicMaterialMainService.getRecord(state).gameObjectMap,
          gameObjectRecord
        )
      ),
    "lightMaterialData":
      _buildMaterialData(
        lightMaterialRecord.buffer,
        lightMaterialRecord.index,
        lightMaterialRecord.disposedIndexArray,
        JudgeInstanceMainService.buildMap(
          lightMaterialRecord.index,
          RecordLightMaterialMainService.getRecord(state).gameObjectMap,
          gameObjectRecord
        )
      ),
    "customGeometryData": {"buffer": customGeometryRecord.buffer},
    "ambientLightData": {"buffer": ambientLightRecord.buffer, "index": ambientLightRecord.index},
    "directionLightData": {
      "buffer": directionLightRecord.buffer,
      "index": directionLightRecord.index
    },
    "pointLightData": {"buffer": pointLightRecord.buffer, "index": pointLightRecord.index},
    "sourceInstanceData": {
      "buffer": sourceInstanceRecord.buffer,
      "objectInstanceTransformIndexMap": sourceInstanceRecord.objectInstanceTransformIndexMap
    }
  }
};

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {
            settingRecord,
            viewRecord,
            workerInstanceRecord,
            gameObjectRecord,
            directionLightRecord,
            pointLightRecord
          } as state =
        StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      let offscreen = ViewService.getCanvas(viewRecord) |> Worker.transferControlToOffscreen;
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessageWithTransferData(
           _buildData(operateType, offscreen, stateData),
           [|offscreen|]
         );
      Some(operateType)
    }
  );