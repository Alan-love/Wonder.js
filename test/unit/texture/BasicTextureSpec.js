describe("BasicTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var mapManager = null;
    var director = null;
    var gl = null;

    function buildTexture() {
        var texture = new Texture();

        texture.allocateSourceToTexture = sandbox.stub();

        return texture;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = wd.BasicTexture;
        texture = buildTexture();
        mapManager = wd.MapManager.create();
        director = wd.Director.getInstance();
        gl = {
            TEXTURE_2D: "TEXTURE_2D",
            TEXTURE_WRAP_S: "TEXTURE_WRAP_S",
            TEXTURE_WRAP_T: "TEXTURE_WRAP_T",
            TEXTURE_MAG_FILTER: "TEXTURE_MAG_FILTER",
            TEXTURE_MIN_FILTER: "TEXTURE_MIN_FILTER",
            RGB: "RGB",
            RGBA: "RGBA",
            UNSIGNED_BYTE: "UNSIGNED_BYTE",

            TEXTURE0: "TEXTURE0",
            TEXTURE1: "TEXTURE1",

            REPEAT: "REPEAT",
            MIRRORED_REPEAT: "MIRRORED_REPEAT",
            CLAMP_TO_EDGE: "CLAMP_TO_EDGE",

            NEAREST: "NEAREST",
            NEAREST_MIPMAP_MEAREST: "NEAREST_MIPMAP_MEAREST",
            NEAREST_MIPMAP_LINEAR: "NEAREST_MIPMAP_LINEAR",
            LINEAR: "LINEAR",
            LINEAR_MIPMAP_NEAREST: "LINEAR_MIPMAP_NEAREST",
            LINEAR_MIPMAP_LINEAR: "LINEAR_MIPMAP_LINEAR",

            bindTexture: sandbox.stub(),
            activeTexture: sandbox.stub(),
            texImage2D: sandbox.stub(),
            compressedTexImage2D: sandbox.stub(),
            pixelStorei: sandbox.stub(),
            texParameteri: sandbox.stub(),
            texParameterf: sandbox.stub(),
            generateMipmap: sandbox.stub()
        };
        cloneTool.extend(gl, testTool.buildFakeGl(sandbox));
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", gl);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });


    describe("sendData", function(){
        var program = null;

        beforeEach(function(){
            program = {
                sendUniformData:sandbox.stub()
            };
        });

        it("send texture unit index", function(){
            texture.sendData(program, 100, 1);

            expect(program.sendUniformData.firstCall).toCalledWith(100, wd.EVariableType.SAMPLER_2D, 1);
        });

    });

    describe("sourceRegionForGLSL(getter)", function(){
        beforeEach(function(){
        });

        describe("if sourceRegionMethod is CHANGE_TEXCOORDS_IN_GLSL", function(){
            beforeEach(function(){
                texture.width = 100;
                texture.height = 100;

                texture.sourceRegionMethod = wd.ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
            });

            it("if sourceRegion is based on canvas coordinate system, convert it to webgl coordinate stystem", function(){
                texture.sourceRegionMapping = wd.ETextureSourceRegionMapping.CANVAS;
                texture.sourceRegion = wd.RectRegion.create(10, 20, 50, 40);

                var sourceRegion = texture.sourceRegionForGLSL;

                expect(testTool.getValues(sourceRegion)).toEqual(testTool.getValues(wd.RectRegion.create(0.1, 0.4, 0.5, 0.4 )));
            });
            it("else, directly set it", function(){
                texture.sourceRegionMapping = wd.ETextureSourceRegionMapping.UV;
                texture.sourceRegion = wd.RectRegion.create(0.1, 0.1, 0.5, 0.6);

                var sourceRegion = texture.sourceRegionForGLSL;

                expect(testTool.getValues(sourceRegion)).toEqual(testTool.getValues(wd.RectRegion.create(0.1, 0.1, 0.5, 0.6)));
            });
        });

        it("else, return (0,0,1,1)", function () {
            texture.sourceRegionMethod = wd.ETextureSourceRegionMethod.DRAW_IN_CANVAS;

            var sourceRegion = texture.sourceRegionForGLSL;

            expect(testTool.getValues(sourceRegion)).toEqual(testTool.getValues(wd.RectRegion.create(0,0,1,1)));
        });

        describe("test cache", function(){
            beforeEach(function(){
                texture.sourceRegionMethod = wd.ETextureSourceRegionMethod.DRAW_IN_CANVAS;
            });

            it("if sourceRegion not dirty, return cached data", function () {
                var sourceRegion1 = texture.sourceRegionForGLSL;
                var sourceRegion2 = texture.sourceRegionForGLSL;

                expect(sourceRegion1 === sourceRegion2).toBeTruthy();
            });

            describe("test cache miss", function(){
                it("if dirty, cache miss", function () {
                    var sourceRegion1 = texture.sourceRegionForGLSL;

                    texture.sourceRegion = wd.RectRegion.create(1,2,3,1);

                    var sourceRegion2 = texture.sourceRegionForGLSL;

                    expect(sourceRegion1 === sourceRegion2).toBeFalsy();
                });
                it("if not cached, cache miss", function () {
                    var sourceRegion1 = texture.sourceRegionForGLSL;

                    texture.dispose();

                    var sourceRegion2 = texture.sourceRegionForGLSL;

                    expect(sourceRegion1 === sourceRegion2).toBeFalsy();
                });
            });
        });
    });

    describe("update", function(){
        beforeEach(function(){
            sandbox.stub(texture, "bindToUnit");
            sandbox.stub(wd.GPUDetector, "getInstance").returns({
                maxTextureSize: 50
            });
        });

        it("if repeat texture and draw part of texture by changing texcoords in glsl, warn", function () {
            testTool.openContractCheck(sandbox);
            sandbox.stub(wd.Log, "warn");
            texture.sourceRegion = wd.RectRegion.create(100, 0, 100, 200);
            texture.sourceRegionMethod = wd.ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
            texture.repeatRegion = wd.RectRegion.create(0, 0.5, 1, 2);

            texture.update();

            expect(wd.Log.warn).toCalledWith("the glsl->texCoord data may be wrong due to both repeating texture and drawing part of texture by changing texcoords in glsl");
        });
        it("set pixelStorei", function(){
            texture.packAlignment = 2;
            texture.unpackAlignment = 4;
            texture.flipY = true;
            texture.premultiplyAlpha = true;
            texture.colorspaceConversion = gl.NONE;

            texture.update();

            expect(gl.pixelStorei.withArgs(gl.PACK_ALIGNMENT, 2)).toCalledOnce();
            expect(gl.pixelStorei.withArgs(gl.UNPACK_ALIGNMENT, 4)).toCalledOnce();
            expect(gl.pixelStorei.withArgs(gl.UNPACK_FLIP_Y_WEBGL, true)).toCalledOnce();
            expect(gl.pixelStorei.withArgs(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)).toCalledOnce();
            expect(gl.pixelStorei.withArgs(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE)).toCalledOnce();
        });

        it("if source's size exceed max size, then make souce to be canvas and scale the canvas", function(done){
            texture.source = new Image();
            texture.source.src = testTool.resPath + "test/res/1.jpg";

            texture.source.width = 50;
            texture.source.height = 100;

            texture.source.onload = function(){
                texture.update(0);

                expect(texture.source.width).toEqual(25);
                expect(texture.source.height).toEqual(50);

                done();
            }

        });
        //todo complete the test
    });
});

