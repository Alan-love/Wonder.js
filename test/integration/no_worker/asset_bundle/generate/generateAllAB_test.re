open Wonder_jest;

open Js.Promise;

open WonderBsMost;

open Js.Typed_array;

let _ =
  describe("generate new abs from rabs and sabs", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithoutBuildFakeDom(~sandbox, ());

      PrepareABTool.prepare(sandbox^);
      GenerateAllABTool.Manifest.prepareDigest(sandbox^);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("check dependency relation", () => {
      describe("if has circle dependency, fatal", () => {
        testPromise("test1", () =>
          expect(() =>
            GenerateAllABSystem.generate(
              GenerateAllABTool.buildDependencyRelation([|
                [|"s1.sab", "r1.rab"|],
                [|"r1.rab", "s1.sab"|],
              |]),
              ([||], [||]),
              state^,
            )
          )
          |> toThrowMessage("dependencyRelation shouldn't be circle")
          |> resolve
        );
        testPromise("test2", () =>
          expect(() =>
            GenerateAllABSystem.generate(
              GenerateAllABTool.buildDependencyRelation([|
                [|"r1.rab", "r2.rab", "r1.rab"|],
                [|"s1.sab", "r1.rab"|],
              |]),
              ([||], [||]),
              state^,
            )
          )
          |> toThrowMessage("dependencyRelation shouldn't be circle")
          |> resolve
        );
        testPromise("test3", () =>
          expect(() =>
            GenerateAllABSystem.generate(
              GenerateAllABTool.buildDependencyRelation([|
                [|"r1.rab", "r2.rab"|],
                [|"r2.rab", "r1.rab"|],
                [|"s1.sab", "r1.rab"|],
              |]),
              ([||], [||]),
              state^,
            )
          )
          |> toThrowMessage("dependencyRelation shouldn't be circle")
          |> resolve
        );
      });

      describe("else, not fatal", () =>
        testPromise("test1", () =>
          expect(() =>
            GenerateAllABSystem.generate(
              GenerateAllABTool.buildDependencyRelation([|
                [|"s1.sab", "r1.rab"|],
                [|"r1.rab", "r2.rab"|],
              |]),
              ([||], [||]),
              state^,
            )
          )
          |> not_
          |> toThrow
          |> resolve
        )
      );
    });

    describe("remove duplicate buffer data", () => {
      describe("remove duplicate buffer data from rab", () => {
        describe("remove duplicate image buffer data", () =>
          describe("judge duplicate by image name", () => {
            testPromise("test with textures", () => {
              let imageName = "image1";

              let image1 =
                GenerateSingleRABTool.ResourceData.buildImageData(
                  ~name=imageName,
                  (),
                );

              let imageDataMap =
                WonderCommonlib.ImmutableSparseMapService.createEmpty()
                |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

              let (state, textureResourceData1) =
                GenerateSingleRABTool.ResourceData.createTextureResourceData(
                  ~state=state^,
                  /* ~name="texture1", */
                  ~imageDataIndex=0,
                  (),
                );

              let resourceData1 =
                GenerateSingleRABTool.ResourceData.buildResourceData(
                  ~textures=[|textureResourceData1|],
                  ~imageDataMap,
                  (),
                );

              let (state, rab1) =
                GenerateRABSystem.generateSingleRAB(resourceData1, state);

              let image2 =
                GenerateSingleRABTool.ResourceData.buildImageData(
                  ~name=imageName,
                  (),
                );

              let imageDataMap =
                WonderCommonlib.ImmutableSparseMapService.createEmpty()
                |> WonderCommonlib.ImmutableSparseMapService.set(0, image2);

              let (state, textureResourceData2) =
                GenerateSingleRABTool.ResourceData.createTextureResourceData(
                  ~state,
                  /* ~name="texture2", */
                  ~imageDataIndex=0,
                  (),
                );

              let resourceData2 =
                GenerateSingleRABTool.ResourceData.buildResourceData(
                  ~textures=[|textureResourceData2|],
                  ~imageDataMap,
                  (),
                );

              let (state, rab2) =
                GenerateRABSystem.generateSingleRAB(resourceData2, state);

              GenerateAllABTool.TestWithTwoRAB.generateAllAB(
                (rab1, rab2),
                state,
              )
              |> MostTool.testStream(data => {
                   let (newRab1Content, newRab2Content) =
                     GenerateAllABTool.TestWithTwoRAB.getNewRabContents(data);

                   (newRab1Content.images, newRab2Content.images)
                   |> expect
                   == (
                        [|
                          GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
                            ~name=image1.name,
                            ~mimeType=image1.mimeType,
                            ~bufferView=0,
                            (),
                          ),
                        |],
                        [|
                          GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
                            ~name=image2.name,
                            ~mimeType=image2.mimeType,
                            ~bufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            (),
                          ),
                        |],
                      )
                   |> resolve;
                 });
            });
            testPromise("test with lightMaterials", () => {
              let imageName = "image1";

              let image1 =
                GenerateSingleRABTool.ResourceData.buildImageData(
                  ~name=imageName,
                  (),
                );

              let imageDataMap =
                WonderCommonlib.ImmutableSparseMapService.createEmpty()
                |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

              let (state, textureResourceData1) =
                GenerateSingleRABTool.ResourceData.createTextureResourceData(
                  ~state=state^,
                  /* ~name="texture1", */
                  ~imageDataIndex=0,
                  (),
                );

              let lightMaterial1Name = "lightMaterial1";
              let (state, lightMaterial1) =
                GenerateSingleRABTool.ResourceData.createLightMaterialResourceData(
                  ~state,
                  ~diffuseMap=Some(textureResourceData1.textureComponent),
                  ~name=lightMaterial1Name,
                  (),
                );

              let resourceData1 =
                GenerateSingleRABTool.ResourceData.buildResourceData(
                  ~textures=[|textureResourceData1|],
                  ~lightMaterials=[|lightMaterial1|],
                  ~imageDataMap,
                  (),
                );

              let (state, rab1) =
                GenerateRABSystem.generateSingleRAB(resourceData1, state);

              let image2 =
                GenerateSingleRABTool.ResourceData.buildImageData(
                  ~name=imageName,
                  (),
                );

              let imageDataMap =
                WonderCommonlib.ImmutableSparseMapService.createEmpty()
                |> WonderCommonlib.ImmutableSparseMapService.set(0, image2);

              let (state, textureResourceData2) =
                GenerateSingleRABTool.ResourceData.createTextureResourceData(
                  ~state,
                  /* ~name="texture2", */
                  ~imageDataIndex=0,
                  (),
                );

              let resourceData2 =
                GenerateSingleRABTool.ResourceData.buildResourceData(
                  ~textures=[|textureResourceData2|],
                  ~imageDataMap,
                  (),
                );

              let (state, rab2) =
                GenerateRABSystem.generateSingleRAB(resourceData2, state);

              GenerateAllABTool.TestWithTwoRAB.generateAllAB(
                (rab1, rab2),
                state,
              )
              |> MostTool.testStream(data => {
                   let (newRab1Content, newRab2Content) =
                     GenerateAllABTool.TestWithTwoRAB.getNewRabContents(data);

                   (newRab1Content.images, newRab2Content.images)
                   |> expect
                   == (
                        [|
                          GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
                            ~name=image1.name,
                            ~mimeType=image1.mimeType,
                            ~bufferView=0,
                            (),
                          ),
                        |],
                        [|
                          GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
                            ~name=image2.name,
                            ~mimeType=image2.mimeType,
                            ~bufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            (),
                          ),
                        |],
                      )
                   |> resolve;
                 });
            });
          })
        );

        describe("remove duplicate geometry buffer data", () =>
          describe("judge duplicate by geometry name", () =>
            testPromise("test", () => {
              let (
                state,
                gameObject1,
                geometry1,
                name1,
                (vertices1, texCoords1, normals1, indices16_1, indices32_1),
              ) =
                GenerateSingleRABTool.ResourceData.createGeometryResourceData(
                  ~state=state^,
                  ~name="geometry1",
                  ~indices16=None,
                  ~indices32=Some(Uint32Array.make([|2|])),
                  (),
                );

              let resourceData1 =
                GenerateSingleRABTool.ResourceData.buildResourceData(
                  ~geometrys=[|geometry1|],
                  (),
                );

              let (
                state,
                gameObject2,
                geometry2,
                name2,
                (vertices2, texCoords2, normals2, indices16_2, indices32_2),
              ) =
                GenerateSingleRABTool.ResourceData.createGeometryResourceData(
                  ~state,
                  ~name="geometry1",
                  ~indices16=None,
                  ~indices32=Some(Uint32Array.make([|2|])),
                  (),
                );

              let (
                state,
                gameObject3,
                geometry3,
                name3,
                (vertices3, texCoords3, normals3, indices16_3, indices32_3),
              ) =
                GenerateSingleRABTool.ResourceData.createGeometryResourceData(
                  ~state,
                  ~name="geometry3",
                  ~indices16=None,
                  ~indices32=Some(Uint32Array.make([|3|])),
                  (),
                );

              let resourceData2 =
                GenerateSingleRABTool.ResourceData.buildResourceData(
                  ~geometrys=[|geometry2, geometry3|],
                  (),
                );

              let (state, rab1) =
                GenerateRABSystem.generateSingleRAB(resourceData1, state);

              let (state, rab2) =
                GenerateRABSystem.generateSingleRAB(resourceData2, state);

              GenerateAllABTool.TestWithTwoRAB.generateAllAB(
                (rab1, rab2),
                state,
              )
              |> MostTool.testStream(data => {
                   let (newRab1Content, newRab2Content) =
                     GenerateAllABTool.TestWithTwoRAB.getNewRabContents(data);

                   (newRab1Content.geometrys, newRab2Content.geometrys)
                   |> expect
                   == (
                        [|
                          GenerateSingleRABTool.ResourceAssetBundleContent.buildGeometryData(
                            ~name="geometry1",
                            ~indexDataType=RABType.Index32,
                            ~vertexBufferView=0,
                            ~normalBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            ~texCoordBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            ~indexBufferView=1,
                            (),
                          ),
                        |],
                        [|
                          GenerateSingleRABTool.ResourceAssetBundleContent.buildGeometryData(
                            ~name="geometry1",
                            ~indexDataType=RABType.Index32,
                            ~vertexBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            ~normalBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            ~texCoordBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            ~indexBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            (),
                          ),
                          GenerateSingleRABTool.ResourceAssetBundleContent.buildGeometryData(
                            ~name="geometry3",
                            ~indexDataType=RABType.Index32,
                            ~vertexBufferView=0,
                            ~normalBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            ~texCoordBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            ~indexBufferView=1,
                            (),
                          ),
                        |],
                      )
                   |> resolve;
                 });
            })
          )
        );
      });

      describe("remove duplicate buffer data from sab", () => {
        describe("remove duplicate image buffer data", () =>
          describe("judge duplicate by image name", () => {
            let _createTexture1 = state => {
              let (state, texture) =
                BasicSourceTextureAPI.createBasicSourceTexture(state);

              let name = "texture_1";

              let state =
                BasicSourceTextureAPI.setBasicSourceTextureName(
                  texture,
                  name,
                  state,
                );

              let state =
                BasicSourceTextureAPI.setBasicSourceTextureWrapS(
                  texture,
                  SourceTextureType.Repeat,
                  state,
                )
                |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
                     texture,
                     SourceTextureType.Linear,
                   );

              let width = 30;
              let height = 50;

              let source = BasicSourceTextureTool.buildSource(width, height);

              let state =
                BasicSourceTextureAPI.setBasicSourceTextureSource(
                  texture,
                  source,
                  state,
                );

              (state, (texture, name), (source, width, height));
            };

            let _createGameObject1 = (imageName, state) => {
              open GameObjectAPI;
              open LightMaterialAPI;
              open MeshRendererAPI;

              let (state, material) = createLightMaterial(state);

              let (state, (texture, _), (source, width, height)) =
                _createTexture1(state);

              ImageUtils.setImageName(source, imageName);

              let state =
                LightMaterialAPI.setLightMaterialDiffuseMap(
                  material,
                  texture,
                  state,
                );

              let (state, geometry) =
                BoxGeometryTool.createBoxGeometry(state);
              let (state, meshRenderer) = createMeshRenderer(state);
              let (state, gameObject) = state |> createGameObject;
              let state =
                state
                |> addGameObjectLightMaterialComponent(gameObject, material)
                |> addGameObjectGeometryComponent(gameObject, geometry)
                |> addGameObjectMeshRendererComponent(
                     gameObject,
                     meshRenderer,
                   );

              let transform =
                GameObjectAPI.unsafeGetGameObjectTransformComponent(
                  gameObject,
                  state,
                );

              (state, gameObject, transform, (material, texture));
            };

            testPromise("test", () => {
              let imageName = "image1";

              let image1 =
                GenerateSingleRABTool.ResourceData.buildImageData(
                  ~name=imageName,
                  (),
                );

              let imageDataMap =
                WonderCommonlib.ImmutableSparseMapService.createEmpty()
                |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

              let (state, textureResourceData1) =
                GenerateSingleRABTool.ResourceData.createTextureResourceData(
                  ~state=state^,
                  ~imageDataIndex=0,
                  (),
                );

              let resourceData1 =
                GenerateSingleRABTool.ResourceData.buildResourceData(
                  ~textures=[|textureResourceData1|],
                  ~imageDataMap,
                  (),
                );

              let (state, rab1) =
                GenerateRABSystem.generateSingleRAB(resourceData1, state);

              let (state, gameObject2, transform2, (material2, texture2)) =
                _createGameObject1(imageName, state);

              let state = state |> SceneAPI.addSceneChild(transform2);

              let (canvas, context, (base64Str1, base64Str2)) =
                GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

              let (state, sab1) =
                GenerateSABSystem.generateSingleSAB(
                  SceneAPI.getSceneGameObject(state),
                  WonderCommonlib.MutableSparseMapService.createEmpty(),
                  state,
                );

              GenerateAllABTool.TestWithOneSABAndOneRAB.generateAllAB(
                (rab1, sab1),
                state,
              )
              |> MostTool.testStream(data => {
                   let (newRab1Content, newSab1Content) =
                     GenerateAllABTool.TestWithOneSABAndOneRAB.getNewABContents(
                       data,
                     );

                   (newRab1Content.images, newSab1Content.images)
                   |> expect
                   == (
                        [|
                          GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
                            ~name=image1.name,
                            ~mimeType=image1.mimeType,
                            ~bufferView=0,
                            (),
                          ),
                        |],
                        Some([|
                          GenerateSingleSABTool.SceneAssetBundleContent.buildImageData(
                            ~name=image1.name,
                            ~mimeType=image1.mimeType,
                            ~bufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            (),
                          ),
                        |]),
                      )
                   |> resolve;
                 });
            });
          })
        );

        describe("remove duplicate geometry buffer data", () =>
          describe("judge duplicate by geometry name", () => {
            let _createGameObject1 = (geometryName, state) => {
              open GameObjectAPI;
              open LightMaterialAPI;
              open GeometryAPI;
              open MeshRendererAPI;
              open Js.Typed_array;

              let (state, geometry) = createGeometry(state);
              let (state, gameObject) =
                GameObjectAPI.createGameObject(state);
              let state =
                state
                |> GameObjectAPI.addGameObjectGeometryComponent(
                     gameObject,
                     geometry,
                   );
              let vertices1 =
                Float32Array.make([|
                  (-0.04454309865832329),
                  (-0.1662379950284958),
                  1.0180000066757202,
                  2.602089970253733e-18,
                  (-6.938890181594472e-18),
                  1.0180000066757202,
                  (-0.08605089783668518),
                  (-0.14904500544071198),
                  1.0180000066757202,
                |]);
              let texCoords1 =
                Float32Array.make([|
                  0.7119140028953552,
                  0.12024599313735962,
                  0.7552189826965332,
                  0.15945100784301758,
                  0.7032840251922607,
                  0.13282698392868042,
                |]);
              let normals1 =
                Float32Array.make([|
                  (-0.7455800175666809),
                  0.47522100806236267,
                  (-0.4671989977359772),
                  (-0.7843430042266846),
                  0.4080820083618164,
                  (-0.4671989977359772),
                  0.7455800175666809,
                  (-0.47522100806236267),
                  (-0.46720001101493835),
                |]);
              let indices1 = Uint16Array.make([|0, 2, 1|]);

              let state = state |> setGeometryName(geometry, geometryName);

              let state =
                state
                |> setGeometryVertices(geometry, vertices1)
                |> setGeometryTexCoords(geometry, texCoords1)
                |> setGeometryNormals(geometry, normals1)
                |> setGeometryIndices16(geometry, indices1);

              let (state, material) = createLightMaterial(state);

              let (state, meshRenderer) = createMeshRenderer(state);

              let state =
                state
                |> addGameObjectLightMaterialComponent(gameObject, material)
                |> addGameObjectMeshRendererComponent(
                     gameObject,
                     meshRenderer,
                   );

              let transform =
                GameObjectAPI.unsafeGetGameObjectTransformComponent(
                  gameObject,
                  state,
                );

              (
                state,
                gameObject,
                transform,
                (geometry, (vertices1, texCoords1, normals1, indices1)),
                material,
                meshRenderer,
              );
            };

            testPromise("test", () => {
              let geometryName = "geometry1";
              let (
                state,
                gameObject1,
                geometry1,
                name1,
                (vertices1, texCoords1, normals1, indices16_1, indices32_1),
              ) =
                GenerateSingleRABTool.ResourceData.createGeometryResourceData(
                  ~state=state^,
                  ~name=geometryName,
                  ~indices16=None,
                  ~indices32=Some(Uint32Array.make([|2|])),
                  (),
                );

              let resourceData1 =
                GenerateSingleRABTool.ResourceData.buildResourceData(
                  ~geometrys=[|geometry1|],
                  (),
                );

              let (state, rab1) =
                GenerateRABSystem.generateSingleRAB(resourceData1, state);

              let (
                state,
                gameObject2,
                transform2,
                (geometry2, (vertices2, texCoords2, normals2, indices2)),
                meshRenderer2,
                material2,
              ) =
                _createGameObject1(geometryName, state);

              let state = state |> SceneAPI.addSceneChild(transform2);

              let (state, sab1) =
                GenerateSABSystem.generateSingleSAB(
                  SceneAPI.getSceneGameObject(state),
                  WonderCommonlib.MutableSparseMapService.createEmpty(),
                  state,
                );

              GenerateAllABTool.TestWithOneSABAndOneRAB.generateAllAB(
                (rab1, sab1),
                state,
              )
              |> MostTool.testStream(data => {
                   let (newRab1Content, newSab1Content) =
                     GenerateAllABTool.TestWithOneSABAndOneRAB.getNewABContents(
                       data,
                     );

                   (newRab1Content.geometrys, newSab1Content.geometrys)
                   |> expect
                   == (
                        [|
                          GenerateSingleRABTool.ResourceAssetBundleContent.buildGeometryData(
                            ~name="geometry1",
                            ~indexDataType=RABType.Index32,
                            ~vertexBufferView=0,
                            ~normalBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            ~texCoordBufferView=
                              ABBufferViewUtils.buildNoneBufferViewIndex(),
                            ~indexBufferView=1,
                            (),
                          ),
                        |],
                        [|
                          GenerateSingleSABTool.SceneAssetBundleContent.buildGeometryData(
                            ~name=geometryName,
                            ~position=
                              ABBufferViewUtils.buildNoneAccessorIndex(),
                            ~index=ABBufferViewUtils.buildNoneAccessorIndex(),
                            (),
                          ),
                        |],
                      )
                   |> resolve;
                 });
            });
          })
        );
      });
    });

    describe("add manifest data", () => {
      describe("rab add manifest data", () => {
        describe("add hashId", () =>
          testPromise("test", () => {
            let hashIdData = GenerateAllABTool.Manifest.buildHashIdData();
            GenerateAllABTool.Manifest.stubDigestForGenerateHashId(
              sandbox^,
              hashIdData,
            );
            let (state, rab1) = GenerateSingleRABTool.generateOneRAB(state^);

            GenerateAllABTool.TestWithOneRAB.generateAllAB(rab1, state)
            |> MostTool.testStream(data => {
                 let manifest =
                   GenerateAllABTool.TestWithOneRAB.getNewRabManifest(data);

                 manifest.hashId
                 |> expect
                 == (hashIdData |> GenerateAllABTool.Manifest.getFirstHashId)
                 |> resolve;
               });
          })
        );

        describe("add dependencyRelation", () =>
          testPromise("test", () => {
            let hashIdData = GenerateAllABTool.Manifest.buildHashIdData();
            GenerateAllABTool.Manifest.stubDigestForGenerateHashId(
              sandbox^,
              hashIdData,
            );
            let (state, rab1) = GenerateSingleRABTool.generateOneRAB(state^);
            let (state, rab2) = GenerateSingleRABTool.generateOneRAB(state);

            GenerateAllABTool.TestWithTwoRAB.generateAllAB(
              (rab1, rab2),
              state,
            )
            |> MostTool.testStream(data => {
                 let (newRab1Manifest, newRab2Manifest) =
                   GenerateAllABTool.TestWithTwoRAB.getNewRabManifests(data);

                 let (rab1RelativePath, rab2RelativePath) =
                   GenerateAllABTool.TestWithTwoRAB.getRabRelativePaths();

                 (
                   newRab1Manifest.dependencyRelation,
                   newRab2Manifest.dependencyRelation,
                 )
                 |> expect == ([||], [|rab1RelativePath|])
                 |> resolve;
               });
          })
        );
      });

      describe("sab add manifest data", () => {
        describe("add hashId", () =>
          testPromise("test", () => {
            let hashIdData = GenerateAllABTool.Manifest.buildHashIdData();
            GenerateAllABTool.Manifest.stubDigestForGenerateHashId(
              sandbox^,
              hashIdData,
            );
            let (state, rab1) = GenerateSingleRABTool.generateOneRAB(state^);
            let (state, sab1) = GenerateSingleSABTool.generateOneSAB(state);

            GenerateAllABTool.TestWithOneSABAndOneRAB.generateAllAB(
              (rab1, sab1),
              state,
            )
            |> MostTool.testStream(data => {
                 let (newRab1Manifest, newSab1Manifest) =
                   GenerateAllABTool.TestWithOneSABAndOneRAB.getNewRabManifests(
                     data,
                   );

                 newSab1Manifest.hashId
                 |> expect
                 == (hashIdData |> GenerateAllABTool.Manifest.getSecondHashId)
                 |> resolve;
               });
          })
        );

        describe("add dependencyRelation", () =>
          testPromise("test", () => {
            let hashIdData = GenerateAllABTool.Manifest.buildHashIdData();
            GenerateAllABTool.Manifest.stubDigestForGenerateHashId(
              sandbox^,
              hashIdData,
            );
            let (state, rab1) = GenerateSingleRABTool.generateOneRAB(state^);
            let (state, sab1) = GenerateSingleSABTool.generateOneSAB(state);

            GenerateAllABTool.TestWithOneSABAndOneRAB.generateAllAB(
              (rab1, sab1),
              state,
            )
            |> MostTool.testStream(data => {
                 let (newRab1Manifest, newSab1Manifest) =
                   GenerateAllABTool.TestWithOneSABAndOneRAB.getNewRabManifests(
                     data,
                   );

                 let (rab1RelativePath, sab1RelativePath) =
                   GenerateAllABTool.TestWithOneSABAndOneRAB.getABRelativePaths();

                 newSab1Manifest.dependencyRelation
                 |> expect == [|rab1RelativePath|]
                 |> resolve;
               });
          })
        );
      });
    });

    describe("generate one wab", () =>
      describe("test manifest", () => {
        describe("test wholeHashIdMap", () =>
          testPromise("test", () => {
            let hashIdData = GenerateAllABTool.Manifest.buildHashIdData();
            GenerateAllABTool.Manifest.stubDigestForGenerateHashId(
              sandbox^,
              hashIdData,
            );
            let (state, rab1) = GenerateSingleRABTool.generateOneRAB(state^);
            let (state, sab1) = GenerateSingleSABTool.generateOneSAB(state);

            GenerateAllABTool.TestWABWithOneSABAndOneRAB.generateAllAB(
              (rab1, sab1),
              state,
            )
            |> MostTool.testStream(data => {
                 let newWabManifest =
                   GenerateAllABTool.TestWABWithOneSABAndOneRAB.getNewWabManifest(
                     data,
                   );

                 let (rab1RelativePath, sab1RelativePath) =
                   GenerateAllABTool.TestWithOneSABAndOneRAB.getABRelativePaths();

                 newWabManifest.wholeHashIdMap
                 |> expect
                 == (
                      WonderCommonlib.ImmutableHashMapService.createEmpty()
                      |> WonderCommonlib.ImmutableHashMapService.set(
                           rab1RelativePath,
                           GenerateAllABTool.Manifest.getFirstHashId(
                             hashIdData,
                           ),
                         )
                      |> WonderCommonlib.ImmutableHashMapService.set(
                           sab1RelativePath,
                           GenerateAllABTool.Manifest.getSecondHashId(
                             hashIdData,
                           ),
                         )
                    )
                 |> resolve;
               });
          })
        );

        describe("test wholeDependencyRelationMap", () =>
          testPromise("test", () => {
            let hashIdData = GenerateAllABTool.Manifest.buildHashIdData();
            GenerateAllABTool.Manifest.stubDigestForGenerateHashId(
              sandbox^,
              hashIdData,
            );
            let (state, rab1) = GenerateSingleRABTool.generateOneRAB(state^);
            let (state, sab1) = GenerateSingleSABTool.generateOneSAB(state);

            GenerateAllABTool.TestWABWithOneSABAndOneRAB.generateAllAB(
              (rab1, sab1),
              state,
            )
            |> MostTool.testStream(data => {
                 let newWabManifest =
                   GenerateAllABTool.TestWABWithOneSABAndOneRAB.getNewWabManifest(
                     data,
                   );

                 let (rab1RelativePath, sab1RelativePath) =
                   GenerateAllABTool.TestWithOneSABAndOneRAB.getABRelativePaths();

                 newWabManifest.wholeDependencyRelationMap
                 |> expect
                 == (
                      WonderCommonlib.ImmutableHashMapService.createEmpty()
                      |> WonderCommonlib.ImmutableHashMapService.set(
                           sab1RelativePath,
                           [|rab1RelativePath|],
                         )
                    )
                 |> resolve;
               });
          })
        );
      })
    );
  });