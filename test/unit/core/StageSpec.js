describe("Stage", function() {
    var sandbox = null;
    var stage = null;
    var Stage = null;
    var gameObject1,
        gameObject2,
        gameObject3;
    var script1,
        script2,
        script3,
        script4;

    function buildScript(){
        return {
            init: sandbox.stub(),
            onEnter:sandbox.stub(),
            onExit: sandbox.stub(),
            update: sandbox.stub()
        }
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dy.Director.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        Stage = dy.Stage;
        stage = Stage.create();
        gameObject1 = dy.GameObject.create();
        gameObject2 = dy.GameObject.create();
        gameObject3 = dy.GameObject.create();

        gameObject2.addChild(gameObject1);

        stage.addChild(gameObject2);
        stage.addChild(gameObject3);

        script1 = buildScript();
        script2 = buildScript();
        script3 = buildScript();
        script4 = buildScript();

        stage._script.addChild("customScript1", script1);
        gameObject1._script.addChild("customScript2", script2);
        gameObject2._script.addChild("customScript3", script3);
        gameObject3._script.addChild("customScript4", script4);

        sandbox.stub(gameObject1, "onStartLoop");
        sandbox.stub(gameObject2, "onStartLoop");
        sandbox.stub(gameObject3, "onStartLoop");
        sandbox.stub(gameObject1, "onEndLoop");
        sandbox.stub(gameObject2, "onEndLoop");
        sandbox.stub(gameObject3, "onEndLoop");
        sandbox.stub(gameObject1, "onExit");
        sandbox.stub(gameObject2, "onExit");
        sandbox.stub(gameObject3, "onExit");
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("init", function(){
        it("bind global hook", function(){
            stage.init();

            dy.EventManager.trigger(dy.CustomEvent.create("dy_startLoop"));
            dy.EventManager.trigger(dy.CustomEvent.create("dy_endLoop"));

            expect(gameObject1.onStartLoop).toCalledOnce();
            expect(gameObject2.onStartLoop).toCalledOnce();
            expect(gameObject3.onStartLoop).toCalledOnce();
            expect(gameObject1.onEndLoop).toCalledOnce();
            expect(gameObject2.onEndLoop).toCalledOnce();
            expect(gameObject3.onEndLoop).toCalledOnce();
        });
        it("invoke stage and it's children's script->init", function(){
            stage.init();

            expect(script1.init).toCalledOnce();
            expect(script2.init).toCalledOnce();
            expect(script3.init).toCalledOnce();
            expect(script4.init).toCalledOnce();
            expect(script1.init).toCalledBefore(script3.init);
            expect(script3.init).toCalledBefore(script2.init);
            expect(script2.init).toCalledBefore(script4.init);
        });
    });

    describe("onEnter", function(){
        it("invoke stage's script->onEnter", function(){
            stage.onEnter();

            expect(script1.onEnter).toCalledOnce();
            expect(script2.onEnter).not.toCalled();
            expect(script3.onEnter).not.toCalled();
            expect(script4.onEnter).not.toCalled();
        })
    });

    describe("onExit", function(){
        it("invoke stage's script->onExit", function(){
            stage.onExit();

            expect(script1.onExit).toCalledOnce();
            expect(script2.onExit).not.toCalled();
            expect(script3.onExit).not.toCalled();
            expect(script4.onExit).not.toCalled();
        })
    });

    describe("update", function(){
        var time;
        var behavior1,
            behavior2,
            behavior3,
            behavior4,
            behavior5;

        function buildBehavior(){
            var behavior = new dy.Behavior();

            sandbox.stub(behavior, "update");

            return behavior;
        }

        beforeEach(function(){
            time = 100;
            behavior1 = buildBehavior();
            behavior2 = buildBehavior();
            behavior3 = buildBehavior();
            behavior4 = buildBehavior();
            behavior5 = buildBehavior();

            sandbox.stub(stage._actionManager, "update");
        });

        it("invoke stage and it's children's all behavior->update and all action->update", function(){
            stage.addComponent(behavior1);
            gameObject1.addComponent(behavior2);
            gameObject2.addComponent(behavior3);
            gameObject3.addComponent(behavior4);
            gameObject3.addComponent(behavior5);

            stage.update(time);

            expect(behavior1.update).toCalledWith(time);
            expect(behavior1.update).toCalledOnce();
            expect(behavior1.update).toCalledBefore(stage._actionManager.update);
            expect(behavior1.update).toCalledBefore(behavior3.update);
            expect(behavior3.update).toCalledWith(time);
            expect(behavior3.update).toCalledOnce();
            expect(behavior3.update).toCalledBefore(behavior2.update);
            expect(behavior2.update).toCalledWith(time);
            expect(behavior2.update).toCalledOnce();
            expect(behavior2.update).toCalledBefore(behavior4.update);
            expect(behavior4.update).toCalledWith(time);
            expect(behavior4.update).toCalledOnce();
            expect(behavior4.update).toCalledBefore(behavior5.update);
            expect(behavior5.update).toCalledWith(time);
            expect(behavior5.update).toCalledOnce();
        });
        it("invoke stage and it's children's script->update", function(){
            stage.update(time);

            expect(script1.update).toCalledOnce();
            expect(script1.update).toCalledWith(time);
            expect(script2.update).toCalledOnce();
            expect(script3.update).toCalledOnce();
            expect(script4.update).toCalledOnce();

            expect(script1.update).toCalledBefore(script3.update);
            expect(script3.update).toCalledBefore(script2.update);
            expect(script2.update).toCalledBefore(script4.update);
        });
    });
    
    describe("addChild", function(){
        var oldParent,
            newParent;
        var child;

        function buildParent(){
            return {
                removeChild:sandbox.stub()
            }
        }

        function buildChild(){
            return {
                parent:null,
                transform:{
                    parent:null
                },

                hasComponent:sandbox.stub(),
                onEnter:sandbox.stub()
            }
        }

        beforeEach(function(){
            oldParent = buildParent();
            newParent = buildParent();
            child = buildChild();
        });
        
        it("if target's parent exist, remove target from it's parent", function(){
            child.parent = oldParent;

            stage.addChild(child);

            expect(oldParent.removeChild).toCalledWith(child);
        });
        it("set target's parent to be stage", function(){
            stage.addChild(child);

            expect(child.parent).toEqual(stage);
        });
        it("set target's transform's parent to be stage's transform", function(){
            stage.addChild(child);

            expect(child.transform.parent).toEqual(stage.transform);
        });
        it("add target into stage", function(){
            stage.addChild(child);

            expect(stage.getChild(2)).toEqual(child);
        });
        it("invoke child's onEnter", function(){
            stage.addChild(child);

            expect(child.onEnter).toCalledOnce();
        });
    });

    describe("removeChild", function(){
        it("remove target", function(){
            expect(stage.findChildByUid(gameObject2.uid)).toEqual(gameObject2);

            stage.removeChild(gameObject2);

            expect(stage.findChildByUid(gameObject2)).toBeNull();
        });
        it("set target's parent to be null", function(){
            stage.removeChild(gameObject2);

            expect(gameObject2.parent).toBeNull();
        });
        it("invoke target's onExit", function(){
            stage.removeChild(gameObject2);

            expect(gameObject2.onExit).toCalledOnce();
        });
    });

    describe("addComponent", function(){
        it("if component exist, return", function(){
            var component = new dy.Action();
            sandbox.stub(dyCb.Log, "assert");

            stage.addComponent(component);
            var result = stage.addComponent(component);

            expect(dyCb.Log.assert).toCalledOnce();
            expect(result).toEqual(stage);
        });
        it("set component's gameObject", function(){
            var component = new dy.Action();

            stage.addComponent(component);

            expect(component.gameObject).toEqual(stage);
        });
        it("add component to container", function(){
            var component = new dy.Action();

            stage.addComponent(component);

            expect(stage.findComponentByUid(component.uid)).toEqual(component);
        });

        describe("if component is Action", function(){
            it("set action's target and add it to actionManager", function(){
                var component = new dy.Action();

                stage.addComponent(component);

                expect(component.target).toEqual(stage);
                expect(stage._actionManager.hasChild(component)).toBeTruthy();
            });
        });

        describe("if component is other Behavior", function(){
            it("add it to behaviors", function(){
                var component = new dy.Behavior();

                stage.addComponent(component);

                expect(stage._behaviors.hasChild(component)).toBeTruthy();
            });
        });

        describe("if component is Renderer", function(){
            it("set renderer to be it", function(){
                var component = new dy.Renderer();

                stage.addComponent(component);

                expect(stage._renderer).toEqual(component);
            });
        });

        describe("if component is Collider", function(){
            it("set collider to be it", function(){
                var component = new dy.Collider();

                stage.addComponent(component);

                expect(stage._collider).toEqual(component);
            });
        });

        describe("if component is Script", function(){
            it("add load stream to Director->scriptStreams", function(){
                var stream = new dyRt.Stream();
                var component = dy.Script.create("aaa.js");
                sandbox.stub(component, "createLoadJsStream").returns({
                    do:sandbox.stub().returns(stream)
                });

                stage.addComponent(component);

                expect(dy.Director.getInstance().scriptStreams.hasChild(component.uid.toString())).toBeTruthy();
            });
        });
    });

    describe("removeComponent", function(){
        it("remove component from container", function(){
            var component = new dy.Action();
            stage.addComponent(component);

            stage.removeComponent(component);

            expect(stage.findComponentByUid(component.uid)).toBeNull();
        });
        it("set component's gameObject to be null", function(){
            var component = new dy.Action();
            stage.addComponent(component);

            stage.removeComponent(component);

            expect(component.gameObject).toBeNull();
        });

        describe("if component is Action", function(){
            it("remove it from actionManager", function(){
                var component = new dy.Action();
                stage.addComponent(component);

                stage.removeComponent(component);

                expect(stage._actionManager.hasChild(component)).toBeFalsy();
            });
        });

        describe("if component is other Behavior", function(){
            it("remove it from behaviors", function(){
                var component = new dy.Behavior();
                stage.addComponent(component);

                stage.removeComponent(component);

                expect(stage._behaviors.hasChild(component)).toBeFalsy();
            });
        });

        describe("if component is Renderer", function(){
            it("set renderer to be null", function(){
                var component = new dy.Renderer();
                stage.addComponent(component);

                stage.removeComponent(component);

                expect(stage._renderer).toBeNull();
            });
        });

        describe("if component is Collider", function(){
            it("set collider to be null", function(){
                var component = new dy.Collider();
                stage.addComponent(component);

                stage.removeComponent(component);

                expect(stage._collider).toBeNull();
            });
        });

        describe("if component is Script", function(){
            it("remove load stream to Director->scriptStreams", function(){
                var stream = new dyRt.Stream();
                var component = dy.Script.create("aaa.js");
                sandbox.stub(component, "createLoadJsStream").returns({
                    do:sandbox.stub().returns(stream)
                });
                stage.addComponent(component);

                stage.removeComponent(component);

                expect(dy.Director.getInstance().scriptStreams.hasChild(component.uid.toString())).toBeFalsy();
            });
        });
    });
});
