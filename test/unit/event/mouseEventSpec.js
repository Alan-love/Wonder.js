describe("mouse event", function () {
    var manager = null;
    var Listener = null;
    var sandbox = null;
    var target = null;
    var fakeEvent = null;

    function insertDom() {
        $("html").append($("<canvas id='event-test'></canvas>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        insertDom();
        dy.Director.getInstance().createGL("#event-test");
        fakeEvent = {
            pageX:10,
            pageY:10
        };
        target =  dy.GameObject.create();
        manager = dy.EventManager;
        Listener = dy.EventListener;
    });
    afterEach(function () {
        removeDom();
        manager.off();
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("bind/unbind mouse event", function(){
        beforeEach(function(){

        });

        describe("eventName", function(){
            it("on/off", function(){
                var eventTarget = null,
                    sum = 0;

                manager.on(target, dy.EventName.CLICK, function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.CLICK));

                expect(eventTarget).toBeInstanceOf(dy.MouseEvent);
                expect(eventTarget.name).toEqual(dy.EventName.CLICK);
                expect(sum).toEqual(1);

                manager.off(target, dy.EventName.CLICK);
                manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.CLICK));

                expect(sum).toEqual(1);
            });
            it("fromEvent", function(){
                var eventTarget = null,
                    sum = 0;

                var subscription = manager.fromEvent(target, dy.EventName.CLICK)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.CLICK));

                expect(eventTarget).toBeInstanceOf(dy.MouseEvent);
                expect(eventTarget.name).toEqual(dy.EventName.CLICK);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.CLICK));

                expect(sum).toEqual(1);
            });
        });
        it("listener", function(){
            var eventTarget = null,
                sum = 0;

            manager.on(target,
                {
                    eventType: dy.EventType.MOUSE,

                    onClick: function (e) {
                        eventTarget = e;
                        sum++;
                    }
                });
            manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.CLICK));

            expect(eventTarget).toBeInstanceOf(dy.MouseEvent);
            expect(eventTarget.name).toEqual(dy.EventName.CLICK);

            manager.off(target, dy.EventName.CLICK);
            manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.CLICK));

            expect(sum).toEqual(1);
        });
        it("priority", function(){
            var eventTarget = null,
                eventTarget2 = null,
                fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub()
                };

            var subscription1 = manager.fromEvent(target, dy.EventName.MOUSEDOWN, 1)
                .subscribe(function (e) {
                    eventTarget = e;
                    fakeObj.a();
                });
            var subscription2 = manager.fromEvent(target, dy.EventName.MOUSEDOWN, 2)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEDOWN));

            expect(eventTarget).toBeInstanceOf(dy.MouseEvent);
            expect(eventTarget.name).toEqual(dy.EventName.MOUSEDOWN);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);

            subscription2.dispose();
            manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEDOWN));

            expect(fakeObj.a).toCalledTwice();
            expect(fakeObj.b).toCalledOnce();
        });
    });

    describe("transfer event", function(){
        var mesh1,mesh2,mesh3,mesh4;
        var eventTarget1 = null,
            eventTarget2 = null,
            eventTarget3 = null,
            eventTarget4 = null;
        var fakeObj;

        beforeEach(function(){
            mesh1 = dy.GameObject.create();
            mesh2 = dy.GameObject.create();
            mesh3 = dy.GameObject.create();
            mesh4 = dy.GameObject.create();
            mesh2.addChild(mesh1);
            mesh4.addChild(mesh2);
            mesh4.addChild(mesh3);
            fakeObj = {
                a:sandbox.stub(),
                b:sandbox.stub(),
                c:sandbox.stub(),
                d:sandbox.stub()
            }

            manager.fromEvent(mesh1, dy.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget1 = e;
                    fakeObj.a();
                });
            manager.fromEvent(mesh2, dy.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.fromEvent(mesh3, dy.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget3 = e;
                    fakeObj.c();
                });
            manager.fromEvent(mesh4, dy.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget4 = e;
                    fakeObj.d();
                });
        });

        it("emit custom event", function(){
            manager.emit(mesh1, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEDOWN));

            expect(eventTarget1.phase).toEqual(dy.EventPhase.EMIT);
            expect(eventTarget1.target.uid).toEqual(mesh1.uid);
            expect(eventTarget2.phase).toEqual(dy.EventPhase.EMIT);
            expect(eventTarget2.target.uid).toEqual(mesh1.uid);
            expect(eventTarget3).toBeNull();
            expect(eventTarget4.phase).toEqual(dy.EventPhase.EMIT);
            expect(eventTarget4.target.uid).toEqual(mesh1.uid);
            expect(fakeObj.a).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.d);
        });
        it("broadcast custom event", function(){
            manager.broadcast(mesh4, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEDOWN));

            expect(eventTarget4.phase).toEqual(dy.EventPhase.BROADCAST);
            expect(eventTarget4.target.uid).toEqual(mesh4.uid);
            expect(eventTarget2.phase).toEqual(dy.EventPhase.BROADCAST);
            expect(eventTarget2.target.uid).toEqual(mesh4.uid);
            expect(eventTarget1.phase).toEqual(dy.EventPhase.BROADCAST);
            expect(eventTarget1.target.uid).toEqual(mesh4.uid);
            expect(eventTarget3.phase).toEqual(dy.EventPhase.BROADCAST);
            expect(eventTarget3.target.uid).toEqual(mesh4.uid);
            expect(fakeObj.d).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);
            expect(fakeObj.a).toCalledBefore(fakeObj.c);
        });
    });

    describe("handle mousemove event", function(){
        it("save location after emit event", function(){
            var eventTarget = null;

            manager.on(target, dy.EventName.MOUSEMOVE,function (e) {
                    eventTarget = e;
                });

            manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEMOVE));

            expect(eventTarget).toBeInstanceOf(dy.MouseEvent);
            var handler = dy.MouseEventHandler.getInstance();
            expect(handler.lastX).toEqual(fakeEvent.pageX);
            expect(handler.lastY).toEqual(fakeEvent.pageY);
        });
    });

    it("use drag example to test", function(){
        var sum1 = 0;
        var sum2 = 0;
        var stub = sandbox.stub();
        //var target = document.getElementById("event-test");
        target = dy.Director.getInstance().scene;

        sandbox.stub(dy.MouseEventHandler.getInstance(), "_saveLocation");

        //manager.on(target, dy.EventName.MOUSEMOVE,function (e) {
        //    sum1++;
        //});
        //manager.on(target, dy.EventName.MOUSEWHEEL,function (e) {
        //    sum2++;
        //});
        //manager.fromEvent(target, dy.EventName.MOUSEMOVE).subscribe(function (e) {
        //    sum1++;
        //});
        //manager.fromEvent(target, dy.EventName.MOUSEWHEEL).subscribe(function (e) {
        //    sum2++;
        //});
        //
        //YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousemove");
        //YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousewheel");
        //YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousemove");
        //
        ////manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEMOVE));
        ////manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEWHEEL));
        ////manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEMOVE));
        //
        //expect(dy.MouseEventHandler.getInstance()._saveLocation).toCalledTwice();
        //expect(sum1).toEqual(2);
        //expect(sum2).toEqual(1);

        manager.fromEvent(target, dy.EventName.MOUSEDOWN).flatMap(function(e){
                return manager.fromEvent(target, dy.EventName.MOUSEMOVE).takeUntil(manager.fromEvent(target, dy.EventName.MOUSEUP));
            })
            .subscribe(function(e){
                sum1++;
                stub();
            })

        //manager.fromEvent(target, dy.EventName.MOUSEMOVE).subscribe(function (e) {
        //    sum1++;
        //});
        //manager.fromEvent(target, dy.EventName.MOUSEWHEEL).subscribe(function (e) {
        //    sum2++;
        //});

        var _saveLocation = dy.MouseEventHandler.getInstance()._saveLocation;

        YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousedown");

        YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousemove");
        YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mouseup");

        expect(_saveLocation).toCalledOnce();
        expect(_saveLocation).toCalledAfter(stub);


        YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousemove");

        expect(_saveLocation).toCalledOnce();


        YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousedown");
        YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousemove");
        YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mouseup");


        expect(_saveLocation).toCalledTwice();
        expect(stub).toCalledTwice();
        expect(_saveLocation.firstCall).toCalledAfter(stub.firstCall);
        expect(_saveLocation.secondCall).toCalledAfter(stub.secondCall);
        expect(sum1).toEqual(2);
    });

    describe("off event", function(){
        var sum;
        var subscription;

        beforeEach(function(){
            sum = 0;
            sandbox.spy(dy.MouseEventHandler.getInstance(), "triggerDomEvent");
            target = dy.Director.getInstance().scene;
            subscription = manager.fromEvent(target, dy.EventName.MOUSEDOWN).subscribe(function(e){
                sum++;
            })
        });

        it("use subscription.dispose to off event binded by fromEvent", function(){
            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousedown");

            expect(sum).toEqual(1);
            expect(dy.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();



            subscription.dispose();


            manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEMOVE));

            expect(sum).toEqual(1);
            expect(dy.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousedown");

            expect(sum).toEqual(1);
            expect(dy.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
        it("use EventManager.off", function(){
            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousedown");

            expect(sum).toEqual(1);
            expect(dy.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();



            manager.off();


            manager.trigger(target, dy.MouseEvent.create(fakeEvent, dy.EventName.MOUSEMOVE));

            expect(sum).toEqual(1);
            expect(dy.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousedown");

            expect(sum).toEqual(1);
            expect(dy.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
    });

    ////clear keyboardEventSpec


    //todo can bind dom event multi times

    //move to domEventSpec



    ////todo trigger dom event

    //off dom handler by fromEvent

////todo one target with one event can only be binded once
});




