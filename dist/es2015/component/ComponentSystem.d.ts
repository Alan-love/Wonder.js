import { ComponentGameObjectMap } from "./ComponentData";
import { Component } from "./Component";
import { GameObject } from "../core/entityObject/gameObject/GameObject";
import { Map as MapImmutable } from "immutable";
export declare var addAddComponentHandle: (_class: any, handle: Function) => void;
export declare var addDisposeHandle: (_class: any, handle: Function) => void;
export declare var addInitHandle: (_class: any, handle: (index: number, state: MapImmutable<any, any>) => void) => void;
export declare var execHandle: (component: Component, handleMapName: string, args?: any[]) => void;
export declare var execInitHandle: (typeID: string, index: number, state: MapImmutable<any, any>) => void;
export declare var checkComponentShouldAlive: (component: Component, data: any, isAlive: (component: Component, data: any) => boolean) => void;
export declare var addComponentToGameObjectMap: Function;
export declare var getComponentGameObject: (gameObjectMap: ComponentGameObjectMap, index: number) => GameObject;
export declare var generateComponentIndex: (ComponentData: any) => number;
export declare var deleteComponentBySwap: Function;
export declare var markComponentIndexRemoved: (component: Component) => void;
export declare type ComponentMap = {
    [index: number]: Component;
};
