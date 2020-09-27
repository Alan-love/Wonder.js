open GeometryCPPOType;

let getVertexInfo = index => {
  let {verticesInfos} = CPRepo.getExnGeometry();

  ReallocatedPointsGeometryCPRepoUtils.getInfo(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    verticesInfos,
  )
  ->Result.bind(((startIndex, endIndex)) => {
      (startIndex, endIndex)
      ->Contract.ensureCheck(
          ((startIndex, endIndex)) => {
            open Contract;
            open Operators;

            test(
              Log.buildAssertMessage(
                ~expect={j|equal to the info get from normals|j},
                ~actual={j|not equal|j},
              ),
              () => {
                let {normalsInfos} = CPRepo.getExnGeometry();

                let (startIndexGetFromNormals, endIndexGetFromNormals) =
                  ReallocatedPointsGeometryCPRepoUtils.getInfo(
                    BufferGeometryCPRepoUtils.getInfoIndex(index),
                    normalsInfos,
                  )
                  ->Result.getExn;

                startIndex == startIndexGetFromNormals
                && endIndex == endIndexGetFromNormals;
              },
            );
            test(
              Log.buildAssertMessage(
                ~expect={j|startIndex:$startIndex is 3 times|j},
                ~actual={j|not|j},
              ),
              () => {
                let x = startIndex->Belt.Float.fromInt /. 3.;

                x -. x->Js.Math.floor_float ==. 0.0;
              },
            );
          },
          OtherConfigDpRunAPI.unsafeGet().getIsDebug(),
        )
    });
};

let getIndexInfo = index => {
  let {indicesInfos} = CPRepo.getExnGeometry();

  ReallocatedPointsGeometryCPRepoUtils.getInfo(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    indicesInfos,
  );
};

let getVerticesTypeArr = () => {
  CPRepo.getExnGeometry().vertices;
};

let getTexCoordsTypeArr = () => {
  CPRepo.getExnGeometry().texCoords;
};

let getNormalsTypeArr = () => {
  CPRepo.getExnGeometry().normals;
};

let getIndicesTypeArr = () => {
  CPRepo.getExnGeometry().indices;
};

let getVerticesOffset = () => {
  CPRepo.getExnGeometry().verticesOffset;
};

let getNormalsOffset = () => {
  CPRepo.getExnGeometry().normalsOffset;
};

let getIndicesOffset = () => {
  CPRepo.getExnGeometry().indicesOffset;
};

let getCopyUsedIndicesTypeArr = () => {
  Js.Typed_array.Uint32Array.slice(
    ~start=0,
    ~end_=getIndicesOffset(),
    getIndicesTypeArr(),
  );
};
