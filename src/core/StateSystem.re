open StateDataType;

let getState = (stateData: stateData) : state => Js.Option.getExn(stateData.state);

let setState = (~stateData: stateData, state: state) => {
  stateData.state = Some(state);
  state
};

/* todo move out */
/* todo set more settings */
let convertRenderSettingToRecord = (render_setting) => {
  open Json;
  open Decode;
  let json = render_setting |> Js.Json.parseExn;
  {
    platform: json |> field("platform", string),
    backend:
      json
      |> field(
           "backend",
           (json) => {
             name: json |> field("name", string),
             fail: json |> optional(field("fail", string))
           }
         ),
    browser:
      json
      |> field(
           "browser",
           (json) =>
             json
             |> array(
                  (json) => {
                    name: json |> field("name", string),
                    version: json |> field("version", string)
                  }
                )
         ),
    init_pipeline: json |> field("init_pipeline", string),
    render_pipeline: json |> field("render_pipeline", string)
  }
};

let _convertPipelinesToRecord = (pipelines) =>
  Render_setting.(
    Json.(
      Decode.(
        pipelines
        |> Js.Json.parseExn
        |> array(
             (json) => {
               name: json |> field("name", string),
               jobs:
                 json
                 |> field(
                      "jobs",
                      array(
                        (json) => {
                          name: json |> field("name", string),
                          flags: json |> optional(field("flags", (json) => json |> array(string)))
                        }
                      )
                    )
             }
           )
      )
    )
  );

let _convertJobsToRecord = (jobs) =>
  Render_setting.(
    Json.(
      Decode.(
        jobs
        |> Js.Json.parseExn
        |> array(
             (json) => {
               name: json |> field("name", string),
               shader: json |> optional(field("shader", string))
             }
           )
      )
    )
  );

let convertInitPipelinesToRecord = (init_pipelines) => _convertPipelinesToRecord(init_pipelines);

let convertInitJobsToRecord = (init_jobs) => _convertJobsToRecord(init_jobs);

let convertRenderPipelinesToRecord = (render_pipelines) =>
  _convertPipelinesToRecord(render_pipelines);

let convertRenderJobsToRecord = (render_jobs) => _convertJobsToRecord(render_jobs);

let convertShadersToRecord = (shaders) => {
  open Json;
  open Decode;
  let json = shaders |> Js.Json.parseExn;
  {
    groups:
      json
      |> field(
           "groups",
           (json) =>
             json
             |> array(
                  (json) => {name: json |> field("name", string), value: json |> array(string)}
                )
         ),
    basic_material:
      json
      |> field(
           "init_basic_material",
           (json) =>
             json
             |> array(
                  (json) => {
                    name: json |> field("name", string),
                    shader_libs:
                      json
                      |> array(
                           fun (json) => (
                             {
                               type_: json |> optional(field("type", string)),
                               name: json |> field("name", string)
                             }: shaderLibItem
                           )
                         )
                  }
                )
         )
  }
};

let convertShaderLibsToRecord = (shader_libs) =>
  Json.(
    Decode.(
      shader_libs
      |> Js.Json.parseExn
      |> array(
           (json) => {
             name: json |> field("name", string),
             glsls:
               json
               |> optional(
                    field(
                      "glsls",
                      (json) =>
                        json
                        |> array(
                             (json) => {
                               type_: json |> field("type", string),
                               name: json |> field("name", string)
                             }
                           )
                    )
                  ),
             variables:
               json
               |> optional(
                    field(
                      "variables",
                      (json) => {
                        uniforms:
                          json
                          |> optional(
                               field(
                                 "uniforms",
                                 (json) =>
                                   json
                                   |> array(
                                        (json) => {
                                          name: json |> field("name", string),
                                          field: json |> field("field", string),
                                          type_: json |> field("type", string),
                                          from: json |> field("from", string)
                                        }
                                      )
                               )
                             ),
                        attributes:
                          json
                          |> optional(
                               field(
                                 "attributes",
                                 (json) =>
                                   json
                                   |> array(
                                        (json) => {
                                          name: json |> optional(field("name", string)),
                                          buffer: json |> field("buffer", string),
                                          type_: json |> optional(field("type", string))
                                        }
                                      )
                               )
                             )
                      }
                    )
                  )
           }
         )
    )
  );

/* todo is bucklescript support bit operation? */
let _execBitOrOperation: (int, int) => int = [%bs.raw {| function(a, b) {
    return a | b;
}
|}];

let _getBitFromFlags = (gl, flags) => {
  let bit = ref(None);
  if (ArraySystem.includes("COLOR_BUFFER", flags)) {
    switch bit^ {
    | None => bit := Some(Gl.getColorBufferBit(gl))
    | Some(b) => bit := Some(_execBitOrOperation(b, Gl.getColorBufferBit(gl)))
    }
  } else if (ArraySystem.includes("DEPTH_BUFFER", flags)) {
    switch bit^ {
    | None => bit := Some(Gl.getDepthBufferBit(gl))
    | Some(b) => bit := Some(_execBitOrOperation(b, Gl.getDepthBufferBit(gl)))
    }
  } else if (ArraySystem.includes("STENCIL_BUFFER", flags)) {
    switch bit^ {
    | None => bit := Some(Gl.getStencilBufferBit(gl))
    | Some(b) => bit := Some(_execBitOrOperation(b, Gl.getStencilBufferBit(gl)))
    }
  } else {
    ()
  };
  Js.Option.getExn(bit^)
};

/* todo refactor: move out */
let createJobHandleMap = () =>
  HashMapSystem.(
    createEmpty()
    |> set("init_basic_material", (configData, gl, state) => BasicMaterialSystem.init(gl, state))
    /* |> set("get_render_list", MeshRendererSystem.getRenderList); */
    |> set(
         "get_render_list",
         /* RenderDataSystem.setToStateRenderData(
              (flags, state) => {
                state.renderData.renderList = Some(MeshRendererSystem.getRenderList(state));
                state
              }
            ) */
         /* todo refactor? */
         (configData, gl, state) => {
           state.renderData.renderList = Some(MeshRendererSystem.getRenderList(state));
           state
         }
       )
    |> set(
         "get_camera_data",
         /* RenderDataSystem.setToStateRenderData(
              (flags, state) => {
                state.renderData.cameraData = Some(RenderDataSystem.getCameraData(state));
                state
              }
            ) */
         (configData, gl, state) => {
           state.renderData.cameraData = Some(RenderDataSystem.getCameraData(state));
           state
         }
       )
    |> set(
         "clear_color",
         ((flags: jobFlags, _), gl, state) =>
           switch flags {
           | None => RenderConfigSystem.throwJobFlagsShouldBeDefined()
           | Some(flags) =>
             DeviceManagerSystem.clearColor(gl, ColorSystem.convert16HexToRGBA(flags[0]), state)
           }
       )
    |> set(
         "clear_buffer",
         ((flags, _), gl, state) =>
           switch flags {
           | None => RenderConfigSystem.throwJobFlagsShouldBeDefined()
           | Some(flags) => DeviceManagerSystem.clearBuffer(gl, _getBitFromFlags(gl, flags), state)
           }
       )
    |> set("render_basic", (configData, gl, state) => RenderBasicSystem.render(gl, state))
  );

let createState = () => {
  bufferConfig: None,
  renderConfig: {
    jobHandleMap: createJobHandleMap(),
    render_setting: convertRenderSettingToRecord(Render_setting.render_setting),
    init_pipelines: convertInitPipelinesToRecord(Init_pipelines.init_pipelines),
    render_pipelines: convertRenderPipelinesToRecord(Render_pipelines.render_pipelines),
    init_jobs: convertInitJobsToRecord(Init_jobs.init_jobs),
    render_jobs: convertRenderJobsToRecord(Render_jobs.render_jobs),
    shaders: convertShadersToRecord(Shaders.shaders),
    shader_libs: convertShaderLibsToRecord(Shader_libs.shader_libs)
  },
  viewData: {canvas: None, contextConfig: None},
  initConfigData: {isTest: Some(false)},
  deviceManagerData: {gl: None, colorWrite: None, clearColor: None},
  gameObjectData: GameObjectSystem.initData(),
  transformData: None,
  cameraControllerData: CameraControllerSystem.initData(),
  materialData: None,
  geometryData: None,
  meshRendererData: MeshRendererSystem.initData(),
  shaderData: ShaderSystem.initData(),
  programData: ProgramSystem.initData(),
  glslSenderData: GLSLSenderSystem.initData(),
  glslChunkData: ShaderChunkSystem.initData(),
  renderData: {renderList: None, cameraData: None}
};