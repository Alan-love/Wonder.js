open NoWorkerJobConfigType;

open NoWorkerJobConfigParseSystem;

let buildNoWorkerJobConfig =
    (
      ~noWorkerSetting={|
    {
    "init_pipeline": "default",
    "loop_pipeline": "default"
}
|},
      ~initPipelines={|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "create_canvas"
        },
        {
          "name": "create_gl"
        },
        {
          "name": "set_full_screen"
        },
        {
          "name": "set_viewport"
        },
        {
          "name": "detect_gl"
        },
        {
          "name": "init_cameraController"
        },
        {
          "name": "init_geometry"
        },
        {
          "name": "start_time"
        },
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_state"
        },
        {
          "name": "init_basic_material"
        },
        {
          "name": "init_light_material"
        }
      ]
    }
  ]
        |},
      ~loopPipelines={|
[
    {
        "name": "default",
        "jobs": [
            {
                "name": "tick"
            },
            {
                "name": "update_cameraController"
            },
            {
                "name": "get_render_array"
            },
            {
                "name": "get_camera_data"
            },
            {
                "name": "clear_color"
            },
            {
                "name": "clear_buffer"
            },
            {
                "name": "clear_last_send_component"
            },
            {
                "name": "send_uniform_shader_data"
            },
            {
                "name": "render_basic"
            },
            {
                "name": "front_render_light"
            }
        ]
    }
]
        |},
      ~initJobs={|
[
    {
        "name": "create_canvas"
    },
    {
        "name": "create_gl"
    },
    {
        "name": "set_full_screen"
    },
    {
        "name": "set_viewport"
    },
    {
        "name": "detect_gl"
    },
    {
        "name": "init_cameraController"
    },
    {
        "name": "init_geometry"
    },
    {
        "name": "start_time"
    },
    {
        "name": "preget_glslData"
    },
    {
        "name": "init_state"
    },
    {
        "name": "init_basic_material"
    },
    {
        "name": "init_light_material"
    }
]
        |},
      ~loopJobs={|
[
    {
        "name": "tick"
    },
    {
        "name": "update_cameraController"
    },
    {
        "name": "get_render_array"
    },
    {
        "name": "get_camera_data"
    },
    {
        "name": "clear_color",
        "flags": [
            "#000000"
        ]
    },
    {
        "name": "clear_buffer",
        "flags": [
            "COLOR_BUFFER",
            "DEPTH_BUFFER",
            "STENCIL_BUFFER"
        ]
    },
    {
        "name": "clear_last_send_component"
    },
    {
        "name": "send_uniform_shader_data"
    },
    {
        "name": "render_basic"
    },
    {
        "name": "front_render_light"
    }
]
        |},
      ()
    ) => (
  noWorkerSetting,
  initPipelines,
  loopPipelines,
  initJobs,
  loopJobs
);

let initData =
    (
      (noWorkerSetting, initPipelines, loopPipelines, initJobs, loopJobs),
      state: StateDataType.state
    ) => {
  ...state,
  noWorkerJobConfig:
    Some({
      setting: convertNoWorkerSettingToRecord(noWorkerSetting |> Js.Json.parseExn),
      initPipelines: convertInitPipelinesToRecord(initPipelines |> Js.Json.parseExn),
      loopPipelines: convertLoopPipelinesToRecord(loopPipelines |> Js.Json.parseExn),
      initJobs: convertInitJobsToRecord(initJobs |> Js.Json.parseExn),
      loopJobs: convertLoopJobsToRecord(loopJobs |> Js.Json.parseExn)
    })
};

let getSetting = NoWorkerJobConfigSystem.getSetting;

let getInitPipelines = NoWorkerJobConfigSystem.getInitPipelines;

let getInitJobs = NoWorkerJobConfigSystem.getInitJobs;

let getLoopPipelines = NoWorkerJobConfigSystem.getLoopPipelines;

let getLoopJobs = NoWorkerJobConfigSystem.getLoopJobs;

let getInitPipelines = NoWorkerJobConfigSystem.getInitPipelines;