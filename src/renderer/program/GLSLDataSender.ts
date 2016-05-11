module wd{
    export class GLSLDataSender{
        public static create(program:Program) {
            var obj = new this(program);

            return obj;
        }

        constructor(program:Program){
            this._program = program;
        }

        private _program:Program = null;
        private _uniformCache:Object = {};
        private _vertexAttribHistory:Array<boolean> = [];
        private _getUniformLocationCache:Object = {};
        private _toSendBufferUid:string = "";
        private _toSendBufferArr:Array<ToSendBufferData> = [];

        public sendFloat1(name:string, data:any){
            var gl = null,
                pos = null;

            if(this._uniformCache[name] == data){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform1f(pos, Number(data));
        }

        public sendFloat2(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData[0] === data[0] && recordedData[1] === data[1]){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform2f(pos, data[0], data[1]);
        }

        public sendFloat3(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2]){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform3f(pos, data[0], data[1], data[2]);
        }

        public sendFloat4(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2] && recordedData[3] === data[3]){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform4f(pos, data[0], data[1], data[2], data[3]);
        }

        public sendVector2(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData.isEqual(data)){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform2f(pos, data.x, data.y);
        }

        public sendVector3(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData.isEqual(data)){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform3f(pos, data.x, data.y, data.z);
        }

        public sendVector4(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData.isEqual(data)){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform4f(pos, data.x, data.y, data.z, data.w);
        }

        @require(function(name:string, data:number){
            assert(JudgeUtils.isNumber(data), Log.info.FUNC_MUST_BE("data", "be number"));
        })
        public sendNum1(name:string, data:number){
            var gl = null,
                pos = null;

            if(this._uniformCache[name] === data){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform1i(pos, data);
        }

        public sendMatrix3(name:string, data:Matrix3){
            var gl = DeviceManager.getInstance().gl,
                pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniformMatrix3fv(pos,false, data.values);
        }

        public sendMatrix4(name:string, data:Matrix4){
            var gl = DeviceManager.getInstance().gl,
                pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniformMatrix4fv(pos,false, data.values);
        }

        @require(function(name:string, data:Array<number>){
            assert(JudgeUtils.isArrayExactly(data), Log.info.FUNC_SHOULD("data", `be array, but actual is ${data}`));

            for(let unit of data){
                assert(JudgeUtils.isNumber(unit), Log.info.FUNC_SHOULD("data", `be Array<number>, but actual is ${data}`));
            }
        })
        public sendSampleArray(name:string, data:Array<number>){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name],
                isEqual:boolean = true;

            if(recordedData){
                for(let i = 0, len = data.length; i < len; i++){
                    if(recordedData[i] !== data[i]){
                        isEqual = false;
                        break;
                    }
                }

                if(isEqual){
                    return;
                }
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform1iv(pos, data);
        }

        /*!
         not use @cache,
         here judge return pos of "getChild", so it don't need to invoke "hasChild"
         */
        public getUniformLocation(name:string){
            var pos = null,
                gl = DeviceManager.getInstance().gl;

            pos = this._getUniformLocationCache[name];

            if(pos !== void 0){
                return pos;
            }

            pos = gl.getUniformLocation(this._program.glProgram, name);

            this._getUniformLocationCache[name] = pos;

            return pos;
        }

        public addBufferToToSendList(pos:number, buffer:ArrayBuffer){
            this._toSendBufferArr.push({
                pos:pos,
                buffer:buffer
            });

            this._toSendBufferUid += String(buffer.uid);
        }

        @require(function(){
            assert(!ArrayUtils.hasRepeatItems(this._toSendBufferArr.map((data:ToSendBufferData) => {
                    return data.buffer;
                })), Log.info.FUNC_SHOULD_NOT("_toSendBufferArr", "has repeat buffer"));
        })
        @cache(function(){
            return BufferTable.lastBindedArrayBufferListUidStr === this._toSendBufferUid;
        }, function(){
        }, function(){
            BufferTable.lastBindedArrayBufferListUidStr = this._toSendBufferUid;
        })
        public sendAllBufferData(){
            var toSendBufferArr = this._toSendBufferArr;

            for(let i = 0, len = toSendBufferArr.length; i < len; i++){
                let data = toSendBufferArr[i];

                this.sendBuffer(data.pos, data.buffer);
            }
        }

        public clearBufferList(){
            this._toSendBufferArr = [];

            this._toSendBufferUid = "";
        }

        public sendBuffer(pos:number, buffer:ArrayBuffer){
            var gl = DeviceManager.getInstance().gl;

            this._vertexAttribHistory[pos] = true;

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
            gl.vertexAttribPointer(pos, buffer.size, gl[buffer.type], false, 0, 0);
            gl.enableVertexAttribArray(pos);
        }

        public clearAllCache(){
            this._getUniformLocationCache = {};

            this._uniformCache = {};
        }

        public dispose(){
            var gl = DeviceManager.getInstance().gl;

            for(let i in this._vertexAttribHistory){
                //make sure this is a number)
                let iAsNumber = +i;

                if (iAsNumber > gl.VERTEX_ATTRIB_ARRAY_ENABLED || !this._vertexAttribHistory[iAsNumber]) {
                    continue;
                }
                this._vertexAttribHistory[iAsNumber] = false;
                gl.disableVertexAttribArray(iAsNumber);
            }

            this._vertexAttribHistory = [];
        }

        private _recordUniformData(name:string, data:any){
            this._uniformCache[name] = data;
        }

        private _isUniformDataNotExistByLocation(pos:number){
            return pos === null;
        }
    }

    export type ToSendBufferData = {
        pos:number;
        buffer:ArrayBuffer;
    }
}

