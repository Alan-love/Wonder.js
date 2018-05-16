open StateInitLightMaterialType;

open RenderConfigType;

let _getMaterialShaderLibDataArrByStaticBranch =
  [@bs]
  (
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
      }
  );

let _isPass =
  [@bs]
  (
    (materialIndex, condition, {materialRecord} as state) =>
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
      }
  );

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
                 GetShaderLibDataArrayInitMaterialService.getMaterialShaderLibDataArrByType(
                   (materialIndex, type_, groups, name, isSourceInstance, isSupportInstance),
                   (shaderLibs, staticBranchs, dynamicBranchs, state),
                   (_getMaterialShaderLibDataArrByStaticBranch, _isPass),
                   resultDataArr
                 )
               }
           ),
           WonderCommonlib.ArrayService.createEmpty()
         )
  );