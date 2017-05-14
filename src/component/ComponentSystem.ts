import { ComponentData } from "./ComponentData";
import { Component } from "./Component";
import { getTypeIdFromClass, getTypeIdFromComponent } from "./ComponentTypeIdManager";
import { GameObject } from "../core/entityObject/gameObject/GameObject";


var _addHandle = (_class:any, handleMap:object, handle:(component:Component, ...args) => void) => {
    var typeID = getTypeIdFromClass(_class);

    handleMap[typeID] = handle;
}

export var addAddComponentHandle = (_class:any, handle:(component:Component, gameObject:GameObject) => void) => {
    _addHandle(_class, ComponentData.addComponentHandleMap, handle);
}

export var addDisposeHandle = (_class:any, handle:(component:Component) => void) => {
    _addHandle(_class, ComponentData.disposeHandleMap, handle);
}

export var execHandle = (component:Component, handleMapName:string, args?:Array<any>) => {
    var handle = ComponentData[handleMapName][getTypeIdFromComponent(component)];

    if(!!args){
        handle.apply(null, args);
    }
    else{
        handle(component);
    }
}