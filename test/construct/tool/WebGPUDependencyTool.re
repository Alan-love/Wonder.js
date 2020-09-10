open IWebGPUCoreDp;

open Sinon;

let createWindowObject = (): windowObject => Obj.magic(Js.Math.random());

let createAdapterObject = (): adapterObject => Obj.magic(Js.Math.random());

let createDeviceObject = (): deviceObject => Obj.magic(Js.Math.random());

let createContextObject = (): contextObject => Obj.magic(Js.Math.random());

let createQueueObject = (): queueObject => Obj.magic(Js.Math.random());

let createSwapChainObject = (): swapChainObject =>
  Obj.magic(Js.Math.random());

let build =
    (
      ~sandbox,
      ~copy_src_textureUsage=0,
      ~copy_dst_textureUsage=1,
      ~sampled=2,
      ~storage_textureUsage=3,
      ~output_attachment=4,
      ~compute=0,
      ~fragment=1,
      ~vertex=2,
      ~storage_bufferUsage=0,
      ~uniform=1,
      ~indirect=2,
      ~vertex=3,
      ~index=4,
      ~map_read=5,
      ~map_write=6,
      ~copy_src_bufferUsage=7,
      ~copy_dst_bufferUsage=8,
      ~createView=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getCurrentTextureView=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~present=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~submit=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setSubFloat32Data=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setSubUint8Data=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setSubUint32Data=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setPipeline_render=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setBindGroup_render=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setDynamicBindGroup_render=createEmptyStub(
                                    refJsObjToSandbox(sandbox^),
                                  ),
      ~setVertexBuffer=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setIndexBuffer=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~draw=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~drawIndexed=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~endPass_render=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setPipeline_compute=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setBindGroup_compute=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setDynamicBindGroup_compute=createEmptyStub(
                                     refJsObjToSandbox(sandbox^),
                                   ),
      ~dispatchX=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~endPass_compute=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~beginRenderPass=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~beginComputePass=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~finish=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getQueue=createEmptyStub(refJsObjToSandbox(sandbox^))
                ->SinonCPTool.returns(createQueueObject()),
      ~createShaderModule=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~createPipelineLayout=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~createBuffer=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~createBindGroupLayout=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~createBindGroup=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~createRenderPipeline=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~createComputePipeline=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~createCommandEncoder=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~createSampler=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~createTexture=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getSwapChainPreferredFormat=createEmptyStub(
                                     refJsObjToSandbox(sandbox^),
                                   )
                                   ->SinonCPTool.returns(
                                       Js.Promise.make((~resolve, ~reject) =>
                                         resolve(. -1)
                                       ),
                                     )
                                   ->SinonCPTool.createTwoArgsEmptyStubData
                                   ->SinonCPTool.getDpFunc,
      ~configureSwapChain=createEmptyStub(refJsObjToSandbox(sandbox^))
                          ->SinonCPTool.returns(createSwapChainObject())
                          ->SinonCPTool.createTwoArgsEmptyStubData
                          ->SinonCPTool.getDpFunc,
      ~make=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getContext=createEmptyStub(refJsObjToSandbox(sandbox^))
                  ->SinonCPTool.returns(createContextObject()),
      ~pollEvents=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~shouldClose=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getWidth=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getHeight=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~requestDevice=createEmptyStub(refJsObjToSandbox(sandbox^))
                     ->SinonCPTool.returns(
                         Js.Promise.make((~resolve, ~reject) =>
                           resolve(. createDeviceObject())
                         ),
                       )
                     ->SinonCPTool.createTwoArgsEmptyStubData
                     ->SinonCPTool.getDpFunc,
      ~requestAdapter=createEmptyStub(refJsObjToSandbox(sandbox^))
                      ->SinonCPTool.returns(
                          Js.Promise.make((~resolve, ~reject) =>
                            resolve(. createAdapterObject())
                          ),
                        ),
      ~loadGLSL=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    )
    : webgpuCore => {
  {
    textureUsage: {
      copy_src: copy_src_textureUsage,
      copy_dst: copy_dst_textureUsage,
      sampled,
      storage: storage_textureUsage,
      output_attachment,
    },
    texture: {
      createView: createView,
    },
    swapChain: {
      getCurrentTextureView,
      present,
    },
    queue: {
      submit: submit,
    },
    shaderStage: {
      compute,
      fragment,
      vertex,
    },
    bufferUsage: {
      storage: storage_bufferUsage,
      uniform,
      indirect,
      vertex,
      index,
      map_read,
      map_write,
      copy_src: copy_src_bufferUsage,
      copy_dst: copy_dst_bufferUsage,
    },
    buffer: {
      setSubFloat32Data,
      setSubUint8Data,
      setSubUint32Data,
    },
    passEncoder: {
      render: {
        setPipeline: setPipeline_render,
        setBindGroup: setBindGroup_render,
        setDynamicBindGroup: setDynamicBindGroup_render,
        setVertexBuffer,
        setIndexBuffer,
        draw,
        drawIndexed,
        endPass: endPass_render,
      },
      compute: {
        setPipeline: setPipeline_compute,
        setBindGroup: setBindGroup_compute,
        setDynamicBindGroup: setDynamicBindGroup_compute,
        dispatchX,
        endPass: endPass_compute,
      },
    },
    commandEncoder: {
      beginRenderPass,
      beginComputePass,
      finish,
    },
    device: {
      getQueue,
      createShaderModule,
      createPipelineLayout,
      createBuffer,
      createBindGroupLayout,
      createBindGroup,
      createRenderPipeline,
      createComputePipeline,
      createCommandEncoder,
      createSampler,
      createTexture,
    },
    context: {
      getSwapChainPreferredFormat,
      configureSwapChain,
    },
    window: {
      make,
      getContext,
      pollEvents,
      shouldClose,
      getWidth,
      getHeight,
    },
    adapter: {
      requestDevice: requestDevice,
    },
    gpu: {
      requestAdapter: requestAdapter,
    },
    loadGLSL,
  };
};

let set = dp => {
  WebGPUCoreDpCPAPI.set(dp);
};
