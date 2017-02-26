"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../../definition/typescript/decorator/registerClass");
var ShaderSourceBuilder_1 = require("./ShaderSourceBuilder");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var Log_1 = require("../../../utils/Log");
var ShaderSnippet_1 = require("../snippet/ShaderSnippet");
var GPUDetector_1 = require("../../../device/GPUDetector");
var ShaderChunk_1 = require("../chunk/ShaderChunk");
var VariableTypeTable_1 = require("../variable/VariableTypeTable");
var EVariableType_1 = require("../variable/EVariableType");
var EngineShaderSourceBuilder = (function (_super) {
    __extends(EngineShaderSourceBuilder, _super);
    function EngineShaderSourceBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsSourceTop = "";
        _this.vsSourceDefine = "";
        _this.vsSourceVarDeclare = "";
        _this.vsSourceFuncDeclare = "";
        _this.vsSourceFuncDefine = "";
        _this.vsSourceBody = "";
        _this.fsSourceTop = "";
        _this.fsSourceDefine = "";
        _this.fsSourceVarDeclare = "";
        _this.fsSourceFuncDeclare = "";
        _this.fsSourceFuncDefine = "";
        _this.fsSourceBody = "";
        _this.vsSourceDefineList = Collection_1.Collection.create();
        _this.fsSourceDefineList = Collection_1.Collection.create();
        _this.vsSourceExtensionList = Collection_1.Collection.create();
        _this.fsSourceExtensionList = Collection_1.Collection.create();
        return _this;
    }
    EngineShaderSourceBuilder.create = function () {
        var obj = new this();
        return obj;
    };
    EngineShaderSourceBuilder.prototype.build = function (libs) {
        this._readLibSource(libs);
        if (this.vsSource === null) {
            this._buildVsSource();
        }
        if (this.fsSource === null) {
            this._buildFsSource();
        }
        this.convertAttributesData();
    };
    EngineShaderSourceBuilder.prototype.clearShaderDefinition = function () {
        this.attributes.removeAllChildren();
        this.uniforms.removeAllChildren();
        this.vsSourceDefineList.removeAllChildren();
        this.fsSourceDefineList.removeAllChildren();
        this.vsSourceTop = "";
        this.vsSourceDefine = "";
        this.vsSourceVarDeclare = "";
        this.vsSourceFuncDeclare = "";
        this.vsSourceFuncDefine = "";
        this.vsSourceBody = "";
        this.vsSource = null;
        this.fsSourceTop = "";
        this.fsSourceDefine = "";
        this.fsSourceVarDeclare = "";
        this.fsSourceFuncDeclare = "";
        this.fsSourceFuncDefine = "";
        this.fsSourceBody = "";
        this.fsSource = null;
    };
    EngineShaderSourceBuilder.prototype._readLibSource = function (libs) {
        var setSourceLibs = libs.filter(function (lib) {
            return lib.vsSource !== null || lib.fsSource !== null;
        });
        this._judgeAndSetVsSource(setSourceLibs);
        this._judgeAndSetFsSource(setSourceLibs);
        this._judgeAndSetPartSource(libs);
    };
    EngineShaderSourceBuilder.prototype._judgeAndSetVsSource = function (setSourceLibs) {
        var setVsSourceLib = setSourceLibs.findOne(function (lib) {
            return lib.vsSource !== null;
        });
        if (setVsSourceLib) {
            this.vsSource = setVsSourceLib.vsSource;
        }
    };
    EngineShaderSourceBuilder.prototype._judgeAndSetFsSource = function (setSourceLibs) {
        var setFsSourceLib = setSourceLibs.findOne(function (lib) {
            return lib.fsSource !== null;
        });
        if (setFsSourceLib) {
            this.fsSource = setFsSourceLib.fsSource;
        }
    };
    EngineShaderSourceBuilder.prototype._judgeAndSetPartSource = function (libs) {
        var vsSource = this.vsSource, fsSource = this.fsSource, attributes = this.attributes, uniforms = this.uniforms, vsSourceDefineList = this.vsSourceDefineList, fsSourceDefineList = this.fsSourceDefineList, vsSourceExtensionList = this.vsSourceExtensionList, fsSourceExtensionList = this.fsSourceExtensionList, vsSourceTop = "", vsSourceDefine = "", vsSourceVarDeclare = "", vsSourceFuncDeclare = "", vsSourceFuncDefine = "", vsSourceBody = "", fsSourceTop = "", fsSourceDefine = "", fsSourceVarDeclare = "", fsSourceFuncDeclare = "", fsSourceFuncDefine = "", fsSourceBody = "";
        libs.forEach(function (lib) {
            attributes.addChildren(lib.attributes);
            uniforms.addChildren(lib.uniforms);
            if (vsSource === null) {
                vsSourceTop += lib.vsSourceTop;
                vsSourceDefine += lib.vsSourceDefine;
                vsSourceVarDeclare += lib.vsSourceVarDeclare;
                vsSourceFuncDeclare += lib.vsSourceFuncDeclare;
                vsSourceFuncDefine += lib.vsSourceFuncDefine;
                vsSourceBody += lib.vsSourceBody;
                vsSourceDefineList.addChildren(lib.vsSourceDefineList);
                vsSourceExtensionList.addChildren(lib.vsSourceExtensionList);
            }
            if (fsSource === null) {
                fsSourceTop += lib.fsSourceTop;
                fsSourceDefine += lib.fsSourceDefine;
                fsSourceVarDeclare += lib.fsSourceVarDeclare;
                fsSourceFuncDeclare += lib.fsSourceFuncDeclare;
                fsSourceFuncDefine += lib.fsSourceFuncDefine;
                fsSourceBody += lib.fsSourceBody;
                fsSourceDefineList.addChildren(lib.fsSourceDefineList);
                fsSourceExtensionList.addChildren(lib.fsSourceExtensionList);
            }
        });
        if (vsSource === null) {
            this.vsSourceTop = vsSourceTop;
            this.vsSourceDefine = vsSourceDefine;
            this.vsSourceVarDeclare = vsSourceVarDeclare;
            this.vsSourceFuncDeclare = vsSourceFuncDeclare;
            this.vsSourceFuncDefine = vsSourceFuncDefine;
            this.vsSourceBody = vsSourceBody;
        }
        if (fsSource === null) {
            this.fsSourceTop = fsSourceTop;
            this.fsSourceDefine = fsSourceDefine;
            this.fsSourceVarDeclare = fsSourceVarDeclare;
            this.fsSourceFuncDeclare = fsSourceFuncDeclare;
            this.fsSourceFuncDefine = fsSourceFuncDefine;
            this.fsSourceBody = fsSourceBody;
        }
    };
    EngineShaderSourceBuilder.prototype._buildVsSource = function () {
        this.vsSource = this._buildVsSourceTop() + this._buildVsSourceDefine() + this._buildVsSourceVarDeclare() + this._buildVsSourceFuncDeclare() + this._buildVsSourceFuncDefine() + this._buildVsSourceBody();
    };
    EngineShaderSourceBuilder.prototype._buildFsSource = function () {
        this.fsSource = this._buildFsSourceTop() + this._buildFsSourceDefine() + this._buildFsSourceVarDeclare() + this._buildFsSourceFuncDeclare() + this._buildFsSourceFuncDefine() + this._buildFsSourceBody();
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceTop = function () {
        return this._buildVsSourceExtension() + this._getPrecisionSource() + this.vsSourceTop;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceDefine = function () {
        return this._buildSourceDefine(this.vsSourceDefineList) + this.vsSourceDefine;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceExtension = function () {
        return this._buildSourceExtension(this.vsSourceExtensionList);
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceVarDeclare = function () {
        return this._generateAttributeSource() + this._generateUniformSource(this.vsSourceVarDeclare, this.vsSourceFuncDefine, this.vsSourceBody) + this.vsSourceVarDeclare;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceFuncDeclare = function () {
        return this.vsSourceFuncDeclare;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceFuncDefine = function () {
        return this.vsSourceFuncDefine;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceBody = function () {
        return ShaderSnippet_1.main_begin + this.vsSourceBody + ShaderSnippet_1.main_end;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceTop = function () {
        return this._buildFsSourceExtension() + this._getPrecisionSource() + this.fsSourceTop;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceDefine = function () {
        return this._buildSourceDefine(this.fsSourceDefineList) + this.fsSourceDefine;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceExtension = function () {
        return this._buildSourceExtension(this.fsSourceExtensionList);
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceVarDeclare = function () {
        return this._generateUniformSource(this.fsSourceVarDeclare, this.fsSourceFuncDefine, this.fsSourceBody) + this.fsSourceVarDeclare;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceFuncDeclare = function () {
        return this.fsSourceFuncDeclare;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceFuncDefine = function () {
        return this.fsSourceFuncDefine;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceBody = function () {
        return ShaderSnippet_1.main_begin + this.fsSourceBody + ShaderSnippet_1.main_end;
    };
    EngineShaderSourceBuilder.prototype._buildSourceDefine = function (defineList) {
        var result = "";
        defineList.forEach(function (sourceDefine) {
            if (sourceDefine.value === void 0) {
                result += "#define " + sourceDefine.name + "\n";
            }
            else {
                result += "#define " + sourceDefine.name + " " + sourceDefine.value + "\n";
            }
        });
        return result;
    };
    EngineShaderSourceBuilder.prototype._buildSourceExtension = function (extensionList) {
        var result = "";
        extensionList.forEach(function (name) {
            result += "#extension " + name + " : enable\n";
        });
        return result;
    };
    EngineShaderSourceBuilder.prototype._getPrecisionSource = function () {
        var precision = GPUDetector_1.GPUDetector.getInstance().precision, result = null;
        switch (precision) {
            case GPUDetector_1.EGPUPrecision.HIGHP:
                result = ShaderChunk_1.highp_fragment.top;
                break;
            case GPUDetector_1.EGPUPrecision.MEDIUMP:
                result = ShaderChunk_1.mediump_fragment.top;
                break;
            case GPUDetector_1.EGPUPrecision.LOWP:
                result = ShaderChunk_1.lowp_fragment.top;
                break;
            default:
                result = "";
                break;
        }
        return result;
    };
    EngineShaderSourceBuilder.prototype._generateAttributeSource = function () {
        var result = "";
        this.attributes.filter(function (data, key) {
            return !!data;
        }).forEach(function (data, key) {
            result += "attribute " + VariableTypeTable_1.VariableTypeTable.getVariableType(data.type) + " " + key + ";\n";
        });
        return result;
    };
    EngineShaderSourceBuilder.prototype._generateUniformSource = function (sourceVarDeclare, sourceFuncDefine, sourceBody) {
        var result = "", self = this;
        this.uniforms.filter(function (data, key) {
            return !!data && data.type !== EVariableType_1.EVariableType.STRUCTURE && data.type !== EVariableType_1.EVariableType.STRUCTURES && !self._isExistInSource(key, sourceVarDeclare) && (self._isExistInSource(key, sourceFuncDefine) || self._isExistInSource(key, sourceBody));
        }).forEach(function (data, key) {
            result += "uniform " + VariableTypeTable_1.VariableTypeTable.getVariableType(data.type) + " " + key + ";\n";
        });
        return result;
    };
    EngineShaderSourceBuilder.prototype._isExistInSource = function (key, source) {
        return source.indexOf(key) !== -1;
    };
    return EngineShaderSourceBuilder;
}(ShaderSourceBuilder_1.ShaderSourceBuilder));
__decorate([
    contract_1.requireCheck(function (libs) {
        contract_1.assert(this.vsSource === null, Log_1.Log.info.FUNC_SHOULD("vsSource", "be null"));
        contract_1.assert(this.fsSource === null, Log_1.Log.info.FUNC_SHOULD("fsSource", "be null"));
    })
], EngineShaderSourceBuilder.prototype, "build", null);
EngineShaderSourceBuilder = __decorate([
    registerClass_1.registerClass("EngineShaderSourceBuilder")
], EngineShaderSourceBuilder);
exports.EngineShaderSourceBuilder = EngineShaderSourceBuilder;
//# sourceMappingURL=EngineShaderSourceBuilder.js.map