let initWithoutBuildFakeDom =
    (
      ~sandbox,
      /* ~isDebug=Js.Nullable.return(Js.true_), */
      ~isDebug=Js.true_,
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(300)},
      ()
    ) => {
  Random.init(1);
  /* SettingParseSystem.convertToRecord(SettingTool.buildSetting(isDebug) |> Js.Json.parseExn)
     |> ConfigDataLoaderSystem._setSetting(StateTool.getStateData(), StateSystem.getState(stateData))
     |> StateTool.setState */
  /* TODO set bufferConfig */
  SettingTool.createStateAndSetToStateData(~isDebug, ())
  /* Main.setMainConfig(MainTool.buildMainConfig(~isDebug, ~bufferConfig, ()))
     |> (
       (state) => {
         StateData.stateData.state = Some(state);
         state
       }
     ) */
};

let init =
    (
      ~sandbox,
      ~isDebug=Js.true_,
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(300)},
      ()
    ) => {
  SettingTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ())
};

let initWithJobConfigWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug=Js.true_,
      ~canvasId=None,
      ~context={|
        {
        "alpha": true,
        "depth": true,
        "stencil": false,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
               |},
      ~useHardwareInstance="true",
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(5)},
      ~noWorkerJobConfig=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ()
    ) =>
  SettingTool.createStateAndSetToStateData(~isDebug, ~canvasId, ~context, ~useHardwareInstance, ())
  |> NoWorkerJobConfigTool.initData(noWorkerJobConfig)
  |> NoWorkerJobTool.init;

let initWithJobConfig =
    (
      ~sandbox,
      ~isDebug=Js.true_,
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(5)},
      ~noWorkerJobConfig=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ()
    ) => {
  SettingTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithJobConfigWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ~noWorkerJobConfig, ())
};

let openContractCheck = () => InitConfigSystem.setIsDebug(true, StateData.stateData) |> ignore;

let closeContractCheck = () => InitConfigSystem.setIsDebug(false, StateData.stateData) |> ignore;