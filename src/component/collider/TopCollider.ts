/// <reference path="../../filePath.d.ts"/>
module wd {
    export class TopCollider extends Collider {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        collideXY(localX:number, localY:number):boolean {
            return true;
        }

        collide(collider:Collider):boolean {
            return true;
        }
    }
}

