module wd{
    export class BufferTable{
        public static lastBindedArrayBuffer:ArrayBuffer = null;
        public static lastBindedElementBuffer:ElementBuffer = null;

        private static _table:wdCb.Hash<Buffer> = wdCb.Hash.create<Buffer>();

        public static bindIndexBuffer(indexBuffer:ElementBuffer){
            var gl:any = null;

            if(this.lastBindedElementBuffer === indexBuffer){
                return;
            }

            this.lastBindedElementBuffer = indexBuffer;

            gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
        }

        public static hasBuffer(key:string){
            return this._table.hasChild(key);
        }

        public static addBuffer(key:string, buffer:Buffer){
            this._table.addChild(key, buffer);
        }

        public static getBuffer<T>(key:string):T{
            return <any>this._table.getChild(key);
        }

        //todo test
        public static dispose(){
            this._table.forEach((buffer:Buffer) => {
                buffer.dispose();
            });

            this.lastBindedArrayBuffer = null;
            this.lastBindedElementBuffer = null;
        }

        public static clearAll(){
            this._table.removeAllChildren();

            this.lastBindedArrayBuffer = null;
            this.lastBindedElementBuffer = null;
        }
    }

    export enum BufferTableKey{
        PROCEDURAL_VERTEX = <any>"PROCEDURAL_VERTEX",
        PROCEDURAL_INDEX = <any>"PROCEDURAL_INDEX"
    }
}

