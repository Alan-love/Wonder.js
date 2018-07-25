open GPUDetectType;

open RenderWorkerSettingType;

open RenderWorkerCustomType;

open RenderWorkerBasicMaterialType;

open RenderWorkerLightMaterialType;

open RenderWorkerBasicSourceTextureType;

open RenderWorkerArrayBufferViewSourceTextureType;

open RenderWorkerSceneType;

open RenderWorkerDirectionLightType;

open RenderWorkerPointLightType;

open RenderWorkerSourceInstanceType;

open RenderWorkerTransformType;

open RenderWorkerBoxGeometryType;

open RenderWorkerCustomGeometryType;

open RenderWorkerRenderType;

open RenderWorkerWorkerDetectType;

open WonderWebgl.GlType;

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

open BrowserDetectType;

type apiRecord = {
  apiJsObj: {
    .
    "label":
      (
        . WonderImgui.StructureType.rect,
        string,
        WonderImgui.FontType.align,
        renderWorkerState
      ) =>
      renderWorkerState,
    "image":
      (
        . WonderImgui.StructureType.rect,
        WonderImgui.StructureType.uv,
        string,
        renderWorkerState
      ) =>
      renderWorkerState,
    "button":
      (. (int, int, int, int), string, renderWorkerState) =>
      (renderWorkerState, bool),
    "box":
      (. (int, int, int, int), Js.Array.t(float), renderWorkerState) =>
      renderWorkerState,
    "radioButton":
      (
        . Js.Array.t(((int, int, int, int), string)),
        int,
        string,
        renderWorkerState
      ) =>
      (renderWorkerState, int),
    "checkbox":
      (. (int, int, int, int), bool, string, renderWorkerState) =>
      (renderWorkerState, bool),
    "sliderInt":
      (
        . ((int, int, int, int), int),
        (int, int),
        (int, string),
        renderWorkerState
      ) =>
      (renderWorkerState, bool, int),
    "sliderFloat":
      (
        . ((int, int, int, int), int),
        (float, float, int),
        (float, string),
        renderWorkerState
      ) =>
      (renderWorkerState, bool, float),
    "beginGroup":
      (. WonderImgui.StructureType.position, renderWorkerState) =>
      renderWorkerState,
    "endGroup": (. renderWorkerState) => renderWorkerState,
    "getCustomDataFromMainWorkerToRenderWorker":
      renderWorkerState =>
      CustomWorkerDataType.customDataFromMainWorkerToRenderWorker,
    "getCustomDataFromRenderWorkerToMainWorker":
      renderWorkerState =>
      CustomWorkerDataType.customDataFromRenderWorkerToMainWorker,
    "setCustomDataFromRenderWorkerToMainWorker":
      (
        . CustomWorkerDataType.customDataFromRenderWorkerToMainWorker,
        renderWorkerState
      ) =>
      renderWorkerState,
  },
}
and renderWorkerState = {
  mutable sceneRecord,
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
  mutable basicSourceTextureRecord: option(basicSourceTextureRecord),
  mutable arrayBufferViewSourceTextureRecord:
    option(arrayBufferViewSourceTextureRecord),
  mutable transformRecord: option(transformRecord),
  mutable boxGeometryRecord,
  mutable customGeometryRecord: option(customGeometryRecord),
  mutable directionLightRecord: option(directionLightRecord),
  mutable pointLightRecord: option(pointLightRecord),
  mutable renderRecord,
  mutable typeArrayPoolRecord,
  mutable vboBufferRecord,
  mutable globalTempRecord,
  mutable workerDetectRecord: option(workerDetectRecord),
  mutable browserDetectRecord: option(browserDetectRecord),
  mutable imguiRecord: WonderImgui.IMGUIType.imguiRecord,
  mutable apiRecord,
  mutable customRecord,
};

type renderWorkerStateData = {mutable state: option(renderWorkerState)};