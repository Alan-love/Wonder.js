describe("custom shader", function () {
    var sandbox = null;
    var material = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        sandbox.stub(wd.GPUDetector.getInstance(), "precision", wd.EGPUPrecision.HIGHP);

        testTool.closeContractCheck(sandbox);
        testTool.initForTest(sandbox);


        gl = wd.DeviceManager.getInstance().gl;

        material = wd.ShaderMaterial.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("integration test", function() {
        describe("set custom shader", function () {
            var shader, shaderDefinitionData,program;
            var map;
            var vsSource,fsSource;
            var colors;

            beforeEach(function () {
                shader = material.shader;
                sandbox.stub(wd.ArrayBuffer, "create", function(arr, num, type){
                    return testTool.getValues(arr);
                });

                colors = [
                    1, 0, 0,
                    1, 0, 0,
                    0, 1, 0,
                    0, 0, 1
                ];

                shaderDefinitionData = {
                    attributes: {
                        "a_position":{
                            "type":"FLOAT_3",
                            "value": "POSITION"
                        },
                        "a_texCoord":{
                            "type":"FLOAT_2",
                            "value": "TEXCOORD"
                        },
                        "a_color": {
                            type: "FLOAT_3",
                            value: colors
                        }
                    },
                    uniforms: {
                        "u_mvpMatrix": {
                            "type": "FLOAT_MAT4",
                            "value": "MODEL_VIEW_PROJECTION"
                        },
                        "u_test1": {
                            type: "FLOAT_1",
                            value: 1.1
                        },
                        "u_test2": {
                            type: "FLOAT_1",
                            value: 2.0
                        },
                        "u_test3": {
                            type: "STRUCTURE",
                            value: {
                                "a": {
                                    type:"NUMBER_1",
                                    value: 10
                                },
                                "b": {
                                    type:"FLOAT_1",
                                    value: 3.3
                                }
                            }
                        },
                        "u_sampler2D": {
                            "type": "SAMPLER_2D",
                            "textureId": "texture"
                        }
                    },
                    vsSourceId: "vsSourceId",
                    fsSourceId: "fsSourceId"
                };

                sandbox.stub(wd.LoaderManager.getInstance(), "get");

                vsSource = [
                    "attribute vec3 a_position;",
                    "attribute vec2 a_texCoord;",
                    "varying vec3 v_color;",
                    "varying vec2 v_texCoord;",
                    "uniform mat4 u_mvpMatrix;",

                    "void main(void){",
                    "v_color = a_color;",
                    "v_texCoord = a_texCoord;",
                    "float a = u_test1;",
                    "gl_Position = u_mvpMatrix * vec4(a_position, 1.0);",
                    "}"
                ].join("\n");

                wd.LoaderManager.getInstance().get.withArgs("vsSourceId").returns(vsSource);

                fsSource = [
                    "uniform sampler2D u_sampler2D;",
                    "varying vec3 v_color;",
                    "varying vec2 v_texCoord;",

                    "uniform float u_test2;",
                    "struct Test3{float b;};",
                    "Test3 u_test3;",

                    "void main(void){",
                    "float a = u_test2;",
                    "float b = u_test3.b;",
                    "gl_FragColor = vec4(v_color, 1.0) * texture2D(u_sampler2D, v_texCoord);",
                    "}"
                ].join("\n");

                wd.LoaderManager.getInstance().get.withArgs("fsSourceId").returns(fsSource);

                map = wd.ImageTexture.create({});

                wd.LoaderManager.getInstance().get.withArgs("texture").returns(map);



                wd.LoaderManager.getInstance().get.withArgs("definitionDataId").returns(shaderDefinitionData);
            });

            describe("init shader", function () {
            });

            describe("update shader", function () {
                var cmd;
                var vertices,texCoords;

                beforeEach(function () {
                    sandbox.spy(material.mapManager, "sendData");

                    cmd = rendererTool.createSingleDrawCommand(sandbox);


                    vertices = [1,2,3];
                    texCoords = [0.1,0.2];

                    cmd.buffers.getChild.withArgs(wd.EBufferDataType.VERTICE).returns(vertices);
                    cmd.buffers.getChild.withArgs(wd.EBufferDataType.TEXCOORD).returns(texCoords);


                    material.read("definitionDataId");

                    rendererTool.triggerMaterialAddShaderLib(material);

                    program = shaderTool.getAndSpyProgram(sandbox, material);
                });

                it("build definition data", function () {
                    material.updateShader(cmd);


                    var attributes = shaderDefinitionData.attributes;
                    var uniforms = shaderDefinitionData.uniforms;

                    expect(shader.attributes.getChildren()).toEqual(
                        {
                            a_color: {
                                type: attributes.a_color.type,
                                value:attributes.a_color.value
                            },
                            a_position: {
                                type: attributes.a_position.type,
                                value: attributes.a_position.value,
                            },
                            a_texCoord: {
                                type: attributes.a_texCoord.type,
                                value: attributes.a_texCoord.value
                            }
                        }
                    );
                    expect(shader.uniforms.getChildren()).toEqual(
                        {
                            u_mvpMatrix: {type: uniforms.u_mvpMatrix.type, value: uniforms.u_mvpMatrix.value},
                            u_test1: {type: uniforms.u_test1.type, value: uniforms.u_test1.value},
                            u_test2: {type: uniforms.u_test2.type, value: uniforms.u_test2.value},
                            u_test3: {type: uniforms.u_test3.type, value: uniforms.u_test3.value},

                            u_sampler2D: {type: uniforms.u_sampler2D.type, textureId: uniforms.u_sampler2D.textureId}
                        }
                    );

                    expect(shader.vsSource).toEqual(vsSource);
                    expect(shader.fsSource).toEqual(fsSource);
                });
                it("if definition data change, program will reset shader", function () {
                    material.updateShader(cmd);

                    expect(gl.attachShader).toCalledTwice();
                });

                describe("use program", function () {
                    var oldProgram;

                    beforeEach(function(){
                        oldProgram = program;

                        shader.libDirty = false;
                    });

                    it("if definitionDataDirty, use the new program added to ProgramTable", function () {
                        shader.vsSource = "aaaaa";

                        var newProgram = shadowTool.getNewProgramWhichIsAddedToProgramTable(sandbox);



                        material.updateShader(cmd);


                        expect(newProgram !== oldProgram).toBeTruthy();

                        expect(oldProgram.use).not.toCalled();


                        expect(newProgram.use).toCalledOnce();
                        expect(newProgram.use).toCalledAfter(gl.attachShader);
                    });
                    it("else, use old program", function () {
                        material.updateShader(cmd);

                        expect(oldProgram.use).toCalledOnce();
                        expect(oldProgram.use).toCalledAfter(gl.attachShader);
                    });
                });


                it("send attribute data", function () {
                    material.updateShader(cmd);

                    expect(program.sendAttributeBuffer.withArgs("a_position")).toCalledOnce();
                    expect(program.sendAttributeBuffer.withArgs("a_texCoord")).toCalledOnce();
                    expect(program.sendAttributeBuffer.withArgs("a_color")).toCalledOnce();
                });
                it("send uniforms data", function () {
                    material.updateShader(cmd);

                    expect(program.sendUniformData).toCalledAfter(program.use);

                    expect(program.sendUniformData).toCalledWith("u_mvpMatrix", wd.EVariableType.FLOAT_MAT4, cmd.mMatrix.applyMatrix(cmd.vMatrix, true).applyMatrix(cmd.pMatrix, false));


                    expect(program.sendUniformData).toCalledWith("u_test1", wd.EVariableType.FLOAT_1, 1.1);
                    expect(program.sendUniformData).toCalledWith("u_test2", wd.EVariableType.FLOAT_1, 2.0);

                    expect(program.sendUniformData).toCalledWith("u_test3.a", wd.EVariableType.NUMBER_1, 10);
                    expect(program.sendUniformData).toCalledWith("u_test3.b", wd.EVariableType.FLOAT_1, 3.3);
                });
                it("ShaderMaterial should add the correspond twoD maps of uniformData->sampler2D ", function () {
                    material.updateShader(cmd);

                    expect(material.mapManager.hasMap(map)).toBeTruthy();
                });
                it("send map data", function () {
                    material.updateShader(cmd);

                    expect(material.mapManager.sendData).toCalledOnce();
                });
            });
        });
    });
});

