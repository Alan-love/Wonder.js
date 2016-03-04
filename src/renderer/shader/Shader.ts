module wd{
    export abstract class Shader{
        private _attributes:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        get attributes(){
            return this._attributes;
        }
        set attributes(attributes:wdCb.Hash<ShaderData>){
            if(this._isNotEqual(attributes, this._attributes)){
                this._definitionDataDirty = true;
            }
            this._attributes = attributes;
        }

        private _uniforms:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        get uniforms(){
            return this._uniforms;
        }
        set uniforms(uniforms:wdCb.Hash<ShaderData>){
            if(this._isNotEqual(uniforms, this._uniforms)){
                this._definitionDataDirty = true;
            }
            this._uniforms = uniforms;
        }

        private _vsSource:string = "";
        get vsSource(){
            return this._vsSource;
        }
        set vsSource(vsSource:string){
            if(vsSource !== this._vsSource){
                this._definitionDataDirty = true;
            }
            this._vsSource = vsSource;
        }

        private _fsSource:string = "";
        get fsSource(){
            return this._fsSource;
        }
        set fsSource(fsSource:string){
            if(fsSource !== this._fsSource){
                this._definitionDataDirty = true;
            }
            this._fsSource = fsSource;
        }

        get dirty(){
            return this.libDirty || this._definitionDataDirty;
        }

        public program:Program = Program.create();
        public libDirty:boolean = false;

        protected libs:wdCb.Collection<ShaderLib> = wdCb.Collection.create<ShaderLib>();
        protected sourceBuilder:ShaderSourceBuilder = ShaderSourceBuilder.create();

        private _definitionDataDirty:boolean = false;

        public createVsShader(){
            var gl = DeviceManager.getInstance().gl;

            return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
        }

        public createFsShader(){
            var gl = DeviceManager.getInstance().gl;

            return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
        }

        public isEqual(other:Shader){
            return this.vsSource === other.vsSource
                && this.fsSource === other.fsSource;
        }

        public init(){
            this.libs.forEach((lib:ShaderLib) => {
                lib.init();
            });

            this.judgeRefreshShader();
        }

        public dispose(){
            this.program.dispose();
            this.attributes.removeAllChildren();
            this.uniforms.removeAllChildren();

            this.libs.forEach((lib:ShaderLib) => {
                lib.dispose();
            });
        }

        public abstract update(cmd:RenderCommand, material:Material);

        public judgeRefreshShader(){
            if(this.libDirty){
                this.buildDefinitionData(null, LightMaterial.create());
            }

            if(this._definitionDataDirty){
                //todo optimize: batch init program(if it's the same as the last program, not initWithShader)
                this.program.initWithShader(this);
            }


            this.libDirty = false;
            this._definitionDataDirty = false;
        }

        public hasLib(lib:ShaderLib);
        public hasLib(_class:Function);

        public hasLib(...args){
            if(args[0] instanceof ShaderLib){
                let lib:ShaderLib = args[0];

                return this.libs.hasChild(lib);
            }
            else{
                let _class = args[0];

                return this.libs.hasChildWithFunc((lib:ShaderLib) => {
                    return lib instanceof _class;
                })
            }
        }

        @ensure(function(){
            var self = this;

            this.libs.forEach((lib:ShaderLib) => {
                assert(JudgeUtils.isEqual(lib.shader, self), Log.info.FUNC_SHOULD("set ShaderLib.shader to be this"));
            });

            assert(this.libDirty === true, Log.info.FUNC_SHOULD("libDirty", "be true"));
        })
        public addLib(lib:ShaderLib){
            this.libs.addChild(lib);

            lib.shader = this;

            this.libDirty = true;
        }

        @ensure(function(val, lib:ShaderLib){
            var self = this;

            assert(JudgeUtils.isEqual(lib, this.libs.getChild(0)), Log.info.FUNC_SHOULD("add shader lib to the top"));

            this.libs.forEach((lib:ShaderLib) => {
                assert(JudgeUtils.isEqual(lib.shader, self), Log.info.FUNC_SHOULD("set ShaderLib.shader to be this"));
            });

            assert(this.libDirty === true, Log.info.FUNC_SHOULD("libDirty", "be true"));
        })
        public addShaderLibToTop(lib:ShaderLib){
            this.libs.unShiftChild(lib);

            lib.shader = this;

            this.libDirty = true;
        }

        public getLib(libClass:Function){
            return this.libs.findOne((lib:ShaderLib) => {
                return lib instanceof libClass;
            });
        }

        public getLibs(){
            return this.libs;
        }

        public removeLib(lib:ShaderLib);
        public removeLib(func:Function);

        public removeLib(...args){
            this.libDirty = true;

            return this.libs.removeChild(args[0]);
        }

        public removeAllLibs(){
            this.libDirty = true;

            this.libs.removeAllChildren();
        }

        public sortLib(func:(a:ShaderLib, b:ShaderLib) => any){
            this.libDirty = true;

            this.libs = this.libs.sort(func);
        }

        public buildDefinitionData(cmd:RenderCommand, material:Material){
            this.libs.forEach((lib:ShaderLib) => {
                lib.setShaderDefinition(cmd, material);
            });

            this.sourceBuilder.clearShaderDefinition();

            this.sourceBuilder.build(this.libs);

            this.attributes = this.sourceBuilder.attributes;
            this.uniforms = this.sourceBuilder.uniforms;
            this.vsSource = this.sourceBuilder.vsSource;
            this.fsSource = this.sourceBuilder.fsSource;
        }

        private _initShader(shader, source){
            var gl = DeviceManager.getInstance().gl;

            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
                return shader;
            }
            else{
                Log.log(gl.getShaderInfoLog(shader));
                Log.log("attributes:\n", this.attributes);
                Log.log("uniforms:\n", this.uniforms);
                Log.log("source:\n", source);
            }
        }

        private _isNotEqual(list1:wdCb.Hash<ShaderData>, list2:wdCb.Hash<ShaderData>){
            var result = false;

            list1.forEach((data:ShaderData, key:string) => {
                var list2Data = list2.getChild(key);

                if(!list2Data || data.type !== list2Data.type || data.value !== list2Data.value){
                    result = true;
                    return wdCb.$BREAK;
                }
            });

            return result;
        }
    }

    //todo
    export type ShaderData = {
        type:EVariableType;
        value?:any;
        textureId?:string;
    }
}
