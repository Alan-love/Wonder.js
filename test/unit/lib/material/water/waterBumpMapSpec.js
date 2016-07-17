describe("water bumpMap", function () {
    var sandbox = null;
    var material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = wd.WaterMaterial.create();
        material.geometry = {
            entityObject:wd.GameObject.create()
        }
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("integration test", function () {
        var cmd;

        beforeEach(function () {
            wd.Director.getInstance().scene.currentCamera = wd.GameObject.create();


            cmd = rendererTool.createSingleDrawCommand(sandbox);

            cmd.material = material;
        });

        describe("send glsl data", function(){
            var bumpMap;

            beforeEach(function(){
                bumpMap = wd.ImageTexture.create();

                material.bumpMap = bumpMap;
            });

            describe("send u_windMatrix", function () {
                var direction,time;

                beforeEach(function(){
                    direction = wd.Vector2.create(0.5, 1);
                    time = 1;
                    material.wind.direction = direction;
                    material.wind.time = time;
                });

                it("change matrix by compute time before update shader", function () {
                    material.init();
                    sandbox.spy(material.program, "sendUniformData");



                    material.updateShader(cmd);

                    time += 0.0001;
                    expect(material.program.sendUniformData).toCalledWith("u_windMatrix", wd.EVariableType.FLOAT_MAT4,
                        wd.Matrix4.create().translate(direction.x * time, direction.y * time, 0)
                    );
                });
            });

            describe("test glsl source", function(){
                beforeEach(function(){
                });

                it("test uniform data", function(){
                    material.init();

                    material.updateShader(cmd);

                    shaderTool.judgeGLSLUniformData(material.shader.vsSource, "u_windMatrix");
                });
            });
        });
    });
});

