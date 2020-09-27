open Wonder_jest;

open PBRMaterialRunAPI;

let _ =
  describe("PBRMaterial", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("create", () => {
      test("create a new material", () => {
        let material = create()->ResultTool.getExnSuccessValue;

        expect(material) == 0->PBRMaterialEntity.create;
      });

      describe("change po", () =>
        test("po->index + 1", () => {
          let _ = create()->ResultTool.getExnSuccessValue;

          PBRMaterialTool.getMaxIndex()->expect == 1;
        })
      );
    });

    describe("getGameObjects", () =>
      test("get material's gameObjects", () => {
        let material = create()->ResultTool.getExnSuccessValue;
        let gameObject1 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;
        let gameObject2 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

        GameObjectRunAPI.addPBRMaterial(gameObject1, material)
        ->ResultTool.getExnSuccessValueIgnore;
        GameObjectRunAPI.addPBRMaterial(gameObject2, material)
        ->ResultTool.getExnSuccessValueIgnore;

        getGameObjects(material)->OptionSt.getExn->expect
        == [gameObject2, gameObject1];
      })
    );

    describe("operate data", () => {
      test(
        "get the data from array buffer may not equal to the value which is setted",
        () => {
        let material = create()->ResultTool.getExnSuccessValue;
        let color = (0.2, 0.3, 0.5)->PBRMaterialTool.createDiffuseColor;

        setDiffuseColor(material, color)->ResultTool.getExnSuccessValueIgnore;

        getDiffuseColor(material)->expect
        == (0.20000000298023224, 0.30000001192092896, 0.5)
           ->PBRMaterialTool.createDiffuseColor;
      });

      describe("getDiffuseColor", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getDiffuseColor(material)->expect
          == (1., 1., 1.)->PBRMaterialTool.createDiffuseColor;
        })
      );

      describe("setDiffuseColor", () =>
        test("set color", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let color = (0.2, 0.3, 0.5)->PBRMaterialTool.createDiffuseColor;

          setDiffuseColor(material, color)
          ->ResultTool.getExnSuccessValueIgnore;

          getDiffuseColor(material)->PBRMaterialTool.truncateColor->expect
          == color;
        })
      );

      describe("getSpecular", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getSpecular(material)->expect == 0.0->SpecularVO.create;
        })
      );

      describe("setSpecular", () =>
        test("set specular", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let specular = 0.5->SpecularVO.create;

          setSpecular(material, specular)
          ->ResultTool.getExnSuccessValueIgnore;

          getSpecular(material)->expect == specular;
        })
      );

      describe("getRoughness", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getRoughness(material)->expect == 0.0->RoughnessVO.create;
        })
      );

      describe("setRoughness", () =>
        test("set roughness", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let roughness = 0.5->RoughnessVO.create;

          setRoughness(material, roughness)
          ->ResultTool.getExnSuccessValueIgnore;

          getRoughness(material)->expect == roughness;
        })
      );

      describe("getMetalness", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getMetalness(material)->expect == 0.0->MetalnessVO.create;
        })
      );

      describe("setMetalness", () =>
        test("set metalness", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let metalness = 0.5->MetalnessVO.create;

          setMetalness(material, metalness)
          ->ResultTool.getExnSuccessValueIgnore;

          getMetalness(material)->expect == metalness;
        })
      );

      describe("set map's source id", () => {
        let _buildImageId = () => "image1"->ImageIdVO.create;

        describe("setDiffuseMapSourceId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setDiffuseMapSourceId(material, id);

            PBRMaterialTool.getDiffuseMapSourceId(material)
            ->OptionSt.getExn
            ->expect
            == id;
          })
        });

        describe("setMetalRoughnessMapSourceId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setMetalRoughnessMapSourceId(material, id);

            PBRMaterialTool.getMetalRoughnessMapSourceId(material)
            ->OptionSt.getExn
            ->expect
            == id;
          })
        });

        describe("setEmissionMapSourceId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setEmissionMapSourceId(material, id);

            PBRMaterialTool.getEmissionMapSourceId(material)
            ->OptionSt.getExn
            ->expect
            == id;
          })
        });

        describe("setNormalMapSourceId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setNormalMapSourceId(material, id);

            PBRMaterialTool.getNormalMapSourceId(material)
            ->OptionSt.getExn
            ->expect
            == id;
          })
        });
      });
    });
  });
