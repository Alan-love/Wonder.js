/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Collider extends Component {
        public collideXY(localX:number, localY:number):boolean {
            return false;
        }

        public collide(collider:Collider):boolean {
            return false;
        }
    }
}

