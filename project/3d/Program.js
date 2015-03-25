/// <reference path="Shader.ts"/>
var Engine3D;
(function (Engine3D) {
    (function (DataType) {
        DataType[DataType["FLOAT_VEC4"] = 0] = "FLOAT_VEC4";
        DataType[DataType["FLOAT_MAT4"] = 1] = "FLOAT_MAT4";
        DataType[DataType["TEXTURE_2D"] = 2] = "TEXTURE_2D";
        DataType[DataType["TEXTURE_CUBE"] = 3] = "TEXTURE_CUBE";
        DataType[DataType["TEXTURE_ARR"] = 4] = "TEXTURE_ARR";
    })(Engine3D.DataType || (Engine3D.DataType = {}));
    var DataType = Engine3D.DataType;
    var Program = (function () {
        function Program(vs, fs) {
            this._program = null;
            this._vs = null;
            this._fs = null;
            this._program = gl.createProgram();
            this._vs = vs;
            this._fs = fs;
        }
        Program.prototype.use = function () {
            gl.useProgram(this._program);
        };
        Program.prototype.setUniformData = function (name, type, data) {
            var pos = gl.getUniformLocation(this._program, name);
            switch (type) {
                case 0 /* FLOAT_VEC4 */:
                    gl.uniform3fv(pos, data);
                    break;
                case 1 /* FLOAT_MAT4 */:
                    gl.uniformMatrix4fv(pos, false, data);
                    break;
                case 2 /* TEXTURE_2D */:
                case 3 /* TEXTURE_CUBE */:
                case 4 /* TEXTURE_ARR */:
                    gl.uniform1i(pos, data);
                    break;
                default:
                    throw new Error("数据类型错误");
                    break;
            }
            //if (type == gl.FLOAT)
            //    return function(v) { gl.uniform1f(loc, v); };
            //if (type == gl.FLOAT_VEC2)
            //    return function(v) { gl.uniform2fv(loc, v); };
            //if (type == gl.FLOAT_VEC3)
            //    return function(v) { gl.uniform3fv(loc, v); };
            //if (type == gl.FLOAT_VEC4)
            //    return function(v) { gl.uniform4fv(loc, v); };
            //if (type == gl.INT)
            //    return function(v) { gl.uniform1i(loc, v); };
            //if (type == gl.INT_VEC2)
            //    return function(v) { gl.uniform2iv(loc, v); };
            //if (type == gl.INT_VEC3)
            //    return function(v) { gl.uniform3iv(loc, v); };
            //if (type == gl.INT_VEC4)
            //    return function(v) { gl.uniform4iv(loc, v); };
            //if (type == gl.BOOL)
            //    return function(v) { gl.uniform1i(loc, v); };
            //if (type == gl.BOOL_VEC2)
            //    return function(v) { gl.uniform2iv(loc, v); };
            //if (type == gl.BOOL_VEC3)
            //    return function(v) { gl.uniform3iv(loc, v); };
            //if (type == gl.BOOL_VEC4)
            //    return function(v) { gl.uniform4iv(loc, v); };
            //if (type == gl.FLOAT_MAT2)
            //    return function(v) { gl.uniformMatrix2fv(loc, false, v); };
            //if (type == gl.FLOAT_MAT3)
            //    return function(v) { gl.uniformMatrix3fv(loc, false, v); };
            //if (type == gl.FLOAT_MAT4)
            //    return function(v) { gl.uniformMatrix4fv(loc, false, v); };
            //if (type == gl.SAMPLER_2D || type == gl.SAMPLER_CUBE) {
            //    return function(unit) {
            //        return function(v) {
            //            gl.uniform1i(loc, unit);
            //            v.bindToUnit(unit);
            //        };
            //    }(textureUnit++);
            //}
        };
        //todo buffer为什么不能申明为:ArrayBuffer类型？
        Program.prototype.setAttributeData = function (name, buffer) {
            var pos = gl.getAttribLocation(this._program, name);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
            gl.vertexAttribPointer(pos, buffer.num, buffer.type, false, 0, 0);
            gl.enableVertexAttribArray(pos);
            //switch (type){
            //    case DataType.FLOAT_VEC4:
            //        gl.uniform3fv(pos, data);
            //        break;
            //    case DataType.FLOAT_MAT4:
            //        gl.uniformMatrix4fv(pos, data);
            //        break;
            //    case DataType.SAMPLER_2D:
            //    case DataType.SAMPLER_CUBE:
            //        gl.uniform1i(pos, data);
            //        break;
            //    default :
            //        throw new Error("数据类型错误");
            //        break;
            //}
        };
        Program.prototype.initWhenCreate = function () {
            // 向程序对象里分配着色器
            gl.attachShader(this._program, this._vs);
            gl.attachShader(this._program, this._fs);
            // 将着色器连接
            gl.linkProgram(this._program);
            // 判断着色器的连接是否成功
            if (gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
                // 返回程序对象
                return this._program;
            }
            else {
                // 如果失败，弹出错误信息
                alert(gl.getProgramInfoLog(this._program));
                return null;
            }
        };
        Program.create = function (vs, fs) {
            var obj = new Program(vs, fs);
            obj.initWhenCreate();
            return obj;
        };
        return Program;
    })();
    Engine3D.Program = Program;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Program.js.map