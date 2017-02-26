var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { DeviceManager } from "../../device/DeviceManager";
import { requireCheck, assert, it } from "../../definition/typescript/decorator/contract";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { Log } from "../../utils/Log";
import expect from "wonder-expect.js";
import { ArrayUtils } from "../../utils/ArrayUtils";
import { cache } from "../../definition/typescript/decorator/cache";
import { BufferTable } from "../../core/entityObject/scene/cache/BufferTable";
var GLSLDataSender = (function () {
    function GLSLDataSender(program) {
        this._program = null;
        this._uniformCache = {};
        this._vertexAttribHistory = [];
        this._getUniformLocationCache = {};
        this._toSendBufferArr = [];
        this._toSendBuffersUidStr = "";
        this._program = program;
    }
    GLSLDataSender.create = function (program) {
        var obj = new this(program);
        return obj;
    };
    GLSLDataSender.prototype.sendFloat1 = function (name, data) {
        var gl = null, pos = null;
        if (this._uniformCache[name] == data) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform1f(pos, Number(data));
    };
    GLSLDataSender.prototype.sendFloat2 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] === data[0] && recordedData[1] === data[1]) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform2f(pos, data[0], data[1]);
    };
    GLSLDataSender.prototype.sendFloat3 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2]) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform3f(pos, data[0], data[1], data[2]);
    };
    GLSLDataSender.prototype.sendFloat4 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2] && recordedData[3] === data[3]) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform4f(pos, data[0], data[1], data[2], data[3]);
    };
    GLSLDataSender.prototype.sendVector2 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] == data.x && recordedData[1] == data.y) {
            return;
        }
        var x = data.x, y = data.y;
        this._recordUniformData(name, [x, y]);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform2f(pos, x, y);
    };
    GLSLDataSender.prototype.sendVector3 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] == data.x && recordedData[1] == data.y && recordedData[2] == data.z) {
            return;
        }
        var x = data.x, y = data.y, z = data.z;
        this._recordUniformData(name, [x, y, z]);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform3f(pos, x, y, z);
    };
    GLSLDataSender.prototype.sendVector4 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] == data.x && recordedData[1] == data.y && recordedData[2] == data.z && recordedData[3] == data.w) {
            return;
        }
        var x = data.x, y = data.y, z = data.z, w = data.w;
        this._recordUniformData(name, [x, y, z, w]);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform4f(pos, x, y, z, w);
    };
    GLSLDataSender.prototype.sendColor3 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name], convertedData = null;
        if (recordedData && recordedData[0] == data.r && recordedData[1] == data.g && recordedData[2] == data.b) {
            return;
        }
        var r = data.r, g = data.g, b = data.b;
        this._recordUniformData(name, [r, g, b]);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform3f(pos, r, g, b);
    };
    GLSLDataSender.prototype.sendNum1 = function (name, data) {
        var gl = null, pos = null;
        if (this._uniformCache[name] === data) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform1i(pos, data);
    };
    GLSLDataSender.prototype.sendMatrix3 = function (name, data) {
        var gl = DeviceManager.getInstance().gl, pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniformMatrix3fv(pos, false, data.values);
    };
    GLSLDataSender.prototype.sendMatrix4 = function (name, data) {
        var gl = DeviceManager.getInstance().gl, pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniformMatrix4fv(pos, false, data.values);
    };
    GLSLDataSender.prototype.sendMatrix4Array = function (name, data) {
        var gl = DeviceManager.getInstance().gl, pos = this.getUniformLocation(name + "[0]");
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniformMatrix4fv(pos, false, data);
    };
    GLSLDataSender.prototype.sendSampleArray = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name], isEqual = true;
        if (recordedData) {
            for (var i = 0, len = data.length; i < len; i++) {
                if (recordedData[i] !== data[i]) {
                    isEqual = false;
                    break;
                }
            }
            if (isEqual) {
                return;
            }
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform1iv(pos, data);
    };
    GLSLDataSender.prototype.getUniformLocation = function (name) {
        var pos = null, gl = DeviceManager.getInstance().gl;
        pos = this._getUniformLocationCache[name];
        if (pos !== void 0) {
            return pos;
        }
        pos = gl.getUniformLocation(this._program.glProgram, name);
        this._getUniformLocationCache[name] = pos;
        return pos;
    };
    GLSLDataSender.prototype.addBufferToToSendList = function (pos, buffer) {
        this._toSendBufferArr[pos] = buffer;
        this._toSendBuffersUidStr += String(buffer.uid);
    };
    GLSLDataSender.prototype.sendAllBufferData = function () {
        var toSendBufferArr = this._toSendBufferArr;
        for (var pos = 0, len = toSendBufferArr.length; pos < len; pos++) {
            var buffer = toSendBufferArr[pos];
            if (!buffer) {
                continue;
            }
            this.sendBuffer(pos, buffer);
        }
    };
    GLSLDataSender.prototype.clearBufferList = function () {
        this._toSendBufferArr = [];
        this._toSendBuffersUidStr = "";
    };
    GLSLDataSender.prototype.sendBuffer = function (pos, buffer) {
        var gl = DeviceManager.getInstance().gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
        gl.vertexAttribPointer(pos, buffer.size, gl[buffer.type], false, 0, 0);
        if (this._vertexAttribHistory[pos] !== true) {
            gl.enableVertexAttribArray(pos);
            this._vertexAttribHistory[pos] = true;
        }
    };
    GLSLDataSender.prototype.disableVertexAttribArray = function () {
        var gl = DeviceManager.getInstance().gl;
        for (var i in this._vertexAttribHistory) {
            var iAsNumber = +i;
            if (iAsNumber > gl.VERTEX_ATTRIB_ARRAY_ENABLED || !this._vertexAttribHistory[iAsNumber]) {
                continue;
            }
            this._vertexAttribHistory[iAsNumber] = false;
            gl.disableVertexAttribArray(iAsNumber);
        }
        this._vertexAttribHistory = [];
    };
    GLSLDataSender.prototype.clearAllCache = function () {
        this._getUniformLocationCache = {};
        this._uniformCache = {};
    };
    GLSLDataSender.prototype.dispose = function () {
        this.disableVertexAttribArray();
    };
    GLSLDataSender.prototype._recordUniformData = function (name, data) {
        this._uniformCache[name] = data;
    };
    GLSLDataSender.prototype._isUniformDataNotExistByLocation = function (pos) {
        return pos === null;
    };
    return GLSLDataSender;
}());
__decorate([
    requireCheck(function (name, data) {
        assert(JudgeUtils.isNumber(data), Log.info.FUNC_MUST_BE("data", "be number"));
    })
], GLSLDataSender.prototype, "sendNum1", null);
__decorate([
    requireCheck(function (name, data) {
        it("data should be array, but actual is " + data, function () {
            expect(JudgeUtils.isFloatArray(data) || JudgeUtils.isArrayExactly(data)).true;
        });
        it("name shouldn't be the first matrix of the array", function () {
            expect(/\[0\]$/.test(name)).false;
        });
    })
], GLSLDataSender.prototype, "sendMatrix4Array", null);
__decorate([
    requireCheck(function (name, data) {
        assert(JudgeUtils.isArrayExactly(data), Log.info.FUNC_SHOULD("data", "be array, but actual is " + data));
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var unit = data_1[_i];
            assert(JudgeUtils.isNumber(unit), Log.info.FUNC_SHOULD("data", "be Array<number>, but actual is " + data));
        }
    })
], GLSLDataSender.prototype, "sendSampleArray", null);
__decorate([
    requireCheck(function () {
        assert(!ArrayUtils.hasRepeatItems(this._toSendBufferArr), Log.info.FUNC_SHOULD_NOT("_toSendBufferArr", "has repeat buffer"));
    }),
    cache(function () {
        return BufferTable.lastBindedArrayBufferListUidStr === this._toSendBuffersUidStr;
    }, function () {
    }, function () {
        BufferTable.lastBindedArrayBufferListUidStr = this._toSendBuffersUidStr;
    })
], GLSLDataSender.prototype, "sendAllBufferData", null);
GLSLDataSender = __decorate([
    registerClass("GLSLDataSender")
], GLSLDataSender);
export { GLSLDataSender };
//# sourceMappingURL=GLSLDataSender.js.map