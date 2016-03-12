module wd {
    export abstract class TwoDRenderTargetRenderer extends RenderTargetRenderer{
        protected frameBuffer:WebGLFramebuffer = null;
        protected renderBuffer:WebGLRenderbuffer= null;

        private _lastCamera:GameObject = null;

        protected abstract beforeRenderFrameBufferTexture(renderCamera:GameObject);
        protected abstract getRenderList():wdCb.Collection<GameObject>;
        protected abstract renderRenderer(renderer:Renderer);

        @virtual
        protected isNeedCreateCamera(){
            return true;
        }

        @virtual
        protected createCamera(...args):GameObject{
            return null;
        }

        protected initFrameBuffer(){
            var frameBuffer = this.frameBufferOperator,
                gl = DeviceManager.getInstance().gl;

            this.frameBuffer = frameBuffer.createFrameBuffer();
            this.renderBuffer = frameBuffer.createRenderBuffer();

            frameBuffer.bindFrameBuffer(this.frameBuffer);
            frameBuffer.attachTexture(gl.TEXTURE_2D, this.texture.glTexture);
            frameBuffer.attachRenderBuffer("DEPTH_ATTACHMENT", this.renderBuffer);
            frameBuffer.check();
            frameBuffer.unBind();
        }

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            var isNeedCreateCamera:boolean = this.isNeedCreateCamera(),
                renderCamera:GameObject = null;

            if(isNeedCreateCamera){
                renderCamera = this.createCamera(camera);

                if(this._lastCamera){
                    this._lastCamera.dispose();
                }

                this._lastCamera = renderCamera;
            }
            else{
                renderCamera = camera;
            }

            this.beforeRenderFrameBufferTexture(renderCamera);

            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.texture.bindToUnit(0);
            this.frameBufferOperator.setViewport();


            //todo if renderList is null, draw all
            //todo optimize:if renderObject is behind plane, not render it!
            this.getRenderList().forEach((child:GameObject) => {
                child.render(renderer, renderCamera);
            });

            renderer.clear();
            this.renderRenderer(renderer);

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteFramebuffer(this.frameBuffer);
            gl.deleteRenderbuffer(this.renderBuffer);
        }
    }
}

