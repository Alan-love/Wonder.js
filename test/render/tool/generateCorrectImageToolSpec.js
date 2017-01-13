var randomTool = (function(){
    return {
        getFixedRandomNum: function(index){
            var seedArr = [
                0.1, 0.8, 0.7, 0.3, 0.2,
                0.9, 0.95, 0.4, 0.6,0.35,
                0.23, 0.55, 0.12, 0.88, 0.72,

                0.13, 0.05, 0.08, 0.33, 0.35,
                0.54, 0.71, 0.69, 0.36, 0.98
            ];

            var max = seedArr.length;

            // if(index > max)

            // expect(index).not.toBeGreaterThan(seedArr.length);

            return seedArr[index % max];
        },
        stubMathRandom: function(sandbox, count){
            sandbox.stub(Math, "random");

            for(var i = 0; i < count; i++){
                Math.random.onCall(i).returns(this.getFixedRandomNum(i));
            }
        }
    }
})();
var instanceTool = (function(){
    return {
        getInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, range / 2 - this._getVal(index + 1, count) * range, range / 2 - this._getVal(index+ 2, count) * range);
        },
        getShadowInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, 60, 0);
        },
        getSpecificInstancePosition:function(index, range, count, x,y,z){
            var x = x !== null ? x : (range / 2 - this._getVal(index, count) * range);
            var y = y !== null ? y : (range / 2 - this._getVal(index + 1, count) * range);
            var z = z !== null ? z :(range / 2 - this._getVal(index + 2, count) * range);

            return wd.Vector3.create(x, y, z);
        },
        getInstanceRotation:function(index, count){
            var val = this._getVal(index, count);

            return wd.Vector3.create(90 * val, 90 * val,0);
        },
        getInstanceScale:function(index, count){
            return wd.Vector3.create(3,3,3);
        },
        _getVal:function(index, count){
            return randomTool.getFixedRandomNum(index);
        }
    }
})();
describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
            {url: "../../asset/texture/crate.gif", id: "ground"},
            {
                url: "../../asset/model/wd/boxAnimated/boxAnimated.wd",
                id: "model"
            }
        ])
            .do(initSample);


        function initSample() {
            var director = wd.Director.getInstance();

            director.renderer.setClearColor(wd.Color.create("#aaaaff"));

            var ground = createGround();

            director.scene.addChild(ground);
            director.scene.addChildren(createGLTFs());
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 500, 500)));
            director.scene.addChild(createDirectionLight(wd.Vector3.create(500, 500, 0)));
            director.scene.addChild(createCamera());

            director.start();
        }

        function createGLTFs(){
            var arr = [],
                model = setGLTF(),
                range = 300,
                count = 10;

            model.transform.position = wd.Vector3.create(60, 24, -40);

            arr.push(model);

            var sourceInstanceComponent = model.getComponent(wd.OneToOneSourceInstance);

            for(var i = 0; i < count; i++){
                var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                instance.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 24, null);




                var anim = instance.getChild(1).getComponent(wd.ArticulatedAnimation);

                anim.play("animation_0");



                arr.push(instance);
            }

            return arr;
        }

        function setGLTF() {
            var models = wd.LoaderManager.getInstance().get("model").getChild("models");

            var box1 = models.getChild(1);
            var box2 = models.getChild(2);

            var boxContainer = wd.GameObject.create();
            boxContainer.addChildren([box1, box2]);

            boxContainer.addComponent(wd.OneToOneSourceInstance.create());



            box1.transform.scale = wd.Vector3.create(20,20,20);
            box2.transform.scale = wd.Vector3.create(20,20,20);

            var anim = box2.getComponent(wd.ArticulatedAnimation);

            anim.play("animation_1");





//                    wd.Director.getInstance().scheduler.scheduleTime(function(){
//                        anim.pause();
////                anim.stop();
//                    }, 1000);
//
//                    wd.Director.getInstance().scheduler.scheduleTime(function(){
//                        anim.resume();
////                anim.play("animation_1");
//                    }, 2000);

//            return models;
            return boxContainer;
        }

        function createGround(){
            var map = wd.LoaderManager.getInstance().get("ground").toTexture();
            map.name = "groundMap";
            map.wrapS = wd.ETextureWrapMode.REPEAT;
            map.wrapT = wd.ETextureWrapMode.REPEAT;
            map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 32;
            material.diffuseMap = map;


            var plane = wd.PlaneGeometry.create();
            plane.width = 400;
            plane.height = 400;
            plane.material = material;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(plane);

            gameObject.name = "ground";

            var shadow = wd.Shadow.create();
            shadow.cast = false;
            shadow.receive = true;

            gameObject.addComponent(shadow);




            return gameObject;
        }

        function createAmbientLight() {
            var ambientLightComponent = wd.AmbientLight.create();
            ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

            var ambientLight = wd.GameObject.create();
            ambientLight.addComponent(ambientLightComponent);

            return ambientLight;
        }

        function createDirectionLight(pos) {
            var SHADOW_MAP_WIDTH = 1024,
                SHADOW_MAP_HEIGHT = 1024;

            var directionLightComponent = wd.DirectionLight.create();
            directionLightComponent.color = wd.Color.create("#ffffff");
            directionLightComponent.intensity = 1;
            directionLightComponent.castShadow = true;
            directionLightComponent.shadowCameraLeft = -200;
            directionLightComponent.shadowCameraRight = 200;
            directionLightComponent.shadowCameraTop = 200;
            directionLightComponent.shadowCameraBottom = -200;
            directionLightComponent.shadowCameraNear = 0.1;
            directionLightComponent.shadowCameraFar = 1000;
            directionLightComponent.shadowBias = 0.005;
            directionLightComponent.shadowDarkness = 0.2;
            directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
            directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

            var directionLight = wd.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            directionLight.transform.position = pos;

            return directionLight;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 1000;

            var controller = wd.ArcballCameraController.create(cameraComponent);
            controller.theta = Math.PI / 4;
            controller.distance = 200;

            camera.addComponent(controller);

            return camera;
        }


    }


    beforeEach(function (done) {
        sandbox = sinon.sandbox.create();

        tester = SceneTester.create(sandbox);

        renderTestTool.prepareContext();

        randomTool.stubMathRandom(sandbox, 10000);


        tester.execBody(body, done);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                    frameIndex:1,
                    imageName:"instance_animation_articulated_frame1"
                }
            ]
        );
    });
});

