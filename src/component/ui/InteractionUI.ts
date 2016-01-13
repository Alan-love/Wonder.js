module wd{
    export abstract class InteractionUI extends UI{
        get transition(){
            switch (this.p_transitionMode){
                case TransitionMode.SPRITE:
                    return this._spriteTransition;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                    break;
            }
        }

        //todo unit test

        protected p_transitionMode:TransitionMode = null;
        get transitionMode(){
            return this.p_transitionMode;
        }
        set transitionMode(transitionMode:TransitionMode){
            this.p_transitionMode = transitionMode;
            this._createTransitionInstance();
        }

        private _spriteTransition:SpriteTransition = null;


        private _createTransitionInstance(){
            switch (this.p_transitionMode){
                case TransitionMode.SPRITE:
                    this._spriteTransition = SpriteTransition.create();
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                    break;
            }
        }
    }
}
