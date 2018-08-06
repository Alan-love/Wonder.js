let _convertByMesh =
    (meshes, geometryGameObjectIndices, geometryIndices) =>
  geometryGameObjectIndices
  |> Js.Array.mapi((_, index) => {
       let geometryIndex =
         Array.unsafe_get(geometryIndices, index);

       let {primitives}: GLTFType.mesh =
         Array.unsafe_get(meshes, geometryIndex);

       let {mode}: GLTFType.primitive =
         ConvertCommon.getPrimitiveData(primitives);

       Some(
         {
           drawMode:
             switch (mode) {
             | Some(0) => DrawModeType.Points
             | Some(1) => DrawModeType.Lines
             | Some(2) => DrawModeType.Line_loop
             | Some(3) => DrawModeType.Line_strip
             | Some(4) => DrawModeType.Triangles
             | Some(5) => DrawModeType.Triangle_strip
             | Some(6) => DrawModeType.Triangle_fan
             | None => DrawModeType.Triangles
             },
         }: WDType.meshRenderer,
       );
     });

let convertToMeshRenderers =
    (
      {
        gameObjectIndices: geometryGameObjectIndices,
        componentIndices: geometryIndices,
      }: WDType.componentGameObjectIndexData,
      {extras, meshes}: GLTFType.gltf,
    ) =>
  switch (extras) {
  | None =>
    _convertByMesh(
      meshes,
      geometryGameObjectIndices,
      geometryIndices,
    )
  | Some({meshRenderers}) =>
    switch (meshRenderers) {
    | Some(meshRenderers) when Js.Array.length(meshRenderers) > 0 =>
      meshRenderers
      |> WonderCommonlib.ArrayService.reduceOneParami(
           (. arr, {drawMode}: GLTFType.meshRenderer, index) =>
             arr
             |> ArrayService.push(
                  Some(
                    {drawMode: drawMode |> DrawModeType.uint8ToDrawMode}: WDType.meshRenderer,
                  ),
                ),
           [||],
         )
    | _ =>
      _convertByMesh(
        meshes,
        geometryGameObjectIndices,
        geometryIndices,
      )
    }
  };