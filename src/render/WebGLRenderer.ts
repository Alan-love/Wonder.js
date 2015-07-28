/// <reference path="../definitions.d.ts"/>
module dy{
    export class WebGLRenderer{
        public static create():WebGLRenderer {
            var obj = new this();

            return obj;
        }

        private _commandQueue:dyCb.Collection<QuadCommand> = dyCb.Collection.create<QuadCommand>();
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
            Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha);
        }

        public setClearColor(color:Color, alpha:number = 1.0){
            this._clearColor = color;
            this._clearAlpha = alpha;
            Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.g, this._clearAlpha);
        }

        private _clearCommand(){
            this._commandQueue.removeAllChildren();
        }
    }
}
