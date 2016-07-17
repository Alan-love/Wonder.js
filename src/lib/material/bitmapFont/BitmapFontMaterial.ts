module wd{
    export class BitmapFontMaterial extends StandardLightMaterial{
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public geometry:BitmapFontGeometry;

        @cloneAttributeAsBasicType()
        public enableSdf:boolean = false;
        @cloneAttributeAsBasicType()
        public sdfType:SdfBitmapFontType = SdfBitmapFontType.SMOOTH;
        @cloneAttributeAsBasicType()
        public alphaTest:number = 0.0001;

        private _bitmap:ImageTexture = null;
        @requireSetter(function(map:ImageTexture){
            it("should add ImageTexture", function () {
                expect(map).instanceOf(ImageTexture);
            });
        })
        @cloneAttributeAsCloneable()
        get bitmap(){
            return this._bitmap;
        }
        set bitmap(map:ImageTexture){
            this.mapManager.addMap(map, {
                samplerVariableName: VariableNameTable.getVariableName("bitmap")
            });

            this._bitmap = map;
        }

        private _pageMapList:wdCb.Collection<ImageTexture> = null;
        @requireSetter(function(pageMapList:wdCb.Collection<ImageTexture>){
            it("pageMapList should be Collection type", function () {
                expect(pageMapList).instanceOf(wdCb.Collection);
            });
        })
        @cloneAttributeAsCloneable()
        get pageMapList(){
            return this._pageMapList;
        }
        set pageMapList(pageMapList:wdCb.Collection<ImageTexture>){
            this._pageMapList = pageMapList;
        }

        @virtual
        @require(function(){
            it("should only set pageMap or bitmap ", function () {
                expect(
                    (this.pageMapList !== 0 && this.bitmap === null)
                    || (this.pageMapList === null && this.bitmap !== null)
                ).true;
            }, this);

            describe("if has multi pages", function(){
                it("each map in pageMapList should be all flipY or all not", function () {
                    var count = this.pageMapList.filter((map:ImageTexture) => {
                        return map.flipY === true;
                    }).getCount();

                    expect(count === 0 || count === this.pageMapList.getCount()).true;
                });
            }, function(){
                return this.pageMapList !== null && this.pageMapList.getCount() > 0;
            }, this);
        })
        public isMapFlipY():boolean{
            if(this.pageMapList !== null && this.pageMapList.getCount() > 0){
                return this.pageMapList.getChild(0).flipY;
            }

            return this.bitmap.flipY;
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.blend = true;
        }

        public init(){
            if(this._hasMultiPages()){
                this.mapManager.addMapArray("u_pageSampler2Ds", this.pageMapList.toArray());
            }

            super.init();
        }

        public getTextureForRenderSort():Texture{
            return this.bitmap === null ? this.bitmap : this.pageMapList.getChild(0);
        }

        protected addExtendShaderLib(){
            if(this._hasMultiPages()){
                this.shader.addLib(MultiPagesBitmapFontShaderLib.create());
            }
            else if(!this._isSdfFont()){
                this.shader.addLib(BasicBitmapFontShaderLib.create());
            }
        }

        protected addEndShaderLib(){
            this.shader.addLib(CommonBitmapFontShaderLib.create());

            if(this._isSdfFont()){
                switch (this.sdfType){
                    case SdfBitmapFontType.SMOOTH:
                        this.shader.addLib(SdfBitmapFontSmoothShaderLib.create());
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_UNKNOW(`sdfType:${this.sdfType}`));
                }
            }
        }

        @ensure(function(hasMultiPages:boolean){
            if(hasMultiPages){
                it("should has one page map at least", function () {
                    expect(this.pageMapList.getCount()).greaterThan(0);
                }, this);
            }
        })
        private _hasMultiPages(){
            return this.geometry.hasMultiPages();
        }

        private _isSdfFont(){
            return this.enableSdf;
        }
    }
}

