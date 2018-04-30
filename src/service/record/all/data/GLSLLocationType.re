type attributeLocationMap = WonderCommonlib.SparseMapService.t(Js.Dict.t(int));

type uniformLocationMapOfShader = Js.Dict.t(GlType.uniformLocation);

type uniformLocationMap = WonderCommonlib.SparseMapService.t(uniformLocationMapOfShader);

type glslLocationRecord = {
  attributeLocationMap,
  uniformLocationMap
};