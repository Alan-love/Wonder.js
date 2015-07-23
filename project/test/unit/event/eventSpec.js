describe("event", function () {
    var manager = null;
    var Listener = null;
    var sandbox = null;
    var target = null;

    function insertDom() {
        $("html").append($("<canvas id='event-test'></canvas>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        insertDom();
        Engine3D.WebGLContext.createGL("#event-test");

        manager = Engine3D.EventManager;
        Listener = Engine3D.EventListener;
        target = Engine3D.Mesh.create();
    });
    afterEach(function () {
        removeDom();
        manager.off();
        sandbox.restore();
    });

    describe("off", function(){
        var eventTarget = null,
            eventTarget2 = null,
            sum = 0,
            sum2 = 0,
        sum3 = 0;
        var eventType = null;
        var fakeEvent = null;
        var target2 = null;

        beforeEach(function(){
            eventType = "custom1";
            fakeEvent = {
                pageX:10,
                pageY:10
            };
            target2 = Engine3D.Mesh.create();

            manager.on(target, Engine3D.EventType.CLICK, function (e) {
                eventTarget = e;
                sum++;
            });
            manager.on(target, eventType, function (e) {
                eventTarget2 = e;
                sum2++;
            });
            manager.on(target2, eventType, function (e) {
                sum2++;
            });
        });
        it("off target", function(){
            manager.off(target);
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.CLICK));
            manager.trigger(target, Engine3D.CustomEvent.create(eventType));

            expect(eventTarget).toBeNull();
            expect(eventTarget2).toBeNull();
            expect(sum).toEqual(0);
            expect(sum2).toEqual(0);
        });
        it("off all", function(){
            manager.off();
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.CLICK));
            manager.trigger(target, Engine3D.CustomEvent.create(eventType));
            manager.trigger(target2, Engine3D.CustomEvent.create(eventType));

            expect(eventTarget).toBeNull();
            expect(eventTarget2).toBeNull();
            expect(sum).toEqual(0);
            expect(sum2).toEqual(0);
            expect(sum3).toEqual(0);
        });
    });

    describe("system event", function(){
        beforeEach(function(){

        });

        //should test in real environment(pc, mobile)

        //write gulp task to sync to server for testing in mobile
        it("", function(){

        });

        //manager.on(scene,
        //    {
        //        eventType: EventType.MOUSE,

        //        onClick: function (e) {
        //            expect(e instanceof Engine3D.Event).toBeTruthy();
        //            expect(e.target.id).toEqual("event-test");
        //            expect(e.mouseButton).toEqual(0);
        //            expect(e.type).toEqual(MouseEvent.CLICK);
        //        }
        //    });
        //
        //manager.trigger(dom, MouseEvent.CLICK);


        //write unit test to dispatch event
        it("", function(){

        })
    });





    describe("event test", function () {
        describe("system event", function () {
            describe("pc event", function () {
                beforeEach(function () {

                });

                it("bind event and trigger event", function () {
                    //manager.on(dom,
                    //    {
                    //        event: Listener.MOUSE,
                    //        onClick: function (e) {
                    //            expect(e instanceof Engine3D.Event).toBeTruthy();
                    //            expect(e.target.id).toEqual("event-test");
                    //            expect(e.mouseButton).toEqual(0);
                    //            expect(e.type).toEqual(MouseEvent.CLICK);
                    //        }
                    //    });
                    //
                    //manager.trigger(dom, MouseEvent.CLICK);
                });

                //describe("remove event bind", function () {
                //    var count = 0;
                //
                //    beforeEach(function () {
                //        manager.on(KeyboardEvent.KEY_DOWN, function (e) {
                //            count = count + 1;
                //        });
                //        manager.on(MouseEvent.CLICK, function (e) {
                //            count = count + 10;
                //        });
                //    });
                //
                //    it("remove specific event", function () {
                //        manager.off(MouseEvent.CLICK);
                //
                //        manager.trigger(MouseEvent.KEY_DOWN);
                //        manager.trigger(MouseEvent.CLICK);
                //
                //        expect(count).toEqual(10);
                //    });
                //    it("remove all event", function () {
                //        manager.off();
                //
                //        manager.trigger(MouseEvent.KEY_DOWN);
                //        manager.trigger(MouseEvent.CLICK);
                //
                //        expect(count).toEqual(0);
                //    });
                //});
            });

            //todo support mobile event
            describe("mobile event", function () {
                //todo support acceleration event(like cocos2d)
            });
        });
    });

    describe("add listener", function () {
        //it("way1", function () {
        //    manager.on(dom,
        //        {
        //            event: Listener.MOUSE,
        //            onClick: function (e) {
        //                expect(e instanceof Engine3D.Event).toBeTruthy();
        //                expect(e.target.id).toEqual("event-test");
        //                expect(e.mouseButton).toEqual(0);
        //                expect(e.type).toEqual(MouseEvent.CLICK);
        //            }
        //        });
        //
        //    manager.trigger(dom, MouseEvent.CLICK);
        //});
        //it("way2", function () {
        //    var listener = EventListener.create({
        //        event: Listener.MOUSE,
        //        onClick: function (e) {
        //            expect(e instanceof Engine3D.Event).toBeTruthy();
        //            expect(e.target.id).toEqual("event-test");
        //            expect(e.mouseButton).toEqual(0);
        //            expect(e.type).toEqual(MouseEvent.CLICK);
        //        }
        //    });
        //    manager.on(dom, listener);
        //
        //    manager.trigger(dom, MouseEvent.CLICK);
        //});
    });

    describe("dispatch in event flow", function () {
        //var count = null,
        //    director = null,
        //    scene = null,
        //    mesh = null;
        //
        //function bindEventWithNoData() {
        //    manager.on(director, TouchEvent.TOUCH_START, function (data) {
        //        count = count + data;
        //    });
        //    manager.on(scene, TouchEvent.TOUCH_START, function (data) {
        //        count = count + 10 + data;
        //    });
        //    manager.on(mesh, TouchEvent.TOUCH_START, function (data) {
        //        count = count + 100 + data;
        //    });
        //}
        //
        //function bindEventWithData() {
        //    manager.on(director, CustomEvent.CUSTOM_EVENT, function (data) {
        //        count = count + 1;
        //    });
        //    manager.on(scene, CustomEvent.CUSTOM_EVENT, function (data) {
        //        count = count + 10;
        //    });
        //    manager.on(mesh, CustomEvent.CUSTOM_EVENT, function (data) {
        //        count = count + 100;
        //    });
        //}

        beforeEach(function () {
            //count = 0;
            //director = Engine3D.Director.getInstance();
            //scene = Engine3D.Scene.create(null, "", "");
            //mesh = Engine3D.Mesh.create(null);
            //
            ////scene.add(mesh);
            //scene._meshes.addChilds(mesh);
            ////director.runWithScene(scene);
            //
            //director._scene = scene;
        });

        describe("build flow relation", function () {
            it("can be hierarchy relation of node", function () {

            });
            it("can be build by using setParent method", function () {

            });
        });

        it("trigger current target", function () {

        });


        describe("broadcast (down in flow)", function () {
            it("broadcast system event", function () {
                //bindEventWithNoData();
                //
                //manager.broadcast(CustomEvent.create(scene, CustomEvent.CUSTOM_EVENT));
                //
                //expect(count).toEqual(110);
            });
            describe("broadcast custom event", function () {
                //it("test1", function () {
                //    bindEventWithData1();
                //
                //    director.broadcast("customEvent", 5);
                //
                //    expect(count).toEqual(125);
                //});
                //it("test2", function () {
                //    bindEventWithData2();
                //
                //    director.broadcast("customEvent", {
                //        count: 5
                //    });
                //
                //    expect(count).toEqual(125);
                //});
            });
        });
        it("emit (up in flow)", function () {
            it("emit dom event", function () {
                //bindEventWithNoData();
                //
                //scene.emit("customEvent");
                //
                //expect(count).toEqual(11);
            });
            describe("emit custom event", function () {
                //it("test1", function () {
                //    bindEventWithData1();
                //
                //    mesh.emit("customEvent", 5);
                //
                //    expect(count).toEqual(125);
                //});
                //it("test2", function () {
                //    bindEventWithData2();
                //
                //    mesh.emit("customEvent", {
                //        count: 5
                //    });
                //
                //    expect(count).toEqual(125);
                //});
            });
        });
    });

    it("e.target is what triggers the event dispatcher to trigger and e.currentTarget is what you assigned your listener to", function () {

    });
    it("can set listener priority of the same target", function () {

    });
});
