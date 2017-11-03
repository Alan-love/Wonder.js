open GlType;

open TransformType;

open CameraControllerType;

open GameObjectType;

open MaterialType;

open ShaderType;

open ProgramType;

open LocationType;

open ShaderChunkType;

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {
  mutable transformDataBufferCount: int,
  mutable basicMaterialDataBufferCount: int
};

type viewData = {
  canvas: option(DomType.htmlElement),
  contextConfig: option(contextConfig)
};

type initConfigData = {isTest: option(bool)};

type deviceManagerData = {gl: option(webgl1Context)};

type specificBowser = {
  name: string,
  version: string
};

type browser = array(specificBowser);

type backend = {
  name: string,
  fail: option(string)
};

type render_setting = {
  platform: string,
  backend,
  browser,
  init_pipeline: string,
  render_pipeline: string
};

type jobItem = {name: string};

/* type pipelineJob = {name: string}; */
type initPipeline = {
  name: string,
  /* jobs: array pipelineJob */
  jobs: array(jobItem)
};

type init_pipelines = array(initPipeline);

/* type job = {name: string}; */
type job = jobItem;

type init_jobs = array(job);

type hardwareRelatedSetting = {
  platform: string,
  backend,
  browser
};

type shaderGroup = {
  name: string,
  value: array(string)
};

type shaderLibItem = {
  type_: option(string),
  name: string
};

type shader = {
  name: string,
  shader_libs: array(shaderLibItem)
};

type shaders = {
  groups: array(shaderGroup),
  basic_material: array(shader)
};

type glsl = {
  type_: string,
  name: string
};

type attribute = {
  name: string,
  buffer: string,
  type_: string
};

type uniform = {
  name: string,
  field: string,
  type_: string
};

type variables = {
  uniforms: option(array(uniform)),
  attributes: option(array(attribute))
};

type shaderLib = {
  name: string,
  glsls: option(array(glsl)),
  variables: option(variables)
};

type shader_libs = array(shaderLib);

type renderConfig = {
  jobHandleMap: Js.Dict.t((state => state)),
  render_setting,
  init_pipelines,
  init_jobs,
  shaders,
  shader_libs
}
and state = {
  bufferConfig: option(bufferConfig),
  renderConfig,
  viewData,
  initConfigData,
  deviceManagerData,
  gameObjectData,
  mutable transformData: option(transformData),
  cameraControllerData,
  mutable materialData: option(materialData),
  shaderData,
  programData,
  locationData,
  glslChunkData
};

type stateData = {mutable state: option(state)};