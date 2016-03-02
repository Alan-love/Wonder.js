module wd {
    //todo support specify marble color(more than one color param) by user
    export class MarbleProceduralTexture extends ProceduralTexture {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public tilesHeightNumber:number = 3;
        public tilesWidthNumber:number = 3;
        public amplitude:number = 9;
        public jointColor:Color = Color.create("rgb(0.72, 0.72, 0.72)");

        public init(){
            super.init();

            Director.getInstance().scene.addProceduralRender(MarbleProceduralRenderTargetRenderer.create(this));

            return this;
        }

        public getSamplerName(unit:number){
            return this.getSamplerNameByVariableData(unit, EVariableType.SAMPLER_2D);
        }
    }
}

