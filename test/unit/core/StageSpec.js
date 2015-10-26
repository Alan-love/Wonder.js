describe("Scene", function() {
    var sandbox = null;
    var scene = null;
    var Scene = null;
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
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        Scene = dy.Scene;
        scene = Scene.create();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("", function(){
        beforeEach(function(){
            gameObject1 = dy.GameObject.create();
            gameObject2 = dy.GameObject.create();
            gameObject3 = dy.GameObject.create();

            gameObject2.addChild(gameObject1);

            scene.addChild(gameObject2);
            scene.addChild(gameObject3);

            script1 = buildScript();
            script2 = buildScript();
            script3 = buildScript();
            script4 = buildScript();

            scene._script.addChild("customScript1", script1);
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

        describe("init", function(){
            it("bind global hook", function(){
                scene.init();

                dy.EventManager.trigger(dy.CustomEvent.create("dy_startLoop"));
                dy.EventManager.trigger(dy.CustomEvent.create("dy_endLoop"));

                expect(gameObject1.onStartLoop).toCalledOnce();
                expect(gameObject2.onStartLoop).toCalledOnce();
                expect(gameObject3.onStartLoop).toCalledOnce();
                expect(gameObject1.onEndLoop).toCalledOnce();
                expect(gameObject2.onEndLoop).toCalledOnce();
                expect(gameObject3.onEndLoop).toCalledOnce();
            });
            it("invoke components' init", function(){
                var geometry = new dy.BoxGeometry();
                var material = new dy.BasicMaterial();
                geometry.material = material;

                sandbox.spy(geometry, "init");
                sandbox.spy(material, "init");
                sandbox.spy(material.textureManager, "init");
                sandbox.stub(material.shader, "init");
                scene.addComponent(geometry);

                scene.init();

                expect(geometry.init).toCalledOnce();
                expect(material.init).toCalledOnce();
                expect(material.textureManager.init).toCalledOnce();
                expect(material.shader.init).toCalledOnce();
            });
            it("invoke scene and it's children's script->init", function(){
                scene.init();

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
            it("invoke scene's script->onEnter", function(){
                scene.onEnter();

                expect(script1.onEnter).toCalledOnce();
                expect(script2.onEnter).not.toCalled();
                expect(script3.onEnter).not.toCalled();
                expect(script4.onEnter).not.toCalled();
            })
        });

        describe("onExit", function(){
            it("invoke scene's script->onExit", function(){
                scene.onExit();

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

                behavior.update = sandbox.stub();

                return behavior;
            }

            beforeEach(function(){
                time = 100;
                behavior1 = buildBehavior();
                behavior2 = buildBehavior();
                behavior3 = buildBehavior();
                behavior4 = buildBehavior();
                behavior5 = buildBehavior();

                sandbox.stub(scene.actionManager, "update");
            });

            it("invoke scene and it's children's all behavior->update and all action->update", function(){
                scene.addComponent(behavior1);
                gameObject1.addComponent(behavior2);
                gameObject2.addComponent(behavior3);
                gameObject3.addComponent(behavior4);
                gameObject3.addComponent(behavior5);

                scene.update(time);

                expect(behavior1.update).toCalledWith(time);
                expect(behavior1.update).toCalledOnce();
                expect(behavior1.update).toCalledBefore(scene.actionManager.update);
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
            it("invoke scene and it's children's script->update", function(){
                scene.update(time);

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

                scene.addChild(child);

                expect(oldParent.removeChild).toCalledWith(child);
            });
            it("set target's parent to be scene", function(){
                scene.addChild(child);

                expect(child.parent).toEqual(scene);
            });
            it("set target's transform's parent to be scene's transform", function(){
                scene.addChild(child);

                expect(child.transform.parent).toEqual(scene.transform);
            });
            it("add target into scene", function(){
                scene.addChild(child);

                expect(scene.getChild(2)).toEqual(child);
            });
            it("invoke child's onEnter", function(){
                scene.addChild(child);

                expect(child.onEnter).toCalledOnce();
            });
        });

        describe("removeChild", function(){
            it("invoke target's onExit", function(){
                scene.removeChild(gameObject2);

                expect(gameObject2.onExit).toCalledOnce();
            });
            it("remove target", function(){
                expect(scene.findChildByUid(gameObject2.uid)).toEqual(gameObject2);

                scene.removeChild(gameObject2);

                expect(scene.findChildByUid(gameObject2)).toBeNull();
            });
            it("set target's parent to be null", function(){
                scene.removeChild(gameObject2);

                expect(gameObject2.parent).toBeNull();
            });
        });
    });

    describe("addComponent", function(){
        it("if component exist, return", function(){
            var component = new dy.Action();
            sandbox.stub(dy.Log, "assert");

            scene.addComponent(component);
            var result = scene.addComponent(component);

            expect(dy.Log.assert).toCalledOnce();
            expect(result).toEqual(scene);
        });
        it("set component's gameObject", function(){
            var component = new dy.Action();

            scene.addComponent(component);

            expect(component.gameObject).toEqual(scene);
        });
        it("add component to container", function(){
            var component = new dy.Action();

            scene.addComponent(component);

            expect(scene.findComponentByUid(component.uid)).toEqual(component);
        });

        describe("if component is Action", function(){
            it("set action's target and add it to actionManager", function(){
                var component = new dy.Action();

                scene.addComponent(component);

                expect(component.target).toEqual(scene);
                expect(scene.actionManager.hasChild(component)).toBeTruthy();
            });
        });

        describe("if component is other Behavior", function(){
            it("add it to behaviors", function(){
                var component = new dy.Behavior();

                scene.addComponent(component);

                expect(scene.behaviors.hasChild(component)).toBeTruthy();
            });
        });

        describe("if component is Geometry", function(){
            it("set geometry to be it", function(){
                var component = new dy.Geometry();

                scene.addComponent(component);

                expect(scene.geometry).toEqual(component);
            });
        });

        describe("if component is RendererComponent", function(){
            it("set rendererComponent to be it", function(){
                var component = new dy.RendererComponent();

                scene.addComponent(component);

                expect(scene.rendererComponent).toEqual(component);
            });
        });

        describe("if component is Collider", function(){
            it("set collider to be it", function(){
                var component = new dy.Collider();

                scene.addComponent(component);

                expect(scene.collider).toEqual(component);
            });
        });

        describe("if component is Script", function(){
            it("add load stream to Director->scriptStreams", function(){
                var stream = new dyRt.Stream();
                var component = dy.Script.create("aaa.js");
                sandbox.stub(component, "createLoadJsStream").returns({
                    do:sandbox.stub().returns(stream)
                });

                scene.addComponent(component);

                expect(dy.Director.getInstance().scriptStreams.hasChild(component.uid.toString())).toBeTruthy();
            });
        });
    });

    describe("removeComponent", function(){
        it("remove component from container", function(){
            var component = new dy.Action();
            scene.addComponent(component);

            scene.removeComponent(component);

            expect(scene.findComponentByUid(component.uid)).toBeNull();
        });
        it("set component's gameObject to be null", function(){
            var component = new dy.Action();
            scene.addComponent(component);

            scene.removeComponent(component);

            expect(component.gameObject).toBeNull();
        });

        describe("if component is Action", function(){
            it("remove it from actionManager", function(){
                var component = new dy.Action();
                scene.addComponent(component);

                scene.removeComponent(component);

                expect(scene.actionManager.hasChild(component)).toBeFalsy();
            });
        });

        describe("if component is other Behavior", function(){
            it("remove it from behaviors", function(){
                var component = new dy.Behavior();
                scene.addComponent(component);

                scene.removeComponent(component);

                expect(scene.behaviors.hasChild(component)).toBeFalsy();
            });
        });

        describe("if component is Geometry", function(){
            it("set geometry to be null", function(){
                var component = new dy.Geometry();
                scene.addComponent(component);

                scene.removeComponent(component);

                expect(scene.geometry).toBeNull();
            });
        });

        describe("if component is RendererComponent", function(){
            it("set rendererComponent to be null", function(){
                var component = new dy.RendererComponent();
                scene.addComponent(component);

                scene.removeComponent(component);

                expect(scene.rendererComponent).toBeNull();
            });
        });

        describe("if component is Collider", function(){
            it("set collider to be null", function(){
                var component = new dy.Collider();
                scene.addComponent(component);

                scene.removeComponent(component);

                expect(scene.collider).toBeNull();
            });
        });

        describe("if component is Script", function(){
            it("remove load stream to Director->scriptStreams", function(){
                var stream = new dyRt.Stream();
                var component = dy.Script.create("aaa.js");
                sandbox.stub(component, "createLoadJsStream").returns({
                    do:sandbox.stub().returns(stream)
                });
                scene.addComponent(component);

                scene.removeComponent(component);

                expect(dy.Director.getInstance().scriptStreams.hasChild(component.uid.toString())).toBeFalsy();
            });
        });
    });

    describe("addRenderTargetRenderer", function(){
        it("add renderTargetRenderer with renderTargetTexture", function(){
            var renderer = {
            };

            scene.addRenderTargetRenderer(renderer);

            expect(scene._renderTargetRenderers.hasChild(renderer)).toBeTruthy();
        });
    });

    describe("render", function(){
        var renderer,camera;

        beforeEach(function(){
            renderer = {};
            camera = {};
            scene.camera = camera;
        });

        it("render renderTargetRenderers", function(){
            var renderTargetRenderer = {
                init: sandbox.stub(),
                render: sandbox.stub()
            };
            scene.addRenderTargetRenderer(renderTargetRenderer);

            scene.render(renderer);

            expect(renderTargetRenderer.render).toCalledWith(renderer, camera);
        });
        it("render rendererComponent", function(){
            var rendererComponent ={
                    render: sandbox.stub()
                },
                geometry = {
                };

            scene.rendererComponent = rendererComponent;
            scene.geometry = geometry;

            scene.render(renderer);

            expect(rendererComponent.render).toCalledWith(renderer, geometry, camera);
        });
        it("render children", function(){
            var renderTargetRenderer = {
                init: sandbox.stub(),
                render: sandbox.stub()
            };
            scene.addRenderTargetRenderer(renderTargetRenderer);

            var gameObject1 = dy.GameObject.create();
            sandbox.stub(gameObject1, "render");
            scene.addChild(gameObject1);


            scene.render(renderer);

            expect(gameObject1.render).toCalledWith(renderer, camera);
            expect(gameObject1.render).toCalledAfter(renderTargetRenderer.render);
        });
    });
});
