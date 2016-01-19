module wd {
    export class Button extends InteractionUI {
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _text:string = null;
        get text(){
            var fontObject = null;

            if(this.entityObject === null){
                return this._text;
            }

            fontObject = this.getObject(ButtonObjectName.TEXT);

            if(fontObject){
                return fontObject.getComponent(PlainFont).text;
            }

            return null;
        }
        set text(text:string){
            var fontObject:UIObject = null;

            this._text = text;

            if(this.entityObject === null || !this.getUIRenderer()){
                return;
            }

            fontObject = this.getObject(ButtonObjectName.TEXT);

            if(fontObject){
                fontObject.getComponent<PlainFont>(PlainFont).text = text;
            }
            else{
                this.entityObject.addChild(this._createFontObject());
            }
        }

        private _mousedownSubscription:wdFrp.IDisposable = null;
        private _mouseupSubscription:wdFrp.IDisposable = null;
        private _mouseoverSubscription:wdFrp.IDisposable = null;
        private _mouseoutSubscription:wdFrp.IDisposable = null;
        private _stateMachine:UIStateMachine = UIStateMachine.create(this);

        public initWhenCreate() {
            this.transitionMode = TransitionMode.SPRITE;
            this.text = "button";
        }

        public init(){
            super.init();

            if(!this._hasFontObject()){
                this.entityObject.addChild(this._createFontObject());
            }

            this.entityObject.addChild(this._createBackgroundObject());

            this._bindEvent();
        }

        public dispose(){
            super.dispose();

            this._mousedownSubscription.dispose();
            this._mouseupSubscription.dispose();
            this._mouseoverSubscription.dispose();
            this._mouseoutSubscription.dispose();
        }

        public getObject(objectName:ButtonObjectName):UIObject{
            return this.entityObject.findChildByName(<any>objectName);
        }

        public getObjectTransition(objectName:ButtonObjectName):Transition{
            return this.transitionManager.getObjectTransition(objectName);
        }

        public enable() {
            this._stateMachine.changeState(UIState.NORMAL);
        }

        public disable() {
            this._stateMachine.changeState(UIState.DISABLED);
        }

        public isDisabled(){
            return this._stateMachine.getCurrentState() === UIState.DISABLED;
        }

        public getCurrentState(){
            return this._stateMachine.getCurrentState();
        }

        @require(function(elapsedTime:number){
            assert(this.getObject(ButtonObjectName.BACKGROUND).hasComponent(Image), Log.info.FUNC_SHOULD("Button UIObject", "contain Image component"));
        })
        public update(elapsedTime:number) {
            var target = this.transitionManager.getObjectTarget(ButtonObjectName.BACKGROUND);

            if(!target){
                let image = this.getObject(ButtonObjectName.BACKGROUND).getComponent<Image>(Image);

                switch (this.p_transitionMode) {
                    case TransitionMode.SPRITE:
                        image.targetSource = null;
                        break;
                    case TransitionMode.COLOR:
                        image.targetColor = null;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                        break;
                }

                return;
            }

            switch (this.p_transitionMode) {
                case TransitionMode.SPRITE:
                    this.getObject(ButtonObjectName.BACKGROUND).getComponent<Image>(Image).targetSource = target;
                    break;
                case TransitionMode.COLOR:
                    this.getObject(ButtonObjectName.BACKGROUND).getComponent<Image>(Image).targetColor = target;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                    break;
            }
        }

        private _createBackgroundObject(){
            var object = UIObject.create(),
                image = Image.create(),
                transform = this.entityObject.transform;

            object.addComponent(image);

            object.addComponent(this.getUIRenderer());

            object.transform.width = transform.width;
            object.transform.height = transform.height;

            object.transform.zIndex = 1;

            object.name = <any>ButtonObjectName.BACKGROUND;

            return object;
        }

        private _createFontObject(){
            var fontObject = UIObject.create(),
                font = PlainFont.create(),
                transform = this.entityObject.transform;

            font.text = this._text;
            font.enableFill("#000000");
            font.xAlignment = FontXAlignment.CENTER;
            font.yAlignment = FontYAlignment.MIDDLE;

            fontObject.addComponent(font);

            fontObject.addComponent(this.getUIRenderer());

            fontObject.transform.width = transform.width;
            fontObject.transform.height = transform.height;

            fontObject.transform.zIndex = 2;

            fontObject.name = <any>ButtonObjectName.TEXT;

            return fontObject;
        }

        private _hasFontObject(){
            return !!this.getObject(ButtonObjectName.TEXT);
        }

        private _bindEvent(){
            var self = this;

            this._mousedownSubscription = EventManager.fromEvent(this.entityObject, <any>EngineEvent.MOUSE_DOWN)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled();
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.changeState(UIState.PRESSED);
                });

            this._mouseupSubscription = EventManager.fromEvent(this.entityObject, <any>EngineEvent.MOUSE_UP)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled();
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.backState();
                });


            this._mouseoverSubscription = EventManager.fromEvent(this.entityObject, <any>EngineEvent.MOUSE_OVER)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled();
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.changeState(UIState.HIGHLIGHT);
                });

            this._mouseoutSubscription = EventManager.fromEvent(this.entityObject, <any>EngineEvent.MOUSE_OUT)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled();
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.backState();
                });
        }
    }
}

