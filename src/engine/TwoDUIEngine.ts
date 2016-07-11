module wd{
    @singleton()
    export class TwoDUIEngine extends UIEngine{
        public static getInstance():any {}

        protected list:wdCb.Collection<TwoDUI>;

        public render(){
            this.list.forEach((ui:TwoDUI) => {
                if(this._isDirty(ui.entityObject))
                    ui.render();
            }, this);
        }

        private _isDirty(uiObject:UIObject) {
            return uiObject.getComponent<UIRenderer>(UIRenderer).state === EUIRendererState.DIRTY;
        }
    }
}

