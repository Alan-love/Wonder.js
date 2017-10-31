open StateDataType;

let getState (stateData: stateData) :state => Js.Option.getExn stateData.state;

let setState stateData::(stateData: stateData) (state: state) => {
  stateData.state = Some state;
  state
};

/* todo move out */
/* todo set more settings */
let convertRenderSettingToRecord render_setting => {
  /* open RenderConfigType; */
  /* open StateDataType; */
  /* open Render_setting; */
  open Json;
  open Decode;
  let json = render_setting |> Js.Json.parseExn;
  {
    platform: json |> field "platform" string,
    backend:
      json
      |> field
           "backend"
           (
             fun json => {
               name: json |> field "name" string,
               fail: json |> optional (field "fail" string)
             }
           ),
    browser:
      json
      |> field
           "browser"
           (
             fun json =>
               json
               |> array (
                    fun json => {
                      name: json |> field "name" string,
                      version: json |> field "version" string
                    }
                  )
           ),
    /* [ {name: json |> field "name" string} ] }), */
    init_pipeline: json |> field "init_pipelines" string,
    render_pipeline: json |> field "render_pipelines" string
  }
};

let convertInitPipelinesToRecord init_pipelines =>
  Render_setting.(
    Json.(
      Decode.
        /* let json = init_pipelines |> Js.Json.parseExn; */
        (
          init_pipelines
          |> Js.Json.parseExn
          |> array (
               fun json => {
                 name: json |> field "name" string,
                 jobs: json |> array (fun json => {name: json |> field "name" string})
               }
             )
        )
    )
  );

let convertInitJobsToRecord init_jobs =>
  Render_setting.(
    Json.(
      Decode.(
        init_jobs |> Js.Json.parseExn |> array (fun json => {name: json |> field "name" string})
      )
    )
  );

let createJobHandleMap () =>
  HashMapSystem.(createEmpty () |> set "init_basic_material" BasicMaterialSystem.init);

let createState () => {
  bufferConfig: None,
  renderConfig: {
    jobHandleMap: createJobHandleMap (),
    render_setting: convertRenderSettingToRecord Render_setting.render_setting,
    init_pipelines: convertInitPipelinesToRecord Init_pipelines.init_pipelines,
    init_jobs: convertInitJobsToRecord Init_jobs.init_jobs
  },
  viewData: {canvas: None, contextConfig: None},
  initConfigData: {isTest: Some false},
  deviceManagerData: {gl: None},
  gameObjectData: GameObjectSystem.initData (),
  transformData: None,
  cameraControllerData: CameraControllerSystem.initData ()
};

let getOptionValueFromState value => Js.Option.getExn value;