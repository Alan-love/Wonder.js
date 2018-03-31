open DirectionLightType;

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
      |> BufferService.checkNotExceedMaxCount(RecordDirectionLightService.getBufferMaxCount())
  );