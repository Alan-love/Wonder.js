import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import {
    addChild,
    addComponent, create, dispose, disposeComponent, getComponent, getTransform, hasChild, hasComponent,
    isAlive, removeChild
} from "./GameObjectSystem";
import { GameObjectData } from "./GameObjectData";
import { Component } from "../../../component/Component";
import { getTypeIDFromClass } from "../../../component/ComponentTypeIDManager";
import { ThreeDTransformData } from "../../../component/transform/ThreeDTransformData";
import { create as createThreeDTransform } from "../../../component/transform/ThreeDTransformSystem";
import { requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { checkGameObjectShouldAlive } from "../../../utils/contractUtils";

@registerClass("GameObject")
export class GameObject implements IUIDEntity{
    public uid:number = null;
}

export var createGameObject = () => create(createThreeDTransform(ThreeDTransformData), GameObjectData);

export var addGameObjectComponent = requireCheckFunc((gameObject:GameObject, component: Component) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, component: Component) => {
    addComponent(gameObject, component, GameObjectData);
})

export var disposeGameObject = requireCheckFunc((gameObject:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject) => {
    dispose(gameObject, ThreeDTransformData, GameObjectData);
})

export var disposeGameObjectComponent = requireCheckFunc((gameObject:GameObject, component: Component) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, component: Component) => {
    disposeComponent(gameObject, component, GameObjectData);
})

export var getGameObjectComponent = requireCheckFunc((gameObject:GameObject, _class:any) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, _class:any) => {
    return getComponent(gameObject, getTypeIDFromClass(_class), GameObjectData);
})

export var getGameObjectTransform = (gameObject:GameObject) => {
    return getTransform(gameObject, GameObjectData);
}

export var hasGameObjectComponent = requireCheckFunc((gameObject:GameObject, _class:any) => {
    // checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, _class:any) => {
    return hasComponent(gameObject, getTypeIDFromClass(_class), GameObjectData);
})

export var isGameObjectAlive = (gameObject:GameObject) => {
    return isAlive(gameObject, GameObjectData);
}

export var addGameObject = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, child:GameObject) => {
    addChild(gameObject, child, ThreeDTransformData, GameObjectData);
})

export var removeGameObject = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, child:GameObject) => {
    removeChild(gameObject, child, ThreeDTransformData, GameObjectData);
})

export var hasGameObject = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, child:GameObject) => {
    return hasChild(gameObject, child, GameObjectData);
})

export interface IUIDEntity {
    uid:number;
}

