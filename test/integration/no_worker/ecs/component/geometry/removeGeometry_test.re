open Wonder_jest;

open GeometryAPI;

let _ =
  describe("remove geometry", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("removeGameObjectGeometryComponent", () => {
      test("remove from gameObject", () => {
        let (state, gameObject, geometry) =
          GeometryTool.createGameObject(state^);

        let state =
          GameObjectAPI.removeGameObjectGeometryComponent(
            gameObject,
            geometry,
            state,
          );

        GameObjectAPI.hasGameObjectGeometryComponent(gameObject, state)
        |> expect == false;
      });
      test("remove from gameObjectsMap", () => {
        let (state, gameObject, geometry) =
          GeometryTool.createGameObject(state^);

        let state =
          GameObjectAPI.removeGameObjectGeometryComponent(
            gameObject,
            geometry,
            state,
          );

        GeometryAPI.unsafeGetGeometryGameObjects(geometry, state)
        |> expect == [||];
      });

      describe("test remove shared geometry from gameObject", () =>
        test("remove gameObject", () => {
          let (state, geometry1) = createGeometry(state^);
          let (state, gameObject1) = GameObjectAPI.createGameObject(state);
          let state =
            state
            |> GameObjectAPI.addGameObjectGeometryComponent(
                 gameObject1,
                 geometry1,
               );
          let (state, gameObject2) = GameObjectAPI.createGameObject(state);
          let state =
            state
            |> GameObjectAPI.addGameObjectGeometryComponent(
                 gameObject2,
                 geometry1,
               );
          let (state, gameObject3) = GameObjectAPI.createGameObject(state);
          let state =
            state
            |> GameObjectAPI.addGameObjectGeometryComponent(
                 gameObject3,
                 geometry1,
               );
          let state =
            state
            |> GameObjectAPI.removeGameObjectGeometryComponent(
                 gameObject1,
                 geometry1,
               );

          GeometryAPI.unsafeGetGeometryGameObjects(geometry1, state)
          |> expect == [|gameObject3, gameObject2|];
        })
      );

      describe("not dispose data", () => {
        test("not change disposeCount", () => {
          let (state, gameObject, geometry) =
            GeometryTool.createGameObject(state^);

          let state =
            GameObjectAPI.removeGameObjectGeometryComponent(
              gameObject,
              geometry,
              state,
            );

          GeometryTool.getRecord(state).disposeCount |> expect == 0;
        });

        test("not add to disposedIndexArray", () => {
          let (state, gameObject, geometry) =
            GeometryTool.createGameObject(state^);

          let state =
            GameObjectAPI.removeGameObjectGeometryComponent(
              gameObject,
              geometry,
              state,
            );

          GeometryTool.getRecord(state).disposedIndexArray |> expect == [||];
        });
      });
    });
  });