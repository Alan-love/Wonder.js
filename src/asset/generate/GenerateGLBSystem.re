open WonderBsJson.Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

let generateGLBData =
    (
      (rootGameObject, imageUint8ArrayDataMap),
      (getPointsDataFuncTuple, getResultUint8ArrayDataFunc),
      state,
    ) => {
  let (
    state,
    (
      meshPointAndNameDataMap,
      meshRendererDataMap,
      basicMaterialDataMap,
      lightMaterialDataMap,
      basicCameraViewDataMap,
      cameraProjectionDataMap,
      flyCameraControllerDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
      scriptDataMap,
    ),
    nodeDataArr,
  ) =
    GetNodeDataSystem.getAllNodeData(
      rootGameObject,
      getPointsDataFuncTuple,
      state,
    );

  let (
    totalByteLength,
    (bufferViewDataArr, accessorDataArr, meshDataArr),
    (vertexDataArr, indexDataArr, index32DataArr),
  ) =
    BuildGeometryDataSystem.build(meshPointAndNameDataMap);

  let geometryEndByteOffset = totalByteLength;

  let meshRendererDataArr =
    BuildMeshRendererDataSystem.build(meshRendererDataMap, state);

  let (
    basicMaterialDataArr,
    lightMaterialDataArr,
    basicSourceTextureDataArr,
    samplerDataArr,
    imageUint8DataArr,
    imageResultUint8ArrayMap,
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    BuildMaterialDataSystem.build(
      (basicMaterialDataMap, lightMaterialDataMap, imageUint8ArrayDataMap),
      (totalByteLength, geometryEndByteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
      state,
    );

  let cubemapTextureDataArr = [||];

  let (
    skyboxCubemapTextureIndexOpt,
    (cubemapTextureDataArr, samplerDataArr, imageUint8DataArr),
    imageResultUint8ArrayMap,
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    BuildSkyboxDataSystem.build(
      cubemapTextureDataArr,
      samplerDataArr,
      imageUint8DataArr,
      imageUint8ArrayDataMap,
      imageResultUint8ArrayMap,
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
      state,
    );

  let buffer =
    BuildBufferSystem.build(
      totalByteLength,
      (vertexDataArr, indexDataArr, index32DataArr),
      imageUint8DataArr,
    );

  let basicCameraViewDataArr =
    BuildCameraDataSystem.buildBasicCameraViewData(
      basicCameraViewDataMap,
      state,
    );

  let cameraProjectionDataArr =
    BuildCameraDataSystem.buildCameraProjectionData(
      cameraProjectionDataMap,
      state,
    );

  let flyCameraControllerDataArr =
    BuildFlyCameraControllerDataSystem.build(
      flyCameraControllerDataMap,
      state,
    );

  let arcballCameraControllerDataArr =
    BuildArcballCameraControllerDataSystem.build(
      arcballCameraControllerDataMap,
      state,
    );

  let lightDataArr = BuildLightDataSystem.build(lightDataMap, state);

  let scriptDataArr = BuildScriptDataSystem.build(scriptDataMap, state);

  let extensionsUsedArr =
    BuildExtensionDataSystem.buildExtensionsUsed(lightDataArr);

  (
    EncodeGLBJsonSystem.encode(
      totalByteLength,
      (
        nodeDataArr,
        bufferViewDataArr,
        accessorDataArr,
        meshDataArr,
        meshRendererDataArr,
        basicMaterialDataArr,
        lightMaterialDataArr,
        basicSourceTextureDataArr,
        cubemapTextureDataArr,
        samplerDataArr,
        imageUint8DataArr,
        basicCameraViewDataArr,
        cameraProjectionDataArr,
        flyCameraControllerDataArr,
        arcballCameraControllerDataArr,
        lightDataArr,
        scriptDataArr,
        BuildIMGUIDataSystem.build(state),
        skyboxCubemapTextureIndexOpt,
        extensionsUsedArr,
      ),
      state,
    ),
    imageResultUint8ArrayMap,
    buffer,
  );
};