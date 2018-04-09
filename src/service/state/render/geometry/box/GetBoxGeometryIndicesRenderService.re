open StateRenderType;

let getIndices =
  [@bs]
  (
    (index, {boxGeometryRecord}) => {
      let indices =
        OperateTypeArrayBoxGeometryService.getIndicesTypeArray(index, boxGeometryRecord.indices);
      WonderLog.Log.print(("indices: ", indices)) |> ignore;
      indices
    }
  );

let getIndicesCount = (index, state) => BufferBoxGeometryService.getIndicesCount();