/// <reference path="../../filePath.d.ts"/>
module wd{
    export class ActionManager{
        public static create():ActionManager {
            var obj = new this();

            return obj;
        }

        private _children:wdCb.Collection<Action> = wdCb.Collection.create<Action>();

        public addChild(action:Action){
            if(this.hasChild(action)){
                return;
            }

            this._children.addChild(action);
        }

        public removeChild(action:Action){
            this._children.removeChild(action);
        }

        public hasChild(action:Action){
            return this._children.hasChild(action);
        }

        public update(elapsedTime:number){
            var removeQueue = [];

            this._children.forEach(function(child:Action){
                /*!
                 fix "if remove other action of children when invoke 'child.update', it will error in iteration after":
                 defer to remove
                 */
                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }

                if (child.isStop || child.isPause) {
                    return;
                }

                child.update(elapsedTime);
            });

            removeQueue.forEach(function (child:Action) {
                child.gameObject.removeComponent(child);
            });
        }
    }
}