open GlType;

open ComponentType;

open TransformType;

open CameraControllerType;

open GameObjectType;

open GeometryType;

open MeshRendererType;

open MaterialType;

open BasicMaterialType;

open LightMaterialType;

open AmbientLightType;

open ShaderType;

open ProgramType;

open GLSLLocationType;

open GLSLSenderType;

open ShaderChunkType;

open RenderDataType;

open TimeControllerType;

open Js.Typed_array;

open MemoryConfigType;

open VboBufferType;

open GPUDetectType;

open SourceInstanceType;

open ObjectInstanceType;

open GlobalTempType;

open TypeArrayPoolType;

open LogicJobConfigType;

open RenderJobConfigType;

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {mutable geometryPointDataBufferCount: int};

type gpuConfig = {mutable useHardwareInstance: bool};

type viewData = {
  canvas: option(DomType.htmlElement),
  contextConfig: option(contextConfig)
};

type initConfig = {isDebug: bool};

type colorRgba = (float, float, float, float);

type deviceManagerData = {
  gl: option(webgl1Context),
  colorWrite: option((Js.boolean, Js.boolean, Js.boolean, Js.boolean)),
  clearColor: option(colorRgba),
  viewport: option((float, float, float, float))
};

type attributeSendData = {
  pos: attributeLocation,
  size: int,
  buffer: string,
  sendFunc: [@bs] ((webgl1Context, (attributeLocation, int), buffer, state) => state)
}
and instanceAttributeSendData = {pos: attributeLocation}
and uniformSendNoCachableData = {
  pos: uniformLocation,
  getNoCachableDataFunc: [@bs] ((component, state) => Float32Array.t),
  sendNoCachableDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and uniformSendCachableData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getCachableDataFunc: [@bs] ((component, state) => array(float)),
  sendCachableDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
}
and shaderUniformSendNoCachableData = {
  pos: uniformLocation,
  getNoCachableDataFunc: [@bs] (state => Float32Array.t),
  sendNoCachableDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and shaderUniformSendCachableFunctionData = {
  program,
  shaderCacheMap,
  locationMap: uniformLocationMapOfShader,
  sendCachableFunctionDataFunc:
    [@bs] ((webgl1Context, (program, shaderCacheMap, uniformLocationMapOfShader), state) => state)
}
and instanceUniformSendNoCachableData = {
  pos: uniformLocation,
  getNoCachableDataFunc: [@bs] ((transform, state) => Float32Array.t),
  sendNoCachableDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and glslSenderData = {
  attributeSendDataMap: array(array(attributeSendData)),
  instanceAttributeSendDataMap: array(array(instanceAttributeSendData)),
  uniformCacheMap,
  uniformSendNoCachableDataMap: array(array(uniformSendNoCachableData)),
  uniformSendCachableDataMap: array(array(uniformSendCachableData)),
  shaderUniformSendNoCachableDataMap: array(array(shaderUniformSendNoCachableData)),
  shaderUniformSendCachableFunctionDataMap: array(array(shaderUniformSendCachableFunctionData)),
  instanceUniformSendNoCachableDataMap: array(array(instanceUniformSendNoCachableData)),
  /* drawPointsFuncMap: array((webgl1Context => unit)), */
  mutable vertexAttribHistoryArray: array(bool),
  mutable lastSendArrayBuffer: option(buffer),
  mutable lastSendElementArrayBuffer: option(buffer),
  mutable lastSendMaterial: option(material)
}
and jobData = {
  logicInitJobList: list((string, state => state)),
  renderInitJobList: list((string, (webgl1Context, state) => state)),
  logicUpdateJobList: list((string, (float, state) => state)),
  renderRenderJobList: list((string, (webgl1Context, state) => state))
}
and geometryData = {
  mutable index: int,
  verticesMap: geometryVerticesMap,
  normalsMap: geometryNormalsMap,
  indicesMap: geometryIndicesMap,
  mutable computeDataFuncMap: array(((int, state) => geometryComputeData)),
  mutable configDataMap: geometryConfigDataMap,
  mutable gameObjectMap,
  mutable disposedIndexArray: geometryDisposedIndexArray,
  mutable isInitMap: geometryIsInitMap,
  mutable groupCountMap: geometryGroupCountMap
}
and state = {
  bufferConfig: option(bufferConfig),
  gpuConfig: option(gpuConfig),
  memoryConfig,
  jobData,
  logicJobConfig: option(logicJobConfig),
  renderJobConfig: option(renderJobConfig),
  gpuDetectData,
  sourceInstanceData,
  objectInstanceData,
  viewData,
  initConfig,
  deviceManagerData,
  gameObjectData,
  /* TODO transformData, geometryData, meshRendererData not mutable? */
  mutable transformData: option(transformData),
  cameraControllerData,
  basicMaterialData,
  lightMaterialData,
  ambientLightData,
  mutable geometryData: option(geometryData),
  mutable meshRendererData,
  shaderData,
  programData,
  glslLocationData,
  glslSenderData,
  glslChunkData,
  renderData,
  timeControllerData,
  vboBufferData,
  globalTempData,
  typeArrayPoolData
};

type sharedDataForRestoreState = {
  gl: webgl1Context,
  float32ArrayPoolMap,
  uint16ArrayPoolMap
};

type stateData = {
  mutable state: option(state),
  mutable isDebug: bool
};