import {
    getIsTest, init as initMain, initData as initDataMainSystem, setConfig, setIsTest,
    setLibIsTest
} from "./MainSystem";
import { CompileConfig } from "../config/CompileConfig";
import { Map } from "immutable";
import { DirectorData } from "./DirectorData";
import { getState, setState } from "./DirectorSystem";
import { it, requireCheck } from "../definition/typescript/decorator/contract";
import { MainData } from "./MainData";
import { expect } from "wonder-expect.js";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { MainConfigData } from "../definition/type/mainType";
import { WorkerDetectData } from "../device/WorkerDetectData";

export class Main {
    static get isTest() {
        return getIsTest(MainData);
    }
    static set isTest(isTest: boolean) {
        setIsTest(isTest, MainData).run();

        setLibIsTest(isTest).run();
    }

    private static _configState: Map<any, any> = null;

    public static setConfig(configState: MainConfigData) {
        this._configState = setConfig(CompileConfig.closeContractTest, MainData, WorkerDetectData, configState).run();

        setState(getState(DirectorData).set("Main", this._configState.get("Main")), DirectorData).run();

        return this;
    }

    @requireCheck(() => {
        it("configState should exist", () => {
            expect(Main._configState).exist;
        });
    })
    public static init() {
        initDataMainSystem();

        setState(initMain(getState(DirectorData), this._configState.get("config"), DomQuery).run(), DirectorData).run();

        return this;
    }
}
