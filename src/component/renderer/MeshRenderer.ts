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

        @require(function(geometry:Geometry, camera:GameObject){
            var controller = camera.getComponent<CameraController>(CameraController);

            assert(!!controller && !!controller.camera, Log.info.FUNC_MUST("camera" , "add Camera Component"));
            assert(!!geometry, Log.info.FUNC_MUST("Mesh", "add geometry component"));
        })
        protected createDrawCommand(geometry:Geometry, camera:GameObject){
             var cmd:QuadCommand = null,
                cameraComponent = camera.getComponent<CameraController>(CameraController),
                material:Material = geometry.material,
                 position:Vector3 = this.entityObject.transform.position,
                 target:GameObject = geometry.entityObject;

            cmd = this._createCommand(target, material);

            cmd.target = target;

            cmd.buffers = geometry.buffers;

            cmd.drawMode = geometry.drawMode;

            cmd.vMatrix = cameraComponent.worldToCameraMatrix;
            cmd.pMatrix = cameraComponent.pMatrix;

            cmd.material = material;

            cmd.z = position.z;

            cmd.blend = material.blend;

            return cmd;
        }

        @require(function(target:GameObject){
            //if(InstanceUtils.isInstance(target) && InstanceUtils.isHardwareSupport()){
                if(InstanceUtils.isInstance(target)){
                assert(InstanceUtils.isSourceInstance(target), Log.info.FUNC_SHOULD("if use instance to batch draw, target", "be SourceInstance"));
            }
        })
        @ensure(function(cmd:RenderCommand, target:GameObject){
            if(cmd instanceof HardwareInstanceCommand){
                assert(InstanceUtils.isHardwareSupport(), Log.info.FUNC_SHOULD("hardware", "support instance"));
            }
            else if(cmd instanceof BatchInstanceCommand){
                assert(!InstanceUtils.isHardwareSupport(), Log.info.FUNC_SHOULD_NOT("hardware", "support instance"));
            }
        })
        private _createCommand(target:GameObject, material:Material){
            var cmd:any = null;

            material.shader.getLibs().forEach((lib:ShaderLib) => {
                if(!(lib instanceof InstanceShaderLib)){
                    return;
                }

                if(lib instanceof NormalMatrixModelMatrixHardwareInstanceShaderLib){
                    cmd = this._createHardwareInstanceCommand(target, material, EInstanceGLSLData.NORMALMATRIX_MODELMATRIX);

                    return wdCb.$BREAK;
                }

                if(lib instanceof NormalMatrixModelMatrixBatchInstanceShaderLib){
                    cmd = this._createBatchInstanceCommand(target, material, EInstanceGLSLData.NORMALMATRIX_MODELMATRIX);

                    return wdCb.$BREAK;
                }


                if(lib instanceof ModelMatrixHardwareInstanceShaderLib){
                    cmd = this._createHardwareInstanceCommand(target, material, EInstanceGLSLData.MODELMATRIX);

                    return wdCb.$BREAK;
                }

                if(lib instanceof ModelMatrixBatchInstanceShaderLib){
                    cmd = this._createBatchInstanceCommand(target, material, EInstanceGLSLData.MODELMATRIX);

                    return wdCb.$BREAK;
                }
            });

            //if(InstanceUtils.isInstance(target)){
            //    if(InstanceUtils.isHardwareSupport()){
            //        cmd = this._createHardwareInstanceCommand(target, material);
            //    }
            //    else{
            //        cmd = this._createBatchInstanceCommand(target, material);
            //    }
            //}
            //else{
            if(cmd === null){
                cmd = SingleDrawCommand.create();

                cmd.mMatrix = this.entityObject.transform.localToWorldMatrix;
            }
            //}

            return cmd;
        }

        private _createHardwareInstanceCommand(target:GameObject, material:Material, glslData:EInstanceGLSLData){
            var instanceComponent:SourceInstance = target.getComponent<SourceInstance>(SourceInstance),
                cmd = HardwareInstanceCommand.create();

            cmd.instanceList = instanceComponent.toRenderInstanceListForDraw;
            cmd.instanceBuffer = instanceComponent.instanceBuffer;

            cmd.glslData = glslData;

            return cmd;
        }

        private _createBatchInstanceCommand(target:GameObject, material:Material, glslData:EInstanceGLSLData){
            var instanceComponent:SourceInstance = target.getComponent<SourceInstance>(SourceInstance),
                cmd = BatchInstanceCommand.create();

            cmd.instanceList = instanceComponent.toRenderInstanceListForDraw;
            //cmd.instanceBuffer = instanceComponent.instanceBuffer;

            cmd.glslData = glslData;

            return cmd;
        }
    }
}
