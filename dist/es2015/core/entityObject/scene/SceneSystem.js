import { create as createGameObject, addChild as addGameObject, removeChild as removeGameObject, hasComponent } from "../gameObject/GameObjectSystem";
import { getTypeIDFromClass } from "../../../component/ComponentTypeIdManager";
import { CameraController } from "../../../component/camera/CameraController";
import { ensureFunc, it } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
export var create = function (GameObjectData) {
    return createGameObject(null, GameObjectData);
};
export var addChild = function (scene, child, GameObjectData, SceneData) {
    if (_isCamera(child, GameObjectData)) {
        SceneData.cameraArray.push(child);
    }
    addGameObject(scene, child, null, GameObjectData);
};
export var removeChild = function (gameObject, child, ThreeDTransformData, GameObjectData) {
    removeGameObject(gameObject, child, ThreeDTransformData, GameObjectData);
};
var _isCamera = function (gameObject, GameObjectData) {
    return hasComponent(gameObject, getTypeIDFromClass(CameraController), GameObjectData);
};
export var getCurrentCamera = ensureFunc(function (camera, SceneData) {
    it("current camera should exist", function () {
        expect(camera).exist;
    });
}, function (SceneData) {
    return SceneData.cameraArray[0];
});
export var initData = function (SceneData) {
    SceneData.cameraArray = [];
};
//# sourceMappingURL=SceneSystem.js.map