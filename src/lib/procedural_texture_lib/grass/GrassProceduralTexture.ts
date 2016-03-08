module wd {
    export class GrassProceduralTexture extends ProceduralTexture {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public herb1Color:Color = Color.create("rgb(0.29, 0.38, 0.02)");
        public herb2Color:Color = Color.create("rgb(0.36, 0.49, 0.09)");
        public herb3Color:Color = Color.create("rgb(0.51, 0.6, 0.28)");
        public groundColor:Color = Color.create("rgb(1.0,1.0,1.0)");

        public init(){
            super.init();

            Director.getInstance().scene.addProceduralRenderTargetRenderer(GrassProceduralRenderTargetRenderer.create(this));

            return this;
        }
    }
}

