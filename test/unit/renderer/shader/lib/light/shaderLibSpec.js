describe("shaderLibSpec", function () {
    var sandbox = null;
    //var Lib = null;
    //var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    it("send a_texCoord only one time even has multi maps", function () {

        var material = wd.LightMaterial.create();
        rendererTool.setFakeGeometry(material)




        var cmd = rendererTool.createQuadCommand(sandbox);

        cmd.material = material;


        cmd.buffers.getChild.withArgs(wd.EBufferDataType.TEXCOORD).returns([0.1,0.2]);


        var map1 = wd.ImageTexture.create();
        var map2 = wd.ImageTexture.create();




        material.diffuseMap = map1;
        material.specularMap = map2;





        material.init();



        sandbox.stub(material.program, "sendUniformData");
        sandbox.stub(material.program, "sendAttributeBuffer");



        var pos = 1;
        sandbox.stub(material.program, "getUniformLocation").returns(pos);




        wd.Director.getInstance().scene = wd.SceneDispatcher.create();

        wd.Director.getInstance().scene.currentCamera = wd.GameObject.create()

        material.updateShader(cmd);


        expect(material.program.sendAttributeBuffer.withArgs("a_texCoord")).toCalledOnce();
    });
});

