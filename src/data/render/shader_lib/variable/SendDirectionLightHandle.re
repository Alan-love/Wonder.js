open DirectionLightType;

let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), state: StateDataType.state) => {
      /* TODO test */
      WonderLog.Contract.requireCheck(
        () => {
          open WonderLog;
          open Contract;
          open Operators;
          let maxCount = DirectionLightHelper.getBufferMaxCount();
          test(
            Log.buildAssertMessage(
              ~expect={j|max buffer count === 4|j},
              ~actual={j|is $maxCount|j}
            ),
            () => maxCount == 4
          )
        },
        StateData.stateData.isDebug
      );
      let {index} = DirectionLightAdmin.getLightData(state);
      let lightGLSLDataStructureMemberNameArr = [|
        {
          position: "u_directionLights[0].position",
          color: "u_directionLights[0].color",
          intensity: "u_directionLights[0].intensity"
        },
        {
          position: "u_directionLights[1].position",
          color: "u_directionLights[1].color",
          intensity: "u_directionLights[1].intensity"
        },
        {
          position: "u_directionLights[2].position",
          color: "u_directionLights[2].color",
          intensity: "u_directionLights[2].intensity"
        },
        {
          position: "u_directionLights[3].position",
          color: "u_directionLights[3].color",
          intensity: "u_directionLights[3].intensity"
        }
      |];
      WonderCommonlib.ArraySystem.range(0, index - 1)
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, index) => {
               let {position, color, intensity} = lightGLSLDataStructureMemberNameArr[index];
               [@bs]
               GLSLSenderSystem.sendVec3(
                 gl,
                 uniformCacheMap,
                 (
                   position,
                   GLSLLocationSystem.getUniformLocation(program, position, uniformLocationMap, gl)
                 ),
                 DirectionLightAdmin.getPosition(index, state)
               );
               [@bs]
               GLSLSenderSystem.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   color,
                   GLSLLocationSystem.getUniformLocation(program, color, uniformLocationMap, gl)
                 ),
                 DirectionLightAdmin.getColor(index, state)
               );
               [@bs]
               GLSLSenderSystem.sendFloat(
                 gl,
                 uniformCacheMap,
                 (
                   intensity,
                   GLSLLocationSystem.getUniformLocation(
                     program,
                     intensity,
                     uniformLocationMap,
                     gl
                   )
                 ),
                 DirectionLightAdmin.getIntensity(index, state)
               );
               state
             }
           ),
           state
         )
    }
  );