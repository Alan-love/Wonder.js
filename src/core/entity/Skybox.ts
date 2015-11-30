/// <reference path="../../filePath.d.ts"/>
module wd {
    /*!skybox: it's flipX when viewer is inside the skybox*/

    export class Skybox extends GameObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            this.addComponent(SkyboxRenderer.create());
        }
    }
}

