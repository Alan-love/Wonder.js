/// <reference path="../definitions.d.ts"/>
module dy{
    export class Loader{
        private _container:dyCb.Hash<string> = dyCb.Hash.create<string>();

        public load(url:string, id:string):dyRt.Stream;
        public load(url:Array<string>, id:string):dyRt.Stream;


        public load(args):dyRt.Stream{
            var url = arguments[0],
                id = arguments[1],
                self = this,
                stream = null;

            if(this._container.getChild(id)){
                stream = dyRt.empty();
            }
            else{
                stream = this.loadAsset(url)
                    .do((data) => {
                        self._container.addChild(id, data);
                    }, (err) => {
                        self._errorHandle(url, err);
                    }, null);
            }

            return stream;
        }

        public get(id:string):string{
            return this._container.getChild(id);
        }

        public has(id:string){
            return this._container.hasChild(id);
        }

        public dispose(){
            this._container.removeAllChildren();
        }

        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;


        protected loadAsset(arg):dyRt.Stream{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        private _errorHandle(path:string, err:string);
        private _errorHandle(path:Array<string>, err:string);


        private _errorHandle(args) {
            var path = null,
                err = null;

            if(JudgeUtils.isArray(arguments[0])){
                path = arguments[0].join(",");
            }
            else{
                path = arguments[0];
            }
            err = arguments[1];

            dyCb.Log.log("加载" + path + " 资源失败:" + err);
        }
    }
}

