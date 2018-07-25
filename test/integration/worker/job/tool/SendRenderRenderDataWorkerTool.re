let buildRenderRenderData =
    (
      ~basicSourceTextureData=Sinon.matchAny,
      ~arrayBufferViewSourceTextureData=Sinon.matchAny,
      ~materialData=Sinon.matchAny,
      ~imguiData=Sinon.matchAny,
      ~customData=Sinon.matchAny,
      (),
    ) => {
  "operateType": Sinon.matchAny,
  "ambientLightData": Sinon.matchAny,
  "directionLightData": Sinon.matchAny,
  "pointLightData": Sinon.matchAny,
  "initData": {
    "materialData": materialData,
    "textureData": {
      "basicSourceTextureData": basicSourceTextureData,
      "arrayBufferViewSourceTextureData": arrayBufferViewSourceTextureData,
    },
  },
  "renderData": Sinon.matchAny,
  "imguiData": imguiData,
  "customData": customData,
};