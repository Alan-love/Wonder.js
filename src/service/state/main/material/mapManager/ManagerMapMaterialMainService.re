let getMap =
    (
      material,
      textureCountPerMaterial,
      (getMapUnitFunc, getTextureIndexFunc),
      (textureIndices, mapUnits)
    ) => {
  let mapUnit = getMapUnitFunc(material, mapUnits);
  MapUnitService.hasMap(mapUnit) ?
    Some([@bs] getTextureIndexFunc((material, mapUnit, textureCountPerMaterial), textureIndices)) :
    None
};

/* let unsafeGetMap =
     (
       material,
       textureCountPerMaterial,
       (getMapUnitFunc, getTextureIndexFunc),
       (textureIndices, mapUnits)
     ) =>
   getMap(
     material,
     textureCountPerMaterial,
     (getMapUnitFunc, getTextureIndexFunc),
     (textureIndices, mapUnits)
   )
   |> OptionService.unsafeGet; */
let setMap =
    (
      material,
      texture,
      textureCountPerMaterial,
      (getMapUnitFunc, setMapUnitFunc, setTextureIndexFunc),
      (textureIndices, mapUnits, textureCountMap)
    ) => {
  let mapUnit = getMapUnitFunc(material, mapUnits);
  MapUnitService.hasMap(mapUnit) ?
    (
      setTextureIndexFunc((material, mapUnit, textureCountPerMaterial), texture, textureIndices),
      mapUnits,
      textureCountMap
    ) :
    {
      let mapCount = TextureCountMapMaterialService.unsafeGetCount(material, textureCountMap);
      (
        setTextureIndexFunc((material, mapCount, textureCountPerMaterial), texture, textureIndices),
        setMapUnitFunc(material, mapCount, mapUnits),
        textureCountMap |> TextureCountMapMaterialService.setCount(material, mapCount |> succ)
      )
    }
};