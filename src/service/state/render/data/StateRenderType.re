open GLSLSenderType;

open GeometryType;

open ProgramType;

open RenderMeshRendererType;

open RenderGeometryType;

open RenderBasicMaterialType;

open RenderLightMaterialType;

open RenderBasicSourceTextureType;

open RenderArrayBufferViewSourceTextureType;

open RenderSceneType;

open RenderDirectionLightType;

open RenderPointLightType;

open RenderTransformType;

open RenderWorkerDetectType;

open VboBufferType;

open TypeArrayPoolType;

open RenderSourceInstanceType;

open GPUDetectType;

open GlobalTempType;

open DeviceManagerType;

open RenderShaderType;

open RenderSettingType;

open BrowserDetectType;

type renderState = {
  sceneRecord,
  vboBufferRecord,
  typeArrayPoolRecord,
  glslSenderRecord,
  programRecord,
  geometryRecord,
  cameraRecord: option(RenderCameraType.renderCameraRecord),
  basicMaterialRecord,
  lightMaterialRecord,
  meshRendererRecord,
  basicSourceTextureRecord,
  arrayBufferViewSourceTextureRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
  sourceInstanceRecord,
  gpuDetectRecord,
  globalTempRecord,
  deviceManagerRecord,
  shaderRecord,
  settingRecord,
  workerDetectRecord,
  browserDetectRecord,
};