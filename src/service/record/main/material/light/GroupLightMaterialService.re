open LightMaterialType;

let isGroupLightMaterial = (material, record) =>
  GroupService.isGroup(material, record.gameObjectsMap);

let removeGameObject = (gameObject, material, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GroupService.removeGameObject(gameObject, material, gameObjectsMap),
};