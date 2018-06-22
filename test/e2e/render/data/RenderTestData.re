open WonderRenderTest;

open RenderTestDataType;

let renderTestData = {
  commonData: {
    imagePath: "test/e2e/render/screenshot/",
    scriptFilePathList: [
      "./test/e2e/js/AssetTool.js",
      "./test/e2e/js/ReplaceFetchTool.js",
      "./test/e2e/js/ScheduleTool.js",
      "./test/e2e/js/BasicBoxesTool.js",
      "./test/e2e/js/PositionTool.js",
      "./test/e2e/js/LightBoxesTool.js",
      "./test/e2e/js/LightTool.js",
      "./test/e2e/js/CameraTool.js",
      "./test/e2e/js/InstanceBasicBoxesTool.js",
      "./test/e2e/js/InstanceLightBoxesTool.js",
      "./test/e2e/js/RedoUndoTool.js",
      "./test/e2e/js/RandomTool.js",
      "./test/e2e/js/CustomGeometryTool.js",
      "./test/e2e/js/BasicMaterialTool.js",
      "./test/e2e/js/LightMaterialTool.js",
      "./test/e2e/js/TextureTool.js",
      "./dist/wd.js"
    ],
    replaceForDebug: (htmlStr) =>
      htmlStr
      |> Js.String.replaceByRe(
           [%re {|/\.\/test\/e2e\/render\/config\//g|}],
           "../../../../test/e2e/render/config/"
         )
  },
  testData: [
    /* {
      name: "basic_box",
      bodyFuncStr: {|
                    ReplaceFetchTool.replaceFetchForTest();

                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.unsafeGetState());
                    });

                    function initSample(state) {
                        var data = BasicBoxesTool.createBox(state);

                        var state = data[0];
                        var box = data[1];


                        var data = BasicBoxesTool.createCamera(state);
                        var state = data[0];
                        var camera = data[1];


                        var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);

                        var state = wd.setTransformLocalPosition(transform, [0, 10, 30], state);

                        return wd.startDirector(state);
                    }
    |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "instance_basic_box",
      bodyFuncStr: {|

                       ReplaceFetchTool.replaceFetchForTest();


                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.unsafeGetState());
                    });



                          function initSample(state) {
                          RandomTool.stubMathRandom(10000);

                          var data = InstanceBasicBoxesTool.createBoxes(1, 100, true, state);
                          var state = data[0];
                          var boxes = data[1];

                          var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                          var state = data[0];
                          var boxes = data[1];

                          var data = InstanceBasicBoxesTool.createCamera(state);
                          var state = data[0];


                          return wd.startDirector(state);
                          }
          |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    */
    
    /* {
      name: "light_box",
      bodyFuncStr: {|
                       ReplaceFetchTool.replaceFetchForTest();



                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.unsafeGetState());
                    });







                       function initSample(state) {
                           var data = LightBoxesTool.createBox(state);

                           var state = data[0];
                           var box = data[1];



                               var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);




                           var data = LightBoxesTool.createCamera(state);
                           var state = data[0];
                           var camera = data[1];


                           var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);

                           var state = wd.setTransformLocalPosition(transform, [0, 0, 80], state);

                           return wd.startDirector(state);
                       }
       |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "instance_light_box",
      bodyFuncStr: {|

                       ReplaceFetchTool.replaceFetchForTest();



                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.unsafeGetState());
                    });



                          function initSample(state) {
                          RandomTool.stubMathRandom(10000);

                          var data = InstanceLightBoxesTool.createBoxes(1, 100, true, state);
                          var state = data[0];
                          var boxes = data[1];

                          var data = InstanceLightBoxesTool.setPosition(boxes, state);
                          var state = data[0];
                          var boxes = data[1];





                               var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);



                          var data = InstanceLightBoxesTool.createCamera(state);
                          var state = data[0];


                          return wd.startDirector(state);
                          }
          |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "custom_geometry_basic_material",
      bodyFuncStr: {|
                    ReplaceFetchTool.replaceFetchForTest();

                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.unsafeGetState());
                    });

                    function initSample(state) {
                        var data = CustomGeometryTool.createTriangle(1, state);


                        var state = data[0];
                        var box = data[1];


                        var data = BasicMaterialTool.createDefaultBasicMaterial(state);


                        var state = data[0];
                        var material = data[1];



                        var state = wd.addGameObjectBasicMaterialComponent(box, material, state);



                        var record = wd.createMeshRenderer(state);
                        var state = record[0];
                        var meshRenderer = record[1];
                        state = wd.addGameObjectMeshRendererComponent(box, meshRenderer, state);


                        var data = BasicBoxesTool.createCamera(state);
                        var state = data[0];
                        var camera = data[1];


                        var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);

                        var state = wd.setTransformLocalPosition(transform, [0, 10, 30], state);

                        return wd.startDirector(state);
                    }
    |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "custom_geometry_light_material",
      bodyFuncStr: {|
                    ReplaceFetchTool.replaceFetchForTest();

                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.unsafeGetState());
                    });

                    function initSample(state) {
                        var data = CustomGeometryTool.createTriangle(1, state);


                        var state = data[0];
                        var box = data[1];


                        var data = LightMaterialTool.createDefaultLightMaterial(state);


                        var state = data[0];
                        var material = data[1];



                        var state = wd.addGameObjectLightMaterialComponent(box, material, state);


                        var record = wd.createMeshRenderer(state);
                        var state = record[0];
                        var meshRenderer = record[1];
                        state = wd.addGameObjectMeshRendererComponent(box, meshRenderer, state);




                        var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);




                           var data = LightBoxesTool.createCamera(state);
                           var state = data[0];
                           var camera = data[1];


                           var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);

                           var state = wd.setTransformLocalPosition(transform, [0, 0, 80], state);

                           return wd.startDirector(state);
                    }
    |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "redo_undo",
      bodyFuncStr: {|
                       ReplaceFetchTool.replaceFetchForTest();



                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.unsafeGetState());
                    });


                          function initSample(state) {
                          RandomTool.stubMathRandom(10000);


                          var data = RedoUndoTool.createBoxesByInstance(10, state);
                          var state = data[0];
                          var box = data[1];

                          var data = RedoUndoTool.setPosition([box], state);
                          var state = data[0];
                          var boxes = data[1];

                          var data = RedoUndoTool.createCamera(state);
                          var state = data[0];



                          var state = RedoUndoTool.redoUndoShader(5, state);



                          return wd.startDirector(state);
                          }
          |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}, {timePath: [16, 32]}, {timePath: [16, 32, 48]}]
    }, */

    /* {
      name: "redo_undo_map",
      bodyFuncStr: {|
        ReplaceFetchTool.replaceFetchForTest();


        return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function () {
            return window.loadImage("./test/e2e/asset/1.jpg")
                .then((image1DataArr) => {
                    return window.loadImage("./test/e2e/asset/2.jpg")
                        .then((image2DataArr) => {
                            return initSample(
                                TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image1DataArr),
                                TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image2DataArr),
                                wd.unsafeGetState());
                        });
                });
        });




        function initSample(map1, map2, state) {
            RandomTool.stubMathRandom(10000);

            var data = InstanceBasicBoxesTool.createBoxWithMap(1, false, map1, state);
            var state = data[0];
            var box = data[1];




            var data = InstanceBasicBoxesTool.setPositionWithRange([box], 20, state);
            var state = data[0];
            var boxes = data[1];




            var data = RedoUndoTool.createCamera(state);
            var state = data[0];
            var camera = data[1];


            var staet = PositionTool.setGameObjectPosition(camera, [0, 10, 200], state);



            var state = RedoUndoTool.redoUndoShaderWithMap(2, map2, 30, state);



            wd.startDirector(state)
        }
          |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}, {timePath: [16, 32]}, {timePath: [16, 32, 48]}]
    } */

    
    {
      name: "basic_box_map+light_box_map",
      bodyFuncStr: {|
                       ReplaceFetchTool.replaceFetchForTest();



                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
            return window.loadImage("./test/e2e/asset/1.jpg")
                .then((image1DataArr) => {
                    return window.loadImage("./test/e2e/asset/2.jpg")
                        .then((image2DataArr) => {
                            return initSample(
                                TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image1DataArr),
                                TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image2DataArr),
                                wd.unsafeGetState());
                        });
                });
                    });

                        function initSample(map1, map2, state) {
                          RandomTool.stubMathRandom(10000);


                          var boxes = [];

                          var record = BasicBoxesTool.createBoxWithMap(map1, state);

                          var state = record[0];
                          var box = record[1];

                          var state = PositionTool.setGameObjectPosition(box, [10, 0, 0], state);


                          boxes.push(box);


                          var record = LightBoxesTool.createBoxWithMap(map1, map2, state);

                          var state = record[0];
                          var box = record[1];


                          var state = PositionTool.setGameObjectPosition(box, [-10, 0, 0], state);


                          boxes.push(box);



                          var data = CameraTool.createCamera(state);
                          var state = data[0];
                          var camera = data[1];


                          var state = LightTool.createLights([-10, 20, 20], [5, 20, 25], state);


                          var state = PositionTool.setGameObjectPosition(camera, [0, 20, 100], state);

                          return wd.startDirector(state);
                        }
          |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    }
  ]
}