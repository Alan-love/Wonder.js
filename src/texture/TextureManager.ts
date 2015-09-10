/// <reference path="../definitions.d.ts"/>
module dy{
    export class TextureManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _textures:dyCb.Hash<Texture> = dyCb.Hash.create<Texture>();

        public init(){
            this._getTextureList().forEach((texture:Texture) => {
                texture.init();
            });
        }

        public addMap(asset:TextureAsset);
        public addMap(map:TwoDTexture);

        public addMap(arg){
            var map = null;
                if(arguments[0] instanceof TextureAsset){
                    let asset:TextureAsset = arguments[0];

                    map = asset.toTexture();
                }
                else if(arguments[0] instanceof Texture){
                    map = arguments[0];
                }


            this._textures.appendChild("map", map);
        }

        public setEnvMap(envMap:CubeTexture){
            this._textures.addChild("envMap", envMap);
        }

        public getEnvMap():CubeTexture{
            return <CubeTexture>this._textures.getChild("envMap");
        }
        //
        //public getChildren(){
        //    return this._textures.getChildren();
        //}

        public removeAllChildren(){
            this._textures.removeAllChildren();
        }

        public dispose(){
            this._getTextureList().forEach((texture:Texture) => {
                texture.dispose();
            });

            this.removeAllChildren();
        }

        public update(){
            this._getTextureList()
                .filter((texture:Texture) => {
                    return texture.needUpdate;
                })
                .forEach((texture:Texture, index:number) => {
                    texture.update(index);
                });
        }

        public sendData(program:render.Program){
            this._getTextureList().forEach((texture:Texture, index:number) => {
                texture.bindToUnit(index);
                texture.sendData(program, index);
            });
        }

        public hasMultiTextures(){
            return this._getTextureList().getCount() > 1;
        }

        private _getTextureList(){
            return this._textures.toCollection();
        }
    }
}
