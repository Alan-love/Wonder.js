import { GameObject } from "../gameObject/GameObject";
import { requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { isAlive } from "../gameObject/GameObjectSystem";
import { GameObjectData } from "../gameObject/GameObjectData";
import { addChild, removeChild } from "./SceneSystem";
import { expect } from "wonder-expect.js";
import { ThreeDTransformData } from "../../../component/transform/ThreeDTransformData";

export class Scene extends GameObject{
}

export var addSceneChild = requireCheckFunc((scene:Scene, gameObject:GameObject) => {
    it("scene should alive", () => {
        expect(isAlive(scene, GameObjectData)).true;
    });
}, (scene:Scene, gameObject:GameObject) => {
    addChild(scene, gameObject, GameObjectData);
})

export var removeSceneChild = requireCheckFunc((scene:Scene, gameObject:GameObject) => {
    it("scene should alive", () => {
        expect(isAlive(scene, GameObjectData)).true;
    });
}, (scene:Scene, gameObject:GameObject) => {
    removeChild(scene, gameObject, ThreeDTransformData, GameObjectData);
})
