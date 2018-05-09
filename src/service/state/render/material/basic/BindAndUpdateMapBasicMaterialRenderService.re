open StateRenderType;

let _hasMap = (mapUnit) => mapUnit !== BufferBasicMaterialService.getDefaultUnit();

let _getTextureIndex = (mapUnit, textureIndices, settingRecord) =>
  OperateTypeArrayBasicMaterialService.getTextureIndex(
    (
      material,
      mapUnit,
      OperateRenderSettingService.getTextureCountPerBasicMaterial(settingRecord)
    ),
    textureIndices
  );

let bindAndUpdate = (gl, material, {settingRecord, basicMaterialRecord} as state) => {
  let mapUnit =
    OperateTypeArrayBasicMaterialService.getMapUnit(material, basicMaterialRecord.mapUnits);
  _hasMap(mapUnit) ?
    {
      let texture =
        OperateTypeArrayBasicMaterialService.getTextureIndex(
          mapUnit,
          basicMaterialRecord.textureIndices,
          settingRecord
        );
      let state = state |> BindTextureRenderService.bind(gl, mapUnit, texture);
      UpdateTextureRenderService.isNeedUpdate(texture, state) ?
        UpdateTextureRenderService.update(gl, texture, state) : state
    } :
    state
};