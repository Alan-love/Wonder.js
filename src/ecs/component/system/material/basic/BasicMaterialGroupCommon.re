open MaterialType;

open BasicMaterialType;

open BasicMaterialStateCommon;

let getGroupCount = (material, state: StateDataType.state) =>
  MaterialGroupCommon.getGroupCount(material, getMaterialData(state).groupCountMap);

let isGroupMaterial = (material, state: StateDataType.state) =>
  MaterialGroupCommon.isGroupMaterial(material, getMaterialData(state).groupCountMap);

let increaseGroupCount =
  [@bs]
  (
    (material, state: StateDataType.state) => {
      ...state,
      basicMaterialData: {
        ...getMaterialData(state),
        groupCountMap:
          MaterialGroupCommon.increaseGroupCount(material, getMaterialData(state).groupCountMap)
      }
    }
  );

let decreaseGroupCount = (material, state: StateDataType.state) => {
  ...state,
  basicMaterialData: {
    ...getMaterialData(state),
    groupCountMap:
      MaterialGroupCommon.decreaseGroupCount(material, getMaterialData(state).groupCountMap)
  }
};