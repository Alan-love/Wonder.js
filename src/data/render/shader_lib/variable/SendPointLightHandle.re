open MainStateDataType;

open PointLightType;

let getLightGLSLDataStructureMemberNameArr = () => [|
  {
    position: "u_pointLights[0].position",
    color: "u_pointLights[0].color",
    intensity: "u_pointLights[0].intensity",
    constant: "u_pointLights[0].constant",
    linear: "u_pointLights[0].linear",
    quadratic: "u_pointLights[0].quadratic",
    range: "u_pointLights[0].range"
  },
  {
    position: "u_pointLights[1].position",
    color: "u_pointLights[1].color",
    intensity: "u_pointLights[1].intensity",
    constant: "u_pointLights[1].constant",
    linear: "u_pointLights[1].linear",
    quadratic: "u_pointLights[1].quadratic",
    range: "u_pointLights[1].range"
  },
  {
    position: "u_pointLights[2].position",
    color: "u_pointLights[2].color",
    intensity: "u_pointLights[2].intensity",
    constant: "u_pointLights[2].constant",
    linear: "u_pointLights[2].linear",
    quadratic: "u_pointLights[2].quadratic",
    range: "u_pointLights[2].range"
  },
  {
    position: "u_pointLights[3].position",
    color: "u_pointLights[3].color",
    intensity: "u_pointLights[3].intensity",
    constant: "u_pointLights[3].constant",
    linear: "u_pointLights[3].linear",
    quadratic: "u_pointLights[3].quadratic",
    range: "u_pointLights[3].range"
  }
|];

let _sendAttenuation =
    (
      index,
      (gl, program, uniformCacheMap, uniformLocationMap),
      {constant, linear, quadratic, range},
      state
    ) => {
  [@bs]
  SendGLSLDataMainService.sendFloat(
    gl,
    uniformCacheMap,
    (constant, GLSLLocationMainService.getUniformLocation(program, constant, uniformLocationMap, gl)),
    OperatePointLightService.getConstant(index, state.pointLightRecord)
  );
  [@bs]
  SendGLSLDataMainService.sendFloat(
    gl,
    uniformCacheMap,
    (linear, GLSLLocationMainService.getUniformLocation(program, linear, uniformLocationMap, gl)),
    OperatePointLightService.getLinear(index, state.pointLightRecord)
  );
  [@bs]
  SendGLSLDataMainService.sendFloat(
    gl,
    uniformCacheMap,
    (quadratic, GLSLLocationMainService.getUniformLocation(program, quadratic, uniformLocationMap, gl)),
    OperatePointLightService.getQuadratic(index, state.pointLightRecord)
  );
  [@bs]
  SendGLSLDataMainService.sendFloat(
    gl,
    uniformCacheMap,
    (range, GLSLLocationMainService.getUniformLocation(program, range, uniformLocationMap, gl)),
    OperatePointLightService.getRange(index, state.pointLightRecord)
  );
  state
};

let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), state: MainStateDataType.state) => {
      WonderLog.Contract.requireCheck(
        () => {
          open WonderLog;
          open Contract;
          open Operators;
          let maxCount = RecordPointLightService.getBufferMaxCount();
          test(
            Log.buildAssertMessage(
              ~expect={j|max buffer count === 4|j},
              ~actual={j|is $maxCount|j}
            ),
            () => maxCount == 4
          )
        },
        MainStateData.stateData.isDebug
      );
      let lightGLSLDataStructureMemberNameArr = getLightGLSLDataStructureMemberNameArr();
      let {index} = state.pointLightRecord;
      WonderCommonlib.ArraySystem.range(0, index - 1)
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, index) => {
               let {position, color, intensity, constant, linear, quadratic, range} as structureMemberNameData = lightGLSLDataStructureMemberNameArr[index];
               [@bs]
               SendGLSLDataMainService.sendVec3(
                 gl,
                 uniformCacheMap,
                 (
                   position,
                   GLSLLocationMainService.getUniformLocation(program, position, uniformLocationMap, gl)
                 ),
                 PositionPointLightMainService.getPosition(index, state)
               );
               [@bs]
               SendGLSLDataMainService.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   color,
                   GLSLLocationMainService.getUniformLocation(program, color, uniformLocationMap, gl)
                 ),
                 OperatePointLightService.getColor(index, state.pointLightRecord)
               );
               [@bs]
               SendGLSLDataMainService.sendFloat(
                 gl,
                 uniformCacheMap,
                 (
                   intensity,
                   GLSLLocationMainService.getUniformLocation(
                     program,
                     intensity,
                     uniformLocationMap,
                     gl
                   )
                 ),
                 OperatePointLightService.getIntensity(index, state.pointLightRecord)
               );
               _sendAttenuation(
                 index,
                 (gl, program, uniformCacheMap, uniformLocationMap),
                 structureMemberNameData,
                 state
               )
             }
           ),
           state
         )
    }
  );