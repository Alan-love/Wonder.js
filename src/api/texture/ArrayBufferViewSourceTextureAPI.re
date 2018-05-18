open StateDataMainType;

open ArrayBufferViewSourceTextureType;

let createArrayBufferViewSourceTexture = (state) => [@bs] CreateArrayBufferViewSourceTextureMainService.create(state);

/* TODO check alive */
let unsafeGetArrayBufferViewSourceTextureSource = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.unsafeGetSource(texture, state);

let setArrayBufferViewSourceTextureSource = (texture, source, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setSource(texture, source, state);

let getArrayBufferViewSourceTextureWidth = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getWidth(texture, state);

let getArrayBufferViewSourceTextureHeight = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getHeight(texture, state);

let getArrayBufferViewSourceTextureWrapS = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getWrapS(texture, state);

let setArrayBufferViewSourceTextureWrapS = (texture, wrapS, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setWrapS(texture, wrapS, state);

let getArrayBufferViewSourceTextureWrapT = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentThouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(TtateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getWrapT(texture, state);

let setArrayBufferViewSourceTextureWrapT = (texture, wrapT, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentThouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(TtateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setWrapT(texture, wrapT, state);

let getArrayBufferViewSourceTextureMagFilter = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getMagFilter(texture, state);

let setArrayBufferViewSourceTextureMagFilter = (texture, filter, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setMagFilter(texture, filter, state);

let getArrayBufferViewSourceTextureMinFilter = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getMinFilter(texture, state);

let setArrayBufferViewSourceTextureMinFilter = (texture, filter, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setMinFilter(texture, filter, state);



let getArrayBufferViewSourceTextureFormat = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getFormat(texture, state);

let setArrayBufferViewSourceTextureFormat = (texture, format, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setFormat(texture, format, state);

let getArrayBufferViewSourceTextureType = (texture, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.getType(texture, state);

let setArrayBufferViewSourceTextureType = (texture, type_, state: StateDataMainType.state) =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               AliveComponentService.checkComponentShouldAlive(
                 texture,
                 isAlive,
                 RecordArrayBufferViewSourceTextureMainService.getRecord(state)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  OperateArrayBufferViewSourceTextureMainService.setType(texture, type_, state);
