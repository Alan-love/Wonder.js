import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";
import { Component } from "../Component";

export class SpecifyLightData {
    public static index: number = null;
    public static count: number = null;

    public static buffer: any = null;

    public static colors: Float32Array = null;
    public static isColorDirtys: Uint8Array = null;

    public static gameObjectMap: Array<IUIdEntity> = null;
    public static lightMap: Array<Component> = null;

    public static defaultColorArr: Array<number> = null;
    public static defaultDirty: number = null;
}

