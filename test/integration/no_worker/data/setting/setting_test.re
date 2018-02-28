open Wonder_jest;

open Js.Promise;

open RenderConfigDataType;

open ViewSystem;

open DomTool;

open SettingTool;

open InitConfigSystem;

let _ =
  describe(
    "test setting data",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "isDebug",
        () =>
          describe(
            "if true",
            () =>
              test(
                "it will open contract check",
                () => {
                  buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
                  SettingTool.createStateAndSetToStateData(~isDebug="true", ()) |> ignore;
                  getIsDebug(StateData.stateData) |> expect == true
                }
              )
          )
      );
      describe(
        "gpuConfig",
        () => {
          open StateDataType;
          let _buildExpectedGpuConfig = (~useHardwareInstance=Js.true_, ()) => {
            useHardwareInstance: Js.to_bool(useHardwareInstance)
          };
          describe(
            "if pass gpuConfig",
            () =>
              test(
                "set to state (use default value if the field isn't passed)",
                () => {
                  let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  let useHardwareInstance = Js.false_;
                  let state =
                    TestTool.initWithJobConfigWithoutBuildFakeDom(
                      ~sandbox,
                      ~useHardwareInstance="false",
                      ()
                    );
                  state
                  |> GpuConfigSystem.getConfig
                  |> expect == _buildExpectedGpuConfig(~useHardwareInstance, ())
                }
              )
          );
          describe(
            "else",
            () =>
              test(
                "set default data",
                () => {
                  let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  let state = TestTool.initWithJobConfigWithoutBuildFakeDom(~sandbox, ());
                  state
                  |> GpuConfigSystem.getConfig
                  |> expect == _buildExpectedGpuConfig(~useHardwareInstance=Js.true_, ())
                }
              )
          )
        }
      )
    }
  );