open StateDataMainType;

open GlExtend;

open WonderWebgl.Gl;

type editorState = {
  mutable gameViewWidth: int,
  mutable gameViewHeight: int,
  mutable offscreenWidth: int,
  mutable offscreenHeight: int,
  mutable framebuffer: option(GlType.framebuffer),
  mutable texture: option(WonderWebgl.GlType.texture),
  /* mutable sceneViewActiveBasicCameraView: option(ComponentType.component), */
  mutable gameViewActiveBasicCameraViewAspect: option(float),
  mutable gameViewCanvasContext: option(CanvasType.canvasContext),
};

let editorState = {
  gameViewWidth: 0,
  gameViewHeight: 0,
  offscreenWidth: 0,
  offscreenHeight: 0,
  framebuffer: None,
  texture: None,
  /* sceneViewActiveBasicCameraView: None, */
  gameViewActiveBasicCameraViewAspect: None,
  gameViewCanvasContext: None,
};

let _getEditorState = () => editorState;

/* let _setEditorStateData =
       (
         ~editorState,
         ~framebuffer=None,
         ~texture=None,
         ~activeBasicCameraView=None,
         (),
       ) => {
     /* ...editorState,
        framebuffer,
        texture */

     editorState.framebuffer = framebuffer;
     editorState.texture = texture;
     editorState.activeBasicCameraView = activeBasicCameraView;

     editorState;
   }; */

/* TODO fix */
let _unsafeGetSceneViewActiveBasicCameraView = state => 0;

/* TODO fix */
let _unsafeGetGameViewActiveBasicCameraView = state => 1;

let _unsafeGetGameViewActivePerspectiveCameraProjection = state =>
  _unsafeGetGameViewActiveBasicCameraView(state)
  |> BasicCameraViewAPI.unsafeGetBasicCameraViewGameObject(_, state)
  |> GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent(
       _,
       state,
     );

let initGameViewFramebufferObjectJob = (_, state) => {
  let gl = DeviceManagerAPI.unsafeGetGl(state);

  let {offscreenWidth, offscreenHeight} = _getEditorState();

  let framebuffer = createFramebuffer(gl);

  let texture = createTexture(gl);

  let textureTarget = getTexture2D(gl);

  gl |> bindTexture(textureTarget, texture);

  gl
  |> texImage2DWithNull(
       textureTarget,
       0,
       getRgba(gl),
       offscreenWidth,
       offscreenHeight,
       0,
       getRgba(gl),
       getUnsignedByte(gl),
       Js.Nullable.null,
     );

  gl |> texParameteri(textureTarget, getTextureMinFilter(gl), getLinear(gl));

  let renderBufferTarget = getRenderBuffer(gl);
  let depthBuffer = createRenderbuffer(gl);

  gl |> bindRenderbuffer(renderBufferTarget, depthBuffer);

  gl
  |> renderbufferStorage(
       renderBufferTarget,
       getDepthComponent16(gl),
       offscreenWidth,
       offscreenHeight,
     );

  let frameBufferTarget = getFrameBuffer(gl);

  gl |> bindFramebuffer(frameBufferTarget, framebuffer);

  gl
  |> framebufferTexture2D(
       frameBufferTarget,
       getColorAttachment0(gl),
       textureTarget,
       texture,
       0,
     );

  gl
  |> framebufferRenderbuffer(
       frameBufferTarget,
       getDepthAttachment(gl),
       renderBufferTarget,
       depthBuffer,
     );

  let framebufferStatus = gl |> checkFramebufferStatus(frameBufferTarget);

  framebufferStatus !== getFramebufferComplete(gl) ?
    {
      let status = getFramebufferStatus(framebufferStatus);

      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="initGameViewFramebufferObject",
          ~description={j|Frame buffer object is incomplete: $status|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );
    } :
    ();

  gl |> bindFramebuffer(frameBufferTarget, Obj.magic(Js.Nullable.null));
  gl |> bindTexture(textureTarget, Obj.magic(Js.Nullable.null));
  gl |> bindRenderbuffer(renderBufferTarget, Obj.magic(Js.Nullable.null));

  /* ( framebuffer, texture ); */

  editorState.framebuffer = Some(framebuffer);
  editorState.texture = Some(texture);

  state;
};

let _activeSceneViewCamera = state => {
  let {gameViewWidth, gameViewHeight} as editorState = _getEditorState();

  let sceneViewActiveBasicCameraView =
    _unsafeGetSceneViewActiveBasicCameraView(state);
  let gameViewActiveBasicCameraView =
    _unsafeGetGameViewActiveBasicCameraView(state);

  let gameViewActivePerspectiveCameraProjection =
    _unsafeGetGameViewActivePerspectiveCameraProjection(state);

  let gameViewActiveBasicCameraViewAspect =
    FrustumPerspectiveCameraProjectionService.getAspect(
      gameViewActivePerspectiveCameraProjection,
      state.perspectiveCameraProjectionRecord,
    );

  let state =
    PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionAspect(
      gameViewActivePerspectiveCameraProjection,
      (gameViewWidth |> NumberType.intToFloat)
      /. (gameViewHeight |> NumberType.intToFloat),
      state,
    );
  let state = state |> UpdatePerspectiveCameraProjectionMainService.update;

  let state =
    BasicCameraViewAPI.activeBasicCameraView(
      gameViewActiveBasicCameraView,
      state,
    );

  /* editorState.sceneViewActiveBasicCameraView =
     Some(sceneViewActiveBasicCameraView); */
  editorState.gameViewActiveBasicCameraViewAspect =
    /* Some(gameViewActiveBasicCameraViewAspect); */
    gameViewActiveBasicCameraViewAspect;

  (state, editorState);
};

