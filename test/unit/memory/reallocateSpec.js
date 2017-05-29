describe("reallocate memory", function() {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("reallocate if dispose too many", function() {
        var MemoryConfig = wd.MemoryConfig;

        describe("test Tag", function() {
            var TagData = wd.TagData;

            var tag1,
                gameObject1;
            var tag2;
            var gameObject2;


            beforeEach(function(){
                tag1 = tagTool.create(2);

                gameObject1 = gameObjectTool.create();

                tagTool.addTag(tag1, "aaa");
                tagTool.addTag(tag1, "bbb");

                gameObjectTool.addComponent(gameObject1, tag1);
            });

            beforeEach(function(){
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 1);

                tag2 = tagTool.create(2);

                gameObject2 = gameObjectTool.create();

                tagTool.addTag(tag2, "qqq");

                gameObjectTool.addComponent(gameObject2, tag2);
            });

            it("new tagArray should has no holes", function(){
                gameObjectTool.disposeComponent(gameObject1, tag1);

                expect(TagData.tagArray).toEqual(["qqq"]);
            });
            it("new gameObjectMap,slotCountMap,usedSlotCountMap,indexMap,indexInTagArrayMap,tagMap should only has not-removed data", function(){
                gameObjectTool.disposeComponent(gameObject1, tag1);

                expect(TagData.gameObjectMap).toEqual({
                    0:gameObject2
                });
                expect(TagData.slotCountMap).toEqual([2]);
                expect(TagData.usedSlotCountMap).toEqual([1]);
                expect(TagData.tagMap).toEqual({
                    0:tag2
                });
                expect(TagData.indexMap).toEqual([0]);
            });
            it("new indexInTagArrayMap should only has not-removed data and next data", function(){
                gameObjectTool.disposeComponent(gameObject1, tag1);

                expect(TagData.indexInTagArrayMap).toEqual([0, 2]);
            });
            it("tag index should be update", function () {
                gameObjectTool.disposeComponent(gameObject1, tag1);

                expect(tag1.index).toEqual(-1);
                expect(tag2.index).toEqual(0);
                expect(tagTool.findGameObjectsByTag("qqq")).toEqual([gameObject2]);
            });
            it("test maxComponentDisposeCount > 1", function () {
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);

                var tag3 = tagTool.create(1);

                var gameObject3 = gameObjectTool.create();

                tagTool.addTag(tag3, "www");

                gameObjectTool.addComponent(gameObject3, tag3);

                gameObjectTool.disposeComponent(gameObject3, tag3);
                gameObjectTool.disposeComponent(gameObject2, tag2);

                expect(tag1.index).toEqual(0);
                expect(tag2.index).toEqual(-1);
                expect(tag3.index).toEqual(-1);
                expect(tagTool.findGameObjectsByTag("qqq")).toEqual([]);
                expect(tagTool.findGameObjectsByTag("www")).toEqual([]);
                expect(tagTool.findGameObjectsByTag("aaa")).toEqual([gameObject1]);
                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
            });

            describe("test add new tag after dispose old one", function () {
                it("findGameObjects by removed tag should return empty array", function () {
                    gameObjectTool.disposeComponent(gameObject1, tag1);
                    gameObjectTool.disposeComponent(gameObject2, tag2);


                    var tag3 = tagTool.create(1);

                    var gameObject3 = gameObjectTool.create();

                    tagTool.addTag(tag3, "ttt");

                    gameObjectTool.addComponent(gameObject3, tag3);

                    expect(tagTool.findGameObjectsByTag("ttt")).toEqual([gameObject3]);
                });
                it("test maxComponentDisposeCount > 1", function () {
                    sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);

                    var tag3 = tagTool.create(1);

                    var gameObject3 = gameObjectTool.create();

                    tagTool.addTag(tag3, "www");

                    gameObjectTool.addComponent(gameObject3, tag3);

                    gameObjectTool.disposeComponent(gameObject3, tag3);
                    gameObjectTool.disposeComponent(gameObject2, tag2);




                    var tag4 = tagTool.create(3);

                    var gameObject4 = gameObjectTool.create();

                    tagTool.addTag(tag4, "ttt");
                    tagTool.addTag(tag4, "mmm");

                    gameObjectTool.addComponent(gameObject4, tag4);

                    expect(tagTool.findGameObjectsByTag("ttt")).toEqual([gameObject4]);
                    expect(tagTool.findGameObjectsByTag("mmm")).toEqual([gameObject4]);
                });
            });
        });

        describe("test GameObject", function() {
            var GameObjectData = wd.GameObjectData;

            var gameObject;
            var parent,child,child11;

            beforeEach(function(){
                gameObject = gameObjectTool.create();

                parent = gameObjectTool.create();
                gameObjectTool.add(parent, gameObject);

                child = gameObjectTool.create();
                gameObjectTool.add(gameObject, child);

                child11 = gameObjectTool.create();
                gameObjectTool.add(child, child11);
            });

            beforeEach(function(){
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 1);
            });

            it("new parentMap,childrenMap,componentMap should only has not-removed data", function(){
                gameObjectTool.dispose(child);

                var parentMap = {};
                parentMap[gameObject.uid] = parent;
                parentMap[parent.uid] = undefined;
                expect(GameObjectData.parentMap).toEqual(parentMap);

                var childrenMap = {};
                childrenMap[parent.uid] = [gameObject];
                childrenMap[gameObject.uid] = [];
                expect(GameObjectData.childrenMap).toEqual(childrenMap);

                expect(GameObjectData.componentMap[parent.uid]).toBeExist();
                expect(GameObjectData.componentMap[gameObject.uid]).toBeExist();
                expect(GameObjectData.componentMap[child.uid]).not.toBeExist();
                expect(GameObjectData.componentMap[child11.uid]).not.toBeExist();
            });
            it("test maxComponentDisposeCount > 1", function () {
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);

                gameObjectTool.dispose(child);


                var parentMap = {};
                parentMap[gameObject.uid] = parent;
                parentMap[child.uid] = undefined;
                parentMap[child11.uid] = undefined;
                expect(GameObjectData.parentMap).toEqual(parentMap);




                gameObjectTool.dispose(gameObject);


                var parentMap = {};
                parentMap[parent.uid] = undefined;
                expect(GameObjectData.parentMap).toEqual(parentMap);

                var childrenMap = {};
                childrenMap[parent.uid] = [];
                expect(GameObjectData.childrenMap).toEqual(childrenMap);

                expect(GameObjectData.componentMap[parent.uid]).toBeExist();
                expect(GameObjectData.componentMap[gameObject.uid]).not.toBeExist();
                expect(GameObjectData.componentMap[child.uid]).not.toBeExist();
                expect(GameObjectData.componentMap[child11.uid]).not.toBeExist();
            });

            describe("test add new one after dispose old one", function () {
                it("test maxComponentDisposeCount === 1", function () {
                    gameObjectTool.dispose(child11);


                    var parentMap = {};
                    parentMap[parent.uid] = undefined;
                    parentMap[gameObject.uid] = parent;
                    parentMap[child.uid] = gameObject;
                    expect(GameObjectData.parentMap).toEqual(parentMap);




                    var child2 = gameObjectTool.create();

                    gameObjectTool.add(child, child2);

                    var parentMap = {};
                    parentMap[parent.uid] = undefined;
                    parentMap[gameObject.uid] = parent;
                    parentMap[child.uid] = gameObject;
                    parentMap[child2.uid] = child;
                    expect(GameObjectData.parentMap).toEqual(parentMap);


                    var childrenMap = {};
                    childrenMap[parent.uid] = [gameObject];
                    childrenMap[gameObject.uid] = [child];
                    childrenMap[child.uid] = [child2];
                    expect(GameObjectData.childrenMap).toEqual(childrenMap);
                });
                it("test maxComponentDisposeCount > 1", function () {
                    sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 3);

                    var gameObject2 = gameObjectTool.create();

                    gameObjectTool.dispose(gameObject2);
                    gameObjectTool.dispose(child11);
                    gameObjectTool.dispose(gameObject);


                    var parentMap = {};
                    parentMap[parent.uid] = undefined;
                    expect(GameObjectData.parentMap).toEqual(parentMap);




                    var child2 = gameObjectTool.create();

                    gameObjectTool.add(parent, child2);

                    var parentMap = {};
                    parentMap[parent.uid] = undefined;
                    parentMap[child2.uid] = parent;
                    expect(GameObjectData.parentMap).toEqual(parentMap);


                    var childrenMap = {};
                    childrenMap[parent.uid] = [child2];
                    expect(GameObjectData.childrenMap).toEqual(childrenMap);
                });
            });
        });
    });
});

