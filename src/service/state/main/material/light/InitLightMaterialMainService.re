open MainStateDataType;

open MaterialType;

open RenderConfigType;

open LightMaterialType;

let _getShaderLibs = ({material_shaders}) => {
  let shaderName = "front_render_light";
  JobConfigService.unsafeFindFirst(
    material_shaders,
    shaderName,
    ({name}: material_shader) => JobConfigService.filterTargetName(name, shaderName)
  ).
    shader_libs
};

let _getShaderTuple = (materialIndex, state: MainStateDataType.state) => {
  let shaderRecord = RenderConfigMainService.getShaders(state);
  (materialIndex, _getShaderLibs(shaderRecord), shaderRecord)
};

let _getStateTuple = ({lightMaterialRecord} as state) => {
  let {gameObjectMap, shaderIndexMap} = lightMaterialRecord;
  (gameObjectMap, shaderIndexMap, state)
};

let initMaterial =
  [@bs]
  (
    (gl, materialIndex: int, state: MainStateDataType.state) =>
      InitMaterialMainService.initMaterial(
        gl,
        _getShaderTuple(materialIndex, state),
        ShaderIndexLightMaterialMainService.setShaderIndex,
        _getStateTuple(state)
      )
  );

let initMaterials = (materialIndexArr, gl, state: MainStateDataType.state) =>
  materialIndexArr
  |> ArraySystem.reduceState(
       [@bs] ((state, materialIndex: int) => [@bs] initMaterial(gl, materialIndex, state)),
       state
     );

let handleInitComponent = (gl, index: int, state: MainStateDataType.state) =>
  InitMaterialMainService.handleInitComponent(
    gl,
    _getShaderTuple(index, state),
    ShaderIndexLightMaterialMainService.setShaderIndex,
    _getStateTuple(state)
  );

let init = (gl, {lightMaterialRecord} as state) => {
  let {index, disposedIndexArray} = lightMaterialRecord;
  InitMaterialMainService.init(gl, (index, disposedIndexArray), initMaterial, state)
};