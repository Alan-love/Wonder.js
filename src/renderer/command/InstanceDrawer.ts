module wd {
    export abstract class InstanceDrawer{
        public abstract draw(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void;
    }
}

