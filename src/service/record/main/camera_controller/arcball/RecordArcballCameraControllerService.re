open StateDataMainType;

let create = () => {
  index: 0,
  pointDragStartEventHandleFuncMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  pointDragDropEventHandleFuncMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  pointDragOverEventHandleFuncMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  pointScaleEventHandleFuncMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  keydownEventHandleFuncMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  dirtyArray: WonderCommonlib.ArrayService.createEmpty(),
  distanceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  minDistanceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  phiMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  thetaMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  thetaMarginMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  targetMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  moveSpeedXMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  moveSpeedYMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  rotateSpeedMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  wheelSpeedMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
};

let deepCopyForRestore =
    (
      {
        index,
        pointDragStartEventHandleFuncMap,
        pointDragDropEventHandleFuncMap,
        pointDragOverEventHandleFuncMap,
        pointScaleEventHandleFuncMap,
        keydownEventHandleFuncMap,
        dirtyArray,
        distanceMap,
        minDistanceMap,
        phiMap,
        thetaMap,
        thetaMarginMap,
        targetMap,
        moveSpeedXMap,
        moveSpeedYMap,
        rotateSpeedMap,
        wheelSpeedMap,
        gameObjectMap,
        disposedIndexArray,
      },
    ) => {
  index,
  pointDragStartEventHandleFuncMap:
    pointDragStartEventHandleFuncMap |> WonderCommonlib.MutableSparseMapService.copy,
  pointDragDropEventHandleFuncMap:
    pointDragDropEventHandleFuncMap |> WonderCommonlib.MutableSparseMapService.copy,
  pointDragOverEventHandleFuncMap:
    pointDragOverEventHandleFuncMap |> WonderCommonlib.MutableSparseMapService.copy,
  pointScaleEventHandleFuncMap:
    pointScaleEventHandleFuncMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  keydownEventHandleFuncMap:
    keydownEventHandleFuncMap |> WonderCommonlib.MutableSparseMapService.copy,
  dirtyArray: dirtyArray |> Js.Array.copy,
  distanceMap: distanceMap |> WonderCommonlib.MutableSparseMapService.copy,
  minDistanceMap:
    minDistanceMap |> WonderCommonlib.MutableSparseMapService.copy,
  phiMap: phiMap |> WonderCommonlib.MutableSparseMapService.copy,
  thetaMap: thetaMap |> WonderCommonlib.MutableSparseMapService.copy,
  thetaMarginMap:
    thetaMarginMap |> WonderCommonlib.MutableSparseMapService.copy,
  targetMap: targetMap |> WonderCommonlib.MutableSparseMapService.copy,
  moveSpeedXMap: moveSpeedXMap |> WonderCommonlib.MutableSparseMapService.copy,
  moveSpeedYMap: moveSpeedYMap |> WonderCommonlib.MutableSparseMapService.copy,
  rotateSpeedMap:
    rotateSpeedMap |> WonderCommonlib.MutableSparseMapService.copy,
  wheelSpeedMap: wheelSpeedMap |> WonderCommonlib.MutableSparseMapService.copy,
  gameObjectMap: gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy,
};