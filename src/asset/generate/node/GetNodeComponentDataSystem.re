open StateDataMainType;

let _hasMap = (gameObject, {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getLightMaterialComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => false
  | Some(lightMaterial) =>
    OperateLightMaterialMainService.hasDiffuseMap(lightMaterial, state)
    || OperateLightMaterialMainService.hasSpecularMap(lightMaterial, state)
  };

let _getGeometryData =
    (
      (gameObject, meshIndex, geometry, geometryDataMap),
      (
        getVerticesFunc,
        getNormalsFunc,
        getTexCoordsFunc,
        getIndicesFunc,
        getIndices32Func,
      ),
      state,
    ) =>
  switch (geometryDataMap |> WonderCommonlib.SparseMapService.get(geometry)) {
  | Some((existedMeshIndex, pointAndNameData)) => (
      Some(existedMeshIndex),
      pointAndNameData,
      meshIndex,
      geometryDataMap,
    )
  | None =>
    open GeometryType;

    let (indices16, indices32) =
      switch (
        IndicesGeometryMainService.unsafeGetIndicesType(geometry, state)
      ) {
      | Short => (getIndicesFunc(. geometry, state) |. Some, None)
      | Int => (None, getIndices32Func(. geometry, state) |. Some)
      };

    let pointAndNameData =
      Some((
        (
          getVerticesFunc(. geometry, state),
          getNormalsFunc(. geometry, state),
          getTexCoordsFunc(. geometry, state),
          indices16,
          indices32,
        ),
        NameGeometryMainService.getName(geometry, state),
      ));

    (
      Some(meshIndex),
      pointAndNameData,
      meshIndex |> succ,
      geometryDataMap
      |> WonderCommonlib.SparseMapService.set(
           geometry,
           (meshIndex, pointAndNameData),
         ),
    );
  };

let _getMeshData =
    (
      (gameObject, meshIndex),
      geometryDataMap,
      getPointsDataFuncTuple,
      {gameObjectRecord} as state,
    ) =>
  switch (
    GetComponentGameObjectService.getGeometryComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => (None, None, meshIndex, geometryDataMap)
  | Some(geometry) =>
    _getGeometryData(
      (gameObject, meshIndex, geometry, geometryDataMap),
      getPointsDataFuncTuple,
      state,
    )
  };

let _getMaterialData =
    (
      (gameObject, materialIndex, materialCompoent, materialDataMap),
      getNameFunc,
      {gameObjectRecord} as state,
    ) =>
  switch (materialCompoent) {
  | None => (None, None, materialIndex, materialDataMap)
  | Some(material) =>
    switch (materialDataMap |> WonderCommonlib.SparseMapService.get(material)) {
    | Some((existedMaterialIndex, materialData)) => (
        Some(existedMaterialIndex),
        materialData,
        materialIndex,
        materialDataMap,
      )
    | None =>
      let materialData = Some((material, getNameFunc(material, state)));

      (
        Some(materialIndex),
        materialData,
        materialIndex |> succ,
        materialDataMap
        |> WonderCommonlib.SparseMapService.set(
             material,
             (materialIndex, materialData),
           ),
      );
    }
  };

let _getBasicMaterialData =
    (
      (gameObject, materialIndex),
      basicMaterialDataMap,
      {gameObjectRecord} as state,
    ) =>
  _getMaterialData(
    (
      gameObject,
      materialIndex,
      GetComponentGameObjectService.getBasicMaterialComponent(.
        gameObject,
        gameObjectRecord,
      ),
      basicMaterialDataMap,
    ),
    NameBasicMaterialMainService.getName,
    state,
  );

let _getLightMaterialData =
    (
      (gameObject, materialIndex),
      lightMaterialDataMap,
      {gameObjectRecord} as state,
    ) =>
  _getMaterialData(
    (
      gameObject,
      materialIndex,
      GetComponentGameObjectService.getLightMaterialComponent(.
        gameObject,
        gameObjectRecord,
      ),
      lightMaterialDataMap,
    ),
    NameLightMaterialMainService.getName,
    state,
  );

let _getComponentData =
    (
      (gameObject, componentIndex),
      getComponentFunc,
      {gameObjectRecord} as state,
    ) =>
  switch (getComponentFunc(. gameObject, gameObjectRecord)) {
  | None => (None, None, componentIndex)

  | Some(component) =>
    let componentData = Some(component);

    (Some(componentIndex), componentData, componentIndex |> succ);
  };

let _getMeshRendererData =
    ((gameObject, meshRendererIndex), {gameObjectRecord} as state) =>
  _getComponentData(
    (gameObject, meshRendererIndex),
    GetComponentGameObjectService.getMeshRendererComponent,
    state,
  );

let _getBasicCameraViewData =
    ((gameObject, basicCameraViewIndex), {gameObjectRecord} as state) =>
  _getComponentData(
    (gameObject, basicCameraViewIndex),
    GetComponentGameObjectService.getBasicCameraViewComponent,
    state,
  );

let _getCameraProjectionData =
    ((gameObject, cameraProjectionIndex), {gameObjectRecord} as state) =>
  _getComponentData(
    (gameObject, cameraProjectionIndex),
    GetComponentGameObjectService.getPerspectiveCameraProjectionComponent,
    state,
  );

let _getArcballCameraControllerData =
    (
      (gameObject, arcballCameraControllerIndex),
      {gameObjectRecord} as state,
    ) =>
  _getComponentData(
    (gameObject, arcballCameraControllerIndex),
    GetComponentGameObjectService.getArcballCameraControllerComponent,
    state,
  );

let _getLightData = ((gameObject, lightIndex), {gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getDirectionLightComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None =>
    switch (
      GetComponentGameObjectService.getPointLightComponent(.
        gameObject,
        gameObjectRecord,
      )
    ) {
    | None => (None, None, lightIndex)

    | Some(light) =>
      let lightData = Some(("point", light));

      (Some(lightIndex), lightData, lightIndex |> succ);
    }

  | Some(light) =>
    let lightData = Some(("directional", light));

    (Some(lightIndex), lightData, lightIndex |> succ);
  };

let getAllComponentData =
    (
      (
        gameObject,
        state,
        (
          meshIndex,
          meshRendererIndex,
          basicMaterialIndex,
          lightMaterialIndex,
          basicCameraViewIndex,
          cameraProjectionIndex,
          arcballCameraControllerIndex,
          lightIndex,
        ),
        (geometryDataMap, basicMaterialDataMap, lightMaterialDataMap),
        (
          meshPointAndNameDataMap,
          meshRendererDataMap,
          resultBasicMaterialDataMap,
          resultLightMaterialDataMap,
          basicCameraViewDataMap,
          cameraProjectionDataMap,
          arcballCameraControllerDataMap,
          lightDataMap,
        ),
      ),
      getPointsDataFuncTuple,
    ) => {
  let (meshIndex, pointAndNameData, newMeshIndex, geometryDataMap) =
    _getMeshData(
      (gameObject, meshIndex),
      geometryDataMap,
      getPointsDataFuncTuple,
      state,
    );

  let meshPointAndNameDataMap =
    switch (meshIndex) {
    | None => meshPointAndNameDataMap
    | Some(meshIndex) =>
      meshPointAndNameDataMap
      |> WonderCommonlib.SparseMapService.set(
           meshIndex,
           pointAndNameData |> OptionService.unsafeGet,
         )
    };

  let (meshRendererIndex, meshRendererData, newMeshRendererIndex) =
    _getMeshRendererData((gameObject, meshRendererIndex), state);

  let meshRendererDataMap =
    switch (meshRendererIndex) {
    | None => meshRendererDataMap
    | Some(meshRendererIndex) =>
      meshRendererDataMap
      |> WonderCommonlib.SparseMapService.set(
           meshRendererIndex,
           meshRendererData |> OptionService.unsafeGet,
         )
    };

  let (
    basicMaterialIndex,
    basicMaterialData,
    newBasicMaterialIndex,
    basicMaterialDataMap,
  ) =
    _getBasicMaterialData(
      (gameObject, basicMaterialIndex),
      basicMaterialDataMap,
      state,
    );

  let resultBasicMaterialDataMap =
    switch (basicMaterialIndex) {
    | None => resultBasicMaterialDataMap
    | Some(basicMaterialIndex) =>
      resultBasicMaterialDataMap
      |> WonderCommonlib.SparseMapService.set(
           basicMaterialIndex,
           basicMaterialData |> OptionService.unsafeGet,
         )
    };

  let (
    lightMaterialIndex,
    lightMaterialData,
    newLightMaterialIndex,
    lightMaterialDataMap,
  ) =
    _getLightMaterialData(
      (gameObject, lightMaterialIndex),
      lightMaterialDataMap,
      state,
    );

  let resultLightMaterialDataMap =
    switch (lightMaterialIndex) {
    | None => resultLightMaterialDataMap
    | Some(lightMaterialIndex) =>
      resultLightMaterialDataMap
      |> WonderCommonlib.SparseMapService.set(
           lightMaterialIndex,
           lightMaterialData |> OptionService.unsafeGet,
         )
    };

  let (basicCameraViewIndex, basicCameraViewData, newBasicCameraViewIndex) =
    _getBasicCameraViewData((gameObject, basicCameraViewIndex), state);

  let basicCameraViewDataMap =
    switch (basicCameraViewIndex) {
    | None => basicCameraViewDataMap
    | Some(basicCameraViewIndex) =>
      basicCameraViewDataMap
      |> WonderCommonlib.SparseMapService.set(
           basicCameraViewIndex,
           basicCameraViewData |> OptionService.unsafeGet,
         )
    };

  /* TODO support ortho camera */
  let (cameraProjectionIndex, cameraProjectionData, newCameraProjectionIndex) =
    _getCameraProjectionData((gameObject, cameraProjectionIndex), state);

  let cameraProjectionDataMap =
    switch (cameraProjectionIndex) {
    | None => cameraProjectionDataMap
    | Some(cameraProjectionIndex) =>
      cameraProjectionDataMap
      |> WonderCommonlib.SparseMapService.set(
           cameraProjectionIndex,
           cameraProjectionData |> OptionService.unsafeGet,
         )
    };

  let (
    arcballCameraControllerIndex,
    arcballCameraControllerData,
    newCameraControllerIndex,
  ) =
    _getArcballCameraControllerData(
      (gameObject, arcballCameraControllerIndex),
      state,
    );

  let arcballCameraControllerDataMap =
    switch (arcballCameraControllerIndex) {
    | None => arcballCameraControllerDataMap
    | Some(arcballCameraControllerIndex) =>
      arcballCameraControllerDataMap
      |> WonderCommonlib.SparseMapService.set(
           arcballCameraControllerIndex,
           arcballCameraControllerData |> OptionService.unsafeGet,
         )
    };

  let (lightIndex, lightData, newLightIndex) =
    _getLightData((gameObject, lightIndex), state);

  let lightDataMap =
    switch (lightIndex) {
    | None => lightDataMap
    | Some(lightIndex) =>
      lightDataMap
      |> WonderCommonlib.SparseMapService.set(
           lightIndex,
           lightData |> OptionService.unsafeGet,
         )
    };

  (
    state,
    (
      meshIndex,
      meshRendererIndex,
      basicMaterialIndex,
      lightMaterialIndex,
      basicCameraViewIndex,
      cameraProjectionIndex,
      arcballCameraControllerIndex,
      lightIndex,
    ),
    (
      newMeshIndex,
      newMeshRendererIndex,
      newBasicMaterialIndex,
      newLightMaterialIndex,
      newBasicCameraViewIndex,
      newCameraProjectionIndex,
      newCameraControllerIndex,
      newLightIndex,
    ),
    (geometryDataMap, basicMaterialDataMap, lightMaterialDataMap),
    (
      meshPointAndNameDataMap,
      meshRendererDataMap,
      resultBasicMaterialDataMap,
      resultLightMaterialDataMap,
      basicCameraViewDataMap,
      cameraProjectionDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
    ),
  );
};