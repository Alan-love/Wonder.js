open IWebGPURayTracingDp;

open Sinon;

let createShaderBindingTableObject = (): shaderBindingTableObject =>
  Obj.magic(Js.Math.random());

let createRayTracingPipelineObject = (): rayTracingPipelineObject =>
  Obj.magic(Js.Math.random());

let createAccelerationContainerObject = (): accelerationContainerObject =>
  Obj.magic(Js.Math.random());

let createPassEncoderRayTracingObject = (): passEncoderRayTracingObject =>
  Obj.magic(Js.Math.random());

let build =
    (
      ~sandbox,
      ~none_containerUsage=0,
      ~allow_update=1,
      ~prefer_fast_trace=2,
      ~prefer_fast_build=3,
      ~low_memory=4,
      ~none_geometryUsage=0,
      ~opaque=1,
      ~allow_any_hit=2,
      ~none_instanceUsage=0,
      ~triangle_cull_disable=1,
      ~triangle_front_counterclockwise=2,
      ~force_opaque=3,
      ~force_no_opaque=4,
      ~storage=0,
      ~uniform=1,
      ~indirect=2,
      ~vertex=3,
      ~index=4,
      ~map_read=5,
      ~map_write=6,
      ~copy_src=7,
      ~copy_dst=8,
      ~sampled=9,
      ~ray_tracing=10,
      ~compute=0,
      ~fragment=1,
      ~vertex=2,
      ~ray_generation=3,
      ~ray_closest_hit=4,
      ~ray_any_hit=5,
      ~ray_miss=6,
      ~ray_intersection=7,
      ~updateInstance=createEmptyStub(refJsObjToSandbox(sandbox^))
                      ->SinonTool.createThreeArgsEmptyStubData
                      ->SinonTool.getDpFunc,
      ~setSubFloat32Data=createEmptyStub(refJsObjToSandbox(sandbox^))
                         ->SinonTool.createThreeArgsEmptyStubData
                         ->SinonTool.getDpFunc,
      ~setPipeline=createEmptyStub(refJsObjToSandbox(sandbox^))
                   ->SinonTool.createTwoArgsEmptyStubData
                   ->SinonTool.getDpFunc,
      ~setBindGroup=createEmptyStub(refJsObjToSandbox(sandbox^))
                    ->SinonTool.createThreeArgsEmptyStubData
                    ->SinonTool.getDpFunc,
      ~traceRays=createEmptyStub(refJsObjToSandbox(sandbox^))
                 ->SinonTool.createSevenArgsEmptyStubData
                 ->SinonTool.getDpFunc,
      ~endPass=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~beginRayTracingPass=createEmptyStub(refJsObjToSandbox(sandbox^))
                           ->SinonTool.createTwoArgsEmptyStubData
                           ->SinonTool.getDpFunc,
      ~buildRayTracingAccelerationContainer=createEmptyStub(
                                              refJsObjToSandbox(sandbox^),
                                            )
                                            ->SinonTool.createTwoArgsEmptyStubData
                                            ->SinonTool.getDpFunc,
      ~updateRayTracingAccelerationContainer=createEmptyStub(
                                               refJsObjToSandbox(sandbox^),
                                             )
                                             ->SinonTool.createTwoArgsEmptyStubData
                                             ->SinonTool.getDpFunc,
      ~createRayTracingPipeline=createEmptyStub(refJsObjToSandbox(sandbox^))
                                ->SinonTool.createTwoArgsEmptyStubData
                                ->SinonTool.getDpFunc,
      ~createRayTracingShaderBindingTable=createEmptyStub(
                                            refJsObjToSandbox(sandbox^),
                                          )
                                          ->SinonTool.createTwoArgsEmptyStubData
                                          ->SinonTool.getDpFunc,
      ~createRayTracingAccelerationContainer=createEmptyStub(
                                               refJsObjToSandbox(sandbox^),
                                             )
                                             ->SinonTool.returns(
                                                 createAccelerationContainerObject(),
                                               )
                                             ->SinonTool.createTwoArgsEmptyStubData
                                             ->SinonTool.getDpFunc,
      ~createRayTracingBindGroup=createEmptyStub(refJsObjToSandbox(sandbox^))
                                 ->SinonTool.createTwoArgsEmptyStubData
                                 ->SinonTool.getDpFunc,
      (),
    )
    : webgpuRayTracing => {
  {
    accelerationContainer: {
      updateInstance,
      setSubFloat32Data,
    },
    passEncoder: {
      setPipeline,
      setBindGroup,
      traceRays,
      endPass,
    },
    commandEncoder: {
      beginRayTracingPass,
      buildRayTracingAccelerationContainer,
      updateRayTracingAccelerationContainer,
    },
    device: {
      createRayTracingPipeline,
      createRayTracingShaderBindingTable,
      createRayTracingAccelerationContainer,
      createRayTracingBindGroup,
    },
    accelerationContainerUsage: {
      none: none_containerUsage,
      allow_update,
      prefer_fast_trace,
      prefer_fast_build,
      low_memory,
    },
    accelerationGeometryUsage: {
      none: none_geometryUsage,
      opaque,
      allow_any_hit,
    },
    accelerationInstanceUsage: {
      none: none_instanceUsage,
      triangle_cull_disable,
      triangle_front_counterclockwise,
      force_opaque,
      force_no_opaque,
    },
    bufferUsage: {
      storage,
      sampled,
      uniform,
      indirect,
      vertex,
      index,
      map_read,
      map_write,
      copy_src,
      copy_dst,
      ray_tracing,
    },
    shaderStage: {
      compute,
      fragment,
      vertex,
      ray_generation,
      ray_closest_hit,
      ray_any_hit,
      ray_miss,
      ray_intersection,
    },
  };
};

let set = dp => {
  WebGPURayTracingDpCPAPI.set(dp);
};
