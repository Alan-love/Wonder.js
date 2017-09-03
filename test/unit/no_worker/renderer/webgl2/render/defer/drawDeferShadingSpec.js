describe("defer shading", function () {
    var sandbox = null;
    var gl;
    var state;

    var GBufferData = wd.GBufferData;
    var ShaderData = wd.WebGL2ShaderData;
    var ProgramData = wd.WebGL2ProgramData;
    var DeferAmbientLightPassData = wd.DeferAmbientLightPassData;
    var DeferDirectionLightPassData = wd.DeferDirectionLightPassData;
    var DeferPointLightPassData = wd.DeferPointLightPassData;
    var Vector3 = wd.Vector3;
    var Light = wd.Light;

    function buildGLSL(sandbox, state) {
        return glslTool.buildGLSL(sandbox, state);
    }

    function enableDeferShading(sandbox) {
        deferShadingTool.enableDeferShading(sandbox);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);

        enableDeferShading(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("draw defer shading", function() {
        var render_config = wd.render_config;
        var Color = wd.Color;
        var ELightModel = wd.ELightModel;
        var Vector3 = wd.Vector3;
        var Light = wd.Light;

        var material;
        var cameraGameObject;
        var geo;

        beforeEach(function(){
            var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

            material = data.material;
            cameraGameObject = data.cameraGameObject;
            geo = data.geometry;
        });

        it("set clear color", function(){
            color = Color.create("#000000");

            sandbox.stub(render_config, "clearColor", color);


            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.clearColor).toCalledOnce();
            expect(gl.clearColor).toCalledWith(color.r, color.g, color.b, color.a);
        });

        it("clear color buffer before bind gbuffer for draw", function () {
            directorTool.init(state);

            var callCount = gl.bindFramebuffer.withArgs(gl.FRAMEBUFFER).callCount;

            directorTool.loopBody(state);

            expect(gl.clear.withArgs(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT).getCall(0)).toCalledBefore(gl.bindFramebuffer.withArgs(gl.FRAMEBUFFER).getCall(callCount));
        });

        describe("draw gBuffer pass", function() {
            beforeEach(function(){

            });

            it("enable depth write before clear", function(){
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.depthMask).toCalledWith(true);
                expect(gl.depthMask.withArgs(true)).toCalledBefore(gl.clear.getCall(1));
            });
            it("clear color buffer and stencil buffer and depth buffer" +
                "(An important point we must be careful about is to enable writing into the depth buffer before clearing it. gl.clear() does not touch the depth buffer if the depth mask is set to FALSE.)", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.clear.getCall(1)).toCalledWith(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            });
            it("enable depth test", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.enable).toCalledWith(gl.DEPTH_TEST);
            });
            it("disable blend", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.disable).toCalledWith(gl.BLEND);
            });

            it("bind gBuffer", function () {
                directorTool.init(state);

                GBufferData.gBuffer = {};

                var callCount = gl.bindFramebuffer.callCount;

                directorTool.loopBody(state);

                expect(gl.bindFramebuffer.getCall(callCount)).toCalledWith(gl.FRAMEBUFFER, GBufferData.gBuffer);
            });

            describe("draw", function() {
                function getProgram() {
                    var shaderIndex = 1;

                    return ProgramData.programMap[shaderIndex];
                }

                beforeEach(function(){

                });

                // describe("use GBuffer shader", function () {
                //     describe("init GBuffer shader", function () {
                //         it("test glsl", function () {
                //             // directorTool.init(state);
                //             // directorTool.loopBody(state);
                //             //
                //             // expect(ShaderData.shaderIndexByShaderNameMap["GBuffer"]).toBeNumber();
                //         });
                //     });
                //     it("set generated shader index", function () {
                //
                //     });
                // });

                it("use GBuffer program", function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.useProgram).toCalledWith(getProgram());
                });

                describe("test GBuffer shader's glsl and send data", function () {
                    function getVsSource(gl) {
                        return gl.shaderSource.getCall(6).args[1];
                    }

                    function getFsSource(gl) {
                        return gl.shaderSource.getCall(7).args[1];
                    }

                    /*!
                    already test in basic shading
                     */

                    describe("add CommonShaderLib", function () {
                    });

                    describe("add ModelMatrixNoInstanceShaderLib", function () {
                    });

                    describe("add VerticeCommonShaderLib", function () {
                    });





                    describe("add NormalMatrixNoInstanceShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                gl = buildGLSL(sandbox, state);
                            });

                            describe("test vs source", function () {
                                it("set normalMatrix by cameraUbo data", function () {
                                    var vs = getVsSource(gl);

                                    expect(glslTool.contain(vs, "mat3 normalMatrix = mat3(\nvec3(cameraUbo.normalMatrixCol1),\nvec3(cameraUbo.normalMatrixCol2),\nvec3(cameraUbo.normalMatrixCol3)\n);\n")).toBeTruthy();
                                });
                            });
                        });
                    });






                    describe("add NormalCommonShaderLib", function () {
                        describe("send a_normal", function () {
                            var buffer;

                            beforeEach(function () {
                                // buffer = { b: 1 };
                                //
                                // gl.createBuffer.onCall(1).returns(buffer);
                            });

                            it("create buffer and init it when first get", function () {
                                directorTool.init(state);

                                var data = geometrySystemTool.getNormals(geo);


                                directorTool.loopBody(state);

                                expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                            });
                        });

                        describe("test glsl", function () {
                            beforeEach(function () {
                                gl = buildGLSL(sandbox, state);
                            });

                            describe("test vs source", function () {
                                it("a_normal location = 1", function () {
                                    var vs = getVsSource(gl);

                                    expect(glslTool.contain(vs, "layout(location=1) in vec3 a_normal")).toBeTruthy();
                                });
                            });
                        });
                    });

                    describe("add GBufferCommonShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                buildGLSL(sandbox, state);
                            });

                            it("test vs source", function () {
                                    var vs = getVsSource(gl);

                                    expect(glslTool.contain(vs, "out vec3 v_worldPosition;")).toBeTruthy();
                            });

                            describe("test fs source", function () {
                                var fs;

                                beforeEach(function(){
                                    fs = getFsSource(gl);
                                });

                                it("define in v_worldPosition", function () {
                                    expect(glslTool.contain(fs, "in vec3 v_worldPosition;")).toBeTruthy();
                                });
                            });
                        });
                    });

                    describe("add GBufferSetWorldPositionShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                buildGLSL(sandbox, state);
                            });

                            it("test vs source", function () {
                                var vs = getVsSource(gl);

                                expect(glslTool.contain(vs, "v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));")).toBeTruthy();
                            });
                        });
                    });

                    describe("add map shader lib", function () {
                        function judgeSendUniformSampler(name) {
                            var pos = 0;
                            gl.getUniformLocation.withArgs(sinon.match.any, name).returns(pos);

                            directorTool.init(state);
                            directorTool.loopBody(state);

                            expect(gl.uniform1i).toCalledWith(pos, 3);
                        }

                        beforeEach(function () {
                        });

                        describe("if has map, add CommonLightMapShaderLib", function(){
                            beforeEach(function () {
                                var texture = textureSystemTool.create();
                                textureSystemTool.setSource(texture, {});

                                lightMaterialTool.setSpecularMap(material, texture);
                            });

                            describe("send a_texCoord", function () {
                                var name,size,pos;
                                var buffer;

                                beforeEach(function () {
                                    name = "a_texCoord";
                                    size = 2;

                                    pos = 2;
                                });

                                it("create buffer and init it when set vao", function () {
                                    directorTool.init(state);

                                    var data = geometrySystemTool.getTexCoords(geo);


                                    directorTool.loopBody(state);

                                    expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                                    expect(gl.vertexAttribPointer.withArgs(pos,size,"FLOAT",false,0,0)).toCalledOnce();
                                });
                            })

                            describe("test glsl", function () {
                                beforeEach(function () {
                                    buildGLSL(sandbox, state);
                                });

                                describe("test vs source", function () {
                                    it("a_texCoord location = 2", function () {
                                        var vs = getVsSource(gl);

                                        expect(glslTool.contain(vs, "layout(location=2) in vec2 a_texCoord")).toBeTruthy();
                                    });
                                });
                            });
;
                        });

                        describe("if has diffuse map, add DiffuseMapShaderLib", function(){
                            beforeEach(function () {
                                var texture = textureSystemTool.create();
                                textureSystemTool.setSource(texture, {});

                                lightMaterialTool.setDiffuseMap(material, texture);
                            });

                            it("send u_diffuseMapSampler", function () {
                                judgeSendUniformSampler("u_diffuseMapSampler");
                            });

                            describe("test glsl", function () {
                                beforeEach(function () {
                                    gl = buildGLSL(sandbox, state);
                                });

                                it("test vs source", function () {
                                    var vs = getVsSource(gl);

                                    expect(glslTool.contain(vs, "out vec2 v_diffuseMapTexCoord;")).toBeTruthy();
                                    expect(glslTool.contain(vs, "v_diffuseMapTexCoord = a_texCoord;")).toBeTruthy();
                                });
                                it("test fs source", function () {
                                    var fs = getFsSource(gl);

                                    expect(glslTool.contain(fs, "in vec2 v_diffuseMapTexCoord;")).toBeTruthy();
                                    expect(glslTool.contain(fs, "uniform sampler2D u_diffuseMapSampler;\n")).toBeTruthy();
                                    expect(glslTool.containMultiLine(fs, [
                                        "vec3 getMaterialDiffuse() {",
                                        "return texture(u_diffuseMapSampler, v_diffuseMapTexCoord).rgb;",
                                        "}"
                                    ])).toBeTruthy();
                                });
                            });
                        });

                        describe("else, add NoDiffuseMapShaderLib", function () {
                            beforeEach(function () {
                            });

                            it("send u_diffuse", function () {
                                var color = Color.create("rgb(0.1,0.2,0.3)"),
                                    colorVec3 = color.toVector3(),
                                    pos = 0;
                                gl.getUniformLocation.withArgs(sinon.match.any, "u_diffuse").returns(pos);
                                lightMaterialTool.setColor(material, color);


                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.uniform3f).toCalledWith(pos, colorVec3.x, colorVec3.y, colorVec3.z);
                            });

                            describe("test glsl", function () {
                                beforeEach(function () {
                                    gl = buildGLSL(sandbox, state);
                                });

                                it("test fs source", function () {
                                    var fs = getFsSource(gl);

                                    expect(glslTool.contain(fs, "vec3 getMaterialDiffuse() {\n        return u_diffuse;\n    }\n")).toBeTruthy();
                                });
                            });
                        });

                        describe("if has specular map, add SpecularMapShaderLib", function(){
                            beforeEach(function () {
                                var texture = textureSystemTool.create();
                                textureSystemTool.setSource(texture, {});

                                lightMaterialTool.setSpecularMap(material, texture);
                            });

                            it("send u_specularMapSampler", function () {
                                judgeSendUniformSampler("u_specularMapSampler");
                            });

                            describe("test glsl", function () {
                                beforeEach(function () {
                                    gl = buildGLSL(sandbox, state);
                                });

                                it("test vs source", function () {
                                    var vs = getVsSource(gl);

                                    expect(glslTool.contain(vs, "out vec2 v_specularMapTexCoord;")).toBeTruthy();
                                    expect(glslTool.contain(vs, "v_specularMapTexCoord = a_texCoord;")).toBeTruthy();
                                });
                                it("test fs source", function () {
                                    var fs = getFsSource(gl);

                                    expect(glslTool.contain(fs, "in vec2 v_specularMapTexCoord;")).toBeTruthy();
                                    expect(glslTool.contain(fs, "uniform sampler2D u_specularMapSampler;\n")).toBeTruthy();
                                    expect(glslTool.containMultiLine(fs, [
                                        "float getSpecularStrength() {",
                                        "return texture(u_specularMapSampler, v_specularMapTexCoord).r;",
                                        "}"
                                    ])).toBeTruthy();
                                });
                            });
                        });

                        describe("else, add NoSpecularMapShaderLib", function () {
                            beforeEach(function () {
                            });

                            describe("test glsl", function () {
                                beforeEach(function () {
                                    gl = buildGLSL(sandbox, state);
                                });

                                it("test fs source", function () {
                                    var fs = getFsSource(gl);

                                    expect(glslTool.contain(fs, "float getSpecularStrength() {\n        return 1.0;\n    }\n")).toBeTruthy();
                                });
                            });
                        });

                        describe("add GBufferNoNormalMapShaderLib", function () {
                            beforeEach(function () {
                            });

                            describe("test glsl", function () {
                                beforeEach(function () {
                                    gl = buildGLSL(sandbox, state);
                                });

                                it("test vs source", function () {
                                    var vs = getVsSource(gl);

                                    expect(glslTool.contain(vs, "out vec3 v_normal;\n")).toBeTruthy();
                                    expect(glslTool.contain(vs, "v_normal = normalize(normalMatrix * a_normal);\n")).toBeTruthy();
                                });
                                it("test fs source", function () {
                                    var fs = getFsSource(gl);

                                    expect(glslTool.contain(fs, "in vec3 v_normal;\n")).toBeTruthy();
                                    expect(glslTool.contain(fs, "vec3 getNormal(){\n    return v_normal;\n}\n\n")).toBeTruthy();
                                });
                            });
                        });
                    });

                    describe("add GBufferShaderLib", function () {
                        beforeEach(function () {
                        });

                        it("send u_shininess", function () {
                            var shininess = 30,
                                pos = 0;
                            gl.getUniformLocation.withArgs(sinon.match.any, "u_shininess").returns(pos);
                            lightMaterialTool.setShininess(material, shininess);


                            directorTool.init(state);
                            directorTool.loopBody(state);

                            expect(gl.uniform1f).toCalledWith(pos, shininess);
                        });

                        describe("test glsl", function () {
                            beforeEach(function () {
                                gl = buildGLSL(sandbox, state);
                            });

                            describe("test vs source", function () {
                                var vs;

                                beforeEach(function(){
                                    vs = getVsSource(gl);
                                });

                                it("a_position location = 0", function () {
                                    expect(glslTool.contain(vs, "layout(location=0) in vec3 a_position;")).toBeTruthy();
                                });
                                it("set gl_Position by get cameraUbo data", function () {
                                    expect(glslTool.contain(vs, "gl_Position = cameraUbo.pMatrix * cameraUbo.vMatrix * vec4(v_worldPosition, 1.0);")).toBeTruthy();
                                });
                            });
                        });
                    });

                    describe("add GBufferEndShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                gl = buildGLSL(sandbox, state);
                            });

                            describe("test vs source", function () {
                                var vs;

                                beforeEach(function(){
                                    vs = getVsSource(gl);
                                });

                                it("a_position location = 0", function () {
                                    expect(glslTool.contain(vs, "layout(location=0) in vec3 a_position;")).toBeTruthy();
                                });
                                it("set gl_Position by get cameraUbo data", function () {
                                    expect(glslTool.contain(vs, "gl_Position = cameraUbo.pMatrix * cameraUbo.vMatrix * vec4(v_worldPosition, 1.0);")).toBeTruthy();
                                });
                            });


                            describe("test fs source", function () {
                                var fs;

                                beforeEach(function () {
                                    fs = getFsSource(gl);
                                });
                                it("declare gbuffer target", function () {
                                    expect(glslTool.containMultiLine(fs, [
                                        "layout(location=0) out vec4 gbufferPosition;",
                                        "layout(location=1) out vec4 gbufferNormal;",
                                        "layout(location=2) out vec4 gbufferColor;"
                                    ])).toBeTruthy();
                                });
                                it("set gbuffer", function () {
                                    expect(glslTool.containMultiLine(fs, [
                                        "gbufferPosition.xyz = v_worldPosition;",
                                        "gbufferPosition.w = u_shininess;",
                                        "gbufferNormal.xyz = getNormal();",
                                        "gbufferNormal.w = 1.0;",
                                        "gbufferColor.xyz = getMaterialDiffuse();",
                                        "gbufferColor.w = getSpecularStrength();"
                                    ])).toBeTruthy();
                                });
                            });
                        });
                    });

                    describe("add EndShaderLib", function () {
                    });
                });

                // describe("commit to gpu", function() {
                //     beforeEach(function(){
                //
                //     });
                //
                //     it("if geometry has no index buffer, then drawArray", function(){
                //         // directorTool.init(state);
                //         //
                //         // geometrySystemTool.setIndices(0, []);
                //         //
                //         // directorTool.loopBody(state);
                //         //
                //         // expect(gl.drawArrays).toCalledWith("TRIANGLES",0,72);
                //     });
                //     it("else, bind index buffer and drawElements", function(){
                //         // directorTool.init(state);
                //         //
                //         // var indexBuffer = {a:1};
                //         // indexBufferTool.setBuffers([indexBuffer]);
                //         //
                //         // // geometrySystemTool.setDrawMode({index:0}, "TRIANGLES");
                //         //
                //         // var indices = [1,2,3];
                //         // geometrySystemTool.setIndices(0, indices);
                //         // geometrySystemTool.setIndexType(EBufferType.UNSIGNED_SHORT);
                //         // geometrySystemTool.setIndexTypeSize(Uint16Array.BYTES_PER_ELEMENT);
                //         //
                //         // directorTool.loopBody(state);
                //         //
                //         //
                //         // expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)).toCalledOnce();
                //         // expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indices.length, GeometryData.indexType, GeometryData.indexTypeSize * 0);
                //     });
                // });
            });

            // it("test draw two gameObjects' gbuffer pass", function () {
            //
            // });
        });

        describe("draw light pass", function() {
            function unbindGBufferCall(gl) {
                return gl.bindFramebuffer.withArgs(gl.FRAMEBUFFER, null).getCall(1)
            }

            function judgeAfterUnBindGBuffer(expectVal, gl) {
                expect(expectVal).toCalledAfter(unbindGBufferCall(gl));
            }

            beforeEach(function(){
            });

            describe("prepare", function() {
                beforeEach(function(){
                    directorTool.init(state);
                    directorTool.loopBody(state);
                });

                it("unbind gBuffer after finish gBuffer pass", function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(unbindGBufferCall(gl)).toCalledAfter(gl.drawElements.getCall(0));
                });

                describe("set state", function() {
                    beforeEach(function(){
                    });

                    it("disable depth write", function(){
                        judgeAfterUnBindGBuffer(gl.depthMask.withArgs(false).getCall(0), gl);
                    });
                    it("disable depth test", function () {
                        judgeAfterUnBindGBuffer(gl.disable.withArgs(gl.DEPTH_TEST).getCall(0), gl);
                    });

                    describe("set blend", function () {
                        it("enable blend", function () {
                            judgeAfterUnBindGBuffer(gl.enable.withArgs(gl.BLEND).getCall(0), gl);
                        });
                        it("set blendEquation", function () {
                            judgeAfterUnBindGBuffer(gl.blendEquation.withArgs(gl.FUNC_ADD).getCall(0), gl);
                        });
                        it("set blendFunc", function () {
                            judgeAfterUnBindGBuffer(gl.blendFunc.withArgs(gl.ONE, gl.ONE).getCall(0), gl);
                        });
                    });
                });
            });


            describe("draw light", function() {
                var vao;

                beforeEach(function(){
                    vao = {v:1};

                    gl.createProgram.onCall(0).returns({a:0});
                    gl.createProgram.onCall(1).returns({a:1});
                    gl.createProgram.onCall(2).returns({a:2});
                });

                describe("draw ambient light", function() {
                    function getDeferAmbientLightPassProgram() {
                        var shaderIndex = ShaderData.shaderIndexByShaderNameMap["DeferAmbientLightPass"];

                        return ProgramData.programMap[shaderIndex];
                    }

                    beforeEach(function(){
                        sceneSystemTool.addAmbientLight();
                    });

                    it("bind full screen quad vao", function () {
                        directorTool.init(state);
                        DeferAmbientLightPassData.fullScreenQuadVertexArray = vao;

                        directorTool.loopBody(state);

                        judgeAfterUnBindGBuffer(gl.bindVertexArray.withArgs(vao).getCall(0), gl);
                    });
                    it("use DeferAmbientLightPass program", function () {
                        directorTool.init(state);
                        directorTool.loopBody(state);

                        judgeAfterUnBindGBuffer(gl.useProgram.withArgs(getDeferAmbientLightPassProgram()).getCall(1), gl);
                    });

                    describe("send light data", function() {
                        describe("add LightUboShaderLib", function () {
                            it("bind ubo", function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("LightUbo"))).toCalledOnce();
                            });
                        });

                        describe("add AmbientLightUboShaderLib", function () {
                            it("bind ubo", function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("AmbientLightUbo"))).toCalledOnce();
                            });
                        });

                        describe("commit to gpu", function () {
                            it("draw full screen quad", function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.drawElements.withArgs(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)).toCalledOnce();
                            });
                        });
                    });
                });

                describe("draw direction light", function() {
                    function getDeferDirectionLightPassProgram() {
                        var shaderIndex = ShaderData.shaderIndexByShaderNameMap["DeferDirectionLightPass"];

                        return ProgramData.programMap[shaderIndex];
                    }

                    beforeEach(function(){
                        sceneSystemTool.addDirectionLight();
                    });

                    it("bind full screen quad vao", function () {
                        directorTool.init(state);
                        DeferDirectionLightPassData.fullScreenQuadVertexArray = vao;

                        directorTool.loopBody(state);

                        judgeAfterUnBindGBuffer(gl.bindVertexArray.withArgs(vao).getCall(0), gl);
                    });
                    it("use DeferDirectionLightPass program", function () {
                        directorTool.init(state);
                        directorTool.loopBody(state);

                        judgeAfterUnBindGBuffer(gl.useProgram.withArgs(getDeferDirectionLightPassProgram()).getCall(1), gl);
                    });

                    describe("send light data", function() {
                        describe("add LightUboShaderLib", function () {
                            it("bind ubo", function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("LightUbo"))).toCalledOnce();
                            });
                        });

                        describe("add DirectionLightUboShaderLib", function () {
                            it("bind ubo", function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("DirectionLightUbo"))).toCalledOnce();
                            });
                        });

                        describe("commit to gpu", function () {
                            it("draw full screen quad", function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.drawElements.withArgs(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)).toCalledOnce();
                            });
                        });
                    });
                });

                describe("draw point light", function() {
                    var lightObj, lightComponent;

                    function getLightDrawCount() {
                        return gl.drawElements.withArgs(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0).callCount;
                    }

                    function getDeferPointLightPassProgram() {
                        var shaderIndex = ShaderData.shaderIndexByShaderNameMap["DeferPointLightPass"];

                        return ProgramData.programMap[shaderIndex];
                    }
                    
                    beforeEach(function(){
                        lightObj = sceneSystemTool.addPointLight();
                        lightComponent = gameObjectSystemTool.getComponent(lightObj, Light);
                    });

                    it("enable scissor test", function () {
                        directorTool.init(state);
                        directorTool.loopBody(state);

                        judgeAfterUnBindGBuffer(gl.enable.withArgs(gl.SCISSOR_TEST).getCall(0), gl);
                    });
                    it("bind full screen quad vao", function () {
                        directorTool.init(state);
                        DeferPointLightPassData.fullScreenQuadVertexArray = vao;

                        directorTool.loopBody(state);

                        judgeAfterUnBindGBuffer(gl.bindVertexArray.withArgs(vao).getCall(0), gl);
                    });
                    it("use DeferPointLightPass program", function () {
                        directorTool.init(state);
                        directorTool.loopBody(state);

                        judgeAfterUnBindGBuffer(gl.useProgram.withArgs(getDeferPointLightPassProgram()).getCall(1), gl);
                    });

                    describe("scissor optimize", function() {
                        var viewport;
                        var transform;

                        beforeEach(function(){
                            viewport = {
                                x:0,
                                y:0,
                                width:100,
                                height:200
                            }

                            state = stateTool.setViewport(state, viewport);

                            transform = gameObjectSystemTool.getTransform(lightObj);
                        });

                        it("if the computed light range is out of screen, not draw it", function () {
                            threeDTransformSystemTool.setPosition(transform, Vector3.create(-100, 0, 0));

                            pointLightTool.setRangeLevel(lightComponent, 1);


                            directorTool.init(state);

                            directorTool.loopBody(state);

                            expect(getLightDrawCount()).toEqual(0);
                        });
                        it("if it's full screen, scissor full screen", function () {
                            threeDTransformSystemTool.setPosition(transform, Vector3.create(0, 0, -100));

                            pointLightTool.setRangeLevel(lightComponent, 11);


                            directorTool.init(state);

                            directorTool.loopBody(state);

                            expect(gl.scissor).toCalledWith(viewport.x, viewport.y, viewport.width, viewport.height);
                        });
                        it("else, scissor it", function () {
                            threeDTransformSystemTool.setPosition(transform, Vector3.create(200,300,-900));


                            directorTool.init(state);

                            directorTool.loopBody(state);

                            expect(gl.scissor).toCalledWith(65, 151, 11, 21);
                        });
                    });

                    describe("send light data", function() {
                        describe("add LightUboShaderLib", function () {
                            it("bind ubo", function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("LightUbo"))).toCalledOnce();
                            });
                        });

                        describe("add PointLightUboShaderLib", function () {
                            it("bind ubo", function () {
                                // sceneSystemTool.addPointLight();

                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("PointLightUbo"))).toCalledOnce();
                            });
                        });

                        describe("commit to gpu", function () {
                            it("draw full screen quad", function () {
                                // sceneSystemTool.addPointLight();

                                directorTool.init(state);
                                directorTool.loopBody(state);

                                expect(gl.drawElements.withArgs(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)).toCalledOnce();
                            });
                        });
                    });

                    describe("restore state", function() {
                        it("disable scissor test", function () {
                            sceneSystemTool.addPointLight();


                            directorTool.init(state);


                            var callCount = gl.bindVertexArray.withArgs(null).callCount;

                            directorTool.loopBody(state);

                            expect(gl.disable.withArgs(gl.SCISSOR_TEST).getCall(0)).toCalledBefore(gl.bindVertexArray.withArgs(null).getCall(callCount + 1));
                        });
                    });
                });

                it("unbind vao after commit to gpu", function () {
                    sceneSystemTool.addPointLight();


                    directorTool.init(state);

                    var callCount = gl.bindVertexArray.withArgs(null).callCount;

                    directorTool.loopBody(state);

                    expect(gl.bindVertexArray.withArgs(null).getCall(callCount + 1)).toCalledAfter(gl.drawElements.withArgs(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0).getCall(0));
                });
            });
        });
    });
});

