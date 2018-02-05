open GameObjectType;

open MeshRendererType;

open MeshRendererStateCommon;

let _setRenderGameObjectArray =
    (
      meshRenderer: meshRenderer,
      gameObject: gameObject,
      renderGameObjectArray: Js.Array.t(gameObject)
    ) =>
  renderGameObjectArray |> ArraySystem.push(gameObject);

let handleAddComponent =
  [@bs]
  (
    (meshRenderer: meshRenderer, gameObjectUid: int, state: StateDataType.state) => {
      let {renderGameObjectArray, gameObjectMap} as data = getMeshRendererData(state);
      {
        ...state,
        meshRendererData: {
          ...data,
          renderGameObjectArray:
            renderGameObjectArray |> _setRenderGameObjectArray(meshRenderer, gameObjectUid),
          gameObjectMap:
            gameObjectMap
            |> ComponentSystem.addComponentToGameObjectMap(meshRenderer, gameObjectUid)
        }
      }
    }
  );