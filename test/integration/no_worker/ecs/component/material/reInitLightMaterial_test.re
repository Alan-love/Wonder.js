open Wonder_jest;

let _ =
  describe("test re-init lightMaterial", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _initMaterial = (material, state) => {
      let state = AllMaterialTool.prepareForInit(state);
      let state = LightMaterialTool.initMaterial(material, state);

      state;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test with light", () =>
      describe("test with direction light", () => {
        beforeEach(() => state := TestTool.initWithJobConfig(~sandbox, ()));

        describe("test glsl", () => {
          test(
            {|test one light material:
   1.has no lights;
   2.init material;
   3.add one light;
   4.re-init material;

   glsl->DIRECTION_LIGHTS_COUNT should == 1|},
            () => {
              let (state, gameObject, material) =
                LightMaterialTool.createGameObject(state^);
              let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ()),
                   );
              let state = _initMaterial(material, state);
              let shaderSourceCallCount = shaderSource |> getCallCount;

              let (state, lightGameObject, light) =
                DirectionLightTool.createGameObject(state);
              let state =
                LightMaterialAPI.reInitMaterials([|material|], state);

              GLSLTool.contain(
                GLSLTool.getVsSourceByCount(
                  shaderSource,
                  shaderSourceCallCount,
                ),
                {|#define DIRECTION_LIGHTS_COUNT 1|},
              )
              |> expect == true;
            },
          );
          test(
            {|test one light material:
   1.has one light;
   2.init material;
   3.dispose the light;
   4.re-init material;

   glsl->DIRECTION_LIGHTS_COUNT should == 0|},
            () => {
              let (state, gameObject, material) =
                LightMaterialTool.createGameObject(state^);
              let (state, lightGameObject, light) =
                DirectionLightTool.createGameObject(state);
              let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ()),
                   );
              let state = _initMaterial(material, state);
              let shaderSourceCallCount = shaderSource |> getCallCount;

              let state =
                GameObjectTool.disposeGameObject(lightGameObject, state);
              let state =
                LightMaterialAPI.reInitMaterials([|material|], state);

              GLSLTool.contain(
                GLSLTool.getVsSourceByCount(
                  shaderSource,
                  shaderSourceCallCount,
                ),
                {|#define DIRECTION_LIGHTS_COUNT 0|},
              )
              |> expect == true;
            },
          );
        });

        test("if use worker, fatal", () => {
          let state =
            WorkerDetectMainWorkerTool.markIsSupportRenderWorkerAndSharedArrayBuffer(
              true,
              state^,
            )
            |> SettingTool.setUseWorker(true);
          let (state, gameObject, material) =
            LightMaterialTool.createGameObject(state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

          expect(() => {
            let state =
              LightMaterialAPI.reInitMaterials([|material|], state);
            ();
          })
          |> toThrowMessage("not support worker");
        });

        describe("test front render light", () => {
          describe(
            {|test one light material:
   1.has no lights;
   2.init material;
   3.add one light;
   4.re-init material;
   5.front render light|},
            () => {
              let _exec = (material, state) => {
                let (state, _, cameraTransform, _) =
                  CameraTool.createCameraGameObject(state);
                let (state, lightGameObject, light) =
                  DirectionLightTool.createGameObject(state);
                let state =
                  LightMaterialAPI.reInitMaterials([|material|], state);
                let state = state |> DirectorTool.runWithDefaultTime;

                state;
              };

              test("should use new program", () => {
                let (state, gameObject, _, material, _) =
                  FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
                let program1 = Obj.magic(1);
                let program2 = Obj.magic(2);
                let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
                createProgram |> onCall(0) |> returns(program1);
                createProgram |> onCall(1) |> returns(program2);
                let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(
                         ~sandbox,
                         ~createProgram,
                         ~useProgram,
                         (),
                       ),
                     );
                let state = _initMaterial(material, state);

                let state = _exec(material, state);

                useProgram |> expect |> toCalledWith([|program2|]);
              });
              test("should only send light data once", () => {
                let (state, gameObject, material) =
                  LightMaterialTool.createGameObject(state^);
                let color = [|1., 0., 0.|];
                let state =
                  state
                  |> LightMaterialAPI.setLightMaterialDiffuseColor(
                       material,
                       color,
                     );
                let (state, posArr, (uniform1f, uniform3f)) =
                  FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                    sandbox,
                    [|"u_directionLights[0].color"|],
                    state,
                  );
                let state = _initMaterial(material, state);

                let state = _exec(material, state);

                uniform3f
                |> withOneArg(posArr[0])
                |> getCallCount
                |> expect == 1;
              });
              test("should send u_diffuse", () => {
                let (state, gameObject, _, material, _) =
                  FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
                let color = [|1., 0., 0.|];
                let state =
                  state
                  |> LightMaterialAPI.setLightMaterialDiffuseColor(
                       material,
                       color,
                     );
                let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                let name = "u_diffuse";
                let pos1 = 0;
                let pos2 = 1;
                let getUniformLocation =
                  createEmptyStubWithJsObjSandbox(sandbox);

                getUniformLocation
                |> withTwoArgs(Sinon.matchAny, name)
                |> onCall(0)
                |> returns(pos1);
                getUniformLocation
                |> withTwoArgs(Sinon.matchAny, name)
                |> onCall(1)
                |> returns(pos2);

                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(
                         ~sandbox,
                         ~uniform3f,
                         ~getUniformLocation,
                         (),
                       ),
                     );
                let state = _initMaterial(material, state);

                let state = _exec(material, state);

                uniform3f
                |> expect
                |> toCalledWith(
                     [|pos2 |> Obj.magic|] |> Js.Array.concat(color),
                   );
              });
            },
          );

          describe(
            {|test one light material:
   1.has one light;
   2.init material;
   3.dispose the light;
   4.re-init material;
   5.front render light|},
            () => {
              let _exec = (material, lightGameObject, state) => {
                let (state, _, cameraTransform, _) =
                  CameraTool.createCameraGameObject(state);
                let state =
                  GameObjectTool.disposeGameObject(lightGameObject, state);
                let state =
                  LightMaterialAPI.reInitMaterials([|material|], state);
                let state = state |> DirectorTool.runWithDefaultTime;

                state;
              };

              test("should use new program", () => {
                let (state, lightGameObject, material, light, cameraTransform) =
                  FrontRenderLightForNoWorkerAndWorkerJobTool.prepareOneForDirectionLight(
                    sandbox,
                    state^,
                  );
                let program2 = Obj.magic(2);
                let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
                createProgram |> onCall(1) |> returns(program2);
                let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(
                         ~sandbox,
                         ~createProgram,
                         ~useProgram,
                         (),
                       ),
                     );
                let state = _initMaterial(material, state);

                let state = _exec(material, lightGameObject, state);

                useProgram |> expect |> toCalledWith([|program2|]);
              });
              test("should not send light data", () => {
                let (state, lightGameObject, material, light, cameraTransform) =
                  FrontRenderLightForNoWorkerAndWorkerJobTool.prepareOneForDirectionLight(
                    sandbox,
                    state^,
                  );
                let color = [|1., 0., 0.|];
                let state =
                  state
                  |> LightMaterialAPI.setLightMaterialDiffuseColor(
                       material,
                       color,
                     );
                let (state, posArr, (uniform1f, uniform3f)) =
                  FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                    sandbox,
                    [|"u_directionLights[0].color"|],
                    state,
                  );
                let state = _initMaterial(material, state);

                let state = _exec(material, lightGameObject, state);

                uniform3f
                |> withOneArg(posArr[0])
                |> getCallCount
                |> expect == 0;
              });
              test("should send u_diffuse", () => {
                let (state, lightGameObject, material, light, cameraTransform) =
                  FrontRenderLightForNoWorkerAndWorkerJobTool.prepareOneForDirectionLight(
                    sandbox,
                    state^,
                  );
                let color = [|1., 0., 0.|];
                let state =
                  state
                  |> LightMaterialAPI.setLightMaterialDiffuseColor(
                       material,
                       color,
                     );
                let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                let name = "u_diffuse";
                let pos1 = 0;
                let pos2 = 1;
                let getUniformLocation =
                  createEmptyStubWithJsObjSandbox(sandbox);

                getUniformLocation
                |> withTwoArgs(Sinon.matchAny, name)
                |> onCall(0)
                |> returns(pos1);
                getUniformLocation
                |> withTwoArgs(Sinon.matchAny, name)
                |> onCall(1)
                |> returns(pos2);

                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(
                         ~sandbox,
                         ~uniform3f,
                         ~getUniformLocation,
                         (),
                       ),
                     );
                let state = _initMaterial(material, state);

                let state = _exec(material, lightGameObject, state);

                uniform3f
                |> expect
                |> toCalledWith(
                     [|pos2 |> Obj.magic|] |> Js.Array.concat(color),
                   );
              });
            },
          );
        });
      })
    );

    describe("fix bug", () => {
      describe("test share material", () => {
        beforeEach(() => state := TestTool.initWithJobConfig(~sandbox, ()));

        test("should use share material's shaderIndex", () => {
          let (state, gameObject1, material1) =
            LightMaterialTool.createGameObject(state^);
          let (state, gameObject2, (material2, _)) =
            LightMaterialTool.createGameObjectWithMap(state);
          let (state, gameObject3, material2) =
            LightMaterialTool.createGameObjectWithMaterial(material2, state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = _initMaterial(material1, state);
          let state = _initMaterial(material2, state);
          let state = _initMaterial(material2, state);

          let (state, lightGameObject1, light1) =
            DirectionLightTool.createGameObject(state);
          let state =
            LightMaterialAPI.reInitMaterials(
              [|material1, material2, material2|],
              state,
            );

          let shaderIndex1 = ShaderTool.getShaderIndex(material1, state);
          let shaderIndex2 = ShaderTool.getShaderIndex(material2, state);
          (
            shaderIndex1,
            shaderIndex2,
            ShaderTool.getAllShaderIndexArray(state),
          )
          |> expect == (2, 3, [|2, 3|]);
        });
      });

      describe(
        {|1.create two materials use the same shader(shader1);
          2.init both;
          2.reinit one material(create new shader2);
          3.loopBody;

          should send shader1's and shader2's camera data(u_vMatrix)
          |},
        () => {
          let _test =
              ((gameObject1, gameObject2), (material1, material2), state) => {
            let pos = 0;
            let getUniformLocation =
              GLSLLocationTool.getUniformLocation(~pos, sandbox, "u_vMatrix");
            let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~uniformMatrix4fv,
                     ~getUniformLocation,
                     (),
                   ),
                 );
            let state = AllMaterialTool.prepareForInit(state);
            let state =
              state
              |> GameObjectAPI.initGameObject(gameObject1)
              |> GameObjectAPI.initGameObject(gameObject2);

            let state =
              LightMaterialAPI.reInitMaterials([|material1|], state);
            let state = state |> DirectorTool.runWithDefaultTime;

            uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 2;
          };

          beforeEach(() =>
            state :=
              RenderJobsTool.initWithJobConfig(
                sandbox,
                NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                  ~loopPipelines=
                    {|
[
    {
        "name": "default",
        "jobs": [
            {
                "name": "get_camera_data"
            },
            {
                "name": "send_uniform_shader_data"
            }
        ]
    }
]
        |},
                  (),
                ),
              )
          );

          test("test two lightMaterials", () => {
            let (state, _, cameraTransform, _) =
              CameraTool.createCameraGameObject(state^);
            let (state, gameObject1, _, material1, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, gameObject2, _, material2, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state);

            _test(
              (gameObject1, gameObject2),
              (material1, material2),
              state,
            );
          });
          test(
            "test one basicMaterial and one lightMaterial(their materialIndexs are equal)",
            () => {
            let (state, _, cameraTransform, _) =
              CameraTool.createCameraGameObject(state^);
            let (state, gameObject1, _, material1, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, gameObject2, _, material2, _) =
              RenderBasicJobTool.prepareGameObject(sandbox, state);

            _test(
              (gameObject1, gameObject2),
              (material1, material2),
              state,
            );
          });
        },
      );
    });
  });