open StateDataMainType;

let execJob = (configData, state) => RenderBasicJob.execJob(configData, state);

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectCustomGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};

let prepareGameObjectWithMap = (sandbox, map, state) => {
  let (state, gameObject, geometry, material, meshRenderer) = prepareGameObject(sandbox, state);
  let state = state |> BasicMaterialAPI.setBasicMaterialMap(material, map);
  (state, gameObject, geometry, material, meshRenderer, map)
};

let prepareGameObjectWithCreatedMap = (sandbox, state) => {
  let (state, map) = BasicSourceTextureAPI.createBasicSourceTexture(state);
  prepareGameObjectWithMap(sandbox, map, state)
};

let prepareGameObjectWithCustomGeometry = (sandbox, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open CustomGeometryAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject, customGeometry, (vertices, texCoords, normals, indices)) =
    CustomGeometryTool.createGameObjectAndSetPointData(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, customGeometry, material, meshRenderer)
};

let prepareGameObjectWithSharedGeometry = (sandbox, geometry, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  /* let (state, geometry) = BoxGeometryTool.createBoxGeometry(state); */
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectCustomGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};

let prepareGameObjectWithSharedMaterial = (sandbox, material, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  
  open MeshRendererAPI;
  open Sinon;
  /* let (state, material) = createBasicMaterial(state); */
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectCustomGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};