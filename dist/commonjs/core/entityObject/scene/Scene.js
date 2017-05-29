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
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("../gameObject/GameObject");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var GameObjectSystem_1 = require("../gameObject/GameObjectSystem");
var GameObjectData_1 = require("../gameObject/GameObjectData");
var SceneSystem_1 = require("./SceneSystem");
var wonder_expect_js_1 = require("wonder-expect.js");
var ThreeDTransformData_1 = require("../../../component/transform/ThreeDTransformData");
var SceneData_1 = require("./SceneData");
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Scene;
}(GameObject_1.GameObject));
exports.Scene = Scene;
exports.addSceneChild = contract_1.requireCheckFunc(function (scene, gameObject) {
    contract_1.it("scene should alive", function () {
        wonder_expect_js_1.expect(GameObjectSystem_1.isAlive(scene, GameObjectData_1.GameObjectData)).true;
    });
}, function (scene, gameObject) {
    SceneSystem_1.addChild(scene, gameObject, GameObjectData_1.GameObjectData, SceneData_1.SceneData);
});
exports.removeSceneChild = contract_1.requireCheckFunc(function (scene, gameObject) {
    contract_1.it("scene should alive", function () {
        wonder_expect_js_1.expect(GameObjectSystem_1.isAlive(scene, GameObjectData_1.GameObjectData)).true;
    });
}, function (scene, gameObject) {
    SceneSystem_1.removeChild(scene, gameObject, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData);
});
//# sourceMappingURL=Scene.js.map