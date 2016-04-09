module wd {
    export class TwoDShadowMapRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(shadowMap:TwoDShadowMapTexture, light:DirectionLight, layer:string) {
            var obj = new this(shadowMap, light, layer);

            obj.initWhenCreate();

            return obj;
        }

        constructor(shadowMap:TwoDShadowMapTexture, light:DirectionLight, layer:string){
            super(shadowMap);

            this._light = light;
            this._layer = layer;
        }

        protected texture:TwoDShadowMapTexture;

        private _light:DirectionLight = null;
        private _layer:string = null;
        private _mapManager:MapManager = MapManager.create();

        private _shadowMapRendererUtils:TwoDShadowMapRenderTargetRendererUtils = null;

        public initWhenCreate(){
            this._shadowMapRendererUtils = TwoDShadowMapRenderTargetRendererUtils.create(this._light, this.texture);

            if (!this._mapManager.hasTwoDShadowMap(this.texture)) {
                this._mapManager.addTwoDShadowMap(this.texture);
            }

            super.initWhenCreate();
        }

        public init(){
            this._mapManager.init();

            super.init();
        }

        public dispose(){
            super.dispose();

            //todo test
            this._mapManager.dispose();
            this._shadowMapRendererUtils.unBindEndLoop();
        }

        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
            Director.getInstance().scene.glslData.appendChild(<any>EShaderGLSLData.TWOD_SHADOWMAP, {
                camera: renderCamera.getComponent(CameraController),
                light: this._light
            });
        }

        protected getRenderList():wdCb.Collection<GameObject>{
            return Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).getShadowRenderListByLayer(this._layer);
        }

        protected renderRenderer(renderer){
            renderer.webglState = BuildShadowMapState.create();
            renderer.render();
        }

        protected beforeRender(){
            if(this.isRenderListEmptyWhenRender()){
                return;
            }

            Director.getInstance().scene.useShaderType(EShaderTypeOfScene.BUILD_TWOD_SHADOWMAP);

            /*! no need to send texture unit data
             because glsl only bind one texture, and its unit is 0 defaultly
             */
            this._mapManager.bindAndUpdate();
        }

        protected afterRender(){
            if(this.isRenderListEmptyWhenRender()){
                return;
            }

            Director.getInstance().scene.unUseShader();
        }

        //todo optimize: if light not translate, not create camera
        protected createCamera():GameObject{
            var orthoCameraComponent = OrthographicCamera.create(),
                light:DirectionLight = this._light,
                camera = GameObject.create();

            orthoCameraComponent.left = light.shadowCameraLeft;
            orthoCameraComponent.right = light.shadowCameraRight;
            orthoCameraComponent.top = light.shadowCameraTop;
            orthoCameraComponent.bottom = light.shadowCameraBottom;
            orthoCameraComponent.near = light.shadowCameraNear;
            orthoCameraComponent.far = light.shadowCameraFar;

            camera.addComponent(BasicCameraController.create(orthoCameraComponent));

            //todo optimize:dirty?
            camera.transform.translate(light.position);
            camera.transform.lookAt(0, 0, 0);

            camera.init();

            return camera;
        }
    }
}

