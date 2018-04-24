open GlType;

open Gl;

open DrawGLSLService;

open RenderConfigType;

open StateRenderType;

let unsafeGetAttributeSendData = (shaderIndex: int, glslSenderRecord) => {
  let {attributeSendDataMap} = glslSenderRecord;
  attributeSendDataMap
  |> WonderCommonlib.SparseMapService.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       (sendData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|attribute send record exist|j},
                   ~actual={j|not|j}
                 ),
                 () => sendData |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};

let unsafeGetInstanceAttributeSendData = (shaderIndex: int, {instanceAttributeSendDataMap}) => {
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapService.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       (sendData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|instance attribute send record exist|j},
                   ~actual={j|not|j}
                 ),
                 () => sendData |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};