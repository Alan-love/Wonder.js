open Wonder_jest;

open WonderBenchmark;

open Benchmark;

open WonderCommonlib;

let _ =
  describe(
    "basic boxes",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      open Puppeteer;
      open Js.Promise;
      open Node;
      let sandbox = getSandboxDefaultVal();
      let state = ref(createEmptyState());
      let browser = ref(None);
      let page = ref(None);
      beforeAllPromise(
        () =>
          BenchmarkTool.prepareForHeadless(
            ~scriptFilePathList=[
              "./test/performance/js/BasicBoxesTool.js",
              "./test/performance/js/CameraTool.js"
            ],
            "basic_boxes.json",
            browser,
            page,
            state
          )
      );
      afterAllPromise(() => BenchmarkTool.handleAfterAll(browser^, state^));
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      testPromise(
        "create 5k boxes",
        () => {
          let body = [%bs.raw
            {| function() {
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




return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                }
}
|}
          ];
          state^ |> exec("create_5k_boxes", [@bs] body) |> compare((expect, toBe))
        }
      );
      testPromise(
        "create 5k boxes+transform",
        () => {
          let body = [%bs.raw
            {| function() {
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




return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                }
}
|}
          ];
          state^ |> exec("create_5k_boxes+transform", [@bs] body) |> compare((expect, toBe))
        }
      );
      testPromise(
        "create 5k boxes+transform+set parent",
        () => {
          let body = [%bs.raw
            {| function() {
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




return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                         }
         }
         |}
          ];
          state^
          |> exec("create_5k_boxes+transform+set_parent", [@bs] body)
          |> compare((expect, toBe))
        }
      );
      testPromise(
        "create and dispose 1k boxes",
        () => {
          let body = [%bs.raw
            {| function() {
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


                             var state = BasicBoxesTool.createAndDisposeGameObjects(boxes, state);




         var n2 = performance.now();

                             var state = wd.initDirector(state);




         var n3 = performance.now();
                             var state = wd.loopBody(100.0, state);




         var n4 = performance.now();



                             var state = wd.loopBody(200.0, state);




         var n5 = performance.now();



return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] }

                         }
         }
         |}
          ];
          state^ |> exec("create_and_dispose_1k_boxes", [@bs] body) |> compare((expect, toBe))
        }
      )
    }
  );