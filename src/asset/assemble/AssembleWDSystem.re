open StateDataMainType;

open WDType;

open Js.Typed_array;

let assemble = (({indices} as wdRecord, imageArr, bufferArr), state) =>
  BatchCreateSystem.batchCreate(wdRecord, state)
  |> BatchOperateSystem.batchOperate(wdRecord, imageArr, bufferArr)
  |> BuildSceneGameObjectSystem.build(wdRecord);