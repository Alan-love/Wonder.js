open ArrayBufferViewSourceTextureAPI;

open Wonder_jest;

let _ =
  describe("ArrayBufferViewSourceTexture", () => {
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
    describe("createArrayBufferViewSourceTexture", () => {
      test(
        "create a new texture which starts from arrayBufferViewSourceTextureIndexOffset",
        () => {
          let (state, texture) = createArrayBufferViewSourceTexture(state^);
          expect(texture)
          == ArrayBufferViewSourceTextureTool.generateArrayBufferViewSourceTextureIndex(
               0,
               state,
             );
        },
      );
      test("shouldn't exceed buffer count", () => {
        let state =
          TestTool.initWithoutBuildFakeDom(
            ~sandbox,
            ~buffer=
              SettingTool.buildBufferConfigStr(
                ~arrayBufferViewSourceTextureCount=2,
                (),
              ),
            (),
          );
        let (_, texture) = createArrayBufferViewSourceTexture(state);
        let (_, texture) = createArrayBufferViewSourceTexture(state);
        expect(() => {
          let (_, texture) = createArrayBufferViewSourceTexture(state);
          ();
        })
        |> toThrowMessage("expect index: 50 <= maxIndex: 49, but actual not");
      });
    });
    describe("test default data", () => {
      describe("is need updates", () =>
        test("default is need update", () => {
          let (state, texture) = createArrayBufferViewSourceTexture(state^);
          ArrayBufferViewSourceTextureTool.isNeedUpdate(texture, state)
          |> expect == true;
        })
      );

      describe("is flipY", () =>
        test("default is true", () => {
          let (state, texture) = createArrayBufferViewSourceTexture(state^);
          ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureFlipY(
            texture,
            state,
          )
          |> expect == true;
        })
      );
    });
    describe("setArrayBufferViewSourceTextureSource", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let source = ArrayBufferViewSourceTextureTool.buildSource();
        let state =
          state |> setArrayBufferViewSourceTextureSource(texture, source);
        unsafeGetArrayBufferViewSourceTextureSource(texture, state)
        |> expect == source;
      })
    );
    describe("setArrayBufferViewSourceTextureWidth", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let width = 5;
        let state =
          state |> setArrayBufferViewSourceTextureWidth(texture, width);
        getArrayBufferViewSourceTextureWidth(texture, state)
        |> expect == width;
      })
    );
    describe("setArrayBufferViewSourceTextureHeight", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let height = 5;
        let state =
          state |> setArrayBufferViewSourceTextureHeight(texture, height);
        getArrayBufferViewSourceTextureHeight(texture, state)
        |> expect == height;
      })
    );
    describe("setArrayBufferViewSourceTextureWrapS", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let wrap = TextureType.Mirrored_repeat;
        let state =
          state |> setArrayBufferViewSourceTextureWrapS(texture, wrap);
        getArrayBufferViewSourceTextureWrapS(texture, state) |> expect == wrap;
      })
    );
    describe("setArrayBufferViewSourceTextureWrapT", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let wrap = TextureType.Mirrored_repeat;
        let state =
          state |> setArrayBufferViewSourceTextureWrapT(texture, wrap);
        getArrayBufferViewSourceTextureWrapT(texture, state) |> expect == wrap;
      })
    );
    describe("setArrayBufferViewSourceTextureMagFilter", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let filter = TextureType.Linear;
        let state =
          state |> setArrayBufferViewSourceTextureMagFilter(texture, filter);
        getArrayBufferViewSourceTextureMagFilter(texture, state)
        |> expect == filter;
      })
    );
    describe("setArrayBufferViewSourceTextureMinFilter", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let filter = TextureType.Linear;
        let state =
          state |> setArrayBufferViewSourceTextureMinFilter(texture, filter);
        getArrayBufferViewSourceTextureMinFilter(texture, state)
        |> expect == filter;
      })
    );
    describe("setArrayBufferViewSourceTextureFormat", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let format = TextureType.Rgba;
        let state =
          state |> setArrayBufferViewSourceTextureFormat(texture, format);
        getArrayBufferViewSourceTextureFormat(texture, state)
        |> expect == format;
      })
    );
    describe("setArrayBufferViewSourceTextureType", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let type_ = 1;
        let state =
          state |> setArrayBufferViewSourceTextureType(texture, type_);
        getArrayBufferViewSourceTextureType(texture, state) |> expect == type_;
      })
    );
    describe("setArrayBufferViewSourceTextureFlipY", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let state =
          state |> setArrayBufferViewSourceTextureFlipY(texture, false);
        getArrayBufferViewSourceTextureFlipY(texture, state)
        |> expect == false;
      })
    );

    describe("dispose", () =>
      describe("dispose from material", () => {
        beforeEach(() =>
          state :=
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()))
        );

        describe("remove material from group", () => {
          test("test light material", () => {
            let (
              state,
              material1,
              (diffuseMap, specularMap, source1, source2),
            ) =
              LightMaterialTool.createMaterialWithArrayBufferViewMap(state^);
            let (state, material2) =
              LightMaterialAPI.createLightMaterial(state);
            let (state, _) =
              LightMaterialTool.setMaps(
                material2,
                diffuseMap,
                specularMap,
                state,
              );

            let state =
              LightMaterialAPI.batchDisposeLightMaterial(
                [|material1|],
                state,
              );

            (
              ArrayBufferViewSourceTextureTool.unsafeGetMaterialDataArr(
                diffuseMap,
                state,
              )
              |> Js.Array.length,
              ArrayBufferViewSourceTextureTool.unsafeGetMaterialDataArr(
                specularMap,
                state,
              )
              |> Js.Array.length,
            )
            |> expect == (1, 1);
          });
        });

        test(
          "if other materials use the texture, not dispose texture data", () => {
          let (state, material1, (diffuseMap, specularMap, source1, source2)) =
            LightMaterialTool.createMaterialWithArrayBufferViewMap(state^);
          let (state, material2) =
            LightMaterialAPI.createLightMaterial(state);
          let (state, _) =
            LightMaterialTool.setMaps(
              material2,
              diffuseMap,
              specularMap,
              state,
            );

          let state =
            LightMaterialAPI.batchDisposeLightMaterial([|material1|], state);

          (
            ArrayBufferViewSourceTextureAPI.unsafeGetArrayBufferViewSourceTextureSource(
              diffuseMap,
              state,
            ),
            ArrayBufferViewSourceTextureAPI.unsafeGetArrayBufferViewSourceTextureSource(
              specularMap,
              state,
            ),
          )
          |> expect == (source1, source2);
        });

        describe("else", () => {
          test("remove from sourceMap, nameMap", () => {
            let (
              state,
              material1,
              (diffuseMap, specularMap, source1, source2),
            ) =
              LightMaterialTool.createMaterialWithArrayBufferViewMap(state^);
            let state =
              state
              |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureName(
                   diffuseMap,
                   "name",
                 );

            let state =
              LightMaterialAPI.batchDisposeLightMaterial(
                [|material1|],
                state,
              );

            (
              ArrayBufferViewSourceTextureTool.getArrayBufferViewSourceTextureName(
                diffuseMap,
                state,
              ),
              ArrayBufferViewSourceTextureTool.getArrayBufferViewSourceTextureSource(
                diffuseMap,
                state,
              ),
            )
            |> expect == (None, None);
          });

          describe("test remove from type array", () => {
            let _testRemoveFromTypeArr =
                (
                  state,
                  (value1, value2),
                  defaultValue,
                  (disposeMaterialFunc, getValueFunc, setValueFunc),
                ) => {
              open Wonder_jest;
              open Expect;
              open Expect.Operators;
              open Sinon;

              let (state, material1, (texture1, source1)) =
                LightMaterialTool.createMaterialWithArrayBufferViewDiffuseMap(
                  state^,
                );
              let (state, material2, (texture2, source2)) =
                LightMaterialTool.createMaterialWithArrayBufferViewDiffuseMap(
                  state,
                );

              let state = state |> setValueFunc(texture1, value1);
              let state = state |> setValueFunc(texture2, value2);
              let state = state |> disposeMaterialFunc(material1);
              (getValueFunc(texture1, state), getValueFunc(texture2, state))
              |> expect == (defaultValue, value2);
            };

            test("remove from wrapSs", () =>
              _testRemoveFromTypeArr(
                state,
                (TextureType.Repeat, TextureType.Mirrored_repeat),
                BufferArrayBufferViewSourceTextureService.getDefaultWrapS(),
                (
                  LightMaterialTool.disposeLightMaterial,
                  ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureWrapS,
                  ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureWrapS,
                ),
              )
            );
            test("remove from wrapTs", () =>
              _testRemoveFromTypeArr(
                state,
                (TextureType.Repeat, TextureType.Mirrored_repeat),
                BufferArrayBufferViewSourceTextureService.getDefaultWrapT(),
                (
                  LightMaterialTool.disposeLightMaterial,
                  ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureWrapT,
                  ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureWrapT,
                ),
              )
            );
            test("remove from magFilters", () =>
              _testRemoveFromTypeArr(
                state,
                (
                  TextureType.Linear_mipmap_nearest,
                  TextureType.Nearest_mipmap_linear,
                ),
                BufferArrayBufferViewSourceTextureService.getDefaultMagFilter(),
                (
                  LightMaterialTool.disposeLightMaterial,
                  ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureMagFilter,
                  ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureMagFilter,
                ),
              )
            );
            test("remove from minFilters", () =>
              _testRemoveFromTypeArr(
                state,
                (
                  TextureType.Linear_mipmap_nearest,
                  TextureType.Nearest_mipmap_linear,
                ),
                BufferArrayBufferViewSourceTextureService.getDefaultMinFilter(),
                (
                  LightMaterialTool.disposeLightMaterial,
                  ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureMinFilter,
                  ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureMinFilter,
                ),
              )
            );
            test("remove from formats", () =>
              _testRemoveFromTypeArr(
                state,
                (TextureType.Rgba, TextureType.Alpha),
                BufferArrayBufferViewSourceTextureService.getDefaultFormat(),
                (
                  LightMaterialTool.disposeLightMaterial,
                  ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureFormat,
                  ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureFormat,
                ),
              )
            );
            test("remove from types", () =>
              _testRemoveFromTypeArr(
                state,
                (
                  TextureTypeService.getUnsignedShort4444(),
                  TextureTypeService.getUnsignedShort5551(),
                ),
                BufferArrayBufferViewSourceTextureService.getDefaultType(),
                (
                  LightMaterialTool.disposeLightMaterial,
                  ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureType,
                  ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureType,
                ),
              )
            );
            /* test("remove from isNeedUpdates", () =>
                 _testRemoveFromTypeArr(
                   state,
                   (true, false),
                   true,
                   (
                     BasicMaterialTool.disposeBasicMaterial,
                     ArrayBufferViewSourceTextureTool.getIsNeedUpdate,
                     ArrayBufferViewSourceTextureTool.setIsNeedUpdate,
                   ),
                 )
               ); */
            test("remove from flipYs", () =>
              _testRemoveFromTypeArr(
                state,
                (true, false),
                true,
                (
                  LightMaterialTool.disposeLightMaterial,
                  ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureFlipY,
                  ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureFlipY,
                ),
              )
            );
            test("remove from widths", () =>
              _testRemoveFromTypeArr(
                state,
                (1, 2),
                BufferArrayBufferViewSourceTextureService.getDefaultWidth(),
                (
                  LightMaterialTool.disposeLightMaterial,
                  ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureWidth,
                  ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureWidth,
                ),
              )
            );
            test("remove from heights", () =>
              _testRemoveFromTypeArr(
                state,
                (1, 2),
                BufferArrayBufferViewSourceTextureService.getDefaultHeight(),
                (
                  LightMaterialTool.disposeLightMaterial,
                  ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureHeight,
                  ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureHeight,
                ),
              )
            );
          });

          /* describe("remove from glTextureMap", () => {
               let _prepareAndExec = state => {
                 let (
                   state,
                   material1,
                   (diffuseMap, specularMap, source1, source2),
                 ) =
                   LightMaterialTool.createMaterialWithArrayBufferViewMap(
                     state^,
                   );
                 let glTexture = Obj.magic(100);
                 let state =
                   state
                   |> ArrayBufferViewSourceTextureTool.setGlTexture(
                        diffuseMap,
                        glTexture,
                      );
                 let gl = DeviceManagerAPI.unsafeGetGl(state) |> Obj.magic;

                 let state =
                   LightMaterialAPI.batchDisposeLightMaterial(
                     [|material1|],
                     state,
                   );

                 (state, gl, glTexture, diffuseMap);
               };

               test("delete gl texture", () => {
                 let (state, gl, glTexture, _) = _prepareAndExec(state);

                 gl##deleteTexture |> expect |> toCalledWith([|glTexture|]);
               });
               test("remove from glTextureMap", () => {
                 let (state, gl, _, diffuseMap) = _prepareAndExec(state);

                 ArrayBufferViewSourceTextureTool.getTexture(diffuseMap, state)
                 |> expect == None;
               });
             }); */

          describe("test remove worker data", () => {
            test("remove from needAddedSourceArray", () => {
              let state = TestWorkerTool.markUseWorker(state^);
              let (
                state,
                material1,
                (diffuseMap, specularMap, source1, source2),
              ) =
                LightMaterialTool.createMaterialWithArrayBufferViewMap(state);

              let state =
                LightMaterialAPI.batchDisposeLightMaterial(
                  [|material1|],
                  state,
                );

              ArrayBufferViewSourceTextureTool.getNeedAddedSourceArray(state)
              |> Js.Array.length
              |> expect == 0;
            });
            test("remove from needInitedTextureIndexArray", () => {
              let (
                state,
                material1,
                (diffuseMap, specularMap, source1, source2),
              ) =
                LightMaterialTool.createMaterialWithArrayBufferViewMap(
                  state^,
                );
              let needInitedTextureIndexArray =
                ArrayBufferViewSourceTextureTool.getNeedInitedTextureIndexArray(
                  state,
                );
              let needInitedTextureIndexArray =
                needInitedTextureIndexArray
                |> ArrayService.push(diffuseMap)
                |> ArrayService.push(specularMap);

              let state =
                LightMaterialAPI.batchDisposeLightMaterial(
                  [|material1|],
                  state,
                );

              ArrayBufferViewSourceTextureTool.getNeedInitedTextureIndexArray(
                state,
              )
              |> Js.Array.length
              |> expect == 0;
            });
          });
        });
      })
    );
  });