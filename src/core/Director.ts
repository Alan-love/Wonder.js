module wd{
    enum EGameState{
        NORMAL,
        STOP,
        PAUSE
    }

    //todo invoke scene.onExit

    @singleton(true)
    export class Director{
        public static getInstance():any{};

        private constructor(){}

        get gameTime(){
            return this._timeController.gameTime;
        }

        get fps(){
            return this._timeController.fps;
        }

        get isNormal(){
            return this._gameState === EGameState.NORMAL;
        }

        get isStop(){
            return this._gameState === EGameState.STOP;
        }

        get isPause(){
            return this._gameState === EGameState.PAUSE;
        }

        get isTimeChange(){
            return this._timeController.isTimeChange;
        }

        get elapsed(){
            return this._timeController.elapsed;
        }

        get view(){
            return DeviceManager.getInstance().view;
        }

        public scene:SceneDispatcher = null;
        public scheduler:Scheduler = null;
        public renderer:Renderer= null;
        public domEventManager:any = DomEventManager.create();

        private _gameLoop:wdFrp.IDisposable = null;
        private _eventSubscription:wdFrp.IDisposable = null;
        private _gameState:EGameState = EGameState.NORMAL;
        private _timeController:DirectorTimeController= DirectorTimeController.create();


        public initWhenCreate(){
            this.scene = SceneDispatcher.create();
            this.scheduler = Scheduler.create();
            this.renderer = WebGLRenderer.create();
        }

        public start(){
            this._gameState = EGameState.NORMAL;

            this._startLoop();
        }

        public stop(){
            this._gameLoop && this._gameLoop.dispose();
            this._gameState = EGameState.STOP;
            this._timeController.stop();
            this.scheduler.stop();
            this._eventSubscription && this._eventSubscription.dispose();
        }

        public pause(){
            if (this._gameState === EGameState.PAUSE) {
                return;
            }

            this._gameState = EGameState.PAUSE;
            this._timeController.pause();
            this.scheduler.pause();
        }

        public resume(){
            this._gameState = EGameState.NORMAL;
            this._timeController.resume();
            this.scheduler.resume();
        }

        //todo add dispose

        public getDeltaTime(){
            return this._timeController.deltaTime;
        }

        @execOnlyOnce("_isInitUIScene")
        public initUIObjectScene(){
            var uiObjectScene:any = this.scene.uiObjectScene;

            this._initDomEvent();

            if(uiObjectScene === null){
                return;
            }

            uiObjectScene.onEnter();
            uiObjectScene.init();
        }

        public runUIObjectScene(elapsed:number){
            var uiObjectScene:any = this.scene.uiObjectScene;

            if(uiObjectScene === null){
                return;
            }

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.STARTLOOP));

            ScriptComponentContainer.getInstance().execScript("onStartLoop");

            uiObjectScene.update(elapsed);

            uiObjectScene.render();

            ScriptComponentContainer.getInstance().execScript("onEndLoop");

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.ENDLOOP));
        }

        private _startLoop() {
            var self = this;

            this._gameLoop = this._buildInitStream()
                .ignoreElements()
                .concat(this._buildLoopStream())
                .subscribe((time) => {
                    //todo need polyfill
                    /*!
                     I assume that the time is DOMHighResTimeStamp, but it may be DOMTimeStamp in some browser!
                     so it need polyfill
                     */
                    self._loopBody(time);
                });
        }

        private _buildInitStream(){
            return wdFrp.callFunc(() => {
                this._init();
            }, this);
        }

        private _init(){
            var DebugStatistics = ClassUtils.getClass("DebugStatistics");

            if(!!DebugStatistics){
                DebugStatistics.init();
            }

            this._initGameObjectScene();

            this.initUIObjectScene();
        }

        private _initGameObjectScene(){
            var gameObjectScene:GameObjectScene = this.scene.gameObjectScene;

            this._initDomEvent();

            gameObjectScene.onEnter();
            gameObjectScene.init();

            //todo not put here?
            this.renderer.init();

            this._timeController.start();
            this.scheduler.start();
        }

        private _buildLoopStream(){
            return wdFrp.intervalRequest();
        }

        private _loopBody(time) {
            var elapsed:number = null;

            if(this._gameState === EGameState.PAUSE || this._gameState === EGameState.STOP){
                return false;
            }

            elapsed = this._timeController.computeElapseTime(time);

            this._run(elapsed);

            return true;
        }

        private _run(elapsed:number){
            this._timeController.tick(elapsed);

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.STARTLOOP));

            ScriptComponentContainer.getInstance().execScript("onStartLoop");

            this._update(elapsed);

            this._render();

            ScriptComponentContainer.getInstance().execScript("onEndLoop");

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.ENDLOOP));
        }

        private _update(elapsed:number){
            this.scheduler.update(elapsed);

            ScriptComponentContainer.getInstance().execScriptWithData("update", elapsed);

            ClassUtils.execSingletonMethod("ActionComponentContainer", "update", elapsed);

            this.scene.gameObjectScene.update(elapsed);

            if(this.scene.uiObjectScene !== null){
                this.scene.uiObjectScene.update(elapsed);
            }
        }

        private _render(){
            this.scene.gameObjectScene.render(this.renderer);

            this.renderer.clear();

            if(this.renderer.hasCommand()){
                this.renderer.webglState = BasicState.create();
                this.renderer.render();
            }

            if(this.scene.uiObjectScene !== null) {
                this.scene.uiObjectScene.render();
            }
        }

        @execOnlyOnce("_isInitDomEvent")
        private _initDomEvent(){
            this._eventSubscription = this.domEventManager.initDomEvent();
        }
    }
}
