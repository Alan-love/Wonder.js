open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test render imgui job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfig(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigTool.buildNoWorkerJobConfig(
              ~initPipelines=
                {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_imgui"
        }
      ]
    }
  ]
        |},
              ~initJobs=
                {|
[
        {
          "name": "init_imgui"
        }
]
        |},
              ~loopPipelines=
                {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "render_imgui"
        }
      ]
    }
  ]
        |},
              ~loopJobs=
                {|
[
        {
          "name": "render_imgui"
        }
]
        |},
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test("if not load imgui asset, not error", () => {
      let canvas = {"width": 100, "height": 200} |> Obj.magic;
      let state = ViewTool.setCanvas(canvas, state^);
      let state =
        state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

      expect(() => {
        let state = state |> NoWorkerJobTool.execInitJobs;
        let state = state |> NoWorkerJobTool.execLoopJobs;
        ();
      })
      |> not_
      |> toThrow;
    });

    describe("else, render imgui", () => {
      describe("test render image", () => {
        let _getPositionBufferData = () => [|
          50.,
          60.,
          50.,
          310.,
          200.,
          60.,
          200.,
          310.,
        |];

        beforeEach(() => state := AssetIMGUITool.prepareFontAsset(state^));

        test("send imgui buffers data", () => {
          let state = RenderIMGUITool.prepareFntData(state^);
          let canvas = {"width": 1000, "height": 500} |> Obj.magic;
          let state = ViewTool.setCanvas(canvas, state);
          let array_buffer = 1;
          let dynamic_draw = 2;
          let getExtension =
            WonderImgui.RenderIMGUITool.buildNoVAOExtension(sandbox);
          let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 WonderImgui.FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~array_buffer,
                   ~bufferData,
                   ~dynamic_draw,
                   ~getExtension,
                   (),
                 ),
               );
          let (
            (
              (imageX1, imageY1, imageWidth1, imageHeight1),
              (imageS01, imageT01, imageS11, imageT11),
              textureId1,
            ),
            _,
            _,
          ) =
            WonderImgui.RenderIMGUITool.buildImageData();
          let image1Data = _getPositionBufferData();
          let state =
            ManageIMGUIAPI.setIMGUIFunc(
              Obj.magic(-1),
              (_, apiJsObj, record) => {
                let imageFunc = apiJsObj##image;
                let record =
                  imageFunc(.
                    (imageX1, imageY1, imageWidth1, imageHeight1),
                    (imageS01, imageT01, imageS11, imageT11),
                    textureId1,
                    record,
                  );

                record;
              },
              state,
            );
          let state = state |> NoWorkerJobTool.execInitJobs;
          let bufferDataCallCountAfterInit = bufferData |> getCallCount;

          let state = state |> NoWorkerJobTool.execLoopJobs;

          bufferData
          |> getCall(bufferDataCallCountAfterInit + 0)
          |> expect
          |> toCalledWith([|
               array_buffer,
               Float32Array.make(image1Data) |> Obj.magic,
               dynamic_draw,
             |]);
        });
      });

      describe("test render button", () => {
        let _prepareState = () => {
          state :=
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~noWorkerJobRecord=
                NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                  ~initPipelines=
                    {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_event"
        },
        {
          "name": "init_imgui"
        }
      ]
    }
  ]
        |},
                  ~initJobs=
                    {|
[

        {
          "name": "init_event"
        },
        {
          "name": "init_imgui"
        }
]
        |},
                  ~loopPipelines=
                    {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "render_imgui"
        }
      ]
    }
  ]
        |},
                  ~loopJobs=
                    {|
[
        {
          "name": "render_imgui"
        }
]
        |},
                  (),
                ),
              (),
            );

          let state = AssetIMGUITool.prepareFontAsset(state^);

          let state = RenderIMGUITool.prepareFntData(state);

          let state = MainStateTool.setState(state);
          let state = BrowserDetectTool.setChrome();

          let canvasDom =
            EventTool.buildFakeCanvas((0, 0, Js.Nullable.undefined));
          let state = ViewTool.setCanvas(canvasDom |> Obj.magic, state);

          state;
        };

        let _prepareGl = state => {
          let array_buffer = 1;
          let dynamic_draw = 2;
          let getExtension =
            WonderImgui.RenderIMGUITool.buildNoVAOExtension(sandbox);
          let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 WonderImgui.FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~array_buffer,
                   ~bufferData,
                   ~dynamic_draw,
                   ~getExtension,
                   (),
                 ),
               );

          (state, array_buffer, dynamic_draw, bufferData);
        };

        describe("test mousedown button", () =>
          test("test color buffer data", () => {
            let state = _prepareState();
            let (state, array_buffer, dynamic_draw, bufferData) =
              _prepareGl(state);
            let ((buttonX1, buttonY1, buttonWidth1, buttonHeight1), str1) as buttonData =
              WonderImgui.ButtonIMGUITool.buildButtonData1();
            let state =
              ManageIMGUIAPI.setIMGUIFunc(
                buttonData |> Obj.magic,
                (customData, apiJsObj, record) => {
                  let (
                    (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                    str1,
                  ) =
                    customData |> Obj.magic;
                  let buttonFunc = apiJsObj##button;

                  let (record, isButtonClick) =
                    buttonFunc(.
                      (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                      str1,
                      record,
                    );

                  record;
                },
                state,
              );
            let state =
              ManageIMGUIAPI.setSetting(
                IMGUITool.buildSettingJsObj(
                  ~clickButtonColor=[|0.1, 0.2, 0.3|],
                  (),
                ),
                state,
              );
            let state = state |> NoWorkerJobTool.execInitJobs;
            let bufferDataCallCountAfterInit = bufferData |> getCallCount;
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(
                ~pageX=buttonX1,
                ~pageY=buttonY1,
                (),
              ),
            );
            let state = EventTool.restore(state);

            let state = MainStateTool.unsafeGetState();
            let state = state |> NoWorkerJobTool.execLoopJobs;

            bufferData
            |> getCall(bufferDataCallCountAfterInit + 1)
            |> expect
            |> toCalledWith([|
                 array_buffer,
                 Float32Array.make([|
                   0.1,
                   0.2,
                   0.3,
                   0.1,
                   0.2,
                   0.3,
                   0.1,
                   0.2,
                   0.3,
                   0.1,
                   0.2,
                   0.3,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                 |])
                 |> Obj.magic,
                 dynamic_draw,
               |]);
          })
        );

        describe("test click button", () =>
          test("test button is click", () => {
            let state = _prepareState();
            let (state, array_buffer, dynamic_draw, bufferData) =
              _prepareGl(state);
            let ((buttonX1, buttonY1, buttonWidth1, buttonHeight1), str1) as buttonData =
              WonderImgui.ButtonIMGUITool.buildButtonData1();
            let isClick = ref(false);
            let state =
              ManageIMGUIAPI.setIMGUIFunc(
                buttonData |> Obj.magic,
                (customData, apiJsObj, record) => {
                  let (
                    (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                    str1,
                  ) =
                    customData |> Obj.magic;
                  let buttonFunc = apiJsObj##button;

                  let (record, isButtonClick) =
                    buttonFunc(.
                      (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                      str1,
                      record,
                    );

                  isClick := isButtonClick;

                  record;
                },
                state,
              );
            let state = state |> NoWorkerJobTool.execInitJobs;
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(
                ~pageX=buttonX1,
                ~pageY=buttonY1,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            let state = MainStateTool.unsafeGetState();
            let state = state |> NoWorkerJobTool.execLoopJobs;

            isClick^ |> expect == true;
          })
        );

        describe("reset io data->point event state when point up", () =>
          test("test button isn't click after point up", () => {
            let state = _prepareState();
            let (state, array_buffer, dynamic_draw, bufferData) =
              _prepareGl(state);
            let ((buttonX1, buttonY1, buttonWidth1, buttonHeight1), str1) as buttonData =
              WonderImgui.ButtonIMGUITool.buildButtonData1();
            let isClick = ref(false);
            let state =
              ManageIMGUIAPI.setIMGUIFunc(
                buttonData |> Obj.magic,
                (customData, apiJsObj, record) => {
                  let (
                    (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                    str1,
                  ) =
                    customData |> Obj.magic;
                  let buttonFunc = apiJsObj##button;

                  let (record, isButtonClick) =
                    buttonFunc(.
                      (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                      str1,
                      record,
                    );

                  isClick := isButtonClick;

                  record;
                },
                state,
              );
            let state = state |> NoWorkerJobTool.execInitJobs;

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(
                ~pageX=buttonX1,
                ~pageY=buttonY1,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);
            let state = state |> NoWorkerJobTool.execLoopJobs;

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            let state = state |> NoWorkerJobTool.execLoopJobs;

            isClick^ |> expect == false;
          })
        );
      });
    });
  });