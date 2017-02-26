"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../../../definition/typescript/decorator/registerClass");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var DeviceManager_1 = require("../../../../device/DeviceManager");
var BufferTable = (function () {
    function BufferTable() {
    }
    BufferTable.bindIndexBuffer = function (indexBuffer) {
        var gl = null;
        if (this.lastBindedElementBuffer === indexBuffer) {
            return;
        }
        this.lastBindedElementBuffer = indexBuffer;
        gl = DeviceManager_1.DeviceManager.getInstance().gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
    };
    BufferTable.hasBuffer = function (key) {
        return this._table.hasChild(key);
    };
    BufferTable.addBuffer = function (key, buffer) {
        this._table.addChild(key, buffer);
    };
    BufferTable.getBuffer = function (key) {
        return this._table.getChild(key);
    };
    BufferTable.dispose = function () {
        this._table.forEach(function (buffer) {
            buffer.dispose();
        });
        this.lastBindedArrayBufferListUidStr = null;
        this.lastBindedElementBuffer = null;
    };
    BufferTable.clearAll = function () {
        this._table.removeAllChildren();
        this.lastBindedArrayBufferListUidStr = null;
        this.lastBindedElementBuffer = null;
    };
    BufferTable.resetBindedArrayBuffer = function () {
        var gl = DeviceManager_1.DeviceManager.getInstance().gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.lastBindedArrayBufferListUidStr = null;
    };
    BufferTable.resetBindedElementBuffer = function () {
        var gl = DeviceManager_1.DeviceManager.getInstance().gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this.lastBindedElementBuffer = null;
    };
    return BufferTable;
}());
BufferTable.lastBindedArrayBufferListUidStr = null;
BufferTable.lastBindedElementBuffer = null;
BufferTable._table = Hash_1.Hash.create();
BufferTable = __decorate([
    registerClass_1.registerClass("BufferTable")
], BufferTable);
exports.BufferTable = BufferTable;
var BufferTableKey;
(function (BufferTableKey) {
    BufferTableKey[BufferTableKey["PROCEDURAL_VERTEX"] = "PROCEDURAL_VERTEX"] = "PROCEDURAL_VERTEX";
    BufferTableKey[BufferTableKey["PROCEDURAL_INDEX"] = "PROCEDURAL_INDEX"] = "PROCEDURAL_INDEX";
})(BufferTableKey = exports.BufferTableKey || (exports.BufferTableKey = {}));
//# sourceMappingURL=BufferTable.js.map