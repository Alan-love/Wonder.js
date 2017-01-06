module wd {
    export class Button extends InteractionUI {
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @cloneAttributeAsBasicType()
        private _text:string = null;
        get text(){
            var fontObject:UIObject = null;

            if(this.entityObject === null){
                return this._text;
            }

            fontObject = this.getObject(EButtonObjectName.TEXT);

            if(fontObject){
                return fontObject.getComponent<PlainFont>(PlainFont).text;
            }

            return null;
        }
        set text(text:string){
            var fontObject:UIObject = null;

            this._text = text;

            if(this.entityObject === null || !this.getUIRenderer()){
                return;
            }

            fontObject = this.getObject(EButtonObjectName.TEXT);

            if(fontObject){
                fontObject.getComponent<PlainFont>(PlainFont).text = text;
            }
            else{
                this.entityObject.addChild(this._createFontObject());
            }
        }

        get isDisabled(){
            return this._stateMachine.currentState === EUIState.DISABLED;
        }

        get currentState(){
            return this._stateMachine.currentState;
        }

        private _pointdownSubscription:wdFrp.IDisposable = null;
        private _pointupSubscription:wdFrp.IDisposable = null;
        private _pointoverSubscription:wdFrp.IDisposable = null;
        private _pointoutSubscription:wdFrp.IDisposable = null;
        @cloneAttributeAsCloneable()
        private _stateMachine:UIStateMachine = UIStateMachine.create(this);

        public initWhenCreate() {
            this.transitionMode = ETransitionMode.SPRITE;
            this.text = "button";
        }

        public init(){
            super.init();

            this.entityObject.addChild(this._createBackgroundObject());

            if(!this._hasFontObject()){
                this.entityObject.addChild(this._createFontObject());
            }

            this._bindEvent();
        }

        public dispose(){
            super.dispose();

            this._pointdownSubscription.dispose();
            this._pointupSubscription.dispose();
            this._pointoverSubscription.dispose();
            this._pointoutSubscription.dispose();
        }

        public getObject(objectName:EButtonObjectName):UIObject{
            return this.entityObject.findChildByName(<any>objectName);
        }

        public getObjectTransition(objectName:EButtonObjectName):Transition{
            return this.transitionManager.getObjectTransition(objectName);
        }

        public enable() {
            this._stateMachine.changeState(EUIState.NORMAL);
        }

        public disable() {
            this._stateMachine.changeState(EUIState.DISABLED);
        }

        @require(function(){
            assert(this.getObject(EButtonObjectName.BACKGROUND).hasComponent(Image), Log.info.FUNC_SHOULD("Button UIObject", "contain Image component"));
        })
        public update(elapsed:number) {
            var target = this.transitionManager.getObjectTarget(EButtonObjectName.BACKGROUND);

            if(!target){
                let image = this.getObject(EButtonObjectName.BACKGROUND).getComponent<Image>(Image);

                switch (this.p_transitionMode) {
                    case ETransitionMode.SPRITE:
                        image.targetSource = null;
                        break;
                    case ETransitionMode.COLOR:
                        image.targetColor = null;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                        break;
                }

                return;
            }

            switch (this.p_transitionMode) {
                case ETransitionMode.SPRITE:
                    this.getObject(EButtonObjectName.BACKGROUND).getComponent<Image>(Image).targetSource = target;
                    break;
                case ETransitionMode.COLOR:
                    this.getObject(EButtonObjectName.BACKGROUND).getComponent<Image>(Image).targetColor = target;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                    break;
            }
        }

        public render(){
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

            object.name = <any>EButtonObjectName.BACKGROUND;

            CloneUtils.markNotClone(object);

            return object;
        }

        private _createFontObject(){
            var fontObject = UIObject.create(),
                font = PlainFont.create(),
                transform = this.entityObject.transform;

            font.text = this._text;
            font.enableFill("#000000");
            font.xAlignment = EFontXAlignment.CENTER;
            font.yAlignment = EFontYAlignment.MIDDLE;

            fontObject.addComponent(font);

            fontObject.addComponent(this.getUIRenderer());

            fontObject.transform.width = transform.width;
            fontObject.transform.height = transform.height;

            fontObject.transform.zIndex = 2;

            fontObject.name = <any>EButtonObjectName.TEXT;

            CloneUtils.markNotClone(fontObject);

            return fontObject;
        }

        private _hasFontObject(){
            return !!this.getObject(EButtonObjectName.TEXT);
        }

        private _bindEvent(){
            var self = this;

            this._pointdownSubscription = EventManager.fromEvent(this.entityObject, EEngineEvent.POINT_DOWN)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled;
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.changeState(EUIState.PRESSED);
                });

            this._pointupSubscription = EventManager.fromEvent(this.entityObject, EEngineEvent.POINT_UP)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled;
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.backState();
                });

            this._pointoverSubscription = EventManager.fromEvent(this.entityObject, EEngineEvent.POINT_OVER)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled;
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.changeState(EUIState.HIGHLIGHT);
                });

            this._pointoutSubscription = EventManager.fromEvent(this.entityObject, EEngineEvent.POINT_OUT)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled;
                })
                .subscribe((e:CustomEvent) => {
                    if(self._stateMachine.isState(EUIState.PRESSED)){
                        self._stateMachine.backState();
                        self._stateMachine.backState();
                    }
                    else{
                        self._stateMachine.backState();
                    }
                });
        }
    }
}

