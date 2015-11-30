/// <reference path="../filePath.d.ts"/>
module dy{
    export abstract class Loader{
        private _container:wdCb.Hash<string> = wdCb.Hash.create<string>();

        public load(url:string):wdFrp.Stream;
        public load(url:Array<string>):wdFrp.Stream;
        public load(url:string, id:string):wdFrp.Stream;
        public load(url:Array<string>, id:string):wdFrp.Stream;


        public load(...args):wdFrp.Stream{
            var url = args[0],
                id = null,
                self = this,
                data = null,
                stream = null;

            if(args.length === 1){
                if(JudgeUtils.isArray(url)){
                    id = url.join("-");
                }
                else{
                    id = url;
                }
            }
            else{
                id = args[1];
            }

            data = this._container.getChild(id);

            if(data){
                stream = wdFrp.just(data);
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

        public get(id:string):any{
            return this._container.getChild(id);
        }

        public has(id:string){
            return this._container.hasChild(id);
        }

        public dispose(){
            this._container.removeAllChildren();
        }

        protected abstract loadAsset(url:string):wdFrp.Stream;
        protected abstract loadAsset(url:Array<string>):wdFrp.Stream;

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

            Log.log(`加载${path} 资源失败:${err}`);
        }
    }
}

