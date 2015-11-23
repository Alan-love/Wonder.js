/// <reference path="../../filePath.d.ts"/>
module dy{
    export class Script extends Component{
        public static script:dyCb.Stack<ScriptFileData> = dyCb.Stack.create<ScriptFileData>();

        public static create():Script;
        public static create(url:string):Script;

        public static create() {
            if(arguments.length === 0){
                return new this();
            }
            if(arguments.length === 1){
                let url = arguments[0];

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

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            Director.getInstance().scriptStreams.addChild(this.uid.toString(), this.createLoadJsStream()
                    .do((data:ScriptFileData) => {
                        gameObject.script.addChild(data.name, new data.class(gameObject));
                    })
            );
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            Director.getInstance().scriptStreams.removeChild(this.uid.toString());
        }
    }

    export type ScriptFileData = {
        name:string;
        class:any;
    };
}
