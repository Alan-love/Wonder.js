describe("action integration test", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        gameObject = dy.GameObject.create();
        sandbox.stub(window.performance, "now").returns(0);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("Repeat,Sequence,Spawn", function () {
        var x;
        var action1 = dy.Tween.create().from({x: 0}).to({x: 5}, 100)
            .onUpdate(function () {
                x = this.x;
            });
        var action2 = dy.DelayTime.create(50);
        var action3 = dy.DelayTime.create(30);
        var sum = 0;
        var action4 = dy.CallFunc.create(function () {
            sum = 100;
        });

        action = dy.Repeat.create(dy.Spawn.create(dy.Repeat.create(action1, 2), dy.Sequence.create(dy.Sequence.create(action2, action3), action4)), 1);

        gameObject.addComponent(action);

        action.start();
        gameObject._actionManager.update(50);
        expect(x).toEqual(2.5);
        expect(action2.isFinish).toBeTruthy();

        gameObject._actionManager.update(80);
        expect(action3.isFinish).toBeTruthy();
        expect(action4.isFinish).toBeFalsy();

        gameObject._actionManager.update(81);
        expect(action4.isFinish).toBeTruthy();
        expect(sum).toEqual(100);

        window.performance.now.returns(100);
        gameObject._actionManager.update(100);
        expect(x).toEqual(5);

        gameObject._actionManager.update(200);
        expect(action1.isFinish).toBeTruthy();
        expect(x).toEqual(5);
        expect(action.isFinish).toBeTruthy();
    });
});
