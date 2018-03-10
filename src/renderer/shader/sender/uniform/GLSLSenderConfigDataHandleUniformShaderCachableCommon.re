open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      (shaderCacheMap, name, pos, type_),
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      getDataFunc
    ) => (
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr
  |> ArrayService.push(
       {
         shaderCacheMap,
         name,
         pos,
         getDataFunc: getDataFunc |> Obj.magic,
         sendDataFunc: GLSLSenderUniformUtils.getSendCachableDataByType(type_)
       }: uniformShaderSendCachableData
     ),
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap =
    (shaderIndex, uniformShaderSendCachableDataMap, shaderSendCachableDataArr) =>
  uniformShaderSendCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendCachableDataArr);

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformShaderSendCachableDataMap
  );