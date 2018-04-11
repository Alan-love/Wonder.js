open PointLightType;

let create =
  [@bs]
  (
    ({index, mappedIndexMap} as record) =>
      (
        {
          ...record,
          index: succ(index),
          mappedIndexMap: mappedIndexMap |> MappedIndexService.setMappedIndex(index, index)
        },
        index
      )
      |> BufferService.checkNotExceedMaxCount(BufferPointLightService.getBufferMaxCount())
  );