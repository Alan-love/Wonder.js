open StateInitLightMaterialType;

open RenderConfigType;

let _getMaterialShaderLibDataArrByStaticBranch =
    (
      (name, isSourceInstance, isSupportInstance),
      (staticBranchs: array(shaderMapData), shaderLibs),
      resultDataArr
    ) =>
  switch name {
  | "modelMatrix_instance"
  | "normalMatrix_instance" =>
    let {value}: shaderMapData =
      JobConfigService.unsafeFindFirst(
        staticBranchs,
        name,
        (item) => JobConfigService.filterTargetName(item.name, name)
      );
    GetShaderLibDataArrayInitMaterialService.getMaterialShaderLibDataArrByStaticBranchInstance(
      (isSourceInstance, isSupportInstance),
      (shaderLibs, value),
      resultDataArr
    )
  | _ =>
    GetShaderLibDataArrayInitMaterialService.handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(
      name,
      staticBranchs
    )
  };

let _isPass = (materialIndex, condition, {materialRecord} as state) =>
  switch condition {
  | "light_has_map" =>
    MapUnitService.hasMap(
      OperateTypeArrayLightMaterialService.getDiffuseMapUnit(
        materialIndex,
        materialRecord.diffuseMapUnits
      )
    )
    || MapUnitService.hasMap(
         OperateTypeArrayLightMaterialService.getSpecularMapUnit(
           materialIndex,
           materialRecord.specularMapUnits
         )
       )
  | "has_diffuse_map" =>
    MapUnitService.hasMap(
      OperateTypeArrayLightMaterialService.getDiffuseMapUnit(
        materialIndex,
        materialRecord.diffuseMapUnits
      )
    )
  | "has_specular_map" =>
    MapUnitService.hasMap(
      OperateTypeArrayLightMaterialService.getSpecularMapUnit(
        materialIndex,
        materialRecord.specularMapUnits
      )
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_isPass",
        ~description={j|unknown condition:$condition|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

/* TODO duplicate */
let _getMaterialShaderLibDataArrByDynamicBranch =
    (
      (materialIndex, name),
      (dynamicBranchs: array(dynamicBranchData), shaderLibs),
      state,
      resultDataArr
    ) => {
  let ({condition}: dynamicBranchData) as dynamicBranchData =
    JobConfigService.unsafeFindFirst(
      dynamicBranchs,
      name,
      (item) => JobConfigService.filterTargetName(item.name, name)
    );
  let dynamicBranchShaderLibNameOption =
    _isPass(materialIndex, condition, state) ?
      GetDataRenderConfigService.getPass(dynamicBranchData) :
      GetDataRenderConfigService.getFail(dynamicBranchData);
  switch dynamicBranchShaderLibNameOption {
  | None => resultDataArr
  | Some(dynamicBranchShaderLibName) =>
    resultDataArr
    |> ArrayService.push(
         GetShaderLibDataArrayInitMaterialService.findFirstShaderData(
           dynamicBranchShaderLibName,
           shaderLibs
         )
       )
  }
};

let _getMaterialShaderLibDataArrByType =
    (
      (
        materialIndex,
        type_,
        groups: array(shaderMapData),
        name,
        isSourceInstance,
        isSupportInstance
      ),
      (shaderLibs, staticBranchs: array(shaderMapData), dynamicBranchs),
      state,
      resultDataArr
    ) =>
  switch type_ {
  | "group" =>
    GetShaderLibDataArrayInitMaterialService.getMaterialShaderLibDataArrByGroup(
      groups,
      name,
      shaderLibs,
      resultDataArr
    )
  | "static_branch" =>
    _getMaterialShaderLibDataArrByStaticBranch(
      (name, isSourceInstance, isSupportInstance),
      (staticBranchs: array(shaderMapData), shaderLibs),
      resultDataArr
    )
  | "dynamic_branch" =>
    _getMaterialShaderLibDataArrByDynamicBranch(
      (materialIndex, name),
      (dynamicBranchs, shaderLibs),
      state,
      resultDataArr
    )
  | _ =>
    WonderLog.Log.debugJson(
      WonderLog.Log.buildDebugJsonMessage(~description={j|shaderLibs|j}, ~var=shaderLibs),
      IsDebugMainService.getIsDebug(StateDataMain.stateData)
    );
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getMaterialShaderLibDataArrByType",
        ~description={j|unknown type_:$type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let getMaterialShaderLibDataArr =
  [@bs]
  (
    (
      materialIndex: int,
      (isSourceInstance, isSupportInstance),
      ({staticBranchs, dynamicBranchs, groups}, shaderLibItems, shaderLibs: shaderLibs),
      state: initLightMaterialState
    ) =>
      shaderLibItems
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (resultDataArr, {type_, name}: shaderLibItem) =>
               switch type_ {
               | None =>
                 resultDataArr
                 |> ArrayService.push(
                      GetShaderLibDataArrayInitMaterialService.findFirstShaderData(
                        name,
                        shaderLibs
                      )
                    )
               | Some(type_) =>
                 _getMaterialShaderLibDataArrByType(
                   (materialIndex, type_, groups, name, isSourceInstance, isSupportInstance),
                   (shaderLibs, staticBranchs, dynamicBranchs),
                   state,
                   resultDataArr
                 )
               }
           ),
           WonderCommonlib.ArrayService.createEmpty()
         )
      /* |>WonderLog.Log.print */
  );