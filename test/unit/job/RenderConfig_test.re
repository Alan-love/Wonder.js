open Wonder_jest;

let _ =
  describe(
    "RenderConfig",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getMaterialShaderLibDataArr",
        () =>
          describe(
            "test fatal",
            () => {
              open RenderConfigType;
              test(
                "if shaderLibItem->type_ unknown, fatal",
                () => {
                  TestTool.closeContractCheck();
                  expect(
                    () =>
                      RenderConfigTool.getMaterialShaderLibRecordArr(
                        Obj.magic(0),
                        Obj.magic(0),
                        (1 |> Obj.magic, [|{type_: Some("type1"), name: ""}|], 1 |> Obj.magic)
                      )
                  )
                  |> toThrowMessage("unknown type_")
                }
              );
              test(
                "if shaderLibItem->name unknown with type=static_branch, fatal",
                () => {
                  TestTool.closeContractCheck();
                  expect(
                    () =>
                      RenderConfigTool.getMaterialShaderLibRecordArr(
                        Obj.magic(0),
                        Obj.magic(0),
                        (
                          1 |> Obj.magic,
                          [|{type_: Some("static_branch"), name: "name1"}|],
                          1 |> Obj.magic
                        )
                      )
                  )
                  |> toThrowMessage("unknown name")
                }
              )
            }
          )
      )
    }
  );