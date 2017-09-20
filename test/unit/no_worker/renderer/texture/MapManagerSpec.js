describe("MapManager", function() {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var texture;

    var gl;
    var state;

    var DataBufferConfig = wd.DataBufferConfig;
    var MapManagerData = wd.MapManagerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneSystemTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);


        texture = textureSystemTool.create();
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("addMap", function() {
        beforeEach(function(){

        });

        it("test add first map", function(){
            basicMaterialTool.addMap(material, texture);

            expect(MapManagerData.textureIndices[material.index]).toEqual(texture.index);
        });
        it("test add second map", function () {
            var texture2 = textureSystemTool.create();

            basicMaterialTool.addMap(material, texture);
            basicMaterialTool.addMap(material, texture2);

            expect(MapManagerData.textureIndices[material.index]).toEqual(texture.index);
            expect(MapManagerData.textureIndices[material.index + 1]).toEqual(texture2.index);
        });
        it("check: map count shouldn't exceed 16", function () {
            sandbox.stub(DataBufferConfig, "textureDataBufferCount", 100);
            var texture = null;
            for(var i = 0; i < 16; i++){
                texture = textureSystemTool.create();

                basicMaterialTool.addMap(material, texture);
            }

            var texture2 = textureSystemTool.create();

            expect(function () {
                basicMaterialTool.addMap(material, texture2);
            }).toThrow("map count shouldn't exceed max count")
        });
    });

    // describe("getMap", function() {
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("", function(){
    //
    //     });
    // });
    //
    // describe("getMapList", function() {
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("", function(){
    //
    //     });
    // });
    //
    // describe("getMapCount", function() {
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("", function(){
    //
    //     });
    // });
    //
    //
    // describe("bindAndUpdate", function() {
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("", function(){
    //
    //     });
    // });

    describe("dispose", function(){
        describe("remove by swap with last one", function() {
            var obj2, mat2;

            beforeEach(function () {
                mat2 = basicMaterialTool.create();
                obj2 = gameObjectSystemTool.create();
                gameObjectSystemTool.addComponent(obj2, mat2);
                sceneSystemTool.addGameObject(obj2);
            });

            describe("test remove from type array", function() {
                beforeEach(function () {
                });

                describe("reset removed one's value", function() {
                    it("remove from textureCounts", function () {
                        var texture2 = textureSystemTool.create();

                        basicMaterialTool.addMap(material, texture);
                        basicMaterialTool.addMap(material, texture2);

                        basicMaterialTool.addMap(mat2, texture);

                        var index1 = material.index;
                        var index2 = mat2.index;

                        gameObjectSystemTool.disposeComponent(obj, material);

                        expect(MapManagerData.textureCounts[index1]).toEqual(1);
                        expect(MapManagerData.textureCounts[index2]).toEqual(0);
                    });
                });
            });

            describe("test remove from map", function() {
                beforeEach(function(){
                });

                describe("swap with last one and remove the last one", function(){
                    it("remove from materialTextureList", function () {
                        var texture2 = textureSystemTool.create();

                        basicMaterialTool.addMap(material, texture);
                        basicMaterialTool.addMap(material, texture2);

                        basicMaterialTool.addMap(mat2, texture);

                        var index1 = material.index;
                        var index2 = mat2.index;

                        gameObjectSystemTool.disposeComponent(obj, material);

                        expect(MapManagerData.materialTextureList[index1]).toEqual([texture.index]);
                        expect(MapManagerData.materialTextureList[index2]).toBeUndefined();
                    });
                });
            });
        });
    });
});
