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
            expect(materialTool.getColor(material)).toEqual(Color.create("#ffffff"));
        });
    });

    describe("setColor", function() {
        beforeEach(function(){

        });

        it("set color", function(){
            var color = Color.create("#123456");

            materialTool.setColor(material, color);

            expect(materialTool.getColor(material)).toEqual(color);
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

        it("has no default value", function(){
            expect(materialTool.getAlphaTest(material)).toBeUndefined();
        });
    });
    
    describe("create", function() {
        beforeEach(function(){
        });
        
        it("same Material(same class name) share one shader", function(){
            var mat2 = basicMaterialTool.create();
            var mat3 = basicMaterialTool.create();
            var shader = new Shader();
            shader.index = 0;

            expect(MaterialData.shaderMap).toEqual({
                0:shader,
                1:shader,
                2:shader
            })
        });
    });

    describe("init", function() {
        beforeEach(function(){
            
        });
        
        it("should not dispose any material before init", function(){
            var mat2 = basicMaterialTool.create();

            var obj2 = gameObjectTool.create();
            gameObjectTool.addComponent(obj2, mat2);

            gameObjectTool.disposeComponent(obj, material);

            expect(function(){
                directorTool.init(sandbox);
            }).toThrow("ComponentData.index should === ComponentData.count");
        });
        it("shader should only be init once", function () {
            var mat2 = basicMaterialTool.create();

            var obj2 = gameObjectTool.create();
            gameObjectTool.addComponent(obj2, mat2);

            directorTool.init(state);

            expect(gl.linkProgram).toCalledOnce();
        });
    });

    describe("disposeComponent", function() {
        var count;

        beforeEach(function(){
            count = MaterialData.count;
            gameObjectTool.disposeComponent(obj, material);
        });

        it("remove from gameObject", function () {
            expect(gameObjectTool.hasComponent(obj, wd.Material)).toBeFalsy();
            expect(materialTool.getGameObject(material)).toBeUndefined();
        });
        it("remove from shaderMap", function () {
            expect(MaterialData.shaderMap[material.index]).toBeUndefined();
        });
        it("remove from materialClassNameMap", function () {
            expect(MaterialData.materialClassNameMap[material.index]).toBeUndefined();
        });
        it("remove from colorMap", function () {
            expect(materialTool.getColor(material)).toBeUndefined();
        });
        it("count - 1", function () {
            expect(MaterialData.count).toEqual(count - 1);
        });
        it("test gameObject add new material after dispose old one", function () {
            stateTool.setState(stateTool.createFakeGLState(sandbox));
            var mat2 = basicMaterialTool.create();

            gameObjectTool.addComponent(obj, mat2);

            materialTool.initMaterial(mat2);


            expect(materialTool.getColor(material)).toBeUndefined();
            expect(materialTool.getColor(mat2)).toBeExist();
        });
    });
});
