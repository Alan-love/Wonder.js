/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class CharFont extends Font {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        get x(){
            return this.gameObject.transform.position.x;
        }
        set x(x:number){
            var position = this.gameObject.transform.position;

            this.gameObject.transform.position = Vector3.create(x, position.y, position.z);
        }

        get y(){
            return this.gameObject.transform.position.y;
        }

        get dirty(){
            var transform = null;

            if(this.p_dirty){
                return true;
            }

            transform = this.gameObject.transform;

            return transform.isTranslate || transform.isRotate || transform.isScale;
        }

        private _char:string = null;
        get char(){
            return this._char;
        }
        set char(char:string){
            this._char = char;
            this.p_dirty = true;
        }

        public startPosX:number = null;
        public xAdvance:number = null;
        public image:HTMLImageElement = null;
        public rectRegion:RectRegion = null;
        public width:number = 0;
        public height:number = 0;
        public isNewLine:boolean = false;
        public isFullLine:boolean = false;

        @require(function () {
            assert(this.gameObject.hasComponent(UIRenderer), Log.info.FUNC_SHOULD("gameObject", "contain UIRenderer"))
        })
        protected getContext() {
            var renderer = this.gameObject.getComponent<UIRenderer>(UIRenderer);

            return renderer.context;
        }



        public init(){
            this.context = this.getContext();
        }

        @require(function(elapsedTime:number){
            assert(this.context !== null, Log.info.FUNC_SHOULD("set context"));
        })
        public update(elapsedTime:number){
            var position = null,
                scale = null,
                dx = null,
                dy = null;

            /*!
             shouldn't use "this.dirty = false;", it's not work.
             because CharFont redefine the dirty->getter excepet dirty->setter, so the dirty now only has getter, no setter.
             */
            this.p_dirty = false;

            if(this.rectRegion === null){
                return;
            }

            //todo refactor
            position = CoordinateUtils.convertWebGLPositionToCanvasPosition(this.gameObject.transform.position);
            //position = this.gameObject.transform.position;
            dx = position.x;
            dy = position.y;

            scale = this.gameObject.transform.scale;

            this.context.drawImage(this.image,
                this.rectRegion.x, this.rectRegion.y, this.rectRegion.width, this.rectRegion.height,
                dx, dy, this.width * scale.x, this.height * scale.y);
        }
    }
}

