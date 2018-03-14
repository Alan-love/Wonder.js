open MaterialType;

open LightMaterialType;

open StateDataType;

let unsafeGetDiffuseColor = (material, {lightMaterialRecord}) =>
  ColorMapService.unsafeGetColor(material, lightMaterialRecord.diffuseColorMap);

let setDiffuseColor = (material, color: array(float), {lightMaterialRecord} as state) => {
  ...state,
  lightMaterialRecord: {
    ...lightMaterialRecord,
    diffuseColorMap: ColorMapService.setColor(material, color, lightMaterialRecord.diffuseColorMap)
  }
};

let unsafeGetSpecularColor = (material, {lightMaterialRecord}) =>
  ColorMapService.unsafeGetColor(material, lightMaterialRecord.specularColorMap);

let setSpecularColor = (material, color: array(float), {lightMaterialRecord} as state) => {
  ...state,
  lightMaterialRecord: {
    ...lightMaterialRecord,
    specularColorMap:
      ColorMapService.setColor(material, color, lightMaterialRecord.specularColorMap)
  }
};

let unsafeGetShininess = (material, {lightMaterialRecord}) =>
  lightMaterialRecord.shininessMap |> WonderCommonlib.SparseMapSystem.unsafeGet(material);

let setShininess = (material, shininess: float, {lightMaterialRecord} as state) => {
  ...state,
  lightMaterialRecord: {
    ...lightMaterialRecord,
    shininessMap:
      lightMaterialRecord.shininessMap |> WonderCommonlib.SparseMapSystem.set(material, shininess)
  }
};