open MainStateDataType;

open SettingType;

let convertToRecord = (setting) => {
  open Json;
  open Decode;
  let json = setting;
  {
    isDebug: json |> field("is_debug", bool),
    canvasId: json |> optional(field("canvas_id", string)),
    context:
      json
      |> field(
           "context",
           (json) => {
             alpha: json |> field("alpha", bool),
             depth: json |> field("depth", bool),
             stencil: json |> field("stencil", bool),
             antialias: json |> field("antialias", bool),
             premultipliedAlpha: json |> field("premultiplied_alpha", bool),
             preserveDrawingBuffer: json |> field("preserve_drawing_buffer", bool)
           }
         ),
    gpu:
      json
      |> field(
           "gpu",
           (json) => {useHardwareInstance: json |> field("use_hardware_instance", bool)}
         ),
    worker: json |> field("worker", (json) => {useWorker: json |> field("use_worker", bool)})
  }
};