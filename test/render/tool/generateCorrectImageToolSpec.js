describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createBox());
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createPointLight());
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            director.start();
        }

        function createBox() {
            var material = wd.LightMaterial.create();
            material.color = wd.Color.create("rgb(100, 255, 100)");
            material.specularColor = wd.Color.create("rgb(0, 255, 0)");
            material.shininess = 32;


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());


            return gameObject;
        }

        function createAmbientLight() {
            var ambientLightComponent = wd.AmbientLight.create();
            ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

            var ambientLight = wd.GameObject.create();
            ambientLight.addComponent(ambientLightComponent);

            return ambientLight;
        }

        function createPointLight() {
            var pointLightComponent = wd.PointLight.create();
            pointLightComponent.color = wd.Color.create("#222222");
            pointLightComponent.intensity = 0.5;
            pointLightComponent.rangeLevel = 10;

            var pointLight = wd.GameObject.create();
            pointLight.addComponent(pointLightComponent);

            var pointSphereMaterial = wd.BasicMaterial.create();
            pointSphereMaterial.color = wd.Color.create("#222222");

            var geometry = wd.SphereGeometry.create();
            geometry.material = pointSphereMaterial;
            geometry.radius = 1;
            geometry.segment = 20;

            pointLight.addComponent(geometry);
            pointLight.addComponent(wd.MeshRenderer.create());

            var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
                pointLight.transform.rotateAround(0.5, wd.Vector3.create(0, 0, 0), wd.Vector3.up);
            }));

            pointLight.addComponent(action);

            pointLight.transform.translate(wd.Vector3.create(0, 0, 10));

            return pointLight;
        }

        function createDirectionLight() {
            var directionLightComponent = wd.DirectionLight.create();
            directionLightComponent.color = wd.Color.create("#1f8888");
            directionLightComponent.intensity = 1;


            var directionLight = wd.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            directionLight.transform.translate(wd.Vector3.create(10, 0, 0));
            directionLight.transform.rotateLocal(wd.Vector3.create(0, 90, 0));

            return directionLight;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 80;

            var controller = wd.ArcballCameraController.create(cameraComponent);
            controller.distance = 20;
            controller.phi = Math.PI / 4;

            camera.addComponent(controller);

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
                    imageName:"light_point_direction.png"
                },
            ]
        );
    });
});

