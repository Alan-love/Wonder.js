open Gl;

open GlType;

open GPUDetectType;

let _getExtension = (name: string, gl) =>
  (
    switch name {
    | "instanced_arrays" => gl |> getExtension("ANGLE_instanced_arrays")
    | _ => gl |> getExtension(name)
    }
  )
  |> Obj.magic
  |> Js.toOption;

let _detectExtension = (gl, record) => {
  ...record,
  extensionInstancedArrays: _getExtension("instanced_arrays", gl)
};

let _detectPrecision = (gl, record) => {
  /* TODO handle Some experimental-webgl implementations do not have getShaderPrecisionFormat:

     if (!gl.getShaderPrecisionFormat) {
         record.precision = EGPUPrecision.HIGHP;

         return;
     } */
  let vertexShader = gl |> getVertexShader;
  let fragmentShader = gl |> getFragmentShader;
  let highFloat = gl |> getHighFloat;
  let mediumFloat = gl |> getMediumFloat;
  /* let lowFloat = gl |> getLowFloat; */
  let vertexShaderPrecisionHighpFloat = gl |> getShaderPrecisionFormat(vertexShader, highFloat);
  let vertexShaderPrecisionMediumpFloat =
    gl |> getShaderPrecisionFormat(vertexShader, mediumFloat);
  let fragmentShaderPrecisionHighpFloat =
    gl |> getShaderPrecisionFormat(fragmentShader, highFloat);
  let fragmentShaderPrecisionMediumpFloat =
    gl |> getShaderPrecisionFormat(fragmentShader, mediumFloat);
  let highpAvailable =
    vertexShaderPrecisionHighpFloat##precision > 0
    && fragmentShaderPrecisionHighpFloat##precision > 0;
  let mediumpAvailable =
    vertexShaderPrecisionMediumpFloat##precision > 0
    && fragmentShaderPrecisionMediumpFloat##precision > 0;
  if (! highpAvailable) {
    if (mediumpAvailable) {
      WonderLog.Log.warn({j|not support highp, using mediump instead|j});
      {...record, precision: Some(MEDIUMP)}
    } else {
      WonderLog.Log.warn({j|not support highp and mediump, using lowp instead|j});
      {...record, precision: Some(LOWP)}
    }
  } else {
    {...record, precision: Some(HIGHP)}
  }
};

let _detectCapabilty = (gl, record) => _detectPrecision(gl, record);

let detect = (gl, record) => {
    record |> _detectExtension(gl) |> _detectCapabilty(gl)
};

let hasExtension = (extension) => Js.Option.isSome(extension);

let unsafeGetInstanceExtension = (record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|extensionInstancedArrays exist|j},
                ~actual={j|not|j}
              ),
              () => record.extensionInstancedArrays |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  record.extensionInstancedArrays |> OptionService.unsafeGet; 
};