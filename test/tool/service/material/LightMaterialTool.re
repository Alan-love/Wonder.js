open StateDataMainType;

open LightMaterialType;

let getMaterialRecord = (state) => RecordLightMaterialMainService.getRecord(state);

let createGameObject = (state) => {
  open LightMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createLightMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let getDefaultShaderIndex = (state) => getMaterialRecord(state).defaultShaderIndex;

let getDefaultDiffuseColor = (state) => getMaterialRecord(state).defaultDiffuseColor;

let getDefaultSpecularColor = (state) => getMaterialRecord(state).defaultSpecularColor;

let getDefaultShininess = (state) => getMaterialRecord(state).defaultShininess;

let initMaterials = (gl, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray, shaderIndices} = RecordLightMaterialMainService.getRecord(state);
  InitLightMaterialInitMaterialService.init(
    gl,
    (
      JudgeInstanceMainService.buildMap(
        index,
        RecordLightMaterialMainService.getRecord(state).gameObjectMap,
        gameObjectRecord
      ),
      JudgeInstanceMainService.isSupportInstance(state)
    ),
    CreateInitMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray, shaderIndices),
      state
    )
  )
  |> ignore;
  state
};

let getShaderIndex = (materialIndex: int, state: StateDataMainType.state) =>
  ShaderIndexLightMaterialMainService.getShaderIndex(materialIndex, state);

/* let hasShaderIndex = (materialIndex: int, state: StateDataMainType.state) =>
   ShaderIndexLightMaterialMainService.hasShaderIndex(materialIndex, state); */
let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataMainType.state) =>
  [@bs] ShaderIndexLightMaterialMainService.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: StateDataMainType.state) => {
  ...state,
  lightMaterialRecord:
    Some(DisposeLightMaterialService.handleDisposeComponent(material, getMaterialRecord(state)))
};

let initMaterial = (materialIndex, state) =>
  InitLightMaterialMainService.handleInitComponent(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    materialIndex,
    state
  );

let isMaterialDisposed = (material, state) => {
  open LightMaterialType;
  let {disposedIndexArray} = getMaterialRecord(state);
  disposedIndexArray |> Js.Array.includes(material)
};

let getGroupCount = (material, state) =>
  GroupLightMaterialService.getGroupCount(material, getMaterialRecord(state));