describe("draw render command", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;

    var gl;
    var state;

    var Color = wd.Color;
    var Matrix4 = wd.Matrix4;
    var GeometryData = wd.GeometryData;
    var IndexBufferData = wd.IndexBufferData;
    var EBufferType = wd.EBufferType;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;


        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("use", function () {
        it("if the program is already used, not use again", function () {
            sceneTool.prepareGameObjectAndAddToScene();

            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.useProgram).toCalledOnce();
        });
    });

    describe("send attribute buffer", function () {
        var program1, program2;
        var buffer1, buffer2;
        var ShaderData, GeometryData, ArrayBufferData;
        var pos;

        beforeEach(function () {
            pos = 0;
            program1 = {};
            program2 = { p: 1 };
            buffer1 = {};
            buffer2 = { a: 1 };

            shaderTool.setSendAttributeConfig(0, [
                {
                    "name": "a_position",
                    "buffer": "vertice"
                }
            ]);
            shaderTool.setSendAttributeConfig(1, [
                {
                    "name": "a_position",
                    "buffer": "vertice"
                }
            ]);
            shaderTool.setAttributeLocation(0, {
                "a_position": pos
            });
            shaderTool.setAttributeLocation(1, {
                "a_position": pos
            });
            shaderTool.setProgram(0, program1);
            shaderTool.setProgram(1, program2);

            ShaderData = wd.ShaderData;



            GeometryData = {}



            arrayBufferTool.setBuffer(0, buffer1);
            arrayBufferTool.setBuffer(1, buffer2);

            arrayBufferTool.setBufferData(0, {
                size: 3,
                type: "FLOAT"
            });
            arrayBufferTool.setBufferData(1, {
                size: 3,
                type: "FLOAT"
            });

            ArrayBufferData = wd.ArrayBufferData;
        });

        it("bind array buffer", function () {
            shaderTool.use(gl, 0, ShaderData);

            shaderTool.sendAttributeData(gl, 0, 0, ShaderData, GeometryData, ArrayBufferData);

            expect(gl.bindBuffer).toCalledWith(gl.ARRAY_BUFFER, buffer1);
        });
        it("attach buffer to attribute", function () {
            shaderTool.use(gl, 0, ShaderData);

            shaderTool.sendAttributeData(gl, 0, 0, ShaderData, GeometryData, ArrayBufferData);

            expect(gl.vertexAttribPointer).toCalledWith(pos, 3, gl["FLOAT"], false, 0, 0);
        });
        describe("enable attribute", function () {
            it("if already enabled since use this program, not enable", function () {
                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendAttributeData(gl, 0, 0, ShaderData, GeometryData, ArrayBufferData);


                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendAttributeData(gl, 0, 1, ShaderData, GeometryData, ArrayBufferData);

                expect(gl.enableVertexAttribArray.withArgs(pos).callCount).toEqual(1);
            });
            it("else, enable", function () {
                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendAttributeData(gl, 0, 0, ShaderData, GeometryData, ArrayBufferData);



                shaderTool.disableVertexAttribArray(gl, ShaderData);

                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendAttributeData(gl, 0, 1, ShaderData, GeometryData, ArrayBufferData);

                expect(gl.enableVertexAttribArray.withArgs(pos).callCount).toEqual(2);
            });

            it("differenc shader's vertexAttribHistory of the same attribute data pos are independent", function () {
                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendAttributeData(gl, 0, 0, ShaderData, GeometryData, ArrayBufferData);


                shaderTool.use(gl, 1, ShaderData);

                shaderTool.sendAttributeData(gl, 1, 1, ShaderData, GeometryData, ArrayBufferData);

                expect(gl.enableVertexAttribArray.withArgs(pos).callCount).toEqual(2);
            });
        });

        describe("test cache", function () {
            it("if switch program, clear cache and send it and enableVertexAttribArray", function () {
                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendAttributeData(gl, 0, 0, ShaderData, GeometryData, ArrayBufferData);


                shaderTool.use(gl, 1, ShaderData);

                shaderTool.sendAttributeData(gl, 1, 1, ShaderData, GeometryData, ArrayBufferData);

                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, buffer1)).toCalledOnce();
                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, buffer2)).toCalledOnce();
                expect(gl.enableVertexAttribArray.callCount).toEqual(2);
            });

            it("if last send buffers equal current send buffers, not send again", function () {
                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendAttributeData(gl, 0, 0, ShaderData, GeometryData, ArrayBufferData);


                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendAttributeData(gl, 0, 0, ShaderData, GeometryData, ArrayBufferData);

                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, buffer1)).toCalledOnce();
                expect(gl.enableVertexAttribArray.callCount).toEqual(1);
            });

            // it("if its buffer data changed, still cache hit", function () {
            // });
        });
    });

    describe("sendUniformData", function () {
        var pos;
        var v;

        beforeEach(function () {
            pos = 1000;
        });

        describe("test cache", function () {
            var program1, program2;
            var ShaderData, MaterialData;
            var renderCommand1, renderCommand2;
            var pos,pos2;

            beforeEach(function(){
                pos = 0;
                pos2 = 1;
                program1 = {};
                program2 = { p: 1 };

                shaderTool.setSendUniformConfig(0, [
                    {
                        "name": "u_color",
                        "from": "material",
                        "field": "color",
                        "type": "vec3"
                    }
                ]);
                shaderTool.setSendUniformConfig(1, [
                    {
                        "name": "u_color",
                        "from": "material",
                        "field": "color",
                        "type": "vec3"
                    },
                    {
                        "name": "u_opacity",
                        "from": "material",
                        "field": "opacity",
                        "type": "float"
                    }
                ]);
                shaderTool.setUniformLocation(0, {
                    "u_color": pos
                });
                shaderTool.setUniformLocation(1, {
                    "u_color": pos,
                    "u_opacity": pos2
                });
                shaderTool.setProgram(0, program1);
                shaderTool.setProgram(1, program2);

                shaderTool.setUniformCache(0, {});
                shaderTool.setUniformCache(1, {});

                ShaderData = wd.ShaderData;

                materialTool.setColor({index:0}, Color.create());
                materialTool.setColor({index:1}, Color.create("#111222"));
                materialTool.setOpacity({index:1}, 1);

                MaterialData = wd.MaterialData;

                renderCommand1 = {
                    materialIndex:0
                };
                renderCommand2 = {
                    materialIndex:1
                };
            });

            it("differenc shader's data of the same uniform data name are independent", function () {
                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendUniformData(gl, 0, MaterialData, ShaderData, renderCommand1);


                shaderTool.use(gl, 1, ShaderData);

                shaderTool.sendUniformData(gl, 1, MaterialData, ShaderData, renderCommand2);



                expect(gl.uniform3f).toCalledTwice();
                expect(gl.uniform1f).toCalledOnce();







                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendUniformData(gl, 0, MaterialData, ShaderData, renderCommand1);


                shaderTool.use(gl, 1, ShaderData);

                shaderTool.sendUniformData(gl, 1, MaterialData, ShaderData, renderCommand2);


                expect(gl.uniform3f).toCalledTwice();
                expect(gl.uniform1f).toCalledOnce();
            });
            it("if data not equal, cache miss", function () {
                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendUniformData(gl, 0, MaterialData, ShaderData, renderCommand1);


                shaderTool.use(gl, 1, ShaderData);

                shaderTool.sendUniformData(gl, 1, MaterialData, ShaderData, renderCommand2);





                materialTool.setColor({index:0}, Color.create("#222222"));
                materialTool.setOpacity({index:1}, 0.5);


                shaderTool.use(gl, 0, ShaderData);

                shaderTool.sendUniformData(gl, 0, MaterialData, ShaderData, renderCommand1);


                shaderTool.use(gl, 1, ShaderData);

                shaderTool.sendUniformData(gl, 1, MaterialData, ShaderData, renderCommand2);





                expect(gl.uniform3f.callCount).toEqual(3);
                expect(gl.uniform1f.callCount).toEqual(2);
            });
        });

        describe("test send FLOAT_1", function () {
            beforeEach(function () {
                gl.getUniformLocation.withArgs(sinon.match.any, "u_opacity").returns(pos);
            })

            it("test", function () {
                v = 1;
                materialTool.setOpacity(material, 1);

                directorTool.init(state);

                directorTool.loopBody(state);

                expect(gl.uniform1f.withArgs(pos, v)).toCalledOnce();
            });
            it("data should be number", function () {
                materialTool.setOpacity(material, true);

                directorTool.init(state);

                expect(function () {
                    directorTool.loopBody(state);
                }).toThrow("to be a number");
            });

            describe("test cache", function () {
                beforeEach(function () {
                });

                it("if cached, return cached data", function () {
                    v = 1;
                    materialTool.setOpacity(material, 1);

                    directorTool.init(state);

                    directorTool.loopBody(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform1f.withArgs(pos, v)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    v = 1;
                    materialTool.setOpacity(material, 1);

                    directorTool.init(state);

                    directorTool.loopBody(state);

                    materialTool.setOpacity(material, 0.5);

                    directorTool.loopBody(state);


                    expect(gl.uniform1f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send VECTOR_3", function () {
            var vec3;

            beforeEach(function () {
                gl.getUniformLocation.withArgs(sinon.match.any, "u_color").returns(pos);

                v = Color.create("#123456");
                vec3 = v.toVector3();
            })

            it("test", function () {
                materialTool.setColor(material, v);

                directorTool.init(state);

                directorTool.loopBody(state);

                expect(gl.uniform3f.withArgs(pos, vec3.x, vec3.y, vec3.z)).toCalledOnce();
            });

            describe("test cache", function () {
                beforeEach(function () {
                });

                it("if cached, return cached data", function () {
                    materialTool.setColor(material, v);

                    directorTool.init(state);

                    directorTool.loopBody(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform3f.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    materialTool.setColor(material, v);

                    directorTool.init(state);

                    directorTool.loopBody(state);

                    materialTool.setColor(material, Color.create("#333333"));

                    directorTool.loopBody(state);

                    expect(gl.uniform3f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        it("test send FLOAT_MAT4", function () {
            var transform = gameObjectTool.getComponent(obj, wd.ThreeDTransform),
                mat = Matrix4.create().setTranslate(1, 2, 3),
                position = mat.getTranslation();
            threeDTransformTool.setPosition(transform, position);
            gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(pos);

            directorTool.init(state);

            directorTool.loopBody(state);

            expect(gl.uniformMatrix4fv).toCalledWith(pos, false, mat.values);
        });
    });

    describe("draw", function() {
        beforeEach(function(){

        });

        it("if geometry has no index buffer, then drawArray", function(){
            directorTool.init(state);

            geometryTool.setIndices(0, []);

            directorTool.loopBody(state);

            expect(gl.drawArrays).toCalledWith("TRIANGLES",0,72);
        });
        it("else, bind index buffer and drawElements", function(){
            directorTool.init(state);

            var indexBuffer = {a:1};
            IndexBufferData.buffers = [indexBuffer];

            geometryTool.setDrawMode({index:0}, "TRIANGLES");

            var indices = [1,2,3];
            geometryTool.setIndices(0, indices);
            geometryTool.setIndexType(EBufferType.UNSIGNED_SHORT);
            geometryTool.setIndexTypeSize(Uint16Array.BYTES_PER_ELEMENT);

            directorTool.loopBody(state);


            expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)).toCalledOnce();
            expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indices.length, GeometryData.indexType, GeometryData.indexTypeSize * 0);
        });
    });
});

