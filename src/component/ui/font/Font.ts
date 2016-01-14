module wd {
    export abstract class Font extends UI {
        protected needFormat:boolean = false;

        private _isFirstUpdate:boolean = true;
        private _sizeChangeEventSubscription:wdFrp.IDisposable = null;

        public init() {
            var self = this;

            super.init();

            this._sizeChangeEventSubscription = EventManager.fromEvent(this.entityObject, <any>EngineEvent.UI_WIDTH_CHANGE)
                .merge(EventManager.fromEvent(this.entityObject, <any>EngineEvent.UI_HEIGHT_CHANGE))
                .subscribe(() => {
                    self.dirty = true;
                    self.needFormat = true;
                });
        }

        public dispose(){
            if(this._sizeChangeEventSubscription){
                this._sizeChangeEventSubscription.dispose();
            }
        }

        public update(elapsedTime:number){
            if(!this._isFirstUpdate){
                if(this.needFormat){
                    this.reFormat();
                }
            }
            else{
                this._isFirstUpdate = false;
            }

            this.needFormat = false;

            super.update(elapsedTime);
        }

        @virtual
        protected reFormat(){
        }

        protected getLeftCornerPosition(){
            var transform = this.entityObject.transform,
                position = transform.position;

            return Vector2.create(position.x - transform.width / 2, position.y - transform.height / 2);
        }
    }
}

