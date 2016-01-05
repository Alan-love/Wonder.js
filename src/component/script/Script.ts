/// <reference path="../../filePath.d.ts"/>
module wd{
    export class Script extends Component{
        public static script:wdCb.Stack<ScriptFileData> = wdCb.Stack.create<ScriptFileData>();

        public static create():Script;
        public static create(url:string):Script;

        public static create(...args) {
            if(args.length === 0){
                return new this();
            }
            if(args.length === 1){
                let url = args[0];

                return new this(url);
            }
        }

        public static addScript(scriptName:string, _class:Function){
            this.script.push(<ScriptFileData>{
                name: scriptName,
                class: _class
            });
        }

        constructor(url:string = null){
            super();

            this.url = url;
        }

        //todo prepend script prefix(defined in config data) to relative path?
        public url:string = null;

        public createLoadJsStream(){
            Log.error(!this.url, Log.info.FUNC_MUST_DEFINE("url"));

            return LoaderManager.getInstance().load(this.url)
            .map(() => {
                    return Script.script.pop();
                });
        }

        public addToObject(entityObject:EntityObject){
            var self = this;

            super.addToObject(entityObject);

            Director.getInstance().scriptStreams.addChild(this.uid.toString(), this.createLoadJsStream()
                    .do((data:ScriptFileData) => {
                        self._addScriptToEntityObject(entityObject, data);
                    })
            );
        }

        public removeFromObject(entityObject:EntityObject){
            super.removeFromObject(entityObject);

            Director.getInstance().scriptStreams.removeChild(this.uid.toString());
        }

        private _addScriptToEntityObject(entityObject:EntityObject, data:ScriptFileData){
            entityObject.script.addChild(data.name, new data.class(entityObject));
        }
    }

    export type ScriptFileData = {
        name:string;
        class:any;
    };
}
