module wd {
    export class TransitionManager {
        public static create(ui:InteractionUI) {
            var obj = new this(ui);

            return obj;
        }

        constructor(ui:InteractionUI) {
            this._ui = ui;
        }

        private _ui:InteractionUI = null;
        private _spriteTransitionMap:wdCb.Hash<Transition> = wdCb.Hash.create<Transition>();

        public getObjectTransition(objectName:ButtonObjectName) {
            var result = this._getTransitionMap().getChild(<any>objectName);

            if (!result) {
                result = this._createTransitionInstance();

                this._getTransitionMap().addChild(<any>objectName, result);
            }

            return result;
        }

        public getObjectTarget(objectName:ButtonObjectName){
            return this.getObjectTransition(objectName).target;
        }

        public changeState(state:UIState){
            this._spriteTransitionMap.forEach((transition:Transition) => {
                transition.changeState(state);
            });
        }

        private _getTransitionMap() {
            var map:wdCb.Hash<Transition> = null;

            switch (this._ui.transitionMode) {
                case TransitionMode.SPRITE:
                    map = this._spriteTransitionMap;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                    break;
            }

            return map;
        }

        private _createTransitionInstance(){
            var transition:Transition = null;

            switch (this._ui.transitionMode){
                case TransitionMode.SPRITE:
                    transition = SpriteTransition.create();
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                    break;
            }

            return transition;
        }
    }
}
