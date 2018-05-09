open SettingType;

let unsafeGetBuffer = ({buffer}) => buffer |> OptionService.unsafeGet;

let getTransformDataBufferCount = (record) => (record |> unsafeGetBuffer).transformDataBufferCount;

let getCustomGeometryPointDataBufferCount = (record) =>
  (record |> unsafeGetBuffer).customGeometryPointDataBufferCount;

let getBasicMaterialDataBufferCount = (record) =>
  (record |> unsafeGetBuffer).basicMaterialDataBufferCount;

let getLightMaterialDataBufferCount = (record) =>
  (record |> unsafeGetBuffer).lightMaterialDataBufferCount;

let getSourceInstanceCount = (record) =>
  (record |> unsafeGetBuffer).instanceBuffer.sourceInstanceCount;

let getObjectInstanceCountPerSourceInstance = (record) =>
  (record |> unsafeGetBuffer).instanceBuffer.objectInstanceCountPerSourceInstance;

let getTextureCountPerBasicMaterial = (record) =>
  (record |> unsafeGetBuffer).textureCountPerBasicMaterial;

let getTextureDataBufferCount = (record) =>
  (record |> unsafeGetBuffer).textureDataBufferCount;