open Wonder_jest;

describe(
  "IndicesBoxGeometryMainService",
  () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(
      () => {
        sandbox := createSandbox();
        state := TestTool.init(~sandbox, ())
      }
    );
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe(
      "getIndicesCount",
      () =>
        test(
          "get indices count",
          () => {
            let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
            let state = state |> BoxGeometryTool.initGeometrys;
            IndicesBoxGeometryTool.getIndicesCount(geometry, state) |> expect == 36
          }
        )
    )
  }
);