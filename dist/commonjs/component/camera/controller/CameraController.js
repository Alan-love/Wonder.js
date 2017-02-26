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
require("wonder-frp/dist/commonjs/stream/MergeAllStream");
var Component_1 = require("../../../core/Component");
var cache_1 = require("../../../definition/typescript/decorator/cache");
var clone_1 = require("../../../definition/typescript/decorator/clone");
var virtual_1 = require("../../../definition/typescript/decorator/virtual");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var EventManager_1 = require("../../../event/EventManager");
var EEngineEvent_1 = require("../../../event/EEngineEvent");
var CameraController = (function (_super) {
    __extends(CameraController, _super);
    function CameraController(cameraComponent) {
        var _this = _super.call(this) || this;
        _this.camera = null;
        _this._worldToCameraMatrixCache = null;
        _this._clearCacheSubscription = null;
        _this.camera = cameraComponent;
        return _this;
    }
    Object.defineProperty(CameraController.prototype, "cameraToWorldMatrix", {
        get: function () {
            return this.camera.cameraToWorldMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "worldToCameraMatrix", {
        get: function () {
            return this._getWorldToCameraMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "pMatrix", {
        get: function () {
            return this.camera.pMatrix;
        },
        set: function (pMatrix) {
            this.camera.pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    CameraController.prototype.init = function () {
        this.camera.entityObject = this.entityObject;
        this.camera.init();
        this.bindClearCacheEvent();
    };
    CameraController.prototype.update = function (elapsed) {
        this.camera.update(elapsed);
    };
    CameraController.prototype.dispose = function () {
        this.camera.dispose();
        this.disposeClearCacheEvent();
    };
    CameraController.prototype.clone = function () {
        return clone_1.CloneUtils.clone(this);
    };
    CameraController.prototype.bindClearCacheEvent = function () {
        var self = this;
        this._clearCacheSubscription = Operator_1.fromArray([
            EventManager_1.EventManager.fromEvent(EEngineEvent_1.EEngineEvent.ENDLOOP),
            EventManager_1.EventManager.fromEvent(this.entityObject, EEngineEvent_1.EEngineEvent.TRANSFORM_TRANSLATE),
            EventManager_1.EventManager.fromEvent(this.entityObject, EEngineEvent_1.EEngineEvent.TRANSFORM_ROTATE),
            EventManager_1.EventManager.fromEvent(this.entityObject, EEngineEvent_1.EEngineEvent.TRANSFORM_SCALE)
        ])
            .mergeAll()
            .subscribe(function () {
            self._clearCache();
        });
    };
    CameraController.prototype.disposeClearCacheEvent = function () {
        this._clearCacheSubscription && this._clearCacheSubscription.dispose();
    };
    CameraController.prototype._clearCache = function () {
        this._worldToCameraMatrixCache = null;
    };
    CameraController.prototype._getWorldToCameraMatrix = function () {
        return this.camera.worldToCameraMatrix;
    };
    return CameraController;
}(Component_1.Component));
__decorate([
    cache_1.cacheGetter(function () {
        return this._worldToCameraMatrixCache !== null;
    }, function () {
        return this._worldToCameraMatrixCache;
    }, function (result) {
        this._worldToCameraMatrixCache = result;
    })
], CameraController.prototype, "worldToCameraMatrix", null);
__decorate([
    clone_1.cloneAttributeAsCloneable()
], CameraController.prototype, "camera", void 0);
__decorate([
    virtual_1.virtual
], CameraController.prototype, "bindClearCacheEvent", null);
__decorate([
    virtual_1.virtual
], CameraController.prototype, "disposeClearCacheEvent", null);
exports.CameraController = CameraController;
//# sourceMappingURL=CameraController.js.map