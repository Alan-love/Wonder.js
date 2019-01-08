open SubStateSendRenderDataType;

let send =
  (. gl, (program, uniformCacheMap, uniformLocationMap), {sceneRecord}) => {
    let name = "u_ambient";

    SendGLSLDataService.sendFloat3(.
      gl,
      uniformCacheMap,
      (
        name,
        GLSLLocationService.getUniformLocation(
          program,
          name,
          uniformLocationMap,
          gl,
        ),
      ),
      GetDataRenderAmbientLightService.getColor(sceneRecord),
    );
  };