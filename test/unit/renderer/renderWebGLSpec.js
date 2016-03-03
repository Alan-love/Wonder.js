describe("renderWebGL", function() {
    var sandbox = null;
    var renderer = null;
    var deviceManager = null;

    function getGL(){
        return wd.DeviceManager.getInstance().gl;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderer = wd.WebGLRenderer.create();
        deviceManager = wd.DeviceManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("init", function(){
        it("set clearColorOptions to color:#ffffff, alpha:1", function(){
            renderer.init();

            expect(renderer._clearOptions.color).toEqual(
                wd.Color.create("#ffffff")
            );
        });
        it("init depthTest, blend, colorWrite, side, depthWrite", function(){
            var gl = getGL();

            renderer.init();

            expect(deviceManager.depthTest).toBeTruthy();
            expect(deviceManager.blend).toBeFalsy();
            expect(gl.blendFunc).not.toCalled();
            expect(gl.blendEquation).not.toCalled();
            expect(gl.colorMask).toCalledOnce();
            expect(deviceManager.side).toEqual(wd.ESide.FRONT);
            expect(gl.cullFace).toCalledWith(gl.BACK);
            expect(deviceManager.depthWrite).toBeTruthy();
        });
    });

    describe("clear", function(){
        it("clear by clearOptions", function(){
            sandbox.stub(deviceManager, "clear");

            renderer.clear();

            expect(deviceManager.clear).toCalledWith(renderer._clearOptions);
        });
    });

    describe("render", function(){
        var gl, program,mMatrix,vMatrix,pMatrix;

        function addCommand(isNoIndexBuffer){
            var quadCmd,shader,material,geometry;

            quadCmd = renderer.createQuadCommand();
            var vsSource = "",
                fsSource = "";
            shader = wd.CommonShader.create( vsSource, fsSource );


            material = wd.BasicMaterial.create();
            material.color= wd.Color.create("#FFCDff");
            material.shader = shader;


            geometry = wd.BoxGeometry.create();
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;
            geometry.material = material;
            geometry.init();


            //quadCmd.buffers = {
            //    vertexBuffer: geometry.verticeBuffer,
            //    texCoordBuffer: geometry.texCoordBuffer,
            //    indexBuffer: geometry.indiceBuffer,
            //    normalBuffer: geometry.normalBuffer,
            //    tangentBuffer:geometry.tangentBuffer,
            //    colorBuffer: geometry.colorBuffer
            //};
            quadCmd.buffers = geometry.buffers;

            if(isNoIndexBuffer){
                quadCmd.buffers.geometryData.faces = [];
            }

            quadCmd.shader = geometry.material.shader;
            quadCmd.mMatrix = mMatrix;
            quadCmd.vMatrix = vMatrix;
            quadCmd.pMatrix = pMatrix;


            quadCmd.material = material;

            quadCmd.blend = material.blend;

            renderer.addCommand(quadCmd);

            sandbox.stub(material.mapManager, "update");
            sandbox.stub(material.mapManager, "sendData");
            sandbox.stub(material, "updateTexture");
            //sandbox.stub(material, "useProgram");
            sandbox.stub(material, "updateShader");

            return {
                quadCmd:quadCmd,
                material:material,
                shader:shader,
                geometry:geometry
            }
        }

        beforeEach(function(){
            mMatrix = wd.Matrix4.create();
            vMatrix = wd.Matrix4.create();
            pMatrix = wd.Matrix4.create();

            gl = {
                TRIANGLES:"TRIANGLES",
                ARRAY_BUFFER:"ARRAY_BUFFER",
                ELEMENT_ARRAY_BUFFER: "ELEMENT_ARRAY_BUFFER",
                UNSIGNED_SHORT: "UNSIGNED_SHORT",

                bindBuffer:sandbox.stub(),
                bufferData:sandbox.stub(),
                drawElements:sandbox.stub(),
                drawArrays:sandbox.stub(),
                createBuffer:sandbox.stub().returns({})
            };
            testTool.extend(wd.DeviceManager.getInstance().gl, gl);
            gl = wd.DeviceManager.getInstance().gl;

            program = {
                setAttributeData:sandbox.stub(),
                setUniformData:sandbox.stub(),
                initWithShader:sandbox.stub(),
                isChangeShader:sandbox.stub(),
                use:sandbox.stub()
            };
        });

        it("fist, render opaque commands;then lock depth buffer and render sorted transparent commands; then unlock depth buffer", function(){
            var result1 = addCommand();
            var result2 = addCommand();
            var result3 = addCommand();
            var result4 = addCommand();
            var quad1 = result1.quadCmd,
                quad2 = result2.quadCmd,
                quad3 = result3.quadCmd,
                quad4 = result4.quadCmd;
            var material1 = result1.material,
                material2 = result2.material,
                material3 = result3.material,
                material4 = result4.material;

            sandbox.stub(quad1, "execute");
            sandbox.stub(quad2, "execute");
            sandbox.stub(quad3, "execute");
            sandbox.stub(quad4, "execute");

            quad1.blend = true;
            quad2.blend = true;
            quad3.blend = false;
            quad4.blend = false;

            sandbox.stub(wd.Director.getInstance().scene, "currentCamera", testTool.createCamera(wd.Vector3.create(0, 0, 10)));

            var depthWriteArr = [];
            testTool.stubGetterSetter(sinon, wd.DeviceManager.prototype, "depthWrite", null, function(val){
                depthWriteArr.push(val);
            });

            quad1.z = 8;
            quad2.z = 7;
            quad3.z = 2;
            quad4.z = -1;

            renderer.render();

            expect(quad3.execute).toCalledBefore(quad4.execute);
            expect(quad4.execute).toCalledBefore(quad2.execute);
            expect(quad2.execute).toCalledBefore(quad1.execute);
            expect(depthWriteArr).toEqual([
                false, true
            ]);
        });

        describe("execute quadCommand", function(){
            //it("set quadCommand's shader", function(){
            //    program.isChangeShader.returns(false);
            //    addCommand();
            //
            //    renderer.render();
            //
            //    expect(program.initWithShader).not.toCalled();
            //
            //    program.isChangeShader.returns(true);
            //    var result = addCommand();
            //
            //    renderer.render();
            //
            //    expect(program.initWithShader).toCalledWith(result.shader);
            //    expect(program.use).toCalledOnce();
            //});
            it("update texture", function(){
                var result = addCommand();

                renderer.render();

                expect(result.material.updateTexture).toCalledOnce();
            });
            //it("use program", function(){
            //    var result = addCommand();
            //
            //    renderer.render();
            //
            //    expect(result.material.useProgram).toCalledOnce();
            //});


            //it("send vertex,color,mMatrix,vMatrix,pMatrix to program", function(){
            //    var result = addCommand();
            //    var geometry = result.geometry;
            //
            //    renderer.render();
            //
            //    expect(program.setAttributeData.firstCall).toCalledWith("a_position", wd.AttributeDataType.BUFFER, geometry.vertices);
            //    expect(program.setAttributeData.secondCall).toCalledWith("a_color", wd.AttributeDataType.BUFFER, geometry.colors);
            //    expect(program.setUniformData).toCalledWith("u_mMatrix", wd.UniformDataType.FLOAT_MAT4, mMatrix);
            //    expect(program.setUniformData).toCalledWith("u_vMatrix", wd.UniformDataType.FLOAT_MAT4, vMatrix);
            //    expect(program.setUniformData).toCalledWith("u_pMatrix", wd.UniformDataType.FLOAT_MAT4, pMatrix);
            //});
            //it("send texture data", function(){
            //    var result = addCommand();
            //
            //    renderer.render();
            //
            //    expect(result.material.mapManager.sendData).toCalledOnce();
            //});
            it("update shader", function(){
                var result = addCommand();

                renderer.render();

                expect(result.material.updateShader).toCalledWith(result.quadCmd);
            });

            describe("draw", function(){
                describe("set effects", function(){
                    var material,result;

                    beforeEach(function(){
                        sandbox.stub(deviceManager, "setColorWrite");
                        sandbox.stub(deviceManager, "setBlendFunc");
                        sandbox.stub(deviceManager, "setBlendEquation");
                        sandbox.stub(deviceManager, "setBlendFuncSeparate");
                        sandbox.stub(deviceManager, "setBlendEquationSeparate");

                        result = addCommand();
                        material = result.material;

                        sandbox.stub(wd.Director.getInstance().scene, "currentCamera", testTool.createCamera());
                    });

                    it("set colorWrite,polygonOffsetMode", function(){
                        renderer.render();

                        expect(deviceManager.setColorWrite).toCalledWith(material.redWrite, material.greenWrite, material.blueWrite, material.alphaWrite);
                        expect(deviceManager.polygonOffsetMode).toEqual(material.polygonOffsetMode);
                    });
                    it("set side:if set SceneDispatcher->side, use it", function(){
                        wd.Director.getInstance().scene.side = wd.ESide.BACK;

                        renderer.render();

                        expect(deviceManager.side).toEqual(wd.ESide.BACK);
                    });
                    it("else, use material->side", function () {
                        material.side = wd.ESide.BOTH;

                        renderer.render();

                        expect(deviceManager.side).toEqual(wd.ESide.BOTH);
                    });
                    it("if set material->blendSrc/Dst,blendEquation, use it", function () {
                        material.blend = true;
                        material.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                        material.blendEquationSeparate = [wd.EBlendEquation.ADD, wd.EBlendEquation.ADD];
                        material.blendSrc = wd.EBlendFunc.SRC_ALPHA;
                        material.blendDst = wd.EBlendFunc.ONE;

                        renderer.render();

                        expect(deviceManager.blend).toBeTruthy();
                        expect(deviceManager.setBlendFunc).toCalledWith(material.blendSrc, material.blendDst);
                        expect(deviceManager.setBlendEquation).toCalledWith(material.blendEquation);
                        expect(deviceManager.setBlendFuncSeparate).not.toCalled();
                    });
                    it("if set material->blendFuncSeparate && blendEquationSeparate, use it", function(){
                        material.blend = true;
                        material.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                        material.blendEquationSeparate = [wd.EBlendEquation.ADD, wd.EBlendEquation.ADD];

                        renderer.render();

                        expect(deviceManager.blend).toBeTruthy();
                        expect(deviceManager.setBlendFuncSeparate).toCalledWith(material.blendFuncSeparate);
                        expect(deviceManager.setBlendEquationSeparate).toCalledWith(material.blendEquationSeparate);
                    });
                    it("else use material->default blendSrc/Dst,blendEquation", function(){
                        material.blend = true;

                        renderer.render();

                        expect(deviceManager.blend).toBeTruthy();
                        expect(deviceManager.setBlendFunc).toCalledWith(material.blendSrc, material.blendDst);
                        expect(deviceManager.setBlendEquation).toCalledWith(material.blendEquation);
                        expect(deviceManager.setBlendFuncSeparate).not.toCalled();
                    });
                });
                it("if geometry has no index buffer, then drawArray", function(){
                    var result = addCommand(true);
                    var quadCmd = result.quadCmd;

                    renderer.render();

                    expect(gl.drawArrays).toCalledWith("TRIANGLES",0,24);
                });
                it("else, drawElements", function(){
                    var result = addCommand();
                    var quadCmd = result.quadCmd;

                    renderer.render();

                    var indexBuffer = quadCmd.buffers.getChild(wd.EBufferDataType.INDICE);

                    expect(gl.bindBuffer.args.slice(-1)).toEqual([[gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer]]);
                    expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indexBuffer.count, indexBuffer.type, indexBuffer.typeSize * 0);
                });
            });
        });

        describe("if skyboxCommand exist, execute skyboxCommand", function(){
            it("set depthFunc to be LEQUAL, then execute skyboxCommand, then restore depthFunc to be LESS", function(){
                var depthFuncValArr = [];
                var stub = sandbox.stub();

                testTool.stubGetterSetter(sinon, wd.DeviceManager.prototype, "depthFunc", null, function(val){
                        depthFuncValArr.push(val);
                    });
                cmd = {
                    execute: sandbox.stub()
                };
                renderer.skyboxCommand = cmd;

                renderer.render();

                expect(depthFuncValArr).toEqual([
                    "LEQUAL", "LESS"
                ]);
                expect(cmd.execute).toCalledOnce();
            });
        });

        it("clear command", function(){
            var result = addCommand();
            sandbox.stub(result.quadCmd, "execute");

            renderer.render();

            expect(renderer._commandQueue.getCount()).toEqual(0);
        });
    });

    describe("hasCommand", function(){
        beforeEach(function(){

        });

        it("if has skyboxCommand, return true", function(){
            renderer.skyboxCommand = wd.QuadCommand.create();

            expect(renderer.hasCommand()).toBeTruthy();
        });
        it("if has QuadCommand, return true", function(){
            renderer.skyboxCommand = null;
            renderer.addCommand(wd.QuadCommand.create());

            expect(renderer.hasCommand()).toBeTruthy();
        });
        it("else, return false", function(){
            expect(renderer.hasCommand()).toBeFalsy();
        });
    });
});
