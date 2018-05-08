type shaderMapData = {
  name: string,
  value: array(string)
};

type pass = {value: option(string)};

type fail = {value: option(string)};

type dynamicBranchData = {
  name: string,
  condition: string,
  pass: array(pass),
  fail: array(fail)
};

/* type shaderStaticBranch = {
     name: string,
     value: array(string)
   }; */
type shaderLibItem = {
  type_: option(string),
  name: string
};

type material_shader = {
  name: string,
  shaderLibs: array(shaderLibItem)
};

type shaders = {
  staticBranchs: array(shaderMapData),
  dynamicBranchs: array(dynamicBranchData),
  groups: array(shaderMapData),
  materialShaders: array(material_shader)
};

type glsl = {
  type_: string,
  name: string
};

type attribute = {
  name: option(string),
  buffer: string,
  type_: option(string)
};

type uniform = {
  name: string,
  field: string,
  type_: string,
  from: string
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

type shaderLibs = array(shaderLib);

type renderConfigRecord = {
  shaders,
  shaderLibs
};