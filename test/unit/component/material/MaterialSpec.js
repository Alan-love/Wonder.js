describe("Material", function() {
    var sandbox = null;
    var material = null;
    var obj;
    var gl;

    var Color = wd.Color;
    var MaterialData = wd.MaterialData;
    var Shader = wd.Shader;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("getColor", function() {
        beforeEach(function(){

        });

        it("default color is #ffffff", function(){
            colorTool.isEqual(materialTool.getColor(material), Color.create("#ffffff"), expect);
        });
    });

    describe("setColor", function() {
        beforeEach(function(){

        });

        it("set color", function(){
            var color = Color.create("#123456");

            materialTool.setColor(material, color);

            colorTool.isEqual(materialTool.getColor(material), color, expect);
        });
    });

    describe("getOpacity", function() {
        beforeEach(function(){

        });

        it("default is 1.0", function(){
            expect(materialTool.getOpacity(material)).toEqual(1.0);
        });
    });

    describe("getAlphaTest", function() {
        beforeEach(function(){

        });

        it("default is -1", function(){
            expect(materialTool.getAlphaTest(material)).toEqual(-1);
        });
    });
    
    describe("create", function() {
        beforeEach(function(){
        });
        
        it("same Material(same class name) share one shader", function(){
            var mat2 = basicMaterialTool.create();
            var mat3 = basicMaterialTool.create();
            var shaderIndex = 0;

            expect(materialTool.getShaderIndex(material.index)).toEqual(shaderIndex);
            expect(materialTool.getShaderIndex(mat2.index)).toEqual(shaderIndex);
            expect(materialTool.getShaderIndex(mat3.index)).toEqual(shaderIndex);
        });
    });

    describe("init", function() {
        beforeEach(function(){
            
        });
        
        // it("should not dispose any material before init", function(){
        it("can dispose any material before init", function(){
            var mat2 = basicMaterialTool.create();

            var obj2 = gameObjectTool.create();
            gameObjectTool.addComponent(obj2, mat2);

            gameObjectTool.disposeComponent(obj, material);

            expect(function(){
                directorTool.init(sandbox);
            }).not.toThrow();
        });
        it("shader should only be init once", function () {
            var mat2 = basicMaterialTool.create();

            var obj2 = gameObjectTool.create();
            gameObjectTool.addComponent(obj2, mat2);

            directorTool.init(state);

            expect(gl.linkProgram).toCalledOnce();
        });
    });

    describe("getGameObject", function() {
        beforeEach(function(){

        });

        it("get gameObject who has the material", function(){
            var mat2 = basicMaterialTool.create();

            var obj2 = gameObjectTool.create();
            gameObjectTool.addComponent(obj2, mat2);

            expect(materialTool.getGameObject(mat2)).toEqual(obj2);
        });
    });

    describe("disposeComponent", function() {
        var count;

        beforeEach(function(){
            count = MaterialData.count;
        });

        it("remove data by swap", function () {
            var mat2 = basicMaterialTool.create();
            var obj2 = gameObjectTool.create();
            gameObjectTool.addComponent(obj2, mat2);
            sceneTool.addGameObject(obj2);

            gameObjectTool.disposeComponent(obj, material);

            // expect(materialTool.getColor(material)).toBeUndefined();
            expect(materialTool.getColor(mat2)).toBeExist();
        });

        describe("test remove data", function() {
            beforeEach(function(){
                gameObjectTool.disposeComponent(obj, material);
            });

            it("remove from gameObject", function () {
                expect(gameObjectTool.hasComponent(obj, wd.Material)).toBeFalsy();
                // expect(materialTool.getGameObject(material)).toBeUndefined();
            });
            // it("remove from shaderMap", function () {
            //     expect(MaterialData.shaderMap[material.index]).toBeUndefined();
            // });
            // it("remove from materialClassNameMap", function () {
            //     expect(MaterialData.materialClassNameMap[material.index]).toBeUndefined();
            // });
            // it("remove from colorMap", function () {
            //     expect(materialTool.getColor(material)).toBeUndefined();
            // });
            it("count - 1", function () {
                expect(MaterialData.count).toEqual(count - 1);
            });
        });

        it("test gameObject add new material after dispose old one", function () {
            gameObjectTool.disposeComponent(obj, material);

            var mat2 = basicMaterialTool.create();

            gameObjectTool.addComponent(obj, mat2);

            materialTool.initMaterial(mat2);


            // expect(materialTool.getColor(material)).toBeUndefined();
            expect(materialTool.getColor(mat2)).toBeExist();
        });

        it("if material is disposed, operate it should error", function () {
            var errMsg = "component should alive";

            gameObjectTool.disposeComponent(obj, material);

            expect(function () {
                materialTool.getColor(material);
            }).toThrow(errMsg);

            expect(function () {
                materialTool.setColor(material, Color.create());
            }).toThrow(errMsg);

            expect(function () {
                materialTool.getOpacity(material);
            }).toThrow(errMsg);

            expect(function () {
                materialTool.setOpacity(material, 1);
            }).toThrow(errMsg);

            expect(function () {
                materialTool.getGameObject(material);
            }).toThrow(errMsg);

            expect(function () {
                materialTool.getAlphaTest(material);
            }).toThrow(errMsg);

            expect(function () {
                materialTool.setAlphaTest(material, 1);
            }).toThrow(errMsg);
        });
    });
});
