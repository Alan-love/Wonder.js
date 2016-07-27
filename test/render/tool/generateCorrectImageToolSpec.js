describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/texture/1.jpg", id: "texture"},
                {url: "../../asset/texture/crate.gif", id: "ground"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            var sphere = createSphere();
            var box = createBox();
            var ground = createGround();

            director.scene.addChild(sphere);
            director.scene.addChild(box);
            director.scene.addChild(ground);
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 100, 100)));
            director.scene.addChild(createDirectionLight(wd.Vector3.create(100, 100, 0)));
            director.scene.addChild(createCamera());

            director.start();
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


            gameObject.transform.translate(wd.Vector3.create(-30, 20, 0));

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
            shadow.cast = true;
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
            directionLightComponent.shadowCameraLeft = -100;
            directionLightComponent.shadowCameraRight = 100;
            directionLightComponent.shadowCameraTop = 100;
            directionLightComponent.shadowCameraBottom = -100;
            directionLightComponent.shadowCameraNear = 0.1;
            directionLightComponent.shadowCameraFar = 1000;
            directionLightComponent.shadowBias = 0.002;
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

            var controller = wd.FlyCameraController.create(cameraComponent);

            camera.addComponent(controller);

            camera.transform.translate(-30, 100, 30);
            camera.transform.lookAt(0, 0, 0);

            return camera;
        }


    }


    beforeEach(function (done) {
        sandbox = sinon.sandbox.create();

        tester = SceneTester.create(sandbox);

        renderTestTool.prepareContext();


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
                    imageName:"shadow_multiDirection_shadowMaps.png"
                }
            ]
        );
    });
});

