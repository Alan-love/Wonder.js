describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){
        initSample();


        tester.init();

        if(done){
            done();
        }


        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChildren(createPlane());
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createPlane() {
            var fireTexture = wd.FireProceduralTexture.create();


            var material = wd.LightMaterial.create();
            material.diffuseMap = fireTexture;


            var geometry = wd.PlaneGeometry.create();
            geometry.material = material;
            geometry.width = 20;
            geometry.height = 20;

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());

            gameObject.transform.rotate(wd.Vector3.create(90,0,0));


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
            var directionLightComponent = wd.DirectionLight.create();
            directionLightComponent.color = wd.Color.create("#ffffff");
            directionLightComponent.intensity = 1;


            var directionLight = wd.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            directionLight.transform.translate(wd.Vector3.create(10, 10, 10));

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
            controller.distance = 100;

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
                    imageName:"procedural_texture_animate_1.png"
                },
                {
                    frameIndex:10,
                    imageName:"procedural_texture_animate_2.png"
                }
            ]
        );
    });
});

