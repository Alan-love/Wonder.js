describe("GameObject", function() {
    var sandbox = null;
    var gameObject;

    var GameObjectData = wd.GameObjectData;
    var MaterialData = wd.MaterialData;

    function shouldAlive(gameObject, testFunc) {
        gameObjectTool.dispose(gameObject);

        expect(function () {
            testFunc(gameObject)
        }).toThrow("gameObject is diposed, should release it");
    }

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        gameObject = gameObjectTool.create();
    });
    afterEach(function() {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("add ThreeDTransform component after be created", function(){
        it("should has ThreeDTransform component", function () {
            expect(gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeTruthy();
        });
    });

    describe("dispose", function() {
        var parent,child,child11;

        beforeEach(function(){
            parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            child = gameObjectTool.create();
            gameObjectTool.add(gameObject, child);

            child11 = gameObjectTool.create();
            gameObjectTool.add(child, child11);

            testTool.closeContractCheck();
        });

        describe("test alive", function() {
            beforeEach(function(){

            });

            it("disposed one should not alive", function(){
                expect(gameObjectTool.isAlive(gameObject)).toBeTruthy();

                gameObjectTool.dispose(gameObject);

                expect(gameObjectTool.isAlive(gameObject)).toBeFalsy();
            });
            it("the children of disposed one should not alive", function () {
                expect(gameObjectTool.isAlive(gameObject)).toBeTruthy();

                gameObjectTool.dispose(gameObject);

                expect(gameObjectTool.isAlive(child)).toBeFalsy();
                expect(gameObjectTool.isAlive(child11)).toBeFalsy();
            });
        });

        // it("its parent should remove it", function () {
        //     var child2 = gameObjectTool.create();
        //     gameObjectTool.add(parent, child2);
        //
        //     gameObjectTool.dispose(gameObject);
        //
        //     expect(gameObjectTool.has(parent, gameObject)).toBeFalsy();
        //     expect(gameObjectTool.has(parent, child2)).toBeTruthy();
        // });
        it("should remove children", function () {
            gameObjectTool.dispose(gameObject);

            expect(gameObjectTool.has(gameObject, child)).toBeFalsy();
            expect(gameObjectTool.has(child, child11)).toBeFalsy();
        });
        it("its all components should be disposed", function () {
            var tra = gameObjectTool.getTransform(gameObject),
                tra1 = gameObjectTool.getTransform(child),
                tra11 = gameObjectTool.getTransform(child11);

            gameObjectTool.dispose(gameObject);

            threeDTransformTool.isNotAlive(tra);
            threeDTransformTool.isNotAlive(tra1);
            threeDTransformTool.isNotAlive(tra11);
        });
    });

    // describe("disposeBatchChildren", function() {
    //     var parent,child1,child2,child3,child11;
    //     var disposedChildren;
    //
    //     beforeEach(function(){
    //         parent = gameObjectTool.create();
    //
    //         child1 = gameObjectTool.create();
    //         gameObjectTool.add(parent, child1);
    //
    //         child11 = gameObjectTool.create();
    //         gameObjectTool.add(child1, child11);
    //
    //         child2 = gameObjectTool.create();
    //         gameObjectTool.add(parent, child2);
    //
    //         child3 = gameObjectTool.create();
    //         gameObjectTool.add(parent, child3);
    //
    //         disposedChildren = [
    //             child1,
    //             child2
    //         ]
    //     });
    //
    //     it("if disposed children not alive, error", function() {
    //         shouldAlive(child1, function (gameObject) {
    //             return gameObjectTool.disposeBatchChildren(disposedChildren, parent);
    //         })
    //
    //         shouldAlive(child2, function (gameObject) {
    //             return gameObjectTool.disposeBatchChildren(disposedChildren, parent);
    //         })
    //     });
    //
    //     it("remove from childrenMap", function () {
    //         gameObjectTool.disposeBatchChildren(disposedChildren, parent);
    //
    //         expect(gameObjectTool.has(parent, child1)).toBeFalsy();
    //         expect(gameObjectTool.has(parent, child2)).toBeFalsy();
    //         expect(gameObjectTool.has(parent, child3)).toBeTruthy();
    //     });
    //     it("disposed children all components should be disposed", function () {
    //         var tra = gameObjectTool.getTransform(parent),
    //             tra1 = gameObjectTool.getTransform(child1),
    //             tra2 = gameObjectTool.getTransform(child2),
    //             tra3 = gameObjectTool.getTransform(child3),
    //             tra11 = gameObjectTool.getTransform(child11);
    //
    //         gameObjectTool.disposeBatchChildren(disposedChildren, parent);
    //
    //         threeDTransformTool.isAlive(tra);
    //         threeDTransformTool.isNotAlive(tra1);
    //         threeDTransformTool.isNotAlive(tra2);
    //         threeDTransformTool.isNotAlive(tra3);
    //         threeDTransformTool.isNotAlive(tra11);
    //     });
    // });

    describe("getAliveChildren", function() {
        beforeEach(function(){
        });

        it("get alive children", function(){
            var parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            var child = gameObjectTool.create();
            gameObjectTool.add(gameObject, child);

            var child11 = gameObjectTool.create();
            gameObjectTool.add(child, child11);

            gameObjectTool.dispose(child);

            var parentChildren = gameObjectTool.getChildren(parent);
            var gameObjectChildren = gameObjectTool.getChildren(gameObject);
            expect(parentChildren).toEqual([gameObject]);
            expect(gameObjectChildren).toEqual([]);
        });
    });

    describe("initGameObject", function() {
        describe("init gameObject's all added components", function(){
            var material,geo;
            var gl;

            beforeEach(function(){
                var data = sceneTool.prepareGameObjectAndAddToScene(true);
                gameObject = data.gameObject;
                material = data.material;
                geo = data.geometry;

                var state = stateTool.createFakeGLState(sandbox);
                stateTool.setState(state);

                gl = stateTool.getGLFromFakeGLState(state);

                gameObjectTool.init(gameObject);
            });

            it("init material", function () {
                expect(gl.attachShader).toCalled();
            });
            it("init geometry", function () {
                expect(testTool.getValues(
                    geometryTool.getVertices(geo)
                )).toEqual([
                        -10, -10, 10, -10, 10, 10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, 10, 10, -10, 10, -10, 10, 10, 10, 10, 10, -10, 10, -10, 10, 10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10
                ])
            });
        });
    });
    
    describe("addComponent", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, error", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectTool.addComponent(gameObject, threeDTransformTool.create());
            })
        });
        it("if alreay has this type of component, error", function () {
            expect(function(){
               gameObjectTool.addComponent(gameObject, threeDTransformTool.create());
            }).toThrow("should not has this type of component, please dispose it");
        });
    });

    describe("getComponent", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectTool.getComponent(gameObject, wd.ThreeDTransform);
            })
        });
        it("if component exist, return it", function(){
            expect(gameObjectTool.getComponent(gameObject, wd.ThreeDTransform)).toBeInstanceOf(wd.ThreeDTransform);
        });
        it("else, return null", function () {
            gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(gameObjectTool.getComponent(gameObject, wd.ThreeDTransform)).toBeNull();
        });
    });

    describe("getTransform", function() {
        beforeEach(function(){

        });

        it("return transform component", function(){
            expect(gameObjectTool.getTransform(gameObject)).toBeInstanceOf(wd.ThreeDTransform);
        });
    });

    describe("hasComponent", function() {
        beforeEach(function(){

        });

        // it("if gameObject not alive, return null", function() {
        //     shouldAlive(gameObject, function (gameObject) {
        //         return gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform);
        //     })
        // });
        it("if has component, return true", function(){
            expect(gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeTruthy();
        });
        it("else, return false", function () {
            gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeFalsy();
        });
    });

    describe("disposeComponent", function() {
        beforeEach(function(){
        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));
            })
        });
        it("remove component", function(){
            gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeFalsy();
        });
        it("dispose component", function () {
            var transform = gameObjectTool.getTransform(gameObject);
            var pos = wd.Vector3.create(1,2,3);
            threeDTransformTool.setPosition(transform, pos);

            gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));

            threeDTransformTool.isNotAlive(transform);
        });
    });

    describe("build uid", function() {
        beforeEach(function(){
            testTool.clear(sandbox);
        });

        it("uid start from 0", function () {
            gameObject = gameObjectTool.create();

            expect(gameObject.uid).toEqual(0);
        });
        it("build unique uid when create", function () {
            gameObject = gameObjectTool.create();
            var gameObject2 = gameObjectTool.create();

            expect(gameObject.uid).toEqual(0);
            expect(gameObject2.uid).toEqual(1);
        });
        // it("test uid recycle", function () {
        //     var uidArr = [];
        //     var gameObjectArr = [];
        //
        //     for(var i = 0; i < 50; i++){
        //         gameObject = gameObjectTool.create();
        //         uidArr.push(gameObject.uid);
        //         gameObjectArr.push(gameObject);
        //     }
        //
        //
        //     for(var i = 0; i < 5; i++){
        //         gameObjectTool.dispose(gameObjectArr[i]);
        //     }
        //
        //
        //     for(var i = 0; i < 5; i++){
        //         gameObject = gameObjectTool.create();
        //         uidArr.push(gameObject.uid);
        //     }
        //
        //     expect(uidArr).toEqual([])
        // });
    });

    describe("addChild", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                var child = gameObjectTool.create();
                return gameObjectTool.add(gameObject, child);
            })
        });
        it("if child already has parent, remove it from old parent", function(){
            var parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            var parent2 = gameObjectTool.create();
            gameObjectTool.add(parent2, gameObject);

            expect(gameObjectTool.has(parent, gameObject)).toBeFalsy();
            expect(gameObjectTool.has(parent2, gameObject)).toBeTruthy();
        });
        it("set transform's parent", function () {
            var parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            var childTran = gameObjectTool.getTransform(gameObject);
            var parentTran = gameObjectTool.getTransform(parent);

            expect(threeDTransformTool.getParent(childTran)).toEqual(parentTran);
        });
        it("add child", function () {
            var parent = gameObjectTool.create();

            var child1 = gameObjectTool.create();
            var child2 = gameObjectTool.create();
            var child3 = gameObjectTool.create();
            var child31 = gameObjectTool.create();
            var child311 = gameObjectTool.create();
            gameObjectTool.add(parent, child1);
            gameObjectTool.add(parent, child2);
            gameObjectTool.add(parent, child3);
            gameObjectTool.add(child3, child31);
            gameObjectTool.add(child31, child311);

            expect(gameObjectTool.has(parent, child1)).toBeTruthy();
            expect(gameObjectTool.has(parent, child2)).toBeTruthy();
            expect(gameObjectTool.has(parent, child3)).toBeTruthy();
            expect(gameObjectTool.has(child3, child31)).toBeTruthy();
            expect(gameObjectTool.has(child31, child311)).toBeTruthy();
        });
    });

    describe("removeChild", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                var child = gameObjectTool.create();
                gameObjectTool.add(gameObject, child);

                return gameObjectTool.remove(gameObject, child);
            })
        });
        it("remove from parent", function() {
            var parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            gameObjectTool.remove(parent, gameObject);

            expect(gameObjectTool.has(parent, gameObject)).toBeFalsy();
        });
        it("remove child->transform from its parent", function () {
            var parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            var childTran = gameObjectTool.getTransform(gameObject);
            var parentTran = gameObjectTool.getTransform(parent);

            gameObjectTool.remove(parent, gameObject);

            expect(threeDTransformTool.getParent(childTran)).toBeNull();
        });
        it("remove child", function () {
            var parent = gameObjectTool.create();
            var child1 = gameObjectTool.create();
            var child2 = gameObjectTool.create();
            var child3 = gameObjectTool.create();
            var child31 = gameObjectTool.create();
            var child311 = gameObjectTool.create();
            gameObjectTool.add(parent, child1);
            gameObjectTool.add(parent, child2);
            gameObjectTool.add(parent, child3);
            gameObjectTool.add(child3, child31);
            gameObjectTool.add(child31, child311);

            gameObjectTool.remove(parent, child1);
            gameObjectTool.remove(child3, child31);

            expect(gameObjectTool.has(parent, child1)).toBeFalsy();
            expect(gameObjectTool.has(parent, child2)).toBeTruthy();
            expect(gameObjectTool.has(parent, child3)).toBeTruthy();
            expect(gameObjectTool.has(child3, child31)).toBeFalsy();
            expect(gameObjectTool.has(child31, child311)).toBeTruthy();
        });
    });
    
    describe("hasChild", function() {
        beforeEach(function(){
            
        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                var child = gameObjectTool.create();
                gameObjectTool.add(gameObject, child);

                return gameObjectTool.has(gameObject, child);
            })
        });
        it("if has no children, return false", function(){
            var child = gameObjectTool.create();
            // gameObjectTool.add(gameObject, child);

            expect(gameObjectTool.has(gameObject, child)).toBeFalsy();
        });
        it("if not has it, return false", function(){
            var child = gameObjectTool.create();
            var child2 = gameObjectTool.create();
            gameObjectTool.add(gameObject, child);

            expect(gameObjectTool.has(gameObject, child2)).toBeFalsy();
        });
        it("else, return true", function(){
            var child = gameObjectTool.create();
            var child2 = gameObjectTool.create();
            gameObjectTool.add(gameObject, child);

            expect(gameObjectTool.has(gameObject, child)).toBeTruthy();
        });
    });
});