/// <reference path="../definitions.d.ts"/>
module Engine3D{
    export class WebGLRenderer{
        public static create():WebGLRenderer {
            var obj = new this();

            return obj;
        }

        private _commandQueue:dyCb.Collection = dyCb.Collection.create();
        private _clearColor:Color = Color.create("#000000");
        private _clearAlpha:number = 1.0;

        public createQuadCommand():QuadCommand{
            return QuadCommand.create();
        }

        public addCommand(command:QuadCommand){
            if(this._commandQueue.hasChild(command)){
                return;
            }

            command.init();
            this._commandQueue.addChild(command);
        }

        public render(scene:Scene){
            this._commandQueue.forEach((command) => {
                command.execute(scene);
            });

            this._clearCommand();
        }

        public init(){
            WebGLContext.gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha);
        }

        public setClearColor(color:Color, alpha:number = 1.0){
            this._clearColor = color;
            this._clearAlpha = alpha;
            WebGLContext.gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.g, this._clearAlpha);
        }

        private _clearCommand(){
            this._commandQueue.removeAllChilds();
        }
    }
}
