module wd {
    export class SceneDispatcher extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        /*!
         use gameObjectScene->scriptList as scene->scriptList
         */
        get scriptList(){
            return this.gameObjectScene.scriptList;
        }

        /*!
         use gameObjectScene->actionManager as scene->actionManager
         */
        get actionManager(){
            return this.gameObjectScene.actionManager;
        }

        get ambientLight():GameObject {
            return this.gameObjectScene.ambientLight;
        }

        @ensureGetter(function(directionLights:wdCb.Collection<GameObject>){
            assert(directionLights.getCount() <= 4, Log.info.FUNC_SHOULD("direction lights' count", "<= 4"));
        })
        get directionLights(): wdCb.Collection<GameObject>{
            return this.gameObjectScene.directionLights;
        }

        @ensureGetter(function(pointLights:wdCb.Collection<GameObject>){
            assert(pointLights.getCount() <= 4, Log.info.FUNC_SHOULD("point lights' count", "<= 4"));
        })
        get pointLights(): wdCb.Collection<GameObject>{
            return this.gameObjectScene.pointLights;
        }
        
        get side(){
            return this.gameObjectScene.side;
        }
        set side(side:ESide){
            this.gameObjectScene.side = side;
        }

        //todo refactor
        get shadowMap(){
            return this.gameObjectScene.shadowMap;
        }
        set shadowMap(shadowMap:any){
            this.gameObjectScene.shadowMap = shadowMap;
        }


        public getTwoDShadowMapDataMap(layer:string) {
            return this.gameObjectScene.shadowManager.getTwoDShadowMapDataMap(layer);
        }

        public getCubemapShadowMapDataMap(layer:string){
            return this.gameObjectScene.shadowManager.getCubemapShadowMapDataMap(layer);
        }





        get currentCamera():GameObject{
            return this.gameObjectScene.currentCamera;
        }
        set currentCamera(arg:GameObject){
            this.gameObjectScene.currentCamera = arg;
        }

        get physics(){
            return this.gameObjectScene.physics;
        }
        set physics(physics:PhysicsConfig){
            this.gameObjectScene.physics = physics;
        }

        get physicsEngineAdapter(){
            return this.gameObjectScene.physicsEngineAdapter;
        }
        set physicsEngineAdapter(physicsEngineAdapter:IPhysicsEngineAdapter){
            this.gameObjectScene.physicsEngineAdapter = physicsEngineAdapter;
        }

        get glslData(){
            return this.gameObjectScene.glslData;
        }
        set glslData(glslData:wdCb.Hash<any>){
            this.gameObjectScene.glslData = glslData;
        }

        get isUseShader(){
            return this.gameObjectScene.isUseShader;
        }

        get currentShaderType(){
            return this.gameObjectScene.currentShaderType;
        }

        get shadowLayerList(){
            return this.gameObjectScene.shadowLayerList;
        }
        set shadowLayerList(shadowLayerList:ShadowLayerList){
            this.gameObjectScene.shadowLayerList = shadowLayerList;
        }

        public name:string = `scene${String(this.uid)}`;

        public uiObjectScene:UIObjectScene = UIObjectScene.create();
        public gameObjectScene:GameObjectScene = GameObjectScene.create();


        public initWhenCreate(){
            super.initWhenCreate();

            this.addComponent(SceneEventTriggerDetector.create());
        }

        public useShaderType(type:EShaderTypeOfScene){
            this.gameObjectScene.useShaderType(type);
        }

        public unUseShader(){
            this.gameObjectScene.unUseShader();
        }

        public addChild(child:EntityObject):EntityObject{
            if(child instanceof GameObject){
                this.gameObjectScene.addChild(child);
            }
            else if(child instanceof UIObject){
                this.uiObjectScene.addChild(child);
            }

            child.parent = this;

            return this;
        }

        public addCommonRenderTargetRenderer(renderTargetRenderer:RenderTargetRenderer){
            return this.gameObjectScene.renderTargetRendererManager.addCommonRenderTargetRenderer(renderTargetRenderer);
        }

        public addProceduralRenderTargetRenderer(renderTargetRenderer:ProceduralRenderTargetRenderer){
            return this.gameObjectScene.renderTargetRendererManager.addProceduralRenderTargetRenderer(renderTargetRenderer);
        }

        public dispose(){
            this.gameObjectScene.dispose();
            this.uiObjectScene.dispose();
        }

        public hasChild(child:EntityObject):boolean {
            if(child instanceof GameObject){
                return this.gameObjectScene.hasChild(child);
            }
            else if(child instanceof UIObject){
                return this.uiObjectScene.hasChild(child);
            }
        }

        public addChildren(children:EntityObject);
        public addChildren(children:Array<EntityObject>);
        public addChildren(children:wdCb.Collection<EntityObject>);

        public addChildren(...args) {
            if(args[0] instanceof EntityObject){
                let child:EntityObject = <EntityObject>args[0];

                this.addChild(child);
            }
            if(args[0] instanceof wdCb.Collection){
                let children:wdCb.Collection<EntityObject> = <wdCb.Collection<EntityObject>>args[0],
                    self = this;

                children.forEach((child:EntityObject) => {
                    self.addChild(child);
                });
            }
            else if(JudgeUtils.isArrayExactly(args[0])){
                let children:Array<EntityObject> = <Array<EntityObject>>args[0];

                for(let child of children){
                    this.addChild(child);
                }
            }

            return this;
        }

        public getChildren(){
            return this.gameObjectScene.getChildren().addChildren(this.uiObjectScene.getChildren());
        }

        public findChildByUid(uid:number){
            var result = this.gameObjectScene.findChildByUid(uid);

            if(!result){
                result = this.uiObjectScene.findChildByUid(uid)
            }

            return result;
        }

        public findChildByTag(tag:string){
            var result = this.gameObjectScene.findChildByTag(tag);

            if(!result){
                result = this.uiObjectScene.findChildByTag(tag)
            }

            return result;
        }

        public findChildByName(name:string){
            var result = this.gameObjectScene.findChildByName(name);

            if(!result){
                result = this.uiObjectScene.findChildByName(name)
            }

            return result;
        }

        public findChildrenByName(name:string):wdCb.Collection<EntityObject>{
            return this.gameObjectScene.findChildrenByName(name).addChildren(this.uiObjectScene.findChildrenByName(name));
        }

        public removeChild(child:EntityObject):EntityObject {
            if(child instanceof GameObject){
                return this.gameObjectScene.removeChild(child);
            }
            else if(child instanceof UIObject){
                return this.uiObjectScene.removeChild(child);
            }
        }

        public onStartLoop() {
            this.gameObjectScene.onStartLoop();
            this.uiObjectScene.onStartLoop();
        }

        public onEndLoop() {
            this.gameObjectScene.onEndLoop();
            this.uiObjectScene.onEndLoop();
        }

        public onEnter() {
            this.gameObjectScene.onEnter();
            this.uiObjectScene.onEnter();
        }

        public onExit() {
            this.gameObjectScene.onExit();
            this.uiObjectScene.onExit();
        }

        public onDispose(){
            this.gameObjectScene.onDispose();
            this.uiObjectScene.onDispose();
        }

        public execScript(method:string, arg?:any){
            this.gameObjectScene.execScript.apply(this.gameObjectScene, arguments);
        }

        public execEventScript(method:string, arg?:any){
            this.gameObjectScene.execEventScript.apply(this.gameObjectScene, arguments);
        }

        protected createTransform(){
            return null;
        }
    }
}

