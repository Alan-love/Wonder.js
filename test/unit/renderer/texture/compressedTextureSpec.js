describe("compressed texture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var director = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = wd.Texture;
        texture = new Texture();
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

            NEAREST:"NEAREST",
            NEAREST_MIPMAP_MEAREST:"NEAREST_MIPMAP_MEAREST",
            NEAREST_MIPMAP_LINEAR:"NEAREST_MIPMAP_LINEAR",
            LINEAR:"LINEAR",
            LINEAR_MIPMAP_NEAREST:"LINEAR_MIPMAP_NEAREST",
            LINEAR_MIPMAP_LINEAR:"LINEAR_MIPMAP_LINEAR",

            bindTexture:sandbox.stub(),
            activeTexture:sandbox.stub(),
            texImage2D: sandbox.stub(),
            compressedTexImage2D: sandbox.stub(),
            pixelStorei:sandbox.stub(),
            texParameteri:sandbox.stub(),
            texParameterf:sandbox.stub(),
            generateMipmap:sandbox.stub()

        };
        testTool.extend(gl, testTool.buildFakeGl(sandbox));
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", gl);
    });
    afterEach(function () {
        wd.Director._instance = null;
        sandbox.restore();
    });

    describe("integration test", function(){
        var program = null;
        var gpuDetector = null;

        function loadCompressedTexture(onload){
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath  + "test/res/disturb_dxt1_mip.dds", id:"compressedTexture"}
            ]).subscribe(null, null,
                function(){
                    var texture = wd.TextureLoader.getInstance().get("compressedTexture").toTexture();

                    texture.width = 128;
                    texture.height = 128;

                    onload(texture);
                });
        }

        beforeEach(function(){
            gpuDetector = {
                maxTextureSize: 1000,
                maxTextureUnit:16
            };
            gpuDetector.extensionCompressedTextureS3TC = {
                COMPRESSED_RGB_S3TC_DXT1_EXT: "COMPRESSED_RGB_S3TC_DXT1_EXT"
            };

            sandbox.stub(wd.GPUDetector, "getInstance").returns(gpuDetector);
        });
        afterEach(function(){
        });
        afterAll(function(){
            //put release cache to the last, so it can use the res cache during testing
            wd.LoaderManager.getInstance().dispose();
        });

        describe("sourceRegion", function(){
            var canvas,ctx;

            beforeEach(function(){
                ctx = {
                    drawImage:sandbox.stub()
                };
                canvas = {
                    getContext: sandbox.stub().returns(ctx)
                };
                sandbox.stub(document, "createElement").returns(canvas);
                texture.width = 100;
                texture.height = 100;

                program = {
                    sendUniformData:sandbox.stub()
                };
            });

                describe("sourceRegionMethod always be CHANGE_TEXCOORDS_IN_GLSL, because canvas->drawImage can't draw the compressed texture's data.", function(){
                    it("test default", function(done){
                        loadCompressedTexture(function(texture){
                            texture.sourceRegion = wd.RectRegion.create(12.8, 25.6, 12.8, 25.6);

                            texture.update(0);

                            texture.sendData(program, 0);

                            expect(testTool.getValues(program.sendUniformData.secondCall.args[2])).toEqual(testTool.getValues(wd.RectRegion.create(0.1, 0.6, 0.1, 0.2)));

                            done();
                        });
                    });
                    it("if it's DRAW_IN_CANVAS, assertion and still be CHANGE_TEXCOORDS_IN_GLSL", function(done){
                        loadCompressedTexture(function(texture){
                            texture.sourceRegion = wd.RectRegion.create(12.8, 25.6, 12.8, 25.6);
                            texture.sourceRegionMethod = wd.ETextureSourceRegionMethod.DRAW_IN_CANVAS;
                            sandbox.stub(wd.Log, "assert");

                            texture.update(0);

                            expect(wd.Log.assert).toCalled();
                            expect(texture.sourceRegionMethod).toEqual(wd.ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL);

                            done();
                        });
                    });
                });
        });

        describe("mipmap", function(){
            function buildMipmap(){
                return {
                    width:128,
                    height:56,
                    data: []
                };
            }

            describe("compressed texture", function(){
                it("can't auto generate mipmap default", function(done){
                    loadCompressedTexture(function(texture){
                        expect(texture.generateMipmaps).toBeFalsy();

                        done();
                    });
                });
                it("if texture isn't power of two or texture contain multi mipmaps, don't generate mipmap", function(done){
                    loadCompressedTexture(function(texture){
                        texture.generateMipmaps = true;
                        texture.width = 100;
                        texture.height = 50;

                        texture.update(0);

                        expect(gl.generateMipmap).not.toCalled();

                        texture.generateMipmaps = true;
                        texture.width = 128;
                        texture.height = 128;
                        texture.mipmaps.removeAllChildren();
                        var mipmap1 = buildMipmap();
                        var mipmap2 = buildMipmap();

                        texture.mipmaps.addChild(mipmap1);
                        texture.mipmaps.addChild(mipmap2);
                        texture.update(0);

                        expect(gl.generateMipmap).not.toCalled();

                        done();
                    });
                });
                it("if format is RGBA, use texImage2D", function(done){
                    loadCompressedTexture(function(texture){
                        texture.format = wd.ETextureFormat.RGBA;
                        texture.mipmaps.removeAllChildren();

                        var mipmap1 = buildMipmap();
                        var mipmap2 = buildMipmap();

                        texture.mipmaps.addChild(mipmap1);
                        texture.mipmaps.addChild(mipmap2);

                        texture.update(0);

                        expect(gl.texImage2D.firstCall).toCalledWith(gl.TEXTURE_2D, 0, gl.RGBA, mipmap1.width, mipmap1.height, 0,  gl.RGBA, gl.UNSIGNED_BYTE, mipmap1.data);
                        expect(gl.texImage2D.secondCall).toCalledWith(gl.TEXTURE_2D, 1, gl.RGBA, mipmap2.width, mipmap2.height, 0,  gl.RGBA, gl.UNSIGNED_BYTE, mipmap2.data);

                        done();
                    });
                });
                it("else, use compressedTexImage2D", function(done){
                    loadCompressedTexture(function(texture){
                        texture.mipmaps.removeAllChildren();
                        var format = gpuDetector.extensionCompressedTextureS3TC.
                            COMPRESSED_RGB_S3TC_DXT1_EXT;

                        var mipmap1 = buildMipmap();
                        var mipmap2 = buildMipmap();

                        texture.mipmaps.addChild(mipmap1);
                        texture.mipmaps.addChild(mipmap2);

                        texture.update(0);

                        expect(gl.compressedTexImage2D.firstCall).toCalledWith(gl.TEXTURE_2D, 0, format, mipmap1.width, mipmap1.height, 0, mipmap1.data);
                        expect(gl.compressedTexImage2D.secondCall).toCalledWith(gl.TEXTURE_2D, 1, format, mipmap2.width, mipmap2.height, 0, mipmap2.data);

                        done();
                    });
                });
            });
        });
    });
});