let prepareRenderGameViewToTextureJob = (_, state) => {
  let gl = DeviceManagerAPI.unsafeGetGl(state);
  let {gameViewWidth, gameViewHeight, framebuffer, texture} =
    _getEditorState();

  gl
  |> bindFramebuffer(
       getFrameBuffer(gl),
       framebuffer |> OptionService.unsafeGet,
     );
  gl
  |> viewport(
       0.,
       0.,
       gameViewWidth |> NumberType.intToFloat,
       gameViewHeight |> NumberType.intToFloat,
     );
  gl |> clearColor(0., 0., 0., 0.);
  gl |> clear(getColorBufferBit(gl) lor getDepthBufferBit(gl));

  let (state, editorState) = _activeSceneViewCamera(state);

  state;
};

let _restoreCamera = state => {
  let {gameViewActiveBasicCameraViewAspect} = _getEditorState();

  let sceneViewActiveBasicCameraView =
    _unsafeGetSceneViewActiveBasicCameraView(state);

  /* let gameViewActiveBasicCameraView =
     _unsafeGetGameViewActiveBasicCameraView(state); */

  let gameViewActivePerspectiveCameraProjection =
    _unsafeGetGameViewActivePerspectiveCameraProjection(state);

  let state =
    state
    |> BasicCameraViewAPI.activeBasicCameraView(
         /* sceneViewActiveBasicCameraView |> OptionService.unsafeGet, */
         sceneViewActiveBasicCameraView,
       );

  let state =
    switch (gameViewActiveBasicCameraViewAspect) {
    | Some(gameViewActiveBasicCameraViewAspect) =>
      state
      |> PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionAspect(
           gameViewActivePerspectiveCameraProjection,
           gameViewActiveBasicCameraViewAspect,
         )
    | None => state
    };

  state;
};

let _renderTextureToCanvas = (gl, state) => {
  let {gameViewWidth, gameViewHeight, gameViewCanvasContext} =
    _getEditorState();

  let gameViewCanvasContext = gameViewCanvasContext |> OptionService.unsafeGet;

  let bytes_per_pixel = 4;

  let pixels =
    Js.Typed_array.Uint8Array.fromLength(
      bytes_per_pixel * gameViewWidth * gameViewHeight,
    );

  gl
  |> readUnsignedBytePixels(
       0,
       0,
       gameViewWidth,
       gameViewHeight,
       getRgba(gl),
       getUnsignedByte(gl),
       pixels,
     );

  let imageData =
    gameViewCanvasContext
    |> Canvas.getImageData(0., 0., gameViewWidth, gameViewHeight);

  Obj.magic(imageData##data)
  |> Js.Typed_array.Uint8ClampedArray.setArray(Obj.magic(pixels));
  gameViewCanvasContext |> Canvas.putImageData(imageData, 0., 0.);
  /* TODO set flipY? */

  state;
};

let finishRenderGameViewToTextureJob = (_, state) => {
  let gl = DeviceManagerAPI.unsafeGetGl(state);

  let state = _renderTextureToCanvas(gl, state);

  gl |> bindFramebuffer(getFrameBuffer(gl), Obj.magic(Js.Nullable.null));

  let state = _restoreCamera(state);

  state;
};

let restoreViewportJob = (_, state) => {
  let (x, y, width, height, _, _) as screenData =
    ScreenService.queryFullScreenData();
  let viewportData = (x, y, width, height);
  /* {
       ...state,
       deviceManagerRecord:
         state.deviceManagerRecord
         |> DeviceManagerService.setViewportOfGl(
              DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
              viewportData,
            )
         |> DeviceManagerService.setViewportData(viewportData),
     }; */

  let gl = DeviceManagerAPI.unsafeGetGl(state);

  gl |> viewport(x, y, width, height);

  state;
};

let initDemo =
    (
      gameViewCanvasContext,
      gameViewWidth,
      gameViewHeight,
      offscreenWidth,
      offscreenHeight,
      state,
    ) => {
  let state =
    state
    |> JobAPI.registerNoWorkerInitJob(
         "init_game_view_framebuffer_object",
         initGameViewFramebufferObjectJob,
       )
    |> JobAPI.registerNoWorkerLoopJob(
         "prepare_render_game_view_to_texture",
         prepareRenderGameViewToTextureJob,
       )
    |> JobAPI.registerNoWorkerLoopJob(
         "finish_render_game_view_to_texture",
         finishRenderGameViewToTextureJob,
       )
    |> JobAPI.registerNoWorkerLoopJob("restore_viewport", restoreViewportJob);

  let editorState = _getEditorState();
  editorState.gameViewCanvasContext = Some(gameViewCanvasContext);
  /* editorState.gameViewWidth = Some(gameViewWidth);
     editorState.gameViewHeight = Some(gameViewHeight);
     editorState.offscreenWidth = Some(offscreenWidth);
     editorState.offscreenHeight = Some(offscreenHeight); */
  editorState.gameViewWidth = gameViewWidth;
  editorState.gameViewHeight = gameViewHeight;
  editorState.offscreenWidth = offscreenWidth;
  editorState.offscreenHeight = offscreenHeight;

  state;
};