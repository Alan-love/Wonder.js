// import * as sinon from "sinon";
// import { ThreeDTransform } from "../../../../dist/commonjs/component/transform/ThreeDTransform";
// import { GameObject } from "../../../../dist/commonjs/core/entityObject/gameObject/GameObject";
// import { Matrix4 } from "../../../../dist/commonjs/math/Matrix4";
// import { Vector3 } from "../../../../dist/commonjs/math/Vector3";
// import { initData } from "../../../../dist/commonjs/component/transform/ThreeDTransformSystem";
// import { ThreeDTransformData } from "../../../../dist/commonjs/component/transform/ThreeDTransformData";
// import { GlobalTempData } from "../../../../dist/commonjs/definition/GlobalTempData";
// import { testTool } from "../../testTool";

describe("ThreeDTransform", function(){
    var sandbox = null;
    var tra1, tra2, tra3;
    var obj1, obj2;
    var ThreeDTransform = wd.ThreeDTransform,
        GameObject = wd.GameObject,
        Matrix4 = wd.Matrix4,
        Vector3 = wd.Vector3,
        ThreeDTransformData = wd.ThreeDTransformData,
        GlobalTempData = wd.GlobalTempData;
    var initData = wd.initThreeDTransform;
    var director;
    var updateSystem;

    var defaultPos;


    function getValues(values, digit){
        var digit = digit === undefined ? 0 : digit;

        return testTool.getValues(values, digit);
    }

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        testTool.stubGetter(sinon, ThreeDTransformData, "count", function(){
            return 10;
        });

        initData(GlobalTempData, ThreeDTransformData).run();

        obj1 = GameObject.create();
        tra1 = obj1.transform;
        tra1.name = "tra1";

        obj2 = GameObject.create();
        tra2 = obj2.transform;
        tra2.name = "tra2";

        tra3 = ThreeDTransform.create();
        tra3.name = "tra3";

        director = wd.Director.getInstance();

        updateSystem = director._updateSystem;

        defaultPos = Vector3.create(0,0,0);
    });
    afterEach(function() {
        sandbox.restore();

        testTool.clearInstance();
    });

    describe("test cache", function(){
        var matrix;

        function judgeCache(stubFunc, getAttr, judgeStubFunc){
            stubFunc();

            var m1 = tra1[getAttr];
            var m2 = tra1[getAttr];

            expect(m1 === m2).toBeTruthy();
            judgeStubFunc();
        }

        // function judgeClearCache(getMethod, getAttr){
        //     sandbox.stub(tra1, getMethod).returns(matrix);
        //     var m1 = tra1[getAttr];
        //
        //     wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));
        //
        //     var m2 = tra1[getAttr];
        //
        //     expect(m1 === m2).toBeTruthy();
        //     expect(tra1[getMethod]).toCalledTwice();
        // }

        beforeEach(function(){
            matrix = wd.Matrix4.create();
        });

        // it("normalMatrix(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.spy(tra1.localToWorldMatrix, "invertTo3x3");
        //     }, "normalMatrix", function(){
        //         expect(tra1.localToWorldMatrix.invertTo3x3).toCalledOnce();
        //     });
        // });
        it("localToWorldMatrix(getter)", function(){
            judgeCache(function(){
                sandbox.stub(wd.DataUtils, "createMatrix4ByIndex");
            }, "localToWorldMatrix", function(){
                expect(wd.DataUtils.createMatrix4ByIndex).toCalledOnce();
            });
        });
        it("position(getter)", function(){
            judgeCache(function(){
            }, "position", function(){
            });
        });
        it("localPosition(getter)", function(){
            judgeCache(function(){
                sandbox.stub(wd.DataUtils, "createVector3ByIndex");
            }, "localPosition", function(){
                expect(wd.DataUtils.createVector3ByIndex).toCalledOnce();
            });
        });
        // it("rotation(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.stub(tra1._rotation, "setFromMatrix");
        //     }, "rotation", function(){
        //         expect(tra1._rotation.setFromMatrix).toCalledOnce();
        //     });
        // });
        // it("scale(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.stub(tra1.localToWorldMatrix, "getScale");
        //     }, "scale", function(){
        //         expect(tra1.localToWorldMatrix.getScale).toCalledOnce();
        //     });
        // });
        // it("eulerAngles(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.stub(tra1.localToWorldMatrix, "getEulerAngles");
        //     }, "eulerAngles", function(){
        //         expect(tra1.localToWorldMatrix.getEulerAngles).toCalledOnce();
        //     });
        // });
        // it("localEulerAngles(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.stub(tra1._localRotation, "getEulerAngles");
        //     }, "localEulerAngles", function(){
        //         expect(tra1._localRotation.getEulerAngles).toCalledOnce();
        //     });
        // });

        describe("test clear cache", function(){
            beforeEach(function(){
            });

            it("test clear localToWorldMatrix cache", function () {
                tra1.position = Vector3.create(0,0,1);
                updateSystem(null, null);
                var m1 = tra1.localToWorldMatrix.clone();

                tra1.position = Vector3.create(1,2,3);
                updateSystem(null, null);

                var m2 = tra1.localToWorldMatrix.clone()

                expect(getValues(m1)).not.toEqual(getValues(m2));
            });
            // it("test clear normalMatrix cache", function () {
            //     var m1 = tra1.normalMatrix;
            //
            //     tra1.position = Vector3.create(1,2,3);
            //
            //     var m2 = tra1.normalMatrix;
            //
            //     expect(m1 === m2).toBeFalsy();
            // });
            it("clear position cache", function () {
                tra1.position = Vector3.create(0,0,1);
                updateSystem(null, null);
                var pos = tra1.position.clone();

                tra1.position = Vector3.create(1,2,3);
                updateSystem(null, null);

                var pos2 = tra1.position.clone();

                expect(getValues(pos)).not.toEqual(getValues(pos2));
            });
            it("clear localPosition cache", function () {
                tra1.localPosition = Vector3.create(0,0,2);
                updateSystem(null, null);
                var localPos = tra1.localPosition.clone();

                tra1.localPosition = Vector3.create(1,0,2);
                updateSystem(null, null);

                var localPos2 = tra1.localPosition.clone();

                expect(getValues(localPos)).not.toEqual(getValues(localPos2));
            });
            //it("clear position,rotation,scale,eulerAngles,localEulerAngles cache", function () {
            //    var m1 = tra1.position;
            //    var m2 = tra1.rotation;
            //    var m3 = tra1.scale;
            //    var m4 = tra1.eulerAngles;
            //    var m5 = tra1.localEulerAngles;
            //
            //    wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));
            //
            //    expect(tra1._positionCache).toBeNull();
            //    expect(tra1._rotationCache).toBeNull();
            //    expect(tra1._scaleCache).toBeNull();
            //    expect(tra1._eulerAnglesCache).toBeNull();
            //    expect(tra1._localEulerAnglesCache).toBeNull();
            //});
        });
    });

    describe("get parent", function(){
        beforeEach(function(){

        });

        it("default value should be null", function(){
            expect(tra1.parent).toBeNull();
        });
        // it("if get parent before add to entityObject, contract error", function() {
        //     expect(function(){
        //         tra2.parent;
        //     }).toThrow();
        // });
    });

    describe("set parent", function(){
        beforeEach(function(){
        });

        // describe("the change of parent before setted as parent will affect child", function(){
        //     it("test one(parent)-one(child)", function () {
        //         var pos = Vector3.create(1,1,1);
        //         tra2.position = pos;
        //         tra1.parent = tra2;
        //
        //         updateSystem(null, null);
        //
        //         expect(tra2.position).toEqual(pos);
        //         expect(tra2.localPosition).toEqual(pos);
        //         expect(tra1.position).toEqual(pos);
        //         expect(tra1.localPosition).toEqual(defaultPos);
        //     });
        //     it("test one(parent)-two(child)", function () {
        //         var pos = Vector3.create(10,10,10);
        //         tra2.position = pos;
        //         tra1.parent = tra2;
        //
        //         var pos2 = Vector3.create(2,2,2);
        //         tra3.position = pos2;
        //
        //         tra3.parent = tra2;
        //
        //
        //         updateSystem(null, null);
        //
        //         expect(tra2.position).toEqual(pos);
        //         expect(tra2.localPosition).toEqual(pos);
        //         expect(tra1.position).toEqual(pos);
        //         expect(tra1.localPosition).toEqual(defaultPos);
        //
        //         expect(tra3.position).toEqual(pos2.clone().add(pos));
        //         expect(tra3.localPosition).toEqual(pos2);
        //     });
        // });

        describe("if set parent to be null, remove its current parent", function () {
            it("test one(parent)-one(child)", function () {
                var pos = Vector3.create(1,1,1);
                tra2.position = pos;
                tra1.parent = tra2;

                updateSystem(null, null);

                tra1.parent = null;

                updateSystem(null, null);

                expect(tra2.position).toEqual(pos);
                expect(tra2.localPosition).toEqual(pos);
                expect(tra1.position).toEqual(defaultPos);
                expect(tra1.localPosition).toEqual(defaultPos);
            });
            it("test one(parent)-two(child)", function () {
                var pos = Vector3.create(1,1,1);
                tra2.position = pos;
                tra1.parent = tra2;

                var pos2 = Vector3.create(2,2,2);
                tra3.position = pos2;

                tra3.parent = tra2;

                updateSystem(null, null);

                tra1.parent = null;

                updateSystem(null, null);

                expect(tra2.position).toEqual(pos);
                expect(tra2.localPosition).toEqual(pos);
                expect(tra1.position).toEqual(defaultPos);
                expect(tra1.localPosition).toEqual(defaultPos);

                expect(tra3.position).toEqual(pos2.clone().add(pos));
                expect(tra3.localPosition).toEqual(pos2);
            });
        });

        it("if set the same parent, do nothing", function () {
            var pos = Vector3.create(1,1,1);
            tra2.position = pos;
            tra1.parent = tra2;

            updateSystem(null, null);

            tra1.parent = tra2;

            updateSystem(null, null);

            expect(tra2.position).toEqual(pos);
            expect(tra2.localPosition).toEqual(pos);
            expect(tra1.position).toEqual(pos);
            expect(tra1.localPosition).toEqual(defaultPos);
        });
    });

    describe("get localToWorldMatrix", function(){
        beforeEach(function(){

        });

        it("default value should be identiy matrix", function(){
            expect(tra1.localToWorldMatrix).toEqual(Matrix4.create().setIdentity());
        });
    });

    describe("get position", function(){
        beforeEach(function(){

        });

        it("default value should be vec3(0,0,0)", function(){
            expect(tra1.position).toEqual(Vector3.create());
        });
    });

    // describe("set position", function(){
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("can set position directly", function(){
    //         var pos = Vector3.create(1,2,3);
    //         tra2.position = pos;
    //
    //         expect(tra2.position).toEqual(pos);
    //     });
    // });

    describe("get local position", function(){
        beforeEach(function(){

        });

        it("default value should be vec3(0,0,0)", function(){
            expect(tra1.localPosition).toEqual(Vector3.create());
        });
    });

    describe("init", function(){
        beforeEach(function(){

        });

        it("can get the setted value which is setted by user after init", function(){
            var pos = Vector3.create(1,2,3);
            tra3.position = pos.clone();
            obj1.disposeComponent(tra1);
            obj1.addComponent(tra3);

            obj1.init();

            expect(tra3.position).toEqual(pos);
            expect(tra3.localToWorldMatrix.getTranslation()).toEqual(pos);
        });
        //todo more
    });

    describe("dispose component", function(){
        beforeEach(function(){
        });

        describe("remove related data in ThreeDTransformData", () => {
            beforeEach(() => {
            });

            describe("test if dirty", () => {
                var pos;

                beforeEach(function(){
                    pos = Vector3.create(1,2,3);

                    // director.scene.addChild(obj1);
                    // director.scene.addChild(obj2);
                });

                it("reset its transform data after dispose", function(){
                    updateSystem(null, null);
                    tra1.localPosition = pos.clone();

                    tra1.dispose();
                    updateSystem(null, null);

                    expect(tra1.position).toEqual(Vector3.create(0,0,0));
                });
                it("the dispose of one transform shouldn't affect other transform data", function () {
                    var pos2 = Vector3.create(10,2,3);
                    updateSystem(null, null);
                    tra1.localPosition = pos.clone();
                    tra2.localPosition = pos2.clone();


                    tra1.dispose();
                    updateSystem(null, null);

                    expect(tra2.position).toEqual(pos2);
                });
            });

            describe("test if not dirty", function() {
                var pos;

                beforeEach(function(){
                    pos = Vector3.create(1,2,3);

                    // director.scene.addChild(obj1);
                    // director.scene.addChild(obj2);
                });

                it("reset its transform data after dispose", function(){
                    tra1.localPosition = pos.clone();
                    updateSystem(null, null);

                    tra1.dispose();

                    expect(tra1.position).toEqual(Vector3.create(0,0,0));
                });
                it("the dispose of one transform shouldn't affect other transform data", function () {
                    var pos2 = Vector3.create(10,2,3);
                    tra1.localPosition = pos.clone();
                    tra2.localPosition = pos2.clone();
                    updateSystem(null, null);

                    tra1.dispose();

                    expect(tra2.position).toEqual(pos2);
                });
            });
        });
    });

    describe("defer compute", function(){
        beforeEach(function(){

        });

        it("compute all transforms' datas when update", function(){
            var pos = Vector3.create(1,2,3);
            var pos2 = Vector3.create(10,2,3);

            tra2.parent = tra1;

            tra1.position = pos.clone();
            tra2.position = pos2.clone();


            expect(tra1.position).toEqual(defaultPos);
            expect(tra2.position).toEqual(defaultPos);

            updateSystem(null, null);

            expect(tra1.position).toEqual(pos);
            expect(tra2.position).toEqual(pos.clone().add(pos2));
        });

        describe("before update, can only get the old transform data(last update version)", function(){
            it("test get position", function () {
                var pos = Vector3.create(1,2,3);
                var pos2 = Vector3.create(10,2,3);
                tra1.position = pos.clone();

                updateSystem(null, null);

                tra1.position = pos2.clone();

                expect(tra1.position).toEqual(pos);
            });
        });

        describe("before update, can get the newest local data", function(){
            it("test get local position", function () {
                var pos = Vector3.create(1,2,3);
                var pos2 = Vector3.create(10,2,3);
                tra1.localPosition = pos.clone();

                updateSystem(null, null);

                tra1.localPosition = pos2.clone();

                expect(tra1.localPosition).toEqual(pos2);
            });
        });
    });

    //todo more
});
