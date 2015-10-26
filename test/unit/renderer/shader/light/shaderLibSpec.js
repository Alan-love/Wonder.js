describe("shaderLibSpec", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("can change glsl source in runtime", function () {
        beforeEach(function () {
        });

        describe("use shadowMap->pcf as example", function () {
            var stage;
            var quadCmd, program, material;
            var shader;

            beforeEach(function () {
                stage = dy.Director.getInstance().stage;

                material = new dy.LightMaterial();

                quadCmd = new dy.QuadCommand();

                program = {
                    initWithShader: sandbox.stub(),
                    sendUniformData: sandbox.stub(),
                    sendAttributeData: sandbox.stub(),
                    sendAttributeDataFromCustomShader: sandbox.stub(),
                    sendUniformDataFromCustomShader: sandbox.stub()
                };




                stage.shadowMap.softType = dy.ShadowMapSoftType.PCF;
                shader = new dy.Shader();
                shader.program = program;
                Lib = dy.TwoDShadowMapShaderLib;
                lib = Lib.create();
                shader.addLib(lib);
                shader.init();
            });

            it("if Stage.shadowMap.softType === PCF, glsl add 'define SHADOWMAP_TYPE_PCF'", function () {
                shader.update(quadCmd, material);

                expect(shader.fsSource).toContain("define SHADOWMAP_TYPE_PCF");
            });
            it("pcf can be opened or closed in runtime", function () {
                shader.update(quadCmd, material);

                stage.shadowMap.softType = dy.ShadowMapSoftType.NONE;

                shader.update(quadCmd, material);

                expect(shader.fsSource).not.toContain("define SHADOWMAP_TYPE_PCF");
            });
            it("optimize:only when definition data change that program will reset shader", function(){
                shader.update(quadCmd, material);

                shader.update(quadCmd, material);

                stage.shadowMap.softType = dy.ShadowMapSoftType.NONE;

                shader.update(quadCmd, material);

                expect(program.initWithShader).toCalledTwice();
            });
        });
    });

    it("materials' shader lib are independent", function(){
        var material1 = dy.CustomMaterial.create();
        var material2 = dy.CustomMaterial.create();

        var shaderDefinitionData = {
            attributes: {
                "a_color": {
                    type: dy.VariableType.FLOAT_3,
                    value: [
                        1, 0, 0, 1,
                        1, 0, 0, 1,
                        0, 1, 0, 1,
                        0, 0, 1, 1
                    ]
                }
            },
            uniforms: {
            }
        };


        var quadCmd = new dy.QuadCommand();
        sandbox.stub(quadCmd.buffers, "hasChild").returns(true);
        //quadCmd.mMatrix = dy.Matrix4.create();
        //quadCmd.vMatrix = dy.Matrix4.create();
        //quadCmd.pMatrix = dy.Matrix4.create();
        sandbox.stub(material1.program, "sendUniformData");
        sandbox.stub(material1.program, "sendAttributeData");

        sandbox.stub(material2.program, "sendUniformData");
        sandbox.stub(material2.program, "sendAttributeData");



        material1.shader.read(shaderDefinitionData);
        material1.init();
        material1.updateShader(quadCmd);

        material2.shader.read(shaderDefinitionData);
        material2.init();
        material2.updateShader(quadCmd);

        expect(material1.program.sendAttributeData.withArgs("a_color")).toCalledOnce();
        expect(material2.program.sendAttributeData.withArgs("a_color")).toCalledOnce();
    });
});

