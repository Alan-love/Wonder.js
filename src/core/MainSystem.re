open MainConfigType;

open StateDataType;

open InitConfigSystem;

open InitDeviceSystem;

open ViewSystem;

open DeviceManagerSystem;

open JsObjUtils;

/* todo not set default twice! */
let _changeToContextConfigRecord = (contextConfigObj: Js.t({..})) : MainConfigType.contextConfig => {
  alpha: Js.to_bool(getValueFromJsObj(contextConfigObj##alpha, Js.true_)),
  depth: Js.to_bool(getValueFromJsObj(contextConfigObj##depth, Js.true_)),
  stencil: Js.to_bool(getValueFromJsObj(contextConfigObj##stencil, Js.false_)),
  antialias: Js.to_bool(getValueFromJsObj(contextConfigObj##antialias, Js.true_)),
  premultipliedAlpha: Js.to_bool(getValueFromJsObj(contextConfigObj##premultipliedAlpha, Js.true_)),
  preserveDrawingBuffer:
    Js.to_bool(getValueFromJsObj(contextConfigObj##preserveDrawingBuffer, Js.false_))
};

let _changeToBufferConfigRecord = (bufferConfigObj: Js.t({..})) : MainConfigType.bufferConfig => {
  geometryPointDataBufferCount:
    getValueFromJsObj(bufferConfigObj##geometryPointDataBufferCount, 1000 * 1000)
};

let _changeToGpuConfigRecord = (gpuConfigObj: Js.t({..})) : MainConfigType.gpuConfig => {
  useHardwareInstance: Js.to_bool(getValueFromJsObj(gpuConfigObj##useHardwareInstance, Js.true_))
};

let _changeConfigToRecord = (config: configJsObj) : mainConfigData => {
  canvasId: getOptionValueFromJsObj(config##canvasId),
  isTest: Js.to_bool(getValueFromJsObj(config##isTest, Js.false_)),
  contextConfig:
    switch (Js.Nullable.to_opt(config##contextConfig)) {
    | Some(contextConfig) => _changeToContextConfigRecord(contextConfig)
    | None => {
        alpha: true,
        depth: true,
        stencil: false,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false
      }
    },
  bufferConfig:
    switch (Js.Nullable.to_opt(config##bufferConfig)) {
    | Some(bufferConfig) => _changeToBufferConfigRecord(bufferConfig)
    | None => {geometryPointDataBufferCount: 1000 * 1000}
    },
  gpuConfig:
    switch (Js.Nullable.to_opt(config##gpuConfig)) {
    | Some(gpuConfig) => _changeToGpuConfigRecord(gpuConfig)
    | None => {useHardwareInstance: true}
    }
};

let setConfig = (config: Js.t({..}), state: state) => {
  let config = _changeConfigToRecord(config);
  setIsTest(~isTest=config.isTest, StateData.stateData);
  (config, state)
};

/* todo set pixel ratio ... */
let init = ((config: mainConfigData, state: state)) => {
  let canvas = createCanvas(config);
  let gl = canvas |> setToFullScreen(getFullScreenData()) |> createGL(config.contextConfig);
  state
  |> setGl(gl)
  |> setCanvas(canvas)
  |> setContextConfig(config.contextConfig)
  |> BufferConfigSystem.setConfig(~bufferConfig=config.bufferConfig)
  |> GpuConfigSystem.setConfig(config.gpuConfig)
  |> GPUDetectSystem.detect(gl)
  |> GameObjectAdmin.initDataFromState
};