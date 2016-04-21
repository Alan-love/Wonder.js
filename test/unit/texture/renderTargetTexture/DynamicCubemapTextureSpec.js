describe("DynamicCubemapTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = wd.DynamicCubemapTexture;
        texture = new Texture();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        cloneTool.extend(wd.DeviceManager.getInstance().gl, {
            TEXTURE_CUBE_MAP_POSITIVE_X:0,
            TEXTURE_CUBE_MAP_NEGATIVE_X:1,
            TEXTURE_CUBE_MAP_POSITIVE_Y:2,
            TEXTURE_CUBE_MAP_NEGATIVE_Y:3,
            TEXTURE_CUBE_MAP_POSITIVE_Z:4,
            TEXTURE_CUBE_MAP_NEGATIVE_Z:5
        });

        gl = wd.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("createEmptyTexture", function(){
        var glTexture;

        beforeEach(function(){
            glTexture = {};
            gl.createTexture.returns(glTexture);

            sandbox.stub(texture, "setEmptyTexture");
        });

        it("set empty texture", function(){
            texture.createEmptyTexture();

            expect(texture.setEmptyTexture).toCalledWith(glTexture);
        });
        it("create six faces' null source", function(){
            texture.width = 100;
            texture.height = 200;

            texture.createEmptyTexture();

            expect(gl.texImage2D.getCall(0)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(1)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(2)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(3)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(4)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(5)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        });
        it("set glTexture", function(){
            var webGlTexture = {};
            gl.createTexture.returns(webGlTexture);

            texture.createEmptyTexture();

            expect(texture.glTexture).toEqual(webGlTexture);
        });
    });

    describe("sendData", function () {
        var program;

        beforeEach(function () {
            program = {
                sendUniformData: sandbox.stub(),
                getUniformLocation: sandbox.stub(),
                isUniformDataNotExistByLocation: sandbox.stub().returns(false)
            };
        });

        it("send texture sampler", function () {
            var pos2 = 100;
            program.getUniformLocation.onCall(1).returns(pos2);
            var material = wd.BasicMaterial.create();
            var map = new wd.ImageTexture();
            material.map = map;

            texture.mode = wd.EEnvMapMode.REFLECTION;
            material.envMap = texture;




            material.mapManager.sendData(program);




            expect(program.sendUniformData).toCalledWith("u_samplerCube0", wd.EVariableType.SAMPLER_CUBE, 0);
        });
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("shallow clone renderList(shallow clone Hash and its collection list)", function(){
            var gameObject1 = wd.GameObject.create();
            var renderList = wdCb.Hash.create({
                "px": wdCb.Collection.create([gameObject1])
            }) ;

            cloneTool.extend(texture, {
                renderList:renderList
            })

            var result = texture.clone();

            expect(result.renderList === renderList).toBeFalsy();

            expect(result.renderList.getChild("px") === texture.renderList.getChild("px")).toBeFalsy();
            judgeTool.isObjectEqual(result.renderList.getChild("px").getChild(0), gameObject1);
        });
        it("clone data", function () {
            var size = 10,
                near = 10,
                far = 20,
                mode = wd.EEnvMapMode.FRESNEL;

            cloneTool.extend(texture, {
                    size: size,
                    near: near,
                far: far,
                mode: mode
            })

            var result = texture.clone();

            expect(result.size).toEqual(size);
            expect(result.near).toEqual(near);
            expect(result.far).toEqual(far);
            expect(result.mode).toEqual(mode);
        });

    });
});

