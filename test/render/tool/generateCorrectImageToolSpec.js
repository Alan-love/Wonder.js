describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/texture/1.jpg", id: "texture"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            var sphere1 = createSphere1();
            var sphere2 = createSphere2();
            var box = createBox();

            var pointLight = createPointLight();

            director.scene.addChildren([sphere1, sphere2]);
            director.scene.addChild(box);
            director.scene.addChild(createMirror1(sphere1, sphere2, box));
            director.scene.addChild(createAmbientLight());

            director.scene.addChild(pointLight);
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            director.start();
        }

        function createSphere1() {
            var material = wd.LightMaterial.create();
            material.color = wd.Color.create("rgb(100, 255, 100)");
            material.specularColor = wd.Color.create("rgb(0, 255, 0)");
            material.shininess = 32;
            material.diffuseMap = wd.LoaderManager.getInstance().get("texture").toTexture();
            material.shading = wd.EShading.SMOOTH;


            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 5;
            geometry.segment = 20;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);

            return gameObject;
        }

        function createSphere2() {
            var material = wd.LightMaterial.create();
            material.color = wd.Color.create("rgb(100, 255, 100)");
            material.specularColor = wd.Color.create("rgb(0, 255, 0)");
            material.shininess = 32;
            material.diffuseMap = wd.LoaderManager.getInstance().get("texture").toTexture();
            material.shading = wd.EShading.SMOOTH;


            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 3;
            geometry.segment = 20;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);


            gameObject.transform.translate(wd.Vector3.create(25, 10, 0));

            return gameObject;
        }

        function createBox() {
            var material = wd.BasicMaterial.create();
            material.color = wd.Color.create("rgb(100, 0, 255)");

            var boxGeometry = wd.BoxGeometry.create();
            boxGeometry.material = material;
            boxGeometry.width = 2;
            boxGeometry.height = 2;
            boxGeometry.depth = 2;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(boxGeometry);

            gameObject.transform.translate(wd.Vector3.create(0, -13, 0));

            return gameObject;
        }

        function createMirror1(sphere1, sphere2, box){
            var texture = wd.MirrorTexture.create();
            texture.width = 1024;
            texture.height = 1024;
            texture.renderList = [sphere1, sphere2, box];

//            var material = wd.BasicMaterial.create();
            var material = wd.MirrorMaterial.create();
            material.color = wd.Color.create("#aaaaaa");
            material.side = wd.ESide.BOTH;
            material.reflectionMap = texture;

            var plane = wd.PlaneGeometry.create();
            plane.width = 20;
            plane.height = 20;
            plane.material = material;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(plane);

            gameObject.transform.translate(wd.Vector3.create(0, -10, 0));

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
            pointLightComponent.color = wd.Color.create("#1f89ca");
            pointLightComponent.intensity = 1;
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

            directionLight.transform.translate(wd.Vector3.create(0, 10, 0));
//            directionLight.transform.rotateLocal(wd.Vector3.create(0, 90, 0));

            return directionLight;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 200;

            var controller = wd.FlyCameraController.create(cameraComponent);
            camera.addComponent(controller);

            camera.transform.translate(wd.Vector3.create(-20, 10, 30));
            camera.transform.lookAt(wd.Vector3.create(0, 0, 0));

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
                    imageName:"light_mirror.png"
                },
            ]
        );
    });
});

