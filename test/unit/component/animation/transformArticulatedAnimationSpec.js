describe("transform articulated animation", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });

    describe("unit test", function(){
        var anim;

        beforeEach(function(){
            anim = wd.TransformArticulatedAnimation.create();
        });

        describe("clone", function(){
            it("shallow clone data", function () {
                var data = wdCb.Hash.create({
                    "play": wdCb.Collection.create([
                        {
                            time:10,

                            targets: wdCb.Collection.create(
                                [
                                    {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.TRANSLATION, data: wd.Vector3.create(3,1,0)}
                                ]
                            )
                        }
                    ])
                });

                anim.data = data;

                var result = anim.clone();

                expect(result).toBeInstanceOf(wd.TransformArticulatedAnimation);
                expect(result === anim).toBeFalsy();

                data.getChild("play").addChild({});

                expect(result.data.getChild("play").getCount()).toEqual(2);
            });
        });
    });

    describe("integration test", function(){
        var model,anim;

        function judgePos(pos){
            expect(testTool.getValues(
                model.transform.localPosition,
                2
            )).toEqual(
                testTool.getValues(
                    pos,
                    2
                )
            )
        }

        function judgeScale(scale){
            expect(testTool.getValues(
                model.transform.localScale,
                2
            )).toEqual(
                scale
            )
        }

        function judgeRotation(eulerAngles){
            expect(testTool.getValues(
                model.transform.localEulerAngles,
                1
            )).toEqual(
                eulerAngles
            )
        }

        function setCurrentTime(time){
            sandbox.stub(wd.Director.getInstance()._timeController, "elapsed", time);
        }

        function getInitTransformData() {
            return {
                translation:wd.Vector3.create(0,0,0),
                rotation:wd.Quaternion.create(0,0,0,1),
                scale:wd.Vector3.create(1,1,1)
            }
        }


        beforeEach(function(){
        });

        describe("update position/scale/rotation in each key(should set transform->local TRS instead of global TRS, because the transform in .wd is in local coordinate system)", function(){
            var firstKeyTime,secondKeyTime;

            beforeEach(function(){
                firstKeyTime = 10;
                secondKeyTime = 15;

                model = wd.GameObject.create();

                anim = wd.TransformArticulatedAnimation.create();

                model.addComponent(anim);


                setCurrentTime(0);
            });

            describe("play", function(){
                it("can specify animation index", function(){
                    anim.data = wdCb.Hash.create({
                        "play": wdCb.Collection.create([
                            {
                                time:0,

                                targets: wdCb.Collection.create(
                                    [
                                        { interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                            target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                            data: getInitTransformData().translation}
                                    ]
                                )
                            },
                            {
                                time:10,

                                targets: wdCb.Collection.create(
                                    [
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.TRANSLATION, data: wd.Vector3.create(3,1,0)}
                                    ]
                                )
                            }
                        ])
                    });
                    model.init();

                    anim.play(0);

                    wd.AnimationComponentContainer.getInstance().update(1);


                    judgePos([0.3, 0.1, 0]);
                });
            });

            it("if not play animation, update nothing", function(){
                anim.data = wdCb.Hash.create({
                    "play": wdCb.Collection.create([
                        {
                            time:0,

                            targets: wdCb.Collection.create(
                                [
                                    { interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                        target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                        data: getInitTransformData().translation}
                                ]
                            )
                        },
                        {
                            time:10,

                            targets: wdCb.Collection.create(
                                [
                                    {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.TRANSLATION, data: wd.Vector3.create(3,1,0)}
                                ]
                            )
                        }
                    ])
                });
                model.init();


                wd.AnimationComponentContainer.getInstance().update(1);


                judgePos([0,0,0]);
            });

            describe("test special cases", function(){
                beforeEach(function(){
                });

                it("test time === 0", function () {
                    anim.data = wdCb.Hash.create({
                        "play": wdCb.Collection.create([
                            {
                                time:0,

                                targets: wdCb.Collection.create(
                                    [
                                        {
                                            interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,
                                            target:wd.EKeyFrameAnimationTarget.TRANSLATION,
                                            data: wd.Vector3.create(3,1,0)
                                        },
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.SCALE, data: wd.Vector3.create(1,2,4)}
                                    ]
                                )
                            }
                        ])
                    });
                    anim.play("play");
                    model.init();


                    wd.AnimationComponentContainer.getInstance().update(0);


                    judgePos([3,1,0]);
                });

                describe("test when one step(update) exceed more than 1 frames(this may occur when fps is too low so that each loop's time is big)", function () {
                    beforeEach(function(){
                        anim.data = wdCb.Hash.create({
                            "play": wdCb.Collection.create([
                                {
                                    time:10,

                                    targets: wdCb.Collection.create(
                                        [
                                            {
                                                interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,
                                                target:wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                data: wd.Vector3.create(2,1,0)
                                            }
                                        ]
                                    )
                                },
                                {
                                    time:20,

                                    targets: wdCb.Collection.create(
                                        [
                                            {
                                                interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,
                                                target:wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                data: wd.Vector3.create(3,1,0)
                                            }
                                        ]
                                    )
                                },
                                {
                                    time:30,

                                    targets: wdCb.Collection.create(
                                        [
                                            {
                                                interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,
                                                target:wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                data: wd.Vector3.create(4,1,0)
                                            }
                                        ]
                                    )
                                }

                            ])
                        });
                        anim.play("play");
                        model.init();
                    });

                    it("test not finish all keys", function () {
                        wd.AnimationComponentContainer.getInstance().update(1);
                        wd.AnimationComponentContainer.getInstance().update(21);


                        judgePos([3.1,1,0]);
                    });
                    it("test finish all keys", function () {
                        wd.AnimationComponentContainer.getInstance().update(11);
                        wd.AnimationComponentContainer.getInstance().update(30);


                        judgePos([4,1,0]);
                    });
                    it("test2 finish all keys", function () {
                        wd.AnimationComponentContainer.getInstance().update(30);


                        judgePos([4,1,0]);
                    });
                });
            });

            describe("test normal cases", function(){
                beforeEach(function(){
                    anim.data = wdCb.Hash.create({
                        "play": wdCb.Collection.create([
                            {
                                time:0,

                                targets: wdCb.Collection.create(
                                    [
                                        { interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                            target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                            data: getInitTransformData().translation},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.ROTATION, data: getInitTransformData().rotation},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.SCALE, data: getInitTransformData().scale}
                                    ]
                                )
                            },
                            {
                                time:firstKeyTime,

                                targets: wdCb.Collection.create(
                                    [
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.TRANSLATION, data: wd.Vector3.create(2,1,0)},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.ROTATION, data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(10,20,30))},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.SCALE, data: wd.Vector3.create(1,2,3)}
                                    ]
                                )
                            },

                            {
                                time:secondKeyTime,

                                targets: wdCb.Collection.create(
                                    [
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.TRANSLATION, data: wd.Vector3.create(3,1,0)},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.ROTATION, data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(10,20,40))},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.SCALE, data: wd.Vector3.create(1,2,4)}
                                    ]
                                )

                            }
                        ])
                    })



                    anim.play("play");

                    //model.init();

                    var parentModel = wd.GameObject.create();
                    parentModel.transform.position = wd.Vector3.create(1,1,1);
                    parentModel.transform.rotate(2,2,2);
                    parentModel.transform.scale = wd.Vector3.create(3,3,3);

                    parentModel.addChild(model);
                    //model.transform.parent = parentModel.transform.parent;

                    parentModel.init();
                });

                describe("test interpolation", function(){
                    it("test1", function () {
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime/10);

                        judgePos([0.2,0.1,0]);
                        judgeScale([1, 1.1, 1.2]);
                        judgeRotation([0.5, 2.2, 2.8]);
                    });
                    it("test2", function () {
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime/10);
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime/5);

                        judgePos([0.4,0.2,0]);
                        judgeScale([1, 1.2, 1.4]);
                        judgeRotation([1.1, 4.4, 5.6]);
                    });
                });

                describe("test finish first key", function () {
                    it("test1", function(){
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime);

                        judgePos([2,1,0]);
                        judgeScale([1,2,3]);
                        judgeRotation([10,20,30]);
                    });
                    it("test2", function(){
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime * 0.9);
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime + 1);

                        judgePos([2.2,1,0]);
                        judgeScale([1,2,3.2]);
                        judgeRotation([10,20,32]);
                    });
                    it("test3", function(){
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime + 1);

                        judgePos([2.2,1,0]);
                        judgeScale([1,2,3.2]);
                        judgeRotation([10,20,32]);
                    });
                });

                it("test begin second key", function () {
                    wd.AnimationComponentContainer.getInstance().update(firstKeyTime);
                    wd.AnimationComponentContainer.getInstance().update(firstKeyTime + 1);

                    judgePos([2.2,1,0]);
                    judgeScale([1,2,3.2]);
                    judgeRotation([10,20,32]);
                });
                it("test finish second key", function () {
                    wd.AnimationComponentContainer.getInstance().update(firstKeyTime);
                    wd.AnimationComponentContainer.getInstance().update(secondKeyTime);

                    judgePos([3,1,0]);
                    judgeScale([1,2,4]);
                    judgeRotation([10,20,40]);
                });

                describe("test finish all keys", function(){
                    beforeEach(function(){
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime + 1);
                    });

                    it("if just finish all keys, reach the end data", function () {
                        wd.AnimationComponentContainer.getInstance().update(secondKeyTime);

                        judgePos([3,1,0]);
                        judgeScale([1,2,4]);
                        judgeRotation([10,20,40]);
                    });
                    it("if the elapsed exceed the last key->time, go back to the first key data", function () {
                        wd.AnimationComponentContainer.getInstance().update(secondKeyTime + 2);

                        judgePos([0,0,0]);
                        judgeScale([1,1,1]);
                        judgeRotation([0,0,0]);
                    });
                    it("test reach the next loop->first key", function () {
                        wd.AnimationComponentContainer.getInstance().update(secondKeyTime + 2);
                        wd.AnimationComponentContainer.getInstance().update(secondKeyTime + 3);

                        judgePos([0.2,0.1,0]);
                        judgeScale([1,1.1,1.2]);
                        judgeRotation([0.5, 2.2, 2.8]);
                    });
                    it("test reach the next loop->second key", function () {
                        wd.AnimationComponentContainer.getInstance().update(secondKeyTime + 1);
                        wd.AnimationComponentContainer.getInstance().update(secondKeyTime + firstKeyTime + 1);

                        judgePos([2,1,0]);
                        judgeScale([1,2,3]);
                        judgeRotation([10,20,30]);
                    });
                    it("test finish next loop", function () {
                        wd.AnimationComponentContainer.getInstance().update(secondKeyTime + 1);
                        wd.AnimationComponentContainer.getInstance().update(secondKeyTime + firstKeyTime + 1);

                        wd.AnimationComponentContainer.getInstance().update(secondKeyTime + secondKeyTime + 1);

                        judgePos([3,1,0]);
                        judgeScale([1,2,4]);
                        judgeRotation([10,20,40]);
                    });
                });
            });
        });
    });
});
