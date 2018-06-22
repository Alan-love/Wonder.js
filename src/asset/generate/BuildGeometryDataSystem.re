open Js.Typed_array;

open GenerateSceneGraphType;

let _addBufferViewData =
    (
      (pointsLength, pointsCount, bytes_per_element, pointType),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
    ) =>
  switch (pointsLength) {
  | 0 => (None, accessorDataArr, bufferViewDataArr, bufferViewOffset)
  | _ =>
    let bufferViewByteLength = pointsLength * bytes_per_element;

    (
      accessorDataArr |> Js.Array.length |. Some,
      accessorDataArr
      |> ArrayService.push({
           bufferView: bufferViewDataArr |> Js.Array.length,
           /* byteOffset:  0, */
           count: pointsCount,
           componentType:
             switch (pointType) {
             | VERTEX
             | NORMAL
             | TEXCOORD => 5126
             | INDEX => 5123
             },
           type_:
             switch (pointType) {
             | VERTEX
             | NORMAL => "VEC3"
             | TEXCOORD => "VEC2"
             | INDEX => "SCALAR"
             },
         }),
      bufferViewDataArr
      |> ArrayService.push({
           buffer: 0,
           byteOffset: bufferViewOffset,
           byteLength: bufferViewByteLength,
         }),
      bufferViewOffset + bufferViewByteLength,
    );
  };

let _addAllPointData =
    (
      (verticesSize, normalsSize, texCoordsSize, indicesSize),
      (verticesLength, normalsLength, texCoordsLength, indicesLength),
      (bufferViewOffset, (bufferViewDataArr, accessorDataArr)),
      (vertices, normals, texCoords, indices),
    ) => {
  open Js.Typed_array;

  let verticesCount = verticesLength / verticesSize;
  let normalsCount = normalsLength / normalsSize;
  let texCoordsCount = texCoordsLength / texCoordsSize;
  let indicesCount = indicesLength / indicesSize;

  let (vertexIndex, accessorDataArr, bufferViewDataArr, bufferViewOffset) =
    _addBufferViewData(
      (
        verticesLength,
        verticesCount,
        Float32Array._BYTES_PER_ELEMENT,
        VERTEX,
      ),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
    );

  let (normalIndex, accessorDataArr, bufferViewDataArr, bufferViewOffset) =
    _addBufferViewData(
      (normalsLength, normalsCount, Float32Array._BYTES_PER_ELEMENT, NORMAL),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
    );

  let (texCoordIndex, accessorDataArr, bufferViewDataArr, bufferViewOffset) =
    _addBufferViewData(
      (
        texCoordsLength,
        texCoordsCount,
        Float32Array._BYTES_PER_ELEMENT,
        TEXCOORD,
      ),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
    );

  let (indexIndex, accessorDataArr, bufferViewDataArr, bufferViewOffset) =
    _addBufferViewData(
      (indicesLength, indicesCount, Uint16Array._BYTES_PER_ELEMENT, INDEX),
      (bufferViewOffset, bufferViewDataArr, accessorDataArr),
    );
  (
    (vertexIndex, normalIndex, texCoordIndex, indexIndex),
    accessorDataArr,
    bufferViewDataArr,
    bufferViewOffset,
  );
};

let _addMeshData =
    (
      (vertexIndex, normalIndex, texCoordIndex, indexIndex),
      texCoords,
      meshDataArr,
    ) =>
  meshDataArr
  |> ArrayService.push(
       {
         primitives: {
           attributes: {
             position: vertexIndex |> OptionService.unsafeGet,
             normal: normalIndex,
             texCoord_0:
               switch (texCoords) {
               | None => None
               | Some(_) => texCoordIndex
               },
           },
           indices: indexIndex |> OptionService.unsafeGet,
           material: None,
         },
         name: None,
       }: meshData,
     );

let _setTotalByteLength =
    (
      (verticesLength, normalsLength, texCoordsLength, indicesLength),
      bufferViewOffset,
      totalByteLength,
    ) => (
  totalByteLength
  + (
    Float32Array._BYTES_PER_ELEMENT
    * (verticesLength + normalsLength + texCoordsLength)
    + Uint16Array._BYTES_PER_ELEMENT
    * indicesLength
  ),
  bufferViewOffset,
);

let build = meshPointDataMap => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(GenerateCommon.checkShouldHasNoSlot(meshPointDataMap))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let verticesSize = 3;
  let normalsSize = 3;
  let texCoordsSize = 2;
  let indicesSize = 1;

  let (
    (totalByteLength, bufferViewOffset),
    (bufferViewDataArr, accessorDataArr, meshDataArr),
  ) =
    meshPointDataMap
    |> SparseMapService.reduceiValid(
         (.
           (
             (totalByteLength, bufferViewOffset),
             (bufferViewDataArr, accessorDataArr, meshDataArr),
           ),
           (vertices, normals, texCoords, indices),
           meshIndex,
         ) => {
           let verticesLength = vertices |> Float32Array.length;
           let normalsLength = normals |> Float32Array.length;
           let texCoordsLength =
             switch (texCoords) {
             | None => 0
             | Some(texCoords) => texCoords |> Float32Array.length
             };
           let indicesLength = indices |> Uint16Array.length;

           let (
             (vertexIndex, normalIndex, texCoordIndex, indexIndex),
             accessorDataArr,
             bufferViewDataArr,
             bufferViewOffset,
           ) =
             _addAllPointData(
               (verticesSize, normalsSize, texCoordsSize, indicesSize),
               (
                 verticesLength,
                 normalsLength,
                 texCoordsLength,
                 indicesLength,
               ),
               (bufferViewOffset, (bufferViewDataArr, accessorDataArr)),
               (vertices, normals, texCoords, indices),
             );

           (
             _setTotalByteLength(
               (
                 verticesLength,
                 normalsLength,
                 texCoordsLength,
                 indicesLength,
               ),
               bufferViewOffset,
               totalByteLength,
             ),
             (
               bufferViewDataArr,
               accessorDataArr,
               _addMeshData(
                 (vertexIndex, normalIndex, texCoordIndex, indexIndex),
                 texCoords,
                 meshDataArr,
               ),
             ),
           );
         },
         ((0, 0), ([||], [||], [||])),
       );

  (totalByteLength, (bufferViewDataArr, accessorDataArr, meshDataArr));
};