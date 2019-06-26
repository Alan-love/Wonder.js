open StateDataRenderWorkerType;

open RenderWorkerCubemapTextureType;

let unsafeGetAllSources = (texture, state) => {
  let {
        pxSourceMap,
        nxSourceMap,
        pySourceMap,
        nySourceMap,
        pzSourceMap,
        nzSourceMap,
      } as cubemapTextureRecord =
    RecordCubemapTextureRenderWorkerService.getRecord(state);

  UpdateCubemapTextureRenderService._getAllSources(
    texture,
    (
      pxSourceMap,
      nxSourceMap,
      pySourceMap,
      nySourceMap,
      pzSourceMap,
      nzSourceMap,
    ),
  );
};

let buildFakeCreateImageBitmapFunc = [%bs.raw
  {|
  function(param){
    window.createImageBitmap = function(imageData, config){
    return new Promise(function(resolve, reject){
      resolve([imageData.uint8ClampedArray.arrayBuffer, imageData.width, imageData.height, config ]);
    }) ;
  }


window.ImageData = function(uint8ClampedArray, width, height){
  this.uint8ClampedArray = uint8ClampedArray;
  this.width = width;
  this.height = height;
}


window.Uint8ClampedArray = function(arrayBuffer){
  this.arrayBuffer = arrayBuffer;
}

  }
  |}
];

let clearFakeCreateImageBitmapFunc = [%bs.raw
  {|
  function(param){
    window.createImageBitmap = undefined;
  }
  |}
];

let createTwoMaps = state => {
  let (state, map1) = CubemapTextureAPI.createCubemapTexture(state);
  let (state, map2) = CubemapTextureAPI.createCubemapTexture(state);
  let state =
    CubemapTextureTool.setAllSources(
      ~state,
      ~texture=map1,
      ~width=100,
      ~height=200,
      (),
    );
  let state =
    CubemapTextureTool.setAllSources(
      ~state,
      ~texture=map2,
      ~width=110,
      ~height=210,
      (),
    );

  (
    state,
    (map1, map2),
    (
      CubemapTextureTool.unsafeGetAllSources(map1, state),
      CubemapTextureTool.unsafeGetAllSources(map2, state),
    ),
  );
};

let prepareStateAndCreateTwoMaps = sandbox => {
  let imageDataArrayBuffer1 = Obj.magic(11);
  let imageDataArrayBuffer2 = Obj.magic(12);
  let imageDataArrayBuffer3 = Obj.magic(13);
  let imageDataArrayBuffer4 = Obj.magic(14);
  let imageDataArrayBuffer5 = Obj.magic(15);
  let imageDataArrayBuffer6 = Obj.magic(16);
  let imageDataArrayBuffer7 = Obj.magic(17);
  let imageDataArrayBuffer8 = Obj.magic(18);
  let imageDataArrayBuffer9 = Obj.magic(19);
  let imageDataArrayBuffer10 = Obj.magic(20);
  let imageDataArrayBuffer11 = Obj.magic(21);
  let imageDataArrayBuffer12 = Obj.magic(22);
  let (state, context) =
    InitCubemapTextureRenderWorkerTool.prepareState(
      sandbox,
      (
        imageDataArrayBuffer1,
        imageDataArrayBuffer2,
        imageDataArrayBuffer3,
        imageDataArrayBuffer4,
        imageDataArrayBuffer5,
        imageDataArrayBuffer6,
        imageDataArrayBuffer7,
        imageDataArrayBuffer8,
        imageDataArrayBuffer9,
        imageDataArrayBuffer10,
        imageDataArrayBuffer11,
        imageDataArrayBuffer12,
      ),
    );
  let (state, (map1, map2), (allSource1, allSource2)) =
    createTwoMaps(state);
  (
    state,
    context,
    (
      imageDataArrayBuffer1,
      imageDataArrayBuffer2,
      imageDataArrayBuffer3,
      imageDataArrayBuffer4,
      imageDataArrayBuffer5,
      imageDataArrayBuffer6,
      imageDataArrayBuffer7,
      imageDataArrayBuffer8,
      imageDataArrayBuffer9,
      imageDataArrayBuffer10,
      imageDataArrayBuffer11,
      imageDataArrayBuffer12,
    ),
    (map1, map2),
    (allSource1, allSource2),
  );
};

/* let prepareStateAndCreateTwoGameObjects = sandbox => {
     let imageDataArrayBuffer1 = Obj.magic(11);
     let imageDataArrayBuffer2 = Obj.magic(12);
     let imageDataArrayBuffer3 = Obj.magic(13);
     let imageDataArrayBuffer4 = Obj.magic(14);
     let (state, context) =
       InitCubemapTextureRenderWorkerTool.prepareState(
         sandbox,
         (
           imageDataArrayBuffer1,
           imageDataArrayBuffer2,
           imageDataArrayBuffer3,
           imageDataArrayBuffer4,
         ),
       );
     let (state, (map1, map2), (source1, source2)) = createTwoMaps(state);
     let (state, gameObject1, _, _, _, map1) =
       FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
         sandbox,
         map1,
         state,
       );
     let (state, gameObject2, _, _, _, map2) =
       FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
         sandbox,
         map2,
         state,
       );
     let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);
     let (state, _, _, _) = CameraTool.createCameraGameObject(state);
     (
       state,
       context,
       (
         imageDataArrayBuffer1,
         imageDataArrayBuffer2,
         imageDataArrayBuffer3,
         imageDataArrayBuffer4,
       ),
       (gameObject1, gameObject2),
       (map1, map2),
       (source1, source2),
     );
   }; */

let getTexture = (texture, state) =>
  OperateGlTextureMapService.getTexture(
    texture,
    RecordCubemapTextureRenderWorkerService.getRecord(state).glTextureMap,
  );

let setGlTexture = (texture, glTexture, state) => {
  OperateGlTextureMapService.setTexture(
    texture,
    glTexture,
    RecordCubemapTextureRenderWorkerService.getRecord(state).glTextureMap,
  );

  state;
};