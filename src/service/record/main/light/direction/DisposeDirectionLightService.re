open DirectionLightType;

open DisposeComponentService;

let isAlive = (light, record) =>
  DisposeLightService.isAlive(light, IndexDirectionLightService.getMappedIndexMap(record));

let _disposeData =
  [@bs]
  (
    (sourceIndex, {index, colors, intensities, gameObjectMap, mappedIndexMap} as record) => {
      let gameObjectMap = DisposeLightService.disposeData(sourceIndex, gameObjectMap);
      let lastComponentIndex = pred(index);
      let mappedSourceIndex = mappedIndexMap |> MappedIndexService.getMappedIndex(sourceIndex);
      {
        ...record,
        index: pred(index),
        mappedIndexMap:
          DisposeLightService.setMappedIndexMap(
            sourceIndex,
            mappedSourceIndex,
            lastComponentIndex,
            mappedIndexMap
          ),
        colors:
          colors
          |> DisposeLightService.swapData(
               (mappedSourceIndex, lastComponentIndex),
               (
                 mappedIndexMap,
                 BufferDirectionLightService .getColorsSize(),
                 RecordDirectionLightMainService.getDefaultColor()
               ),
               DisposeTypeArrayService.deleteBySwapAndResetFloat32TypeArr
             ),
        intensities:
          intensities
          |> DisposeLightService.swapData(
               (mappedSourceIndex, lastComponentIndex),
               (
                 mappedIndexMap,
                 BufferDirectionLightService.getIntensitiesSize(),
                 RecordDirectionLightMainService.getDefaultIntensity()
               ),
               DisposeTypeArrayService.deleteSingleValueBySwapAndResetFloat32TypeArr
             ),
        gameObjectMap
      }
    }
  );

let handleDisposeComponent = (light, record) =>
  DisposeLightService.handleDisposeComponent(light, (isAlive, _disposeData), record);

let handleBatchDisposeComponent =
  [@bs]
  (
    (lightArray, record) =>
      DisposeLightService.handleBatchDisposeComponent(lightArray, (isAlive, _disposeData), record)
  );