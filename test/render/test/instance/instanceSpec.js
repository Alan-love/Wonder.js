describe("instance", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        renderTestTool.destoryContext();

        sandbox.restore();
    });

    describe("scene test", function() {
        describe("test basic render instance gameObjects", function () {
            var tester;

            function body(initFunc){
                if(initFunc){
                    initFunc();
                }

                initSample();


                tester.init();

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren(createModels());
                    director.scene.addChild(createCamera());

                    //director.start();
                }

                function createModels(){
                    var arr = [],
                        model = createSphere(),
                        range = 300,
                        count = 2;

                    var sourceInstanceComponent = wd.SourceInstance.create();
                    model.addComponent(sourceInstanceComponent);

                    arr.push(model);

                    for(var i = 0; i < count; i++){
                        var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                        instance.transform.position = instanceTool.getInstancePosition(i, range, count);
                        instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
                        instance.transform.scale = instanceTool.getInstanceScale(i, count);

                        arr.push(instance);
                    }

//            return model;
                    return arr;
                }


                function createSphere(){
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("rgb(0, 255, 255)");


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;
                    geometry.segment = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    var boxChild1 = createBox();
                    var boxChild2 = createBox();
                    var boxChild21 = createBox();

                    gameObject.addChild(boxChild1);
                    gameObject.addChild(boxChild2);

                    boxChild2.addChild(boxChild21);


                    boxChild1.transform.translate(20, 0, 0);
                    boxChild2.transform.translate(-20, 0, 0);

                    boxChild21.transform.translate(-25, 0, 0);


                    gameObject.transform.scale = wd.Vector3.create(8,8,8);


                    return gameObject;
                }

                function createBox(){
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("rgb(255, 0, 255)");


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    return gameObject;
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
                    controller.distance = 500;

                    camera.addComponent(controller);

                    return camera;
                }
            }

            beforeEach(function () {
                tester = SceneTester.create();

                renderTestTool.prepareContext();
            });

            it("test", function (done) {
                body();

                tester.compareAt(1, "instance/instance_render.png", done);
            });
            it("if hardware not support instance, the render result should be the same", function (done) {
                body(function(){
                    wd.GPUDetector.getInstance().extensionInstancedArrays = null;
                });

                tester.compareAt(1, "instance/instance_render.png", done);
            });
        });

        describe("test render point light shadow instance gameObjects", function () {
            var tester;

            function body(initFunc){
                if(initFunc){
                    initFunc();
                }

                initSample();


                tester.init();

                function initSample() {
                    var director = wd.Director.getInstance();

                    var models = createModels();
                    var ground = createGround();

                    director.scene.addChild(ground);
                    director.scene.addChildren(models);
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createPointLight());
                    director.scene.addChild(createCamera());

                    //director.start();
                }

                function createModels(){
                    var arr = [],
                        model = createSphere(),
                        range = 300,
                        count = 2;

                    model.transform.position = wd.Vector3.create(60, 20, 0);

                    arr.push(model);

                    var sourceInstanceComponent = model.getComponent(wd.SourceInstance);

                    for(var i = 0; i < count; i++){
                        var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

//                instance.transform.position = wd.Vector3.create(range / 2 - Math.random() * range, range / 2 - Math.random() * range, range / 2 - Math.random() * range);
//                instance.transform.position = wd.Vector3.create(range / 2 - Math.random() * range, 60, 0);
//                instance.transform.rotate(90 * Math.random(), 90 * Math.random(),0);
//                instance.transform.scale = wd.Vector3.create(3,3,3);


                        instance.transform.position = instanceTool.getShadowInstancePosition(i, range, count);


//
//                var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
//                    this.transform.rotate(0, 0, Math.random() * 10);
//                }, instance));
//
//                instance.addComponent(action);
//
//
                        arr.push(instance);
                    }

                    return arr;
                }


                function createSphere(){
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 16;
//            material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 20;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);

                    gameObject.name = "sphere";


                    var sourceInstanceComponent = wd.SourceInstance.create();

                    gameObject.addComponent(sourceInstanceComponent);


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


                    boxChild1.transform.translate(50, 0, 0);
                    boxChild2.transform.translate(-50, 0, 0);

                    boxChild21.transform.translate(-60, 0, 0);






                    gameObject.transform.translate(wd.Vector3.create(-30, 20, 0));


//            boxChild1.transform.translate(wd.Vector3.create(20, 10, 30));
//            boxChild1.transform.eulerAngles = wd.Vector3.create(0, 45, 0);


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



                    //var action = wd.RepeatForever.create(wd.CallFunc.create(function(gameObject){
                    //    gameObject.transform.rotate(0, 1, 0);
                    //}));
                    //
                    //gameObject.addComponent(action);

                    return gameObject;
                }

                function createGround(){
//            var map = wd.LoaderManager.getInstance().get("ground").toTexture();
//            map.name = "groundMap";
//            map.wrapS = wd.ETextureWrapMode.REPEAT;
//            map.wrapT = wd.ETextureWrapMode.REPEAT;
//            map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 32;
//            material.diffuseMap = map;


                    var plane = wd.PlaneGeometry.create();
                    plane.width = 200;
                    plane.height = 200;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);

                    gameObject.name = "ground";




                    var shadow = wd.Shadow.create();
                    shadow.cast = false;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);




                    gameObject.transform.translate(wd.Vector3.create(1,1,1));


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
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;
//            var listArr = boxArr.concat(groundArr);

                    var pointLightComponent = wd.PointLight.create();
                    pointLightComponent.color = wd.Color.create("#ffffff");
                    pointLightComponent.intensity = 2;
                    pointLightComponent.rangeLevel = 11;
                    pointLightComponent.castShadow = true;
                    pointLightComponent.shadowCameraNear = 0.1;
                    pointLightComponent.shadowCameraFar = 1000;
                    pointLightComponent.shadowBias = 0.01;
                    pointLightComponent.shadowDarkness = 0.2;
                    pointLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                    pointLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

//            pointLightComponent.shadowRenderList = {
//                px:listArr,
//                nx:listArr,
//                py:listArr,
//                ny:listArr,
//                pz:listArr,
//                nz:listArr
//            };

                    var pointSphereMaterial = wd.BasicMaterial.create();
                    pointSphereMaterial.color = wd.Color.create("#ffffff");

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = pointSphereMaterial;
                    geometry.radius = 1;
                    geometry.segment = 20;


                    var pointLight = wd.GameObject.create();
                    pointLight.addComponent(pointLightComponent);
                    pointLight.addComponent(geometry);
                    pointLight.addComponent(wd.MeshRenderer.create());



                    pointLight.transform.translate(wd.Vector3.create(0, 50, 50));

                    return pointLight;
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

            beforeEach(function () {
                tester = SceneTester.create();

                renderTestTool.prepareContext();
            });

            it("test", function (done) {
                body();

                tester.compareAt(1, "instance/instance_shadow_pointLight.png", done);
            });
            it("if hardware not support instance, the render result should be the same", function (done) {
                body(function(){
                    wd.GPUDetector.getInstance().extensionInstancedArrays = null;
                });

                tester.compareAt(1, "instance/instance_shadow_pointLight.png", done);
            });
        });

        describe("test add and remove instance gameObjects", function () {
            var tester;

            function body(initFunc){
                if(initFunc){
                    initFunc();
                }

                initSample();


                tester.init();

                function initSample() {
                    var director = wd.Director.getInstance();


                    var models = createModels();
                    var source = models[0];
                    var instance = models[1];

                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        director.scene.removeChild(instance);
                    }, 1);

                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        director.scene.addChild(instance);

                        instance.init();


                        var instance2 = source.getComponent(wd.SourceInstance).cloneInstance("instance2");

                        instance2.transform.position = wd.Vector3.create(30,30,30);

                        director.scene.addChild(instance2);

                        instance2.init();

                    }, 2);




                    director.scene.addChildren(models);
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    //director.start();
                }

                function createModels(){
                    var arr = [],
                        model = createSphere(),
                        range = 100,
                        count = 1;

                    var sourceInstanceComponent = wd.SourceInstance.create();
                    model.addComponent(sourceInstanceComponent);

                    arr.push(model);
                    model.transform.position = wd.Vector3.create(0, -10, 0);


                    var i = 0;

                    var instance = sourceInstanceComponent.cloneInstance("instance1");

                    instance.transform.position = instanceTool.getInstancePosition(i, range, count);
                    instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
                    instance.transform.scale = instanceTool.getInstanceScale(i, count);

                    arr.push(instance);

                    return arr;
                }


                function createSphere(){
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(0, 255, 255)");


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;
                    geometry.segment = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    var boxChild1 = createBox();
                    var boxChild2 = createBox();
                    var boxChild21 = createBox();

                    gameObject.addChild(boxChild1);
                    gameObject.addChild(boxChild2);

                    boxChild2.addChild(boxChild21);


                    boxChild1.transform.translate(20, 0, 0);
                    boxChild2.transform.translate(-20, 0, 0);

                    boxChild21.transform.translate(-25, 0, 0);


                    return gameObject;
                }

                function createBox(){
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(255, 0, 255)");


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


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
                    directionLightComponent.intensity = 2;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(0, 1000, 0));

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

            beforeEach(function () {
                tester = SceneTester.create();

                renderTestTool.prepareContext();
            });

            it("test remove", function (done) {
                body();

                tester.compareAt(1, "instance/instance_remove.png", done);
            });
            it("test add", function (done) {
                body();

                tester.compareAt(2, "instance/instance_add.png", done);
            });
        });
    });
});
