open WonderBenchmark;

open PerformanceTestDataType;

let performanceTestData = {
  commonData: {
    isClosePage: true,
    execCountWhenTest: 10,
    execCountWhenGenerateBenchmark: 30,
    compareCount: 6,
    maxAllowDiffTimePercent: 50,
    maxAllowDiffMemoryPercent: 50,
    benchmarkPath: "./test/e2e/performance/benchmark/",
    scriptFilePathList: [
      "./dist/wd.js",
      "./test/e2e/performance/js/BasicBoxesTool.js",
      "./test/e2e/performance/js/InstanceBasicBoxesTool.js",
      "./test/e2e/performance/js/RedoUndoTool.js",
      "./test/e2e/performance/js/CameraTool.js"
    ]
  },
  testDataList: [
    {
      name: "basic_boxes",
      caseList: [
        {
          name: "create_5k_boxes",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                    var data = BasicBoxesTool.createBoxesByClone(5000, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = BasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = BasicBoxesTool.createCamera(state);
                    var state = data[0];

var n2 = performance.now();

                    var state = wd.initDirector(state);



                    /* var state = wd.setState(state); */


var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();


                    /* return state; */




return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4]};
}
|},
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "create_5k_boxes+transform",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                    var data = BasicBoxesTool.createBoxesByClone(5000, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = BasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = BasicBoxesTool.createCamera(state);



                    var state = data[0];


                    var state = BasicBoxesTool.setData(boxes, state);





var n2 = performance.now();

                    var state = wd.initDirector(state);




var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();


                    /* return state; */




return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] };
}
|},
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "create_5k_boxes+transform+set_parent",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                    var data = BasicBoxesTool.createBoxesByClone(5000, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = BasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = BasicBoxesTool.createCamera(state);



                    var state = data[0];


                    var state = BasicBoxesTool.setData(boxes, state);

                    var state = BasicBoxesTool.setParent(boxes, state);




var n2 = performance.now();

                    var state = wd.initDirector(state);




var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();


                    /* return state; */




return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] };
}
|},
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "create_dispose_1k_boxes",
          bodyFuncStr: {|
                         var state = wd.setMainConfig({
                             isTest: false
                         });

                         return initSample(state);



                         function initSample(state) {
         var n1 = performance.now();

                             var data = BasicBoxesTool.createBoxesByClone(1, state);

                             var state = data[0];
                             var boxes = data[1];

                             var data = BasicBoxesTool.setPosition(boxes, state);
                             var state = data[0];
                             var boxes = data[1];

                             var data = BasicBoxesTool.createCamera(state);



                             var state = data[0];


                             var state = BasicBoxesTool.createAndDisposeGameObjects(1000, boxes, state);




         var n2 = performance.now();

                             var state = wd.initDirector(state);




         var n3 = performance.now();
                             var state = wd.loopBody(100.0, state);




         var n4 = performance.now();



                             var state = wd.loopBody(200.0, state);




         var n5 = performance.now();



return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] };
}

|},
          scriptFilePathList: None,
          errorRate: 10
        }
      ]
    },
    {
      name: "instance_basic_boxes",
      caseList: [
        {
          name: "static_hardware_create_100k_boxes",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 60000, true, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];

var n2 = performance.now();

                    var state = wd.initDirector(state);



                    /* var state = wd.setState(state); */


var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();


                    /* return state; */




return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }

}
|},
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "static_batch_create_5k_boxes",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false,
                    gpuConfig: {
useHardwareInstance:false
                    }
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 5000, true, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];

var n2 = performance.now();

                    var state = wd.initDirector(state);



var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();


return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }

}
|},
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_10k_boxes+transform",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 10000, false, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];



                    var state = InstanceBasicBoxesTool.setData(boxes, state);


var n2 = performance.now();

                    var state = wd.initDirector(state);





var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();





return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
}
|},
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_10k_boxes+transform+set_parent",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxesWithHierachy(5000, 5000, false, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];



                    var state = InstanceBasicBoxesTool.setData(boxes, state);


var n2 = performance.now();

                    var state = wd.initDirector(state);





var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();





return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }

}

|},
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_dispose_200(sourceInstance box)*5(objectInstance box)",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 1, false, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];



                var state = InstanceBasicBoxesTool.createAndDisposeSourceInstanceGameObjects(200, 5, boxes, state);


var n2 = performance.now();

                    var state = wd.initDirector(state);





var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);

var n4 = performance.now();
                    var state = wd.loopBody(200.0, state);



var n5 = performance.now();





return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] }


}

|},
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_dispose_1[(sourceInstance box)*2k(objectInstance box)",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 1, false, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];



                var state = InstanceBasicBoxesTool.createAndDisposeSourceInstanceGameObjects(1, 2000, boxes, state);


var n2 = performance.now();

                    var state = wd.initDirector(state);





var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);

var n4 = performance.now();
                    var state = wd.loopBody(200.0, state);



var n5 = performance.now();





return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] }


}

|},
          scriptFilePathList: None,
          errorRate: 10
        }
      ]
    },
    {
      name: "redo_undo",
      caseList: [
        {
          name: "copy_1k_boxes(objectInstance)+restore_from_1k_boxes(not instance)_1k_boxes(objectInstance)",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();


                var data = RedoUndoTool.createBoxesByInstance(1000, state);
                    var state = data[0];
                    var box = data[1];

                    var data = RedoUndoTool.setPosition([box], state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = RedoUndoTool.createCamera(state);
                    var state = data[0];



                    var state = RedoUndoTool.redoUndoShader(state);


var n2 = performance.now();

                    var state = wd.initDirector(state);





var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();





return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
}
|},
          scriptFilePathList: None,
          errorRate: 10
        }
      ]
    }
  ]
};