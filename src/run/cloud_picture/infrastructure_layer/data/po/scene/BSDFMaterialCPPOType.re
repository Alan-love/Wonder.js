type bsdfMaterial = {
  maxIndex: ComponentCPPOType.index,
  buffer: SharedArrayBufferCPPOType.sharedArrayBuffer,
  mutable diffuseColors: Js.Typed_array.Float32Array.t,
  mutable speculars: Js.Typed_array.Float32Array.t,
  mutable specularColors: Js.Typed_array.Float32Array.t,
  mutable roughnesses: Js.Typed_array.Float32Array.t,
  mutable metalnesses: Js.Typed_array.Float32Array.t,
  mutable transmissions: Js.Typed_array.Float32Array.t,
  mutable iors: Js.Typed_array.Float32Array.t,
  defaultDiffuseColor: VectorCPPOType.vec3,
  defaultSpecular: float,
  defaultSpecularColor: VectorCPPOType.vec3,
  defaultRoughness: float,
  defaultMetalness: float,
  defaultTransmission: float,
  defaultIOR: float,
  gameObjectsMap: ComponentCPPOType.gameObjectsMap,
  diffuseMapImageIdMap:
    ImmutableSparseMap.t(BSDFMaterialPOType.bsdfMaterial, ImagePOType.id),
  channelRoughnessMetallicMapImageIdMap:
    ImmutableSparseMap.t(BSDFMaterialPOType.bsdfMaterial, ImagePOType.id),
  emissionMapImageIdMap:
    ImmutableSparseMap.t(BSDFMaterialPOType.bsdfMaterial, ImagePOType.id),
  normalMapImageIdMap:
    ImmutableSparseMap.t(BSDFMaterialPOType.bsdfMaterial, ImagePOType.id),
  transmissionMapImageIdMap:
    ImmutableSparseMap.t(BSDFMaterialPOType.bsdfMaterial, ImagePOType.id),
  specularMapImageIdMap:
    ImmutableSparseMap.t(BSDFMaterialPOType.bsdfMaterial, ImagePOType.id),
};
