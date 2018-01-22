open MainConfigType;

open StateDataType;

open InitConfigSystem;

open InitDeviceSystem;

open DeviceManagerSystem;

open JsObjUtils;

/* TODO not set default twice! */
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
  isDebug: Js.to_bool(getValueFromJsObj(config##isDebug, Js.false_)),
  /* TODO test */
  workerFileDir: getValueFromJsObj(config##workerFileDir, ""),
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
  /* TODO remove geometryPointDataBufferCount */
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
  setIsDebug(~isDebug=config.isDebug, StateData.stateData);
  (config, state)
};

/* TODO use conditional compile */
let _initWorkInstances = (workerFileDir: string, state: state) =>
  WorkerDetectSystem.isSupportRenderWorkerAndSharedArrayBuffer(state) ?
    WorkerInstanceSystem.initWorkInstances(workerFileDir, state) : state;

/* TODO refactor: move to WorkerSystem? */
let _initWorker = (workerFileDir: string, state: state) => {
  let state = state |> WorkerDetectSystem.detect |> _initWorkInstances(workerFileDir);
  /* TODO remove */
  state |> WorkerInstanceSystem.unsafeGetRenderWorker |> Worker.postMessage({"testMsg": "haha"});
  state
};

/* TODO set pixel ratio ... */
let init = ((config: mainConfigData, state: state)) => {
  let canvas = createCanvas(config);
  let gl = canvas |> createGL(config.contextConfig);
  let (state, canvas) = state |> setToFullScreen(getFullScreenData(), gl, canvas);
  state
  |> setGl(gl)
  |> ViewSystem.setCanvas(canvas)
  |> ViewSystem.setContextConfig(config.contextConfig)
  |> BufferConfigSystem.setConfig(~bufferConfig=config.bufferConfig)
  |> GpuConfigSystem.setConfig(config.gpuConfig)
  |> GPUDetectSystem.detect(gl)
  |> GameObjectAdmin.initDataFromState
  |> _initWorker(config.workerFileDir)
};