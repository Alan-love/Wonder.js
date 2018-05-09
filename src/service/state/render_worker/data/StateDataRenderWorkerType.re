open GPUDetectType;

open RenderWorkerSettingType;

open RenderWorkerBasicMaterialType;

open RenderWorkerLightMaterialType;

open RenderWorkerTextureType;

open RenderWorkerAmbientLightType;

open RenderWorkerDirectionLightType;

open RenderWorkerPointLightType;

open RenderWorkerSourceInstanceType;

open RenderWorkerTransformType;

open RenderWorkerBoxGeometryType;

open RenderWorkerCustomGeometryType;

open RenderWorkerRenderType;

open RenderWorkerWorkerDetectType;

open GlType;

open ComponentType;

open Js.Typed_array;

open StateRenderType;

open GLSLLocationType;

open MaterialType;

open GeometryType;

open ShaderChunkType;

open VboBufferType;

open TypeArrayPoolType;

open GlobalTempType;

type renderWorkerState = {
  mutable settingRecord,
  mutable renderConfigRecord: option(RenderConfigType.renderConfigRecord),
  mutable gpuDetectRecord,
  mutable deviceManagerRecord: DeviceManagerType.deviceManagerRecord,
  mutable shaderRecord: ShaderType.shaderRecord,
  mutable programRecord: ProgramType.programRecord,
  mutable glslRecord: GLSLType.glslRecord,
  mutable glslSenderRecord,
  mutable glslLocationRecord,
  mutable glslChunkRecord,
  mutable sourceInstanceRecord,
  mutable basicMaterialRecord: option(basicMaterialRecord),
  mutable lightMaterialRecord: option(lightMaterialRecord),
  mutable textureRecord: option(textureRecord),
  mutable transformRecord: option(transformRecord),
  mutable boxGeometryRecord,
  mutable customGeometryRecord: option(customGeometryRecord),
  mutable ambientLightRecord: option(ambientLightRecord),
  mutable directionLightRecord: option(directionLightRecord),
  mutable pointLightRecord: option(pointLightRecord),
  mutable renderRecord,
  mutable typeArrayPoolRecord,
  mutable vboBufferRecord,
  mutable globalTempRecord,
  mutable workerDetectRecord: option(workerDetectRecord)
};

type renderWorkerStateData = {mutable state: option(renderWorkerState)};