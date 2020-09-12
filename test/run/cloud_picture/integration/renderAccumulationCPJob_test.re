open Wonder_jest;

let _ =
  describe("test render_accumulation job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      let device = WebGPUDependencyTool.createDeviceObject();
      WebGPUCPTool.setDevice(device);
      let window = WebGPUDependencyTool.createWindowObject();
      WebGPUCPTool.setWindow(window);
      let queue = WebGPUDependencyTool.createQueueObject();
      WebGPUCPTool.setQueue(queue);
      let swapChain = WebGPUDependencyTool.createSwapChainObject();
      WebGPUCPTool.setSwapChain(swapChain);

      AccumulationPassCPTool.createAndSetPipeline();
      AccumulationPassCPTool.createAndSetAllBindGroups();

      (device, window, queue, swapChain);
    };

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~renderPipelineData={
          name: "render",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "render_accumulation", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise("begin render pass", () => {
      let (device, window, queue, swapChain) = _prepare();
      let commandEncoder = WebGPUDependencyTool.createCommandEncoderObject();
      let createCommandEncoderStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(commandEncoder)
        ->SinonCPTool.createTwoArgsEmptyStubData;
      let backBufferView = WebGPUDependencyTool.createTextureViewObject();
      let getCurrentTextureViewStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(backBufferView)
        ->SinonCPTool.createTwoArgsEmptyStubData;
      let beginRenderPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.createTwoArgsEmptyStubData;

      WebGPUDependencyTool.build(
        ~sandbox,
        ~createCommandEncoder=
          createCommandEncoderStubData->SinonCPTool.getDpFunc,
        ~getCurrentTextureView=
          getCurrentTextureViewStubData->SinonCPTool.getDpFunc,
        ~beginRenderPass=beginRenderPassStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            (
              createCommandEncoderStubData
              ->SinonCPTool.getStub
              ->SinonCPTool.calledWithArg2(
                  IWebGPUCoreDp.commandEncoderDescriptor(),
                  device,
                ),
              beginRenderPassStubData
              ->SinonCPTool.getStub
              ->SinonCPTool.calledWithArg2(
                  IWebGPUCoreDp.passEncoderRenderDescriptor(
                    ~colorAttachments=[|
                      {
                        "clearColor": {
                          "r": 0.0,
                          "g": 0.0,
                          "b": 0.0,
                          "a": 1.0,
                        },
                        "loadOp": "clear",
                        "storeOp": "store",
                        "attachment": backBufferView,
                      },
                    |],
                    (),
                  ),
                  commandEncoder,
                ),
            )
            ->expect
            == (true, true)
          },
        (),
      );
    });
    testPromise("set pipeline", () => {
      let (device, window, queue, swapChain) = _prepare();
      let setPipelineStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.createTwoArgsEmptyStubData;
      let pass = WebGPUDependencyTool.createPassEncoderRenderObject();
      let beginRenderPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(pass)
        ->SinonCPTool.createTwoArgsEmptyStubData;
      WebGPUDependencyTool.build(
        ~sandbox,
        ~setPipeline_render=setPipelineStubData->SinonCPTool.getDpFunc,
        ~beginRenderPass=beginRenderPassStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            let pipeline = AccumulationPassCPTool.getPipeline();

            setPipelineStubData
            ->SinonCPTool.getStub
            ->SinonCPTool.calledWithArg2(pipeline, pass)
            ->expect
            == true;
          },
        (),
      );
    });
    testPromise("set bind group", () => {
      let (device, window, queue, swapChain) = _prepare();
      let setBindGroupStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.createThreeArgsEmptyStubData;
      let pass = WebGPUDependencyTool.createPassEncoderRenderObject();
      let beginRenderPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(pass)
        ->SinonCPTool.createTwoArgsEmptyStubData;
      WebGPUDependencyTool.build(
        ~sandbox,
        ~beginRenderPass=beginRenderPassStubData->SinonCPTool.getDpFunc,
        ~setBindGroup_render=setBindGroupStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            let bindGroupData =
              AccumulationPassCPTool.getStaticBindGroupData();

            setBindGroupStubData
            ->SinonCPTool.getStub
            ->SinonCPTool.calledWithArg3(
                bindGroupData.setSlot,
                bindGroupData.bindGroup,
                pass,
              )
            ->expect
            == true;
          },
        (),
      );
    });
    testPromise("draw", () => {
      let (device, window, queue, swapChain) = _prepare();
      let drawStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.createFiveArgsEmptyStubData;
      let pass = WebGPUDependencyTool.createPassEncoderRenderObject();
      let beginRenderPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(pass)
        ->SinonCPTool.createTwoArgsEmptyStubData;

      WebGPUDependencyTool.build(
        ~sandbox,
        ~draw=drawStubData->SinonCPTool.getDpFunc,
        ~beginRenderPass=beginRenderPassStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;
      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            drawStubData
            ->SinonCPTool.getStub
            ->expect
            ->SinonCPTool.toCalledWith((3, 1, 0, 0, pass))
          },
        (),
      );
    });
    testPromise("end pass and finish and submit", () => {
      let (device, window, queue, swapChain) = _prepare();
      let endPass = createEmptyStub(refJsObjToSandbox(sandbox^));
      let commandBufferObject =
        WebGPUDependencyTool.createCommandBufferObject();
      let finish = createEmptyStub(refJsObjToSandbox(sandbox^));
      finish->onCall(0, _)->SinonCPTool.returns(commandBufferObject);
      let submitStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.createTwoArgsEmptyStubData;
      let pass = WebGPUDependencyTool.createPassEncoderRenderObject();
      let beginRenderPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(pass)
        ->SinonCPTool.createTwoArgsEmptyStubData;
      WebGPUDependencyTool.build(
        ~sandbox,
        ~finish,
        ~endPass_render=endPass,
        ~submit=submitStubData->SinonCPTool.getDpFunc,
        ~beginRenderPass=beginRenderPassStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            (
              endPass->SinonCPTool.calledWith(pass),
              submitStubData
              ->SinonCPTool.getStub
              ->SinonCPTool.calledWithArg2([|commandBufferObject|], queue),
            )
            ->expect
            == (true, true)
          },
        (),
      );
    });
  });
