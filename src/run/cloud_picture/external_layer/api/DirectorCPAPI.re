let prepare =
    (
      ~pictureSize,
      ~sampleCount,
      ~transformCount=10000,
      ~geometryPointCount=10000,
      ~geometryCount=10000,
      ~pbrMaterialCount=2000000,
      ~directionLightCount=1,
      (),
    ) => {
  DirectorCPApService.prepare(
    ~pictureSize,
    ~sampleCount,
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~pbrMaterialCount,
    ~directionLightCount,
  );
};

let init = () => {
  DirectorCPApService.init();
};

let update = () => {
  DirectorCPApService.update();
};

let render = () => {
  DirectorCPApService.render();
};
