open MaterialType;

open RenderConfigType;

open ShaderType;

open ProgramType;

open GLSLType;

open GLSLSenderType;

open GLSLLocationType;

open MaterialType;

open GeometryType;

open ShaderChunkType;

open InitMaterialLightMaterialType;

open InitLightMaterialDirectionLightType;

open InitLightMaterialPointLightType;

type initLightMaterialState = {
  materialRecord,
  directionLightRecord,
  pointLightRecord,
  renderConfigRecord,
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord,
};