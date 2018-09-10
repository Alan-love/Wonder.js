open Wonder_jest;

describe("DeviceManagerService", () => {
  open Expect;
  open Expect.Operators;
  open Sinon;
  let sandbox = getSandboxDefaultVal();
  let state = ref(MainStateTool.createState());
  beforeEach(() => {
    sandbox := createSandbox();
    state := TestTool.init(~sandbox, ());
  });
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

  describe("setViewport", () =>
    test(
      "if target viewport data === old viewport data, not set gl viewport", () => {
      let viewport = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
      let gl = FakeGlTool.buildFakeGl(~sandbox, ~viewport, ()) |> Obj.magic;
      let state = DeviceManagerTool.setGl(gl, state^);
      let viewportData = (1., 2., 10., 20.);
      let state = DeviceManagerAPI.setViewport(viewportData, state);
      let state = DeviceManagerAPI.setViewport(viewportData, state);
      expect(viewport) |> toCalledOnce;
    })
  );

  describe("setScissorTest", () =>
    test("if target test === old test, not enable", () => {
      let scissorTest = 2;
      let enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
      let gl =
        FakeGlTool.buildFakeGl(
          ~sandbox,
          ~getScissorTest=scissorTest,
          ~enable,
          (),
        )
        |> Obj.magic;
      let state = DeviceManagerTool.setGl(gl, state^);
      let state = DeviceManagerAPI.setScissorTest(true, state);
      let state = DeviceManagerAPI.setScissorTest(true, state);
      expect(enable) |> toCalledOnce;
    })
  );

  describe("setScissor", () =>
    test("if target scissor data === old scissor data, not set gl scissor", () => {
      let scissor = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
      let gl = FakeGlTool.buildFakeGl(~sandbox, ~scissor, ()) |> Obj.magic;
      let state = DeviceManagerTool.setGl(gl, state^);
      let scissorData = (1, 2, 10, 20);
      let state = DeviceManagerAPI.setScissor(scissorData, state);
      let state = DeviceManagerAPI.setScissor(scissorData, state);
      expect(scissor) |> toCalledOnce;
    })
  );

  describe("setSide", () => {
    test("if target side === old side, not set gl side", () => {
      let cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
      let gl = FakeGlTool.buildFakeGl(~sandbox, ~cullFace, ()) |> Obj.magic;
      let record =
        DeviceManagerTool.setSide(
          gl,
          DeviceManagerType.FRONT,
          state^.deviceManagerRecord,
        );
      let record =
        DeviceManagerTool.setSide(gl, DeviceManagerType.FRONT, record);
      expect(cullFace) |> toCalledOnce;
    });
    describe("else", () => {
      test("test set NONE side", () => {
        let enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
        let getCullFace = 9;
        let frontAndBack = 10;
        let cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
        let gl =
          FakeGlTool.buildFakeGl(
            ~sandbox,
            ~enable,
            ~cullFace,
            ~frontAndBack,
            ~getCullFace,
            (),
          )
          |> Obj.magic;
        let record =
          DeviceManagerTool.setSide(
            gl,
            DeviceManagerType.NONE,
            state^.deviceManagerRecord,
          );
        (
          SinonTool.calledWith(enable, getCullFace),
          SinonTool.calledWith(cullFace, frontAndBack),
        )
        |> expect == (true, true);
      });
      test("test set BOTH side", () => {
        let disable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
        let getCullFace = 9;
        let gl =
          FakeGlTool.buildFakeGl(~sandbox, ~disable, ~getCullFace, ())
          |> Obj.magic;
        let record =
          DeviceManagerTool.setSide(
            gl,
            DeviceManagerType.BOTH,
            state^.deviceManagerRecord,
          );
        SinonTool.calledWith(disable, getCullFace) |> expect == true;
      });
      test("test set FRONT side", () => {
        let enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
        let getCullFace = 9;
        let back = 10;
        let cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
        let gl =
          FakeGlTool.buildFakeGl(
            ~sandbox,
            ~enable,
            ~cullFace,
            ~back,
            ~getCullFace,
            (),
          )
          |> Obj.magic;
        let record =
          DeviceManagerTool.setSide(
            gl,
            DeviceManagerType.FRONT,
            state^.deviceManagerRecord,
          );
        (
          SinonTool.calledWith(enable, getCullFace),
          SinonTool.calledWith(cullFace, back),
        )
        |> expect == (true, true);
      });
      test("test set BACK side", () => {
        let enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
        let getCullFace = 9;
        let front = 10;
        let cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
        let gl =
          FakeGlTool.buildFakeGl(
            ~sandbox,
            ~enable,
            ~cullFace,
            ~front,
            ~getCullFace,
            (),
          )
          |> Obj.magic;
        let record =
          DeviceManagerTool.setSide(
            gl,
            DeviceManagerType.BACK,
            state^.deviceManagerRecord,
          );
        (
          SinonTool.calledWith(enable, getCullFace),
          SinonTool.calledWith(cullFace, front),
        )
        |> expect == (true, true);
      });
    });
  });
});