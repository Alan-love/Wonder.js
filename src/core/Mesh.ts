/// <reference path="../definitions.d.ts"/>
module dy{
    export class Mesh extends GameObject{
        //todo push,pop matrix, so need change pos, rotate angle, scale instead of changing matrix!
        //when need push,pop matrix?

        //todo use component architecture, delete Mesh, make Geometry,Material to be component

        //todo be Material(add baseClass Material)
        public static create(gemo:Geometry):Mesh {
            var obj = new this(gemo);

            return obj;
        }

        private _gemo:Geometry = null;
        private _actionManager:ActionManager = ActionManager.create();

        constructor(gemo:Geometry){
            super();

            this._gemo = gemo;
        }

        public runAction(action:Action){
           this._actionManager.addChild(action);
        }

        public update(){
            this._actionManager.update();
        }

        public draw(){
            this._addDrawCommand();
        }

        public init(){
        }

        private _addDrawCommand(){
            var renderer = Director.getInstance().renderer,
                quadCmd = renderer.createQuadCommand();

            quadCmd.buffers = {
                vertexBuffer: this._gemo.vertices,
                //texCoords: this._gemo.texCoords,
                //normals: this._gemo.normals,
                indexBuffer: this._gemo.indices,
                colorBuffer: this._gemo.colors
            };
            //quadCmd.bufferData = ;
            //quadCmd.color = this._material.color;

            renderer.addCommand(quadCmd);
        }
    }
}
