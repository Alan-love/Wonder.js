/// <reference path="../../../dist/wd.d.ts"/>
module sample{
    @wd.script("camera")
    export class Camera implements wd.IScriptBehavior{
        constructor(gameObject:wd.GameObject){
            this._gameObject = gameObject;
        }

        private _gameObject:wd.GameObject = null;

        public init() {
            //var scene = wd.Director.getInstance().scene.scriptList.getChild("scene"),
                var scene = wd.ScriptComponentContainer.getInstance().findScript(wd.Director.getInstance().scene, "scene"),
                cameraComponent = <wd.PerspectiveCamera>this._gameObject.getComponent<wd.CameraController>(wd.CameraController).camera;

            alert(`sceneScript.state is ${scene.state}`);
            alert(`camera->fovy is ${cameraComponent.fovy}`);
        }
    }
}
