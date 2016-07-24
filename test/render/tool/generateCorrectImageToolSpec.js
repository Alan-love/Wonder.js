describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){
        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture"},
            {url: assetParentDirPath + "asset/texture/crate.gif", id: "ground"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            var sphere = createSphere();
            sphere.transform.translate(wd.Vector3.create(-30, 20, 0));

            var sphere2 = createSphere();
            sphere2.transform.translate(wd.Vector3.create(-70, 20, 0));

//            var sphere3 = createSphere();
//            sphere3.transform.translate(wd.Vector3.create(-100, 20, 0));


            var ground = createGround();

            director.scene.addChild(sphere);
            director.scene.addChild(ground);


            wd.Director.getInstance().scheduler.scheduleFrame(function(){
                director.scene.addChild(sphere2);

                sphere2.init();



//                director.scene.addChild(sphere3);

//                sphere3.getComponent(wd.Shadow).cast = false;


//                sphere3.init();
            }, 1);



            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createSphere() {
            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 16;
            material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
            material.shading = wd.EShading.SMOOTH;


            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 20;
            geometry.segment = 20;


            var gameObject = wd.GameObject.create();

            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);



            var shadow = wd.Shadow.create();
            shadow.cast = true;
            shadow.receive = true;

            gameObject.addComponent(shadow);





            var boxChild1 = createBox();
            var boxChild2 = createBox();
            var boxChild21 = createBox();

            gameObject.addChild(boxChild1);
            gameObject.addChild(boxChild2);

            boxChild2.addChild(boxChild21);


            boxChild1.transform.translateLocal(50, 0, 0);
            boxChild2.transform.translateLocal(-50, 0, 0);

            boxChild21.transform.translateLocal(-60, 0, 0);







            return gameObject;
        }

        function createBox(){
            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.color = wd.Color.create("#666666");
            material.shininess = 16;


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 10;
            geometry.height = 10;
            geometry.depth = 10;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);


            gameObject.transform.translate(wd.Vector3.create(20, 10, 30));
            gameObject.transform.eulerAngles = wd.Vector3.create(0, 45, 0);


//            var action = wd.RepeatForever.create(wd.CallFunc.create(function(){
//                gameObject.transform.rotate(0, 1, 0);
//            }));
//
//            gameObject.addComponent(action);


            var shadow = wd.Shadow.create();
            shadow.cast = true;
            shadow.receive = true;

            gameObject.addComponent(shadow);

            return gameObject;
        }

        function createGround(){
            var map = wd.LoaderManager.getInstance().get("ground").toTexture();
            map.wrapS = wd.ETextureWrapMode.REPEAT;
            map.wrapT = wd.ETextureWrapMode.REPEAT;
            map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 32;
            material.diffuseMap = map;


            var plane = wd.PlaneGeometry.create();
            plane.width = 200;
            plane.height = 200;
            plane.material = material;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(plane);


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

        function createDirectionLight() {
            var SHADOW_MAP_WIDTH = 1024,
                SHADOW_MAP_HEIGHT = 1024;

            var directionLightComponent = wd.DirectionLight.create();
            directionLightComponent.color = wd.Color.create("#ffffff");
            directionLightComponent.intensity = 1;
            directionLightComponent.castShadow = true;
            directionLightComponent.shadowCameraLeft = -500;
            directionLightComponent.shadowCameraRight = 500;
            directionLightComponent.shadowCameraTop = 500;
            directionLightComponent.shadowCameraBottom = -500;
            directionLightComponent.shadowCameraNear = 0.1;
            directionLightComponent.shadowCameraFar = 1000;
            directionLightComponent.shadowBias = 0.002;
            directionLightComponent.shadowDarkness = 0.2;
            directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
            directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;


            var directionLight = wd.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            directionLight.transform.translate(wd.Vector3.create(0, 200, 200));

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
            controller.theta = Math.PI / 8;
            controller.distance = 350;

            camera.addComponent(controller);

            return camera;
        }
    }

    beforeEach(function (done) {
        tester = SceneTester.create();

        renderTestTool.prepareContext();

        tester.execBody(body, done);
    });
    afterEach(function () {
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                    frameIndex:1,
                    imageName:"shadowMap_add.png"
                }
            ]
        );
    });
});

