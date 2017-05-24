import { ComponentData, ComponentGameObjectMap } from "./ComponentData";
import { Component } from "./Component";
import { getTypeIDFromClass, getTypeIDFromComponent } from "./ComponentTypeIDManager";
import { GameObject } from "../core/entityObject/gameObject/GameObject";
import { expect } from "wonder-expect.js";
import { it } from "../definition/typescript/decorator/contract";

var _addHandle = (_class:any, handleMap:object, handle:(component:Component, ...args) => void) => {
    var typeID = getTypeIDFromClass(_class);

    handleMap[typeID] = handle;
}

export var addAddComponentHandle = (_class:any, handle:(component:Component, gameObject:GameObject) => void) => {
    _addHandle(_class, ComponentData.addComponentHandleMap, handle);
}

export var addDisposeHandle = (_class:any, handle:(component:Component) => void) => {
    _addHandle(_class, ComponentData.disposeHandleMap, handle);
}

export var execHandle = (component:Component, handleMapName:string, args?:Array<any>) => {
    var handle = ComponentData[handleMapName][getTypeIDFromComponent(component)];

    if(!!args){
        handle.apply(null, args);
    }
    else{
        handle(component);
    }
}

export var checkComponentShouldAlive = (component:Component, data:any, isAlive:(component:Component, data:any) => boolean) => {
    it("component should alive", () => {
        expect(isAlive(component, data)).true;
    });
}

export var addComponentToGameObjectMap = (gameObjectMap:ComponentGameObjectMap, index:number, gameObject:GameObject) => {
    gameObjectMap[index] = gameObject;
}

export var getComponentGameObject = (gameObjectMap:ComponentGameObjectMap, index:number) => {
    return gameObjectMap[index];
}

export var generateComponentIndex = (ComponentData: any) => {
    return ComponentData.index++;
}
