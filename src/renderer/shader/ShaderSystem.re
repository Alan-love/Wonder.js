open ShaderType;

open StateDataType;

open RenderConfigSystem;

let _getShaderData = (state: StateDataType.state) => state.shaderData;

let _genereateShaderIndex = (index: int) => succ(index);

let _init =
    (
      materialIndex: int,
      geometryIndex: int,
      shaderLibDataArr: shader_libs,
      {buildGLSLSource, getGL},
      state: StateDataType.state
    ) => {
  /* let {
         index,
         shaderIndexMap
     } = _getShaderData (state); */
  let shaderData = _getShaderData(state);
  let shaderIndex = _genereateShaderIndex(shaderData.index);
  shaderData.index = shaderIndex;
  let (vsSource, fsSource) = [@bs] buildGLSLSource(materialIndex, shaderLibDataArr);
  let gl = [@bs] getGL(state);
  let program =
    gl
    |> ProgramSystem.createProgram
    |> ProgramSystem.registerProgram(shaderIndex)
    |> ProgramSystem.initShader(vsSource, fsSource, gl);
  /* state |> LocationSystem.setEmptyLocationMap(shaderIndex)


     |> ignore; */
  /* "variables": {"attributes": [{"name": "a_position", "buffer": "vertex", "type": "vec3"}]} */
  /* todo prepare uniform data!
     decide commitDraw method(judge has indices) */
  state
  |> GLSLSenderSystem.addAttributeSendData(
       gl,
       shaderIndex,
       geometryIndex,
       program,
       shaderLibDataArr
     )
  |> ignore;
  shaderIndex
};

let _getShaderIndex = (shaderName: string, shaderIndexMap) =>
  HashMapSystem.get(shaderName, shaderIndexMap);

let _setShaderIndex = (shaderName: string, shaderIndex: int, shaderIndexMap) =>
  HashMapSystem.set(shaderName, shaderIndex, shaderIndexMap);

let initMaterialShader =
    (
      materialIndex: int,
      geometryIndex: int,
      shaderName: string,
      shaderLibDataArr,
      initShaderFuncRecord,
      state: StateDataType.state
    ) => {
  let {shaderIndexMap} = _getShaderData(state);
  switch (_getShaderIndex(shaderName, shaderIndexMap)) {
  | Some(shaderIndex) => shaderIndex
  | None =>
    let shaderIndex =
      _init(materialIndex, geometryIndex, shaderLibDataArr, initShaderFuncRecord, state);
    _setShaderIndex(shaderName, shaderIndex, shaderIndexMap) |> ignore;
    shaderIndex
  }
};

let initData = () => {
  index: 0,
  shaderIndexMap: HashMapSystem.createEmpty(),
  shaderLibNameMap: HashMapSystem.createEmpty()
};