open MaterialType;

open MaterialStateUtils;

open Contract;

let handleDisposeComponent = (material: material, state: StateDataType.state) => {
  /* todo refactor: duplicate */
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't dispose before",
          () => {
            let {disposedIndexArray} = getMaterialData(state);
            disposedIndexArray |> Js.Array.includes(material) |> assertFalse
          }
        )
      )
  );
  let {disposedIndexArray} = getMaterialData(state);
  disposedIndexArray |> Js.Array.push(material) |> ignore;
  /* _removeFromRenderArray(gameObjectUid, materialData); */
  state
};

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length == 0;