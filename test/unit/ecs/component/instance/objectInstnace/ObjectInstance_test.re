open Wonder_jest;

let _ =
  describe("ObjectInstance", () => {
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
    describe("dispose component", () => {
      describe("dispose data", () => {
        test("remove from sourceInstanceMap, gameObjectMap", () => {
          open ObjectInstanceType;
          let (
            state,
            gameObject,
            sourceInstance,
            objectInstanceGameObject,
            objectInstance,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectObjectInstanceComponent(
                 gameObject,
                 objectInstance,
               );
          let {sourceInstanceMap, gameObjectMap} =
            ObjectInstanceTool.getObjectInstanceRecord(state);
          (
            sourceInstanceMap
            |> WonderCommonlib.MutableSparseMapService.has(objectInstance),
            gameObjectMap
            |> WonderCommonlib.MutableSparseMapService.has(objectInstance),
          )
          |> expect == (false, false);
        });
        test(
          "remove from sourceInstance->objectInstanceTransformCollections", () => {
          open ObjectInstanceType;
          open SourceInstanceType;
          let (state, transform) = TransformAPI.createTransform(state^);
          let (
            state,
            gameObject,
            sourceInstance,
            objectInstanceGameObjectArr,
            objectInstanceArr,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObjectArr(3, state);
          let state =
            state
            |> GameObjectTool.batchDisposeGameObject(
                 objectInstanceGameObjectArr |> Js.Array.slice_start(1),
               );
          let sourceInstanceObjectInstanceTransformArray =
            SourceInstanceAPI.getSourceInstanceObjectInstanceTransformArray(
              sourceInstance,
              state,
            );
          sourceInstanceObjectInstanceTransformArray
          |>
          expect == [|
                      GameObjectAPI.unsafeGetGameObjectTransformComponent(
                        objectInstanceGameObjectArr[0],
                        state,
                      ),
                    |];
        });
      });
      describe("test add new one after dispose old one", () => {
        test("use disposed index as new index firstly", () => {
          open ObjectInstanceType;
          let (
            state,
            gameObject1,
            sourceInstance1,
            objectInstanceGameObject1,
            objectInstance1,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectObjectInstanceComponent(
                 gameObject1,
                 objectInstance1,
               );
          let (
            state,
            gameObject2,
            sourceInstance2,
            objectInstanceGameObject2,
            objectInstance2,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObject(state);
          objectInstance2 |> expect == objectInstance1;
        });
        test(
          "if has no disposed index, get index from objectInstanceRecord.index",
          () => {
          open ObjectInstanceType;

          TestTool.closeContractCheck();

          let (state, gameObject1, _, _, objectInstance1) =
            ObjectInstanceTool.createObjectInstanceGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectObjectInstanceComponent(
                 gameObject1,
                 objectInstance1,
               );
          let (state, _, _, _, objectInstance2) =
            ObjectInstanceTool.createObjectInstanceGameObject(state);
          let (state, _, _, _, objectInstance3) =
            ObjectInstanceTool.createObjectInstanceGameObject(state);
          (objectInstance2, objectInstance3)
          |> expect == (objectInstance1, objectInstance1 + 1);
        });
      });
      describe("contract check", () =>
        test("expect dispose the alive component, but actual not", () => {
          open ObjectInstanceType;
          let (state, gameObject1, _, _, objectInstance1) =
            ObjectInstanceTool.createObjectInstanceGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectObjectInstanceComponent(
                 gameObject1,
                 objectInstance1,
               );
          expect(() => {
            let state =
              state
              |> GameObjectTool.disposeGameObjectObjectInstanceComponent(
                   gameObject1,
                   objectInstance1,
                 );
            ();
          })
          |> toThrowMessage(
               "expect dispose the alive component, but actual not",
             );
        })
      );
    });
  });