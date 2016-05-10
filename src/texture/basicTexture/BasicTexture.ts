module wd{
    declare var Math:any;

    export abstract class BasicTexture extends Texture implements ITextureAsset{
        protected p_sourceRegionMethod:ETextureSourceRegionMethod = null;
        @cloneAttributeAsBasicType()
        get sourceRegionMethod(){
            return this.p_sourceRegionMethod;
        }
        set sourceRegionMethod(sourceRegionMethod:ETextureSourceRegionMethod){
            this.p_sourceRegionMethod = sourceRegionMethod;
        }

        private _sourceRegion:RectRegion = null;
        @cloneAttributeAsCloneable()
        get sourceRegion(){
            return this._sourceRegion;
        }
        set sourceRegion(sourceRegion:RectRegion){
            this._sourceRegion = sourceRegion;

            this._sourceRegionDirty = true;
        }

        @cacheGetter(function(){
            return !this._sourceRegionDirty && this._sourceRegionForGLSLCache !== null;
        }, function(){
            return this._sourceRegionForGLSLCache;
        }, function(result){
            this._sourceRegionForGLSLCache = result;
            this._sourceRegionDirty = false;
        })
        get sourceRegionForGLSL(){
            if(this.sourceRegion && this.sourceRegionMethod === ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL){
                return this._convertSourceRegionToUV(this.sourceRegion);
            }

            return RectRegion.create(0, 0, 1, 1);
        }

        @cloneAttributeAsBasicType()
        public generateMipmaps:boolean = null;
        @cloneAttributeAsBasicType()
        public format:ETextureFormat = null;
        @cloneAttributeAsBasicType()
        public source:any = null;
        @cloneAttributeAsCloneable()
        public repeatRegion:RectRegion = null;
        @cloneAttributeAsBasicType()
        public sourceRegionMapping:ETextureSourceRegionMapping = null;
        @cloneAttributeAsBasicType()
        public flipY:boolean = null;
        @cloneAttributeAsBasicType()
        public premultiplyAlpha:boolean = null;
        @cloneAttributeAsBasicType()
        public unpackAlignment:number = null;
        @cloneAttributeAsBasicType()
        public type:ETextureType = null;
        @cloneAttributeAsCloneable()
        public mipmaps:wdCb.Collection<any> = null;
        @cloneAttributeAsBasicType()
        public anisotropy:number = null;

        private _sourceRegionDirty:boolean = false;
        private _sourceRegionForGLSLCache:RectRegion = null;

        public initWhenCreate(...args){
            var gl = DeviceManager.getInstance().gl;
            //texture.addEventListener( "dispose", onTextureDispose );

            this.glTexture = gl.createTexture();

            //_this.info.memory.textures ++;

            this.needUpdate = true;
        }

        public init(){
        }

        public dispose(){
            super.dispose();

            this._sourceRegionForGLSLCache = null;
        }

        public update(){
            var gl = DeviceManager.getInstance().gl,
                isSourcePowerOfTwo = this.isSourcePowerOfTwo();

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);


            //todo not set UNPACK_PREMULTIPLY_ALPHA_WEBGL,UNPACK_ALIGNMENT when cubemap?
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment);

            if(this.needClampMaxSize()){
                this.clampToMaxSize();

                isSourcePowerOfTwo = this.isSourcePowerOfTwo();

                if(!isSourcePowerOfTwo){
                    Log.warn("texture size is not power of two after clampToMaxSize()");
                }
            }

            this.setTextureParameters( gl[this.target], isSourcePowerOfTwo);

            this.allocateSourceToTexture(isSourcePowerOfTwo);

            if (this.generateMipmaps && isSourcePowerOfTwo) {
                gl.generateMipmap(gl[this.target]);
            }

            this.needUpdate = false;

            return this;
        }

        public getSamplerName(unit:number){
            return this.getSamplerNameByVariableData(unit, EVariableType.SAMPLER_2D);
        }

        protected abstract allocateSourceToTexture(isSourcePowerOfTwo:boolean);

        @virtual
        protected needClampMaxSize(){
            if(!this.source){
                return false;
            }

            return BasicTextureUtils.needClampMaxSize(GPUDetector.getInstance().maxTextureSize, this.source.width, this.source.height);
        }

        protected clampToMaxSize(){
            this.source = BasicTextureUtils.clampToMaxSize(this.source, GPUDetector.getInstance().maxTextureSize);
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            this._setAnisotropy(textureType);
        }

        protected isSourcePowerOfTwo(){
            return BasicTextureUtils.isSourcePowerOfTwo(this.sourceRegion, this.sourceRegionMethod, this.width, this.height);
        }

        private _setAnisotropy(textureType){
            var gpu = GPUDetector.getInstance(),
                gl = DeviceManager.getInstance().gl;

            if(!gpu.extensionTextureFilterAnisotropic){
                return;
            }

            if (this.anisotropy > 1) {
                gl.texParameterf(textureType, gpu.extensionTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(this.anisotropy, gpu.maxAnisotropy));
            }
        }

        private _convertSourceRegionCanvasMapToUV(sourceRegion:RectRegion){
            var width = this.width,
                height = this.height,
                region:RectRegion = null;

            region = RectRegion.create(
                sourceRegion.x / width,
                sourceRegion.y / height,
                sourceRegion.width / width,
                sourceRegion.height / height
            );

            region.y = 1 - region.y - region.height;

            return region;
        }

        //todo optimize: add dirty cache
        private _convertSourceRegionToUV(sourceRegion:RectRegion){
            if(this.sourceRegionMapping === ETextureSourceRegionMapping.CANVAS){
                return this._convertSourceRegionCanvasMapToUV(sourceRegion);
            }
            else if(this.sourceRegionMapping === ETextureSourceRegionMapping.UV){
                return sourceRegion;
            }
        }
    }
}

