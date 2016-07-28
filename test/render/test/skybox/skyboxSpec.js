describe("skybox", function () {
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
        describe("test skybox", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/1.jpg", id: "texture"},
                    {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                    {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                    {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                    {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                    {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                    {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createSkybox());
                    director.scene.addChild(createSphere());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSkybox() {
                    var cubemap = wd.CubemapTexture.create(
                        [
                            {
                                asset: wd.LoaderManager.getInstance().get("px")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nx")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("py")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("ny")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("pz")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nz")
                            }
                        ]
                    );

                    var material = wd.SkyboxMaterial.create();
                    material.envMap = cubemap;


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.SkyboxRenderer.create());
                    gameObject.addComponent(geometry);

                    return gameObject;
                }

                function createSphere() {
                    var material = wd.BasicMaterial.create();
                    material.map = wd.LoaderManager.getInstance().get("texture");

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

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

                    var controller = wd.FlyCameraController.create(cameraComponent);
                    camera.addComponent(controller);

                    camera.transform.translate(0, 0, 20);
                    camera.transform.lookAt(10, -5, 0);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "skybox/skybox.png", done);
            });
        });

        describe("test skybox with compressed texture", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/compressed/disturb_dxt1_nomip.dds", id: "texture1"},
                    {url: "../../asset/texture/compressed/disturb_dxt1_mip.dds", id: "texture2"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createSkybox());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSkybox() {
                    var cubemap = wd.CubemapTexture.create(
                        [
                            {
                                asset: wd.LoaderManager.getInstance().get("texture1")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("texture1")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("texture2")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("texture1")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("texture1")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("texture1")
                            }
                        ]
                    );

                    var material = wd.SkyboxMaterial.create();
                    material.envMap = cubemap;


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.SkyboxRenderer.create());
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

                    var controller = wd.FlyCameraController.create(cameraComponent);
                    camera.addComponent(controller);


                    camera.transform.translate(0, 0, 20);
                    camera.transform.lookAt(-10,20,0);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "skybox/skybox_texture_compressed.png", done);
            });
        });

        describe("test skybox with part texture", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/1.jpg", id: "texture"},
                    {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                    {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                    {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                    {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                    {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                    {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createSkybox());
                    director.scene.addChild(createSphere());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSkybox() {
                    var cubemap = wd.CubemapTexture.create(
                        [
                            {
                                asset: wd.LoaderManager.getInstance().get("px"),
                                sourceRegion:wd.RectRegion.create(0, 0, 256, 256),
                                type:wd.ETextureType.UNSIGNED_BYTE
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nx"),
                                sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("py"),
                                sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("ny"),
                                sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("pz"),
                                sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nz"),
                                sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                            }
                        ]
                    );
                    cubemap.textures.getChild(5).sourceRegion = wd.RectRegion.create(128, 128, 256, 256);

                    var material = wd.SkyboxMaterial.create();
                    material.envMap = cubemap;


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.SkyboxRenderer.create());
                    gameObject.addComponent(geometry);

                    return gameObject;
                }

                function createSphere() {
                    var material = wd.BasicMaterial.create();
                    material.map = wd.LoaderManager.getInstance().get("texture");

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

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

                    var controller = wd.FlyCameraController.create(cameraComponent);
                    camera.addComponent(controller);

                    camera.transform.translate(0, 0, 20);
                    camera.transform.lookAt(5, 5, 0);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "skybox/skybox_texture_part.png", done);
            });
        });
    });
});
