describe("ProgressBar", function () {
    var sandbox = null;
    var bar;
    var renderer;
    var uiObject;
    var director;

    function createBar() {
        bar = wd.ProgressBar.create();


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(bar);


        renderer = wd.UIRenderer.create();


        uiObject.addComponent(renderer);


        return uiObject;
    }

    function prepareForUpdateBeforeInit(){
        renderer.context = canvasTool.buildFakeContext(sandbox);
        renderer.context.canvas = {
            width:1000,
            height:500
        }

    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 500
        });






        uiObject = createBar();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));



        director.scene.addChild(uiObject);






        bar.borderStyle = "gray";
        bar.fillStyle = "red";


        var position = wd.Vector2.create(10, 20);

        uiObject.transform.position = position;
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        uiObject.dispose();
        sandbox.restore();
    });
    
    describe("init", function(){
        beforeEach(function(){
        });

        it("ui can be init before init scene", function(){
            sandbox.spy(bar, "getContext");


            prepareForUpdateBeforeInit();

            director.initUIObjectScene();

            expect(bar.getContext).toCalledOnce();


            bar.percent = 0.5;

            director.runUIObjectScene(-1);


            expect(renderer.context.drawImage).toCalledOnce();



            director._init();

            expect(bar.getContext).toCalledOnce();
        });
        it("get uiRenderer's context", function(){
            director.initUIObjectScene();

            expect(bar.context).toEqual(renderer.context);
        });

        describe("create offScreen canvas", function(){
            it("set it's size to equal ui canvas's size", function(){
                director.initUIObjectScene();

                expect(bar._offScreenCanvas.width).toEqual(1000);
                expect(bar._offScreenCanvas.height).toEqual(500);
            });
            it("create offScreen canvas, get its context", function(){
                director.initUIObjectScene();

                expect(bar._offScreenCanvas).not.toBeNull();
                expect(bar._offScreenContext).not.toBeNull();

            });
        });

        it("draw progress bar in offScreen", function(){
            var fakeOffScreenCanvas, fakeOffScreenContext;

            function buildFakeOffScreenCanvas(){
                fakeOffScreenContext = canvasTool.buildFakeContext(sandbox);

                fakeOffScreenCanvas = {
                    width:1000,
                    height:500,

                    getContext:sandbox.stub().returns(
                        fakeOffScreenContext
                    )
                }


                fakeOffScreenContext.canvas = fakeOffScreenCanvas;

                sandbox.stub(wdCb.DomQuery, "create").onCall(0).returns({
                    get:sandbox.stub().returns(
                        fakeOffScreenCanvas
                    ),
                    attr:sandbox.stub()
                });


                wdCb.DomQuery.create.onCall(1).returns({
                    get:sandbox.stub(),
                    remove:sandbox.stub()
                });
            }


            buildFakeOffScreenCanvas();

            director.initUIObjectScene();

            expect(fakeOffScreenContext.clearRect).toCalledWith(0, 0, fakeOffScreenCanvas.width, fakeOffScreenCanvas.height);

            expect(fakeOffScreenContext.save).toCalledOnce();
            expect(fakeOffScreenContext.beginPath).toCalledAfter(fakeOffScreenContext.save);


            expect(fakeOffScreenContext.moveTo).toCalledOnce();
            expect(fakeOffScreenContext.arcTo.callCount).toEqual(4);

            expect(fakeOffScreenContext.closePath).toCalledBefore(fakeOffScreenContext.stroke);

            expect(fakeOffScreenContext.stroke).toCalledOnce();
            expect(fakeOffScreenContext.fill).toCalledOnce();

            expect(fakeOffScreenContext.restore).toCalledOnce();
        });
    });

    describe("update", function(){
        beforeEach(function(){
            prepareForUpdateBeforeInit();

            director.initUIObjectScene();
        });

        it("if percent <= 0, return", function(){
            bar.percent = 0;

            director.runUIObjectScene(-1);

            expect(renderer.context.drawImage).not.toCalled();
        });

        describe("else", function(){
            beforeEach(function(){
                bar.percent = 0.5;
            });

            it("save context", function(){
                director.runUIObjectScene(-1);

                expect(renderer.context.save).toCalledBefore(renderer.context.drawImage);
            });
            it("if isRotate, set context transform to be rotationMatrix", function(){
                uiObject.transform.rotate(45);
                var rotationMatrix = uiObject.transform.rotationMatrix;

                director.runUIObjectScene(-1);

                expect(renderer.context.setTransform).toCalledWith(rotationMatrix.a, rotationMatrix.b, rotationMatrix.c, rotationMatrix.d, rotationMatrix.tx, rotationMatrix.ty);
            });
            it("draw offScreen canvas from left", function(){
                uiObject.transform.width = 100;
                uiObject.transform.height = 50;

                director.runUIObjectScene(-1);

                var context = renderer.context;
                var position = uiObject.transform.position;
                var dw = 100 * bar.percent;
                var dh = 50;
                var loadedWidth = bar.width * bar.percent;

                expect(context.drawImage).toCalledOnce();
                expect(context.drawImage).toCalledWith(bar._offScreenCanvas, 0, 0,
                    loadedWidth,
                    bar.height,
                    position.x - bar.width / 2,
                    position.y - dh / 2,
                    dw,
                    dh
                );
            });
            it("draw border", function(){
                director.runUIObjectScene(-1);

                expect(renderer.context.arcTo.callCount).toEqual(4);
                expect(renderer.context.stroke).toCalledAfter(renderer.context.drawImage);
                expect(renderer.context.fill).not.toCalled();
            });
            it("restore context", function(){
                director.runUIObjectScene(-1);

                expect(renderer.context.restore).toCalledAfter(renderer.context.drawImage);
            });
        });
    });

    describe("change percent should cause dirty", function(){
        beforeEach(function(){
            prepareForUpdateBeforeInit();
            bar.percent = 0.5;

            director.initUIObjectScene();

            director.runUIObjectScene(-1);

            expect(renderer.context.drawImage).toCalledOnce();


            director.runUIObjectScene(-1);

            expect(renderer.context.drawImage).not.toCalledTwice();
        });

        it("if the new data equal old data, not dirty", function(){
            bar.percent = 0.5;

            director.runUIObjectScene(-1);

            expect(renderer.context.drawImage).not.toCalledTwice();
        });
        it("else, dirty", function(){
            bar.percent = 0.8;

            director.runUIObjectScene(-1);

            expect(renderer.context.drawImage).toCalledTwice();
        });
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        it("clone data", function () {
            var percent = 0.2,
                borderStyle = "rgba(0, 0, 0.2, 1)",
                fillStyle = "rgba(0, 0, 0.2, 1)",
                radius = 10;


            cloneTool.extend(bar, {
                    percent: percent,
                    borderStyle: borderStyle,
                fillStyle: fillStyle,
                radius: radius
            });


            var result = bar.clone();

            expect(result.percent).toEqual(percent);
            expect(result.borderStyle).toEqual(borderStyle);
            expect(result.fillStyle).toEqual(fillStyle);
            expect(result.radius).toEqual(radius);
        });
    });
});

