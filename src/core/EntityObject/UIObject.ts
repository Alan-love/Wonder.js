/// <reference path="../../filePath.d.ts"/>
module wd {
    export class UIObject extends GameEntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:RectTransform;

        public name:string = `uiObject${String(this.uid)}`;
        public uiManager:UIManager = UIManager.create(this);

        protected children:wdCb.Collection<UIObject>;

        protected beforeUpdateChildren(elapsedTime:number){
            this.uiManager.update(elapsedTime);
        }

        protected createTransform(){
            return RectTransform.create();
        }
    }
}

