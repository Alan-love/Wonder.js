import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { TimeController } from "./TimeController";
import { root } from "../../definition/Variable";

const STARTING_FPS = 60,
    GAMETIME_SCALE = 1000;

@registerClass("DirectorTimeController")
export class DirectorTimeController extends TimeController {
    public static create() {
        var obj = new this();

        return obj;
    }

    public gameTime: number = null;
    public fps: number = null;
    public isTimeChange: boolean = false;
    public deltaTime: number = null;

    private _lastTime: number = null;

    public tick(time: number) {
        this.deltaTime = this._lastTime !== null ? time - this._lastTime : time;
        this._updateFps(this.deltaTime);
        this.gameTime = time / GAMETIME_SCALE;

        this._lastTime = time;
    }

    public start() {
        super.start();

        this.isTimeChange = true;
        this.elapsed = 0;
    }

    public resume() {
        super.resume();

        this.isTimeChange = true;
    }

    protected getNow() {
        return root.performance.now();
    }

    private _updateFps(deltaTime: number) {
        if (this._lastTime === null) {
            this.fps = STARTING_FPS;
        }
        else {
            this.fps = 1000 / deltaTime;
        }
    }
}