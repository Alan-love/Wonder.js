module wd{
    export abstract class BitmapFontMaterial extends StandardLightMaterial{
        private _bitmap:ImageTexture = null;
        get bitmap(){
            return this._bitmap;
        }
        @requireSetter(function(map:ImageTexture){
            it("should add ImageTexture", function () {
                expect(map).instanceOf(ImageTexture);
            });
        })
        set bitmap(map:ImageTexture){
            this._bitmap = map;
            this.mapManager.addMap(map);
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.blend = true;
        }

        public getTextureForRenderSort():Texture{
            return this.bitmap;
        }

        protected addEndShaderLib(){
            this.shader.addLib(CommonBitmapFontShaderLib.create());
        }
    }
}

