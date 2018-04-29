open SettingType;

open SettingGPUType;

let convertToRecord = (setting) => {
  open Json;
  open Decode;
  let json = setting;
  {
    isDebug: json |> optional(field("is_debug", bool)),
    canvasId: json |> optional(field("canvas_id", string)),
    memory:
      json
      |> optional(
           field(
             "memory",
             (json) => {
               maxDisposeCount: json |> field("maxDisposeCount", int),
               maxTypeArrayPoolSize: json |> field("maxTypeArrayPoolSize", int),
               maxBigTypeArrayPoolSize: json |> field("maxBigTypeArrayPoolSize", int)
             }
           )
         ),
    buffer:
      json
      |> optional(
           field(
             "buffer",
             (json) => {
               customGeometryPointDataBufferCount:
                 json |> field("custom_geometry_point_data_buffer_count", int),
               transformDataBufferCount: json |> field("transform_data_buffer_count", int),
               basicMaterialDataBufferCount: json |> field("basic_material_data_buffer_count", int),
               lightMaterialDataBufferCount: json |> field("light_material_data_buffer_count", int),
               instanceBuffer:
                 json
                 |> field(
                      "instanceBuffer",
                      (json) => {
                        sourceInstanceCount: json |> field("sourceInstanceCount", int),
                        objectInstanceCountPerSourceInstance:
                          json |> field("objectInstanceCountPerSourceInstance", int)
                      }
                    )
             }
           )
         ),
    context:
      json
      |> optional(
           field(
             "context",
             (json) => {
               alpha: json |> field("alpha", bool),
               depth: json |> field("depth", bool),
               stencil: json |> field("stencil", bool),
               antialias: json |> field("antialias", bool),
               premultipliedAlpha: json |> field("premultiplied_alpha", bool),
               preserveDrawingBuffer: json |> field("preserve_drawing_buffer", bool)
             }
           )
         ),
    gpu:
      json
      |> optional(
           field(
             "gpu",
             (json) => {useHardwareInstance: json |> field("use_hardware_instance", bool)}
           )
         ),
    worker:
      json |> optional(field("worker", (json) => {useWorker: json |> field("use_worker", bool)}))
  }
};