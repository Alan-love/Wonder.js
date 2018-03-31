open TransformAPI;

open Wonder_jest;

let _ =
  describe(
    "Transform",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _judgeOneToOne =
          ((parent, child), (parentLocalPos, parentPos), (childLocalPos, childPos), state) =>
        (
          state |> getTransformLocalPosition(parent),
          state |> getTransformPosition(parent),
          state |> getTransformLocalPosition(child),
          state |> getTransformPosition(child)
        )
        |> expect == (parentLocalPos, parentPos, childLocalPos, childPos);
      let _judgeOneToTwo =
          (
            (parent, child1, child2),
            (parentLocalPos, parentPos),
            (child1LocalPos, child1Pos),
            (child2LocalPos, child2Pos),
            state
          ) =>
        (
          state |> getTransformLocalPosition(parent),
          state |> getTransformPosition(parent),
          state |> getTransformLocalPosition(child1),
          state |> getTransformPosition(child1),
          state |> getTransformLocalPosition(child2),
          state |> getTransformPosition(child2)
        )
        |>
        expect == (parentLocalPos, parentPos, child1LocalPos, child1Pos, child2LocalPos, child2Pos);
      let _prepareOne = () => {
        let (state, transform) = createTransform(state^);
        let pos1 = (1., 2., 3.);
        let pos2 = (5., 10., 30.);
        let state = setTransformPosition(transform, pos1, state);
        (state, transform, pos1, pos2)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "createTransform",
        () => {
          test(
            "create a new transform which is just index(int)",
            () => {
              let (state, transform) = createTransform(state^);
              (TransformTool.getTransformRecord(state).index, transform) |> expect == (1, 0)
            }
          );
          /* describe(
               "contract check",
               () => {
                 let _buildState = (index) =>
                   MainStateDataType.{
                     ...state^,
                     transformRecord: Some({...OptionTool.unsafeGet(state^.transformRecord), index})
                   };
                 beforeEach(
                   () =>
                     state := SettingTool.setBufferSize(state^, ~transformDataBufferCount=2, ())
                 );
                 test(
                   "have create too many components(the count of transforms shouldn't exceed maxCount",
                   () => {
                     state := _buildState(2);
                     expect(() => createTransform(state^))
                     |> toThrowMessage(
                          "have create too many components(the count of transforms shouldn't exceed 2"
                        )
                   }
                 )
               }
             ); */
          describe(
            "change state",
            () =>
              test(
                "state->index + 1",
                () => {
                  let (state, _) = createTransform(state^);
                  TransformTool.getTransformRecord(state)
                  |> ((record) => expect(record.index) == 1)
                }
              )
          );
          test(
            "mark new transform dirty",
            () => {
              let (state, transform) = createTransform(state^);
              TransformTool.isDirty(transform, state) |> expect == true
            }
          )
        }
      );
      /* describe(
           "TransformTool.init",
           () =>
             test(
               "update transform",
               () => {
                 let (state, parent) = createTransform(state^);
                 let (state, child) = createTransform(state);
                 let pos = (1., 2., 3.);
                 let state =
                   state
                   |> setTransformLocalPosition(parent, pos)
                   |> setTransformParent(Js.Nullable.return(parent), child);
                 let state = state |> TransformTool.init;
                 state |> getTransformPosition(child) |> expect == pos
               }
             )
         ); */
      describe(
        "unsafeGetTransformParent",
        () =>
          test(
            "default value should be Js.Undefined.empty",
            () => {
              let (state, transform) = createTransform(state^);
              unsafeGetTransformParent(transform, state) |> expect == Js.Undefined.empty
            }
          )
      );
      describe(
        "setTransformParent",
        () => {
          describe(
            "the change of parent before setted as parent will affect child",
            () => {
              test(
                "test one(parent)-one(child)",
                () => {
                  let (state, parent) = createTransform(state^);
                  let (state, child) = createTransform(state);
                  let pos = (1., 2., 3.);
                  let state =
                    state
                    |> setTransformLocalPosition(parent, pos)
                    |> setTransformParent(Js.Nullable.return(parent), child);
                  state
                  |> _judgeOneToOne(
                       (parent, child),
                       (pos, pos),
                       (TransformTool.getDefaultPosition(), pos)
                     )
                }
              );
              test(
                "test one(parent)-two(child)",
                () => {
                  open Vector3Service;
                  open Vector3Type;
                  let (state, parent) = createTransform(state^);
                  let (state, child1) = createTransform(state);
                  let (state, child2) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (10., 20., 30.);
                  let state =
                    state
                    |> setTransformLocalPosition(parent, pos1)
                    |> setTransformParent(Js.Nullable.return(parent), child1);
                  let state =
                    state
                    |> setTransformLocalPosition(child2, pos2)
                    |> setTransformParent(Js.Nullable.return(parent), child2);
                  state
                  |> _judgeOneToTwo(
                       (parent, child1, child2),
                       (pos1, pos1),
                       (TransformTool.getDefaultPosition(), pos1),
                       (pos2, add(Float, pos1, pos2))
                     )
                }
              )
            }
          );
          describe(
            "if set parent to be null, remove its current parent",
            () => {
              describe(
                "test one(parent)-one(child)",
                () => {
                  let exec = () => {
                    let (state, parent) = createTransform(state^);
                    let (state, child) = createTransform(state);
                    let pos = (1., 2., 3.);
                    let state =
                      state
                      |> setTransformLocalPosition(parent, pos)
                      |> setTransformParent(Js.Nullable.return(parent), child);
                    let state = state |> setTransformParent(Js.Nullable.null, child);
                    (state, parent, child, pos)
                  };
                  test(
                    "test remove its current parent",
                    () => {
                      let (state, _, child, _) = exec();
                      state |> unsafeGetTransformParent(child) |> expect == Js.Undefined.empty
                    }
                  );
                  test(
                    "test position and local position",
                    () => {
                      let (state, parent, child, pos) = exec();
                      state
                      |> _judgeOneToOne(
                           (parent, child),
                           (pos, pos),
                           (TransformTool.getDefaultPosition(), TransformTool.getDefaultPosition())
                         )
                    }
                  )
                }
              );
              test(
                "test one(parent)-two(child)",
                () => {
                  let (state, parent) = createTransform(state^);
                  let (state, child1) = createTransform(state);
                  let (state, child2) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (10., 20., 30.);
                  let state =
                    state
                    |> setTransformLocalPosition(parent, pos1)
                    |> setTransformParent(Js.Nullable.return(parent), child1);
                  let state =
                    state
                    |> setTransformLocalPosition(child2, pos2)
                    |> setTransformParent(Js.Nullable.return(parent), child2);
                  let state = state |> setTransformParent(Js.Nullable.null, child2);
                  state
                  |> _judgeOneToTwo(
                       (parent, child1, child2),
                       (pos1, pos1),
                       (TransformTool.getDefaultPosition(), pos1),
                       (pos2, pos2)
                     )
                }
              )
            }
          );
          describe(
            "if child already has parent",
            () => {
              test(
                "can set the same parent",
                () => {
                  let (state, parent) = createTransform(state^);
                  let (state, child) = createTransform(state);
                  let pos = (1., 2., 3.);
                  let state =
                    setTransformLocalPosition(parent, pos, state)
                    |> setTransformParent(Js.Nullable.return(parent), child);
                  let state = state |> setTransformParent(Js.Nullable.return(parent), child);
                  state |> unsafeGetTransformParent(child) |> expect == Js.Undefined.return(parent)
                }
              );
              test(
                "can set different parent",
                () => {
                  let (state, parent1) = createTransform(state^);
                  let (state, parent2) = createTransform(state);
                  let (state, child) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (300., 20., 30.);
                  let state =
                    setTransformLocalPosition(parent1, pos1, state)
                    |> setTransformParent(Js.Nullable.return(parent1), child);
                  let state =
                    setTransformLocalPosition(parent2, pos2, state)
                    |> setTransformParent(Js.Nullable.return(parent2), child);
                  state
                  |> unsafeGetTransformParent(child)
                  |> expect == Js.Undefined.return(parent2)
                }
              );
              test(
                "change its current parent's children order",
                () => {
                  let (state, parent) = createTransform(state^);
                  let (state, child1) = createTransform(state);
                  let (state, child2) = createTransform(state);
                  let (state, child3) = createTransform(state);
                  let state =
                    state
                    |> setTransformParent(Js.Nullable.return(parent), child1)
                    |> setTransformParent(Js.Nullable.return(parent), child2)
                    |> setTransformParent(Js.Nullable.return(parent), child3);
                  let state = state |> setTransformParent(Js.Nullable.return(child3), child1);
                  state |> unsafeGetTransformChildren(parent) |> expect == [|3, 2|]
                }
              )
            }
          );
          describe(
            "fix bug",
            () =>
              test(
                "test two(parent)-two(child)",
                () => {
                  let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                  let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
                  let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
                  let (state, gameObject4, transform4) = GameObjectTool.createGameObject(state);
                  let state =
                    state
                    |> TransformAPI.setTransformParent(Js.Nullable.return(transform1), transform3)
                    |> TransformAPI.setTransformParent(Js.Nullable.return(transform2), transform4);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (2., 3., 4.);
                  let pos3 = (4., 3., 4.);
                  let pos4 = (7., 3., 4.);
                  let record = TransformTool.getTransformRecord(state);
                  let state =
                    state
                    |> TransformAPI.setTransformLocalPosition(transform1, pos1)
                    |> TransformAPI.setTransformLocalPosition(transform2, pos2)
                    |> TransformAPI.setTransformLocalPosition(transform3, pos3)
                    |> TransformAPI.setTransformLocalPosition(transform4, pos4);
                  (
                    state |> TransformAPI.getTransformPosition(transform1),
                    state |> TransformAPI.getTransformPosition(transform2),
                    state |> TransformAPI.getTransformPosition(transform3),
                    state |> TransformAPI.getTransformPosition(transform4)
                  )
                  |>
                  expect == (
                              pos1,
                              pos2,
                              Vector3Service.add(Vector3Type.Float, pos3, pos1),
                              Vector3Service.add(Vector3Type.Float, pos4, pos2)
                            )
                }
              )
          )
        }
      );
      describe(
        "setTransformParentKeepOrder",
        () =>
          test(
            "not change its current parent's children order",
            () => {
              let (state, parent) = createTransform(state^);
              let (state, child1) = createTransform(state);
              let (state, child2) = createTransform(state);
              let (state, child3) = createTransform(state);
              let state =
                state
                |> setTransformParent(Js.Nullable.return(parent), child1)
                |> setTransformParent(Js.Nullable.return(parent), child2)
                |> setTransformParent(Js.Nullable.return(parent), child3);
              let state = state |> setTransformParentKeepOrder(Js.Nullable.return(child3), child1);
              state |> unsafeGetTransformChildren(parent) |> expect == [|2, 3|]
            }
          )
      );
      describe(
        "unsafeGetTransformChildren",
        () =>
          test(
            "get parent's all children",
            () => {
              let (state, parent) = createTransform(state^);
              let (state, child1) = createTransform(state);
              let (state, child2) = createTransform(state);
              let state = setTransformParent(Js.Nullable.return(parent), child1, state);
              let state = setTransformParent(Js.Nullable.return(parent), child2, state);
              state |> unsafeGetTransformChildren(parent) |> expect == [|child1, child2|]
            }
          )
      );
      describe(
        "setTransformLocalPosition",
        () => {
          open Vector3Service;
          open Vector3Type;
          let _prepare = () => {
            let (state, parent) = createTransform(state^);
            let (state, child) = createTransform(state);
            let pos1 = (1., 2., 3.);
            let pos2 = (5., 10., 30.);
            let state = setTransformParent(Js.Nullable.return(parent), child, state);
            let state =
              state
              |> setTransformLocalPosition(parent, pos1)
              |> setTransformLocalPosition(child, pos2);
            (state, parent, child, pos1, pos2)
          };
          test(
            "change parent's localPosition should affect children",
            () => {
              let (state, parent, child, _, pos2) = _prepare();
              let state = setTransformLocalPosition(parent, pos2, state);
              state
              |> _judgeOneToOne((parent, child), (pos2, pos2), (pos2, add(Float, pos2, pos2)))
            }
          );
          test(
            "change child's localPosition shouldn't affect parent",
            () => {
              let (state, parent, child, pos1, _) = _prepare();
              let state = setTransformLocalPosition(child, pos1, state);
              state
              |> _judgeOneToOne((parent, child), (pos1, pos1), (pos1, add(Float, pos1, pos1)))
            }
          )
        }
      );
      /* describe(
           "setTransformLocalPositionByTypeArray",
           () => {
             open Vector3Service;
             open Vector3Type;
             open Js.Typed_array;
             let _prepare = () => {
               let (state, parent) = createTransform(state^);
               let (state, child) = createTransform(state);
               let pos1Tuple = (1., 2., 3.);
               let pos2Tuple = (5., 10., 30.);
               let pos1 = Float32Array.make([|1., 2., 3.|]);
               let pos2 = Float32Array.make([|5., 10., 30.|]);
               let state = setTransformParent(Js.Nullable.return(parent), child, state);
               let state =
                 state
                 |> TransformTool.setTransformLocalPositionByTypeArray(parent, pos1)
                 |> TransformTool.setTransformLocalPositionByTypeArray(child, pos2);
               (state, parent, child, pos1, pos1Tuple, pos2, pos2Tuple)
             };
             test(
               "change parent's localPosition should affect children",
               () => {
                 let (state, parent, child, pos1, pos1Tuple, pos2, pos2Tuple) = _prepare();
                 let state = TransformTool.setTransformLocalPositionByTypeArray(parent, pos2, state);
                 (
                   state |> TransformTool.getTransformLocalPositionTypeArray(parent),
                   state |> TransformTool.getTransformPositionTypeArray(parent),
                   state |> TransformTool.getTransformLocalPositionTypeArray(child),
                   state |> TransformTool.getTransformPositionTypeArray(child)
                 )
                 |>
                 expect == (
                             pos2,
                             pos2,
                             pos2,
                             add(Float, pos2Tuple, pos2Tuple) |> TransformTool.changeTupleToTypeArray
                           )
               }
             )
           }
         ); */
      describe(
        "getTransformPosition",
        () => {
          test(
            "default value should be (0.,0.,0.)",
            () => {
              let (state, transform) = createTransform(state^);
              state
              |> getTransformPosition(transform)
              |> expect == TransformTool.getDefaultPosition()
            }
          );
          test(
            "can get the newest position",
            () => {
              let (state, parent) = createTransform(state^);
              let (state, child) = createTransform(state);
              let pos = (1., 2., 3.);
              let state =
                state
                |> setTransformLocalPosition(parent, pos)
                |> setTransformParent(Js.Nullable.return(parent), child);
              state |> getTransformPosition(child) |> expect == pos
            }
          )
        }
      );
      describe(
        "setTransformPosition",
        () =>
          describe(
            "set position in world coordinate system",
            () => {
              test(
                "change parent's position should affect children",
                () => {
                  open Vector3Service;
                  open Vector3Type;
                  let (state, parent) = createTransform(state^);
                  let (state, child) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let state = setTransformParent(Js.Nullable.return(parent), child, state);
                  let state = setTransformLocalPosition(parent, pos1, state);
                  let state = setTransformLocalPosition(child, pos2, state);
                  let state = state |> setTransformPosition(parent, pos2);
                  state
                  |> _judgeOneToOne((parent, child), (pos2, pos2), (pos2, add(Float, pos2, pos2)))
                }
              );
              test(
                "change child's position shouldn't affect parent",
                () => {
                  let (state, parent) = createTransform(state^);
                  let (state, child) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let pos3 = (2., 3., 4.);
                  let state = setTransformParent(Js.Nullable.return(parent), child, state);
                  let state = setTransformLocalPosition(parent, pos1, state);
                  let state = setTransformLocalPosition(child, pos2, state);
                  let state = state |> setTransformPosition(child, pos3);
                  state |> _judgeOneToOne((parent, child), (pos1, pos1), ((1., 1., 1.), pos3))
                }
              )
            }
          )
      );
      /* describe(
           "setTransformPositionByTypeArray",
           () =>
             describe(
               "set position in world coordinate system",
               () =>
                 Js.Typed_array.(
                   test(
                     "change parent's position should affect children",
                     () => {
                       open Vector3Service;
                       open Vector3Type;
                       let (state, parent) = createTransform(state^);
                       let (state, child) = createTransform(state);
                       let pos1 = Float32Array.make([|1., 2., 3.|]);
                       let pos2 = Float32Array.make([|5., 4., 30.|]);
                       let state = setTransformParent(Js.Nullable.return(parent), child, state);
                       let state =
                         TransformTool.setTransformLocalPositionByTypeArray(parent, pos1, state);
                       let state =
                         TransformTool.setTransformLocalPositionByTypeArray(child, pos2, state);
                       let state =
                         state |> TransformTool.setTransformLocalPositionByTypeArray(parent, pos2);
                       (
                         state |> TransformTool.getTransformPositionTypeArray(parent),
                         state |> TransformTool.getTransformPositionTypeArray(child)
                       )
                       |>
                       expect == (
                                   pos2,
                                   add(Float, (5., 4., 30.), (5., 4., 30.))
                                   |> TransformTool.changeTupleToTypeArray
                                 )
                     }
                   )
                 )
             )
         ); */
      /* describe(
           "test before TransformTool.update",
           () => {
             describe(
               "should get the last TransformTool.updated transform record",
               () =>
                 test(
                   "test get position",
                   () => {
                     let (state, transform, pos1, pos2) = _prepareOne();
                     let state = state |> TransformTool.update;
                     let state = setTransformPosition(transform, pos2, state);
                     state |> getTransformPosition(transform) |> expect == pos1
                   }
                 )
             );
             describe(
               "should get the newest local transform record",
               () =>
                 test(
                   "test get local position",
                   () => {
                     let (state, transform, _, pos2) = _prepareOne();
                     let state = state |> TransformTool.update;
                     let state = setTransformLocalPosition(transform, pos2, state);
                     state |> getTransformLocalPosition(transform) |> expect == pos2
                   }
                 )
             )
           }
         ); */
      /* describe(
           "immediately update",
           () => {
             test(
               "sort dirtyArray, make parent before child",
               () => {
                 let (state, child) = createTransform(state^);
                 let (state, parent) = createTransform(state);
                 let pos = (1., 2., 3.);
                 let state = state |> setTransformLocalPosition(child, pos);
                 let state =
                   state
                   |> setTransformLocalPosition(parent, pos)
                   |> setTransformParent(Js.Nullable.return(parent), child);
                 /* let state = state |> TransformTool.init; */
                 let state = state |> TransformTool.update;
                 (getTransformPosition(child, state), getTransformPosition(parent, state))
                 |> expect == (Vector3Service.add(Float, pos, pos), pos)
               }
             );
             test(
               "clear dirty array after compute transform record",
               () => {
                 let (state, _, _, _) = _prepareOne();
                 let len1 =
                   state
                   |> TransformTool.getTransformRecord
                   |> ((transformRecord) => Js.Array.length(transformRecord.dirtyArray));
                 let state = state |> TransformTool.update;
                 let len2 =
                   state
                   |> TransformTool.getTransformRecord
                   |> ((transformRecord) => Js.Array.length(transformRecord.dirtyArray));
                 (len1, len2) |> expect == (1, 0)
               }
             )
           }
         ); */
      describe(
        "unsafeGetTransformGameObject",
        () =>
          test(
            "get transform's gameObject",
            () => {
              open GameObjectAPI;
              open GameObjectAPI;
              let (state, gameObject) = createGameObject(state^);
              let transform = state |> unsafeGetGameObjectTransformComponent(gameObject);
              state |> unsafeGetTransformGameObject(transform) |> expect == gameObject
            }
          )
      );
      /* describe(
           "getLocalToWorldMatrixTypeArray",
           () =>
             describe(
               "test cache",
               () => {
                 test(
                   "cache record after first get",
                   () => {
                     open GameObjectAPI; open GameObjectAPI;
                     let (state, transform1) = createTransform(state^);
                     let pos1 = (1., 2., 3.);
                     let state = state |> setTransformLocalPosition(transform1, pos1);
                     let mat1 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                     let mat2 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                     mat1 |> expect == mat2
                   }
                 );
                 describe(
                   "test cache invalid",
                   () => {
                     let _prepare = (state) => {
                       open GameObjectAPI; open GameObjectAPI;
                       let (state, transform1) = createTransform(state^);
                       let pos1 = (1., 2., 3.);
                       let state = state |> setTransformLocalPosition(transform1, pos1);
                       let mat1 =
                         TransformTool.getLocalToWorldMatrixTypeArray(transform1, state)
                         |> Js.Typed_array.Float32Array.copy;
                       (state, transform1, mat1)
                     };
                     test(
                       "invalid after change local position",
                       () => {
                         let (state, transform1, mat1) = _prepare(state);
                         let pos2 = (2., 2., 3.);
                         let state = state |> setTransformLocalPosition(transform1, pos2);
                         let mat2 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                         mat1 |> expect |> not_ |> toEqual(mat2)
                       }
                     );
                     test(
                       "invalid after change position",
                       () => {
                         let (state, transform1, mat1) = _prepare(state);
                         let pos2 = (2., 2., 3.);
                         let state = state |> setTransformPosition(transform1, pos2);
                         let mat2 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                         mat1 |> expect |> not_ |> toEqual(mat2)
                       }
                     );
                     test(
                       "test get position after change local position",
                       () => {
                         let (state, transform1, mat1) = _prepare(state);
                         let pos2 = (2., 2., 3.);
                         let state = state |> setTransformLocalPosition(transform1, pos2);
                         let _ = state |> getTransformPosition(transform1);
                         let mat2 = TransformTool.getLocalToWorldMatrixTypeArray(transform1, state);
                         mat1 |> expect |> not_ |> toEqual(mat2)
                       }
                     )
                   }
                 )
               }
             )
         ); */
      describe(
        "dispose component",
        () => {
          let dispose = (transform, state) => TransformTool.dispose(transform, state);
          let _prepare = () => {
            let (state, transform1) = createTransform(state^);
            let (state, transform2) = createTransform(state);
            let state = state |> setTransformParent(Js.Nullable.return(transform1), transform2);
            (state, transform1, transform2)
          };
          describe(
            "test if dirty",
            () =>
              test(
                "the disposed transform shouldn't affect other alive ones' record",
                () => {
                  let (state, transform1) = createTransform(state^);
                  let (state, transform2) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let state =
                    state
                    |> setTransformLocalPosition(transform1, pos1)
                    |> setTransformLocalPosition(transform2, pos2);
                  let state = state |> dispose(transform1);
                  state |> getTransformLocalPosition(transform2) |> expect == pos2
                }
              )
          );
          describe(
            "test if not dirty",
            () =>
              test(
                "the disposed transform shouldn't affect other alive ones' record",
                () => {
                  let (state, transform1) = createTransform(state^);
                  let (state, transform2) = createTransform(state);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let state =
                    state
                    |> setTransformLocalPosition(transform1, pos1)
                    |> setTransformLocalPosition(transform2, pos2);
                  let state = state |> dispose(transform1);
                  state |> getTransformLocalPosition(transform2) |> expect == pos2
                }
              )
          );
          describe(
            "if child is disposed",
            () => {
              test(
                "should remove it from childMap",
                () => {
                  let (state, transform1) = createTransform(state^);
                  let (state, transform2) = createTransform(state);
                  let state =
                    state |> setTransformParent(Js.Nullable.return(transform1), transform2);
                  let state = state |> dispose(transform2);
                  state |> unsafeGetTransformChildren(transform1) |> expect == [||]
                }
              );
              describe(
                "shouldn't affect parent",
                () => {
                  test(
                    "test disposed one has no parent",
                    () => {
                      let (state, transform1, transform2) = _prepare();
                      let pos1 = (1., 2., 3.);
                      let pos2 = (5., 10., 30.);
                      let state =
                        state
                        |> setTransformLocalPosition(transform1, pos1)
                        |> setTransformLocalPosition(transform2, pos2);
                      let state = state |> dispose(transform1);
                      state |> getTransformPosition(transform2) |> expect == pos2
                    }
                  );
                  test(
                    "test disposed one has parent",
                    () => {
                      open Vector3Service;
                      open Vector3Type;
                      let (state, transform1, transform2) = _prepare();
                      let (state, transform0) = createTransform(state);
                      let state =
                        state |> setTransformParent(Js.Nullable.return(transform0), transform1);
                      let pos0 = (2., 4., 6.);
                      let pos1 = (1., 2., 3.);
                      let pos2 = (5., 10., 30.);
                      let state =
                        state
                        |> setTransformLocalPosition(transform0, pos0)
                        |> setTransformLocalPosition(transform1, pos1)
                        |> setTransformLocalPosition(transform2, pos2);
                      let state = state |> dispose(transform2);
                      (
                        state |> getTransformPosition(transform0),
                        state |> getTransformPosition(transform1)
                      )
                      |> expect == (pos0, add(Float, pos0, pos1))
                    }
                  )
                }
              )
            }
          );
          describe(
            "if parent is disposed",
            () => {
              test(
                "should remove it from parentMap",
                () => {
                  let (state, transform1, transform2) = _prepare();
                  let state = state |> dispose(transform1);
                  state |> unsafeGetTransformParent(transform2) |> expect == Js.Undefined.empty
                }
              );
              test(
                "should affect children",
                () => {
                  open Vector3Service;
                  open Vector3Type;
                  let (state, transform1, transform2) = _prepare();
                  let (state, transform0) = createTransform(state);
                  let state =
                    state |> setTransformParent(Js.Nullable.return(transform0), transform1);
                  let pos0 = (2., 4., 6.);
                  let pos1 = (1., 2., 3.);
                  let pos2 = (5., 10., 30.);
                  let state =
                    state
                    |> setTransformLocalPosition(transform0, pos0)
                    |> setTransformLocalPosition(transform1, pos1)
                    |> setTransformLocalPosition(transform2, pos2);
                  let state = state |> dispose(transform0);
                  (
                    state |> getTransformPosition(transform1),
                    state |> getTransformPosition(transform2)
                  )
                  |> expect == (pos1, add(Float, pos1, pos2))
                }
              )
            }
          );
          describe(
            "dispose map record",
            () => {
              test(
                "remove from parentMap, childMap,  dirtyMap, gameObjectMap",
                () => {
                  open TransformType;
                  let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectTransformComponent(
                         gameObject1,
                         transform1,
                         false
                       );
                  let {parentMap, childMap, dirtyMap, gameObjectMap} =
                    TransformTool.getTransformRecord(state);
                  (
                    parentMap |> WonderCommonlib.SparseMapService.has(transform1),
                    childMap |> WonderCommonlib.SparseMapService.has(transform1),
                    dirtyMap |> WonderCommonlib.SparseMapService.has(transform1),
                    gameObjectMap |> WonderCommonlib.SparseMapService.has(transform1)
                  )
                  |> expect == (false, false, false, false)
                }
              );
              describe(
                "test remove from type array",
                () => {
                  describe(
                    "remove from localToWorldMatrices",
                    () => {
                      let _prepare = (state) => {
                        let (state, gameObject1, transform1) =
                          GameObjectTool.createGameObject(state^);
                        let (state, gameObject2, transform2) =
                          GameObjectTool.createGameObject(state);
                        let mat1 = [|
                          2.,
                          0.,
                          0.,
                          0.,
                          0.,
                          1.,
                          0.,
                          0.,
                          0.,
                          0.,
                          1.,
                          0.,
                          0.,
                          0.,
                          0.,
                          1.
                        |];
                        let mat2 = [|
                          20.,
                          0.,
                          0.,
                          0.,
                          0.,
                          1.,
                          0.,
                          0.,
                          0.,
                          0.,
                          1.,
                          0.,
                          0.,
                          0.,
                          0.,
                          1.
                        |];
                        let state = state |> TransformTool.setLocalToWorldMatrix(transform1, mat1);
                        let state = state |> TransformTool.setLocalToWorldMatrix(transform2, mat2);
                        let state =
                          state
                          |> GameObjectAPI.disposeGameObjectTransformComponent(
                               gameObject1,
                               transform1,
                               false
                             );
                        (state, (gameObject1, gameObject2), (mat1, mat2), (transform1, transform2))
                      };
                      test(
                        "reset removed one's value",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (mat1, mat2),
                            (transform1, transform2)
                          ) =
                            _prepare(state);
                          (
                            TransformTool.getLocalToWorldMatrix(transform1, state),
                            TransformTool.getLocalToWorldMatrix(transform2, state)
                          )
                          |> expect == (TransformTool.getDefaultLocalToWorldMatrix(state), mat2)
                        }
                      )
                    }
                  );
                  describe(
                    "remove from localPositions",
                    () => {
                      let _prepare = (state) => {
                        let (state, gameObject1, transform1) =
                          GameObjectTool.createGameObject(state^);
                        let (state, gameObject2, transform2) =
                          GameObjectTool.createGameObject(state);
                        let pos1 = (1., 2., 3.);
                        let pos2 = (5., 10., 30.);
                        let state =
                          state |> TransformAPI.setTransformLocalPosition(transform1, pos1);
                        let state =
                          state |> TransformAPI.setTransformLocalPosition(transform2, pos2);
                        let state =
                          state
                          |> GameObjectAPI.disposeGameObjectTransformComponent(
                               gameObject1,
                               transform1,
                               false
                             );
                        (state, (gameObject1, gameObject2), (pos1, pos2), (transform1, transform2))
                      };
                      test(
                        "reset removed one's value",
                        () => {
                          TestTool.closeContractCheck();
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (pos1, pos2),
                            (transform1, transform2)
                          ) =
                            _prepare(state);
                          (
                            TransformAPI.getTransformLocalPosition(transform1, state),
                            TransformAPI.getTransformLocalPosition(transform2, state)
                          )
                          |> expect == (TransformTool.getDefaultLocalPositionTuple(state), pos2)
                        }
                      )
                    }
                  )
                }
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              describe(
                "if has disposed one",
                () => {
                  test(
                    "use disposed index(transform) as new index",
                    () => {
                      let (state, transform1, transform2) = _prepare();
                      let state = state |> dispose(transform1);
                      let state = state |> dispose(transform2);
                      let (state, transform3) = createTransform(state);
                      let (state, transform4) = createTransform(state);
                      (transform3, transform4) |> expect == (transform2, transform1)
                    }
                  );
                  test(
                    "new one can get default localPosition",
                    () => {
                      let (state, transform1, _) = _prepare();
                      let state = state |> setTransformLocalPosition(transform1, (1., 2., 3.));
                      let state = state |> dispose(transform1);
                      let (state, transform2) = createTransform(state);
                      state
                      |> getTransformLocalPosition(transform2)
                      |> expect == TransformTool.getDefaultPosition()
                    }
                  )
                }
              );
              test(
                "else, increase transformRecord.index",
                () => {
                  let (state, transform1, transform2) = _prepare();
                  let (state, transform3) = createTransform(state);
                  transform3 |> expect == transform2 + 1
                }
              );
              describe(
                "fix bug",
                () =>
                  test(
                    "new one should has default transform record",
                    () => {
                      let (state, transform1, transform2) = _prepare();
                      let state = state |> setTransformLocalPosition(transform1, (0., 1., 2.));
                      let _ = state |> getTransformPosition(transform1);
                      let state = state |> dispose(transform1);
                      /* let state = state |> dispose(transform2); */
                      let (state, transform3) = createTransform(state);
                      (
                        state |> getTransformLocalPosition(transform3),
                        state |> getTransformPosition(transform3)
                      )
                      |>
                      expect == (
                                  TransformTool.getDefaultPosition(),
                                  TransformTool.getDefaultPosition()
                                )
                      /* let (state, transform4) = createTransform(state); */
                      /* (transform3, transform4) |> expect == (transform2, transform1) */
                    }
                  )
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "expect dispose the alive component, but actual not",
                () => {
                  let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectTransformComponent(
                         gameObject1,
                         transform1,
                         false
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectTransformComponent(
                             gameObject1,
                             transform1,
                             false
                           );
                      ()
                    }
                  )
                  |> toThrowMessage("expect dispose the alive component, but actual not")
                }
              )
          )
        }
      );
      describe(
        "contract check: is alive",
        () =>
          describe(
            "if transform is disposed",
            () => {
              let _testGetFunc = (getFunc) => {
                let (state, transform1) = createTransform(state^);
                let state = state |> TransformTool.dispose(transform1);
                expect(() => getFunc(transform1, state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              let _testSetFunc = (setFunc) => {
                let (state, transform1) = createTransform(state^);
                let state = state |> TransformTool.dispose(transform1);
                expect(() => setFunc(Obj.magic(transform1), Obj.magic(1), state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              test("getTransformPosition should error", () => _testGetFunc(getTransformPosition));
              test(
                "getTransformLocalPosition should error",
                () => _testGetFunc(getTransformLocalPosition)
              );
              test(
                "unsafeGetTransformParent should error",
                () => _testGetFunc(unsafeGetTransformParent)
              );
              test(
                "unsafeGetTransformChildren should error",
                () => _testGetFunc(unsafeGetTransformChildren)
              );
              test(
                "unsafeGetTransformGameObject should error",
                () => _testGetFunc(unsafeGetTransformGameObject)
              );
              test("setTransformPosition should error", () => _testSetFunc(setTransformPosition));
              test(
                "setTransformLocalPosition should error",
                () => _testSetFunc(setTransformLocalPosition)
              );
              test("setTransformParent should error", () => _testSetFunc(setTransformParent))
            }
          )
      );
      describe(
        "fix bug",
        () => {
          test(
            "the second transform's default localToWorldMatrix should be identity matrix4 when create two transforms",
            () => {
              open GameObjectAPI;
              open GameObjectAPI;
              let (state, transform1) = createTransform(state^);
              let (state, transform2) = createTransform(state);
              TransformTool.getLocalToWorldMatrixTypeArray(transform2, state)
              |> expect == TransformTool.getDefaultLocalToWorldMatrixTypeArray(state)
            }
          );
          test(
            "get the record from Float32Array may not equal to the value which is setted",
            () => {
              let (state, transform0) = createTransform(state^);
              let pos0 = (0.1, 0., 0.);
              let state = state |> setTransformLocalPosition(transform0, pos0);
              state
              |> getTransformLocalPosition(transform0)
              |> expect == (0.10000000149011612, 0., 0.)
            }
          )
        }
      )
    }
  );