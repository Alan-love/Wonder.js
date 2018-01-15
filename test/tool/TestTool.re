let initWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(300)}),
      ()
    ) => {
  Random.init(1);
  Main.setMainConfig(MainTool.buildMainConfig(~isDebug, ~bufferConfig, ()))
  |> (
    (state) => {
      StateData.stateData.state = Some(state);
      state
    }
  )
};

let init =
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(300)}),
      ()
    ) => {
  MainTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ())
};

let initWithRenderConfigWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(5)}),
      ~renderConfig,
      ()
    ) =>
  Main.setMainConfig(MainTool.buildMainConfig(~isDebug, ~bufferConfig, ()))
  |> (
    (state) => {
      StateData.stateData.state = Some(state);
      state
    }
  );

let initWithRenderConfig =
    /* ~renderConfig=(
         Render_setting.render_setting,
         Init_pipelines.init_pipelines,
         Render_pipelines.render_pipelines,
         Init_jobs.init_jobs,
         Render_jobs.render_jobs,
         Shaders.shaders,
         Shader_libs.shader_libs
       ), */
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(5)}),
      ~renderConfig,
      ()
    ) => {
  MainTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithRenderConfigWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ~renderConfig, ())
};

let openContractCheck = () =>
  InitConfigSystem.setIsTest(~isDebug=true, StateData.stateData) |> ignore;

let closeContractCheck = () =>
  InitConfigSystem.setIsTest(~isDebug=false, StateData.stateData) |> ignore;