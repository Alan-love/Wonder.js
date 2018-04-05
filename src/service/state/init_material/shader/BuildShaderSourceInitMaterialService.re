open ShaderType;

open GLSLType;

open ShaderChunkType;

open ShaderChunkSystem;

open RenderConfigType;

let webgl1_main_begin: string = "void main(void){\n";

let webgl1_main_end: string = "}\n";

let _generateAttributeSource = (shaderLibDataArr: shader_libs) =>
  shaderLibDataArr
  |> Js.Array.reduce(
       (result: string, {variables}) =>
         switch variables {
         | None => result
         | Some(variables) =>
           switch variables.attributes {
           | None => result
           | Some(attributes) =>
             result
             ++ (
               attributes
               |> Js.Array.reduce(
                    (result: string, {name, type_}: attribute) =>
                      switch (name, type_) {
                      | (Some(name), Some(type_)) => result ++ {j|attribute $type_ $name;
  |j}
                      | (_, _) => result
                      },
                    ""
                  )
             )
           }
         },
       ""
     );

let _isInSource = (key: string, source: string) => Js.String.indexOf(key, source) > (-1);

let _generateUniformSourceType = (type_: string) =>
  switch type_ {
  | "float3" => "vec3"
  | _ => type_
  };

let _generateUniformSource =
    (
      shaderLibDataArr: shader_libs,
      sourceVarDeclare: string,
      sourceFuncDefine: string,
      sourceBody: string
    ) =>
  shaderLibDataArr
  |> Js.Array.reduce(
       (result: string, {variables}) =>
         switch variables {
         | None => result
         | Some(variables) =>
           switch variables.uniforms {
           | None => result
           | Some(uniforms) =>
             result
             ++ (
               uniforms
               |> Js.Array.filter(
                    ({name}: uniform) =>
                      _isInSource(name, sourceVarDeclare)
                      || _isInSource(name, sourceFuncDefine)
                      || _isInSource(name, sourceBody)
                  )
               |> Js.Array.reduce(
                    (result: string, {name, type_}: uniform) => {
                      let type_ = _generateUniformSourceType(type_);
                      result ++ {j|uniform $type_ $name;
|j}
                    },
                    ""
                  )
             )
           }
         },
       ""
     );

let _setSource =
    (
      {
        top: sourceTop,
        define: sourceDefine,
        varDeclare: sourceVarDeclare,
        funcDeclare: sourceFuncDeclare,
        funcDefine: sourceFuncDefine,
        body: sourceBody
      } as sourceChunk,
      {top, define, varDeclare, funcDeclare, funcDefine, body}
    ) => {
  sourceChunk.top = sourceTop ++ top;
  sourceChunk.define = sourceDefine ++ define;
  sourceChunk.varDeclare = sourceVarDeclare ++ varDeclare;
  sourceChunk.funcDeclare = sourceFuncDeclare ++ funcDeclare;
  sourceChunk.funcDefine = sourceFuncDefine ++ funcDefine;
  sourceChunk.body = sourceBody ++ body;
  sourceChunk
};

let _buildBody = ({body}, webgl1_main_end) => body ++ webgl1_main_end;

let _buildVarDeclare = ({top, varDeclare, funcDefine, body}, shaderLibDataArr) =>
  varDeclare ++ "\n" ++ _generateUniformSource(shaderLibDataArr, varDeclare, funcDefine, body);

let _addAlllParts = ({top, define, varDeclare, funcDeclare, funcDefine, body}) =>
  top ++ define ++ varDeclare ++ funcDeclare ++ funcDefine ++ body;

let _execHandle = (name, recordTuple) => {
  let handleFunc = HandleGLSLService.getHandle(name);
  handleFunc(recordTuple)
};

let _createEmptyChunk = () => {
  top: "",
  define: "",
  varDeclare: "",
  funcDeclare: "",
  funcDefine: "",
  body: ""
};

let _buildVsAndFsByType =
    ((vs, fs), type_, name, (directionLightRecord, pointLightRecord, glslChunkRecord)) =>
  switch type_ {
  | "vs" => (_setSource(vs, getChunk(name, glslChunkRecord)), fs)
  | "vs_function" => (
      _setSource(vs, _execHandle(name, (directionLightRecord, pointLightRecord))),
      fs
    )
  | "fs" => (vs, _setSource(fs, getChunk(name, glslChunkRecord)))
  | "fs_function" => (
      vs,
      _setSource(fs, _execHandle(name, (directionLightRecord, pointLightRecord)))
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="buildGLSLSource",
        ~description={j|unknown glsl type: $type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|name: $name|j}
      )
    )
  };

let _buildVsAndFs = (vs, fs, shaderLibDataArr, recordTuple) =>
  shaderLibDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (glslTuple, {glsls}) =>
           switch glsls {
           | None => glslTuple
           | Some(glsls) =>
             glsls
             |> WonderCommonlib.ArrayService.reduceOneParam(
                  [@bs]
                  (
                    (sourceTuple, {type_, name}: glsl) =>
                      _buildVsAndFsByType(sourceTuple, type_, name, recordTuple)
                  ),
                  glslTuple
                )
           }
       ),
       (vs, fs)
     );

let buildGLSLSource =
  [@bs]
  (
    (
      materialIndex: int,
      shaderLibDataArr: shader_libs,
      (directionLightRecord, pointLightRecord, glslRecord, glslChunkRecord)
    ) => {
      let {precision} = glslRecord;
      let vs: glslChunk = _createEmptyChunk();
      let fs: glslChunk = _createEmptyChunk();
      vs.body = vs.body ++ webgl1_main_begin;
      fs.body = fs.body ++ webgl1_main_begin;
      let precision = precision |> OptionService.unsafeGet;
      vs.top = precision ++ vs.top;
      fs.top = precision ++ fs.top;
      let (vs, fs) =
        _buildVsAndFs(
          vs,
          fs,
          shaderLibDataArr,
          (directionLightRecord, pointLightRecord, glslChunkRecord)
        );
      vs.body = _buildBody(vs, webgl1_main_end);
      fs.body = _buildBody(fs, webgl1_main_end);
      vs.varDeclare = "\n" ++ _generateAttributeSource(shaderLibDataArr) ++ vs.varDeclare;
      vs.varDeclare = _buildVarDeclare(vs, shaderLibDataArr);
      fs.varDeclare = _buildVarDeclare(fs, shaderLibDataArr);
      (_addAlllParts(vs), _addAlllParts(fs))
    }
  );