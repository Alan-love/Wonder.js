open InstanceType;

open SourceInstanceType;

let getStatic = () => 1;

let getNotStatic = () => 0;

let getDefault = () => getStatic();

let markModelMatrixStatic = (sourceInstance: sourceInstance, isTransformStatics) =>
  TypeArrayService.setUInt8_1(
    BufferSourceInstanceService.getIsTransformStaticsIndex(sourceInstance),
    getStatic(),
    isTransformStatics
  );

let markModelMatrixNotStatic = (sourceInstance: sourceInstance, isTransformStatics) =>
  TypeArrayService.setUInt8_1(
    BufferSourceInstanceService.getIsTransformStaticsIndex(sourceInstance),
    getNotStatic(),
    isTransformStatics
  );

let setModelMatrixIsStatic = (sourceInstance: sourceInstance, isStatic: int, isTransformStatics) =>
  TypeArrayService.setUInt8_1(
    BufferSourceInstanceService.getIsTransformStaticsIndex(sourceInstance),
    isStatic,
    isTransformStatics
  );

let markModelMatrixIsStatic = (sourceInstance: sourceInstance, isStatic: bool, isTransformStatics) =>
  isStatic ?
    markModelMatrixStatic(sourceInstance, isTransformStatics) :
    markModelMatrixNotStatic(sourceInstance, isTransformStatics);

let isTransformStatic = (sourceInstance: sourceInstance, isTransformStatics) =>
  TypeArrayService.getUInt8_1(
    BufferSourceInstanceService.getIsTransformStaticsIndex(sourceInstance),
    isTransformStatics
  )
  === getStatic();