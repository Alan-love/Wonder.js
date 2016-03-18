module wd {
    export class MeshRenderer extends RendererComponent {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public entityObject:GameObject;

        public render(renderer:Renderer, geometry:Geometry, camera:GameObject){
            renderer.addCommand(this.createDrawCommand(geometry, camera));
        }

        public clone(){
            return MeshRenderer.create();
        }

        @require(function(geometry:Geometry, camera:GameObject){
            var controller = camera.getComponent<CameraController>(CameraController);

            assert(!!controller && !!controller.camera, Log.info.FUNC_MUST("camera" , "add Camera Component"));
            assert(!!geometry, Log.info.FUNC_MUST("Mesh", "add geometry component"));
        })
        protected createDrawCommand(geometry:Geometry, camera:GameObject){
             var quadCmd:QuadCommand = QuadCommand.create(),
                cameraComponent = camera.getComponent<CameraController>(CameraController),
                material:Material = geometry.material,
                 position:Vector3 = this.entityObject.transform.position,
                 target:GameObject = geometry.entityObject;

            quadCmd.buffers = geometry.buffers;

            //todo remove shader lib data(animation, vMatrix,pMatrix,z)(only remain render data), get it from this.entityObject(QuadCommand add entityObject getter)




            quadCmd.animation = target.getComponent<Animation>(Animation);

            quadCmd.drawMode = geometry.drawMode;

            quadCmd.vMatrix = cameraComponent.worldToCameraMatrix;
            quadCmd.pMatrix = cameraComponent.pMatrix;

            quadCmd.material = material;

            quadCmd.z = position.z;

            quadCmd.blend = material.blend;

            this._setInstance(quadCmd, target);

            return quadCmd;
        }

        @ensure(function(returnVal, quadCmd:QuadCommand, target:GameObject){
            if(quadCmd.hasInstance()){
                assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));
            }
        })
        private _setInstance(quadCmd:QuadCommand, target:GameObject){
            if(target.hasComponent(Instance) && GPUDetector.getInstance().extensionInstancedArrays !== null){
                let instanceComponent:Instance = target.getComponent<Instance>(Instance);
                quadCmd.instanceList = instanceComponent.toRenderInstanceListForDraw;
                quadCmd.instanceBuffer = instanceComponent.instanceBuffer;
            }
            //if(target.hasToRenderInstance()){
            //    quadCmd.instanceList = target.toRenderInstanceList;
            //
            //    //todo refactor
            //    if(!target.instanceBuffer){
            //        target.instanceBuffer = InstanceBuffer.create();
            //    }
            //
            //    quadCmd.instanceBuffer = target.instanceBuffer;
            //}
            else{
                quadCmd.mMatrix = this.entityObject.transform.localToWorldMatrix;
            }
        }
    }
}
