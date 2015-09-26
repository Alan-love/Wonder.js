/// <reference path="../definitions.d.ts"/>
module dy {
    //todo remove
    declare var window:any,
        Math:any;

    //todo default render direction is up?
    export class RenderTargetRenderer{
        //todo change element to be RenderTargetTexture
        public static create(mirrorTexture:MirrorTexture) {
            var obj = new this(mirrorTexture);

            return obj;
        }

        constructor(mirrorTexture:MirrorTexture){
            this._texture = mirrorTexture;
        }

        private _texture:MirrorTexture = null;
        private _frameBufferManager:FrameBufferManager = null;

        public init(){
            if(this._isTextureSizeExceedCanvasSize()){
                dyCb.Log.warn("frameBuffer->viewport's size shouldn't exceed canvas's size");
            }

            this._frameBufferManager = FrameBufferManager.create(this._texture.width, this._texture.height);
            this._frameBufferManager.init(this._texture.createEmptyTexture());

            return this;
        }

        //todo extract RenderTargetTexture
        public render(renderer:Renderer, camera:GameObject){
            var plane = null,
                cameraComponent = null,
                mirrorCameraViewMatrix = null,
                projectionMatrix = null,
                mirrorCameraComponent = null;

            this._texture.setTexture(this._frameBufferManager.texture);

            cameraComponent = camera.getComponent<Camera>(Camera);

            plane =this._texture.getPlane();

            mirrorCameraViewMatrix =
                plane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix);

            //todo optimize(dirty)
            projectionMatrix = this._setClipPlane(mirrorCameraViewMatrix, cameraComponent.pMatrix, plane);

            this._frameBufferManager.bind();

            mirrorCameraComponent = Camera.create();

            mirrorCameraComponent.worldToCameraMatrix = mirrorCameraViewMatrix.copy();
            mirrorCameraComponent.pMatrix = projectionMatrix.copy();




            //todo not render reflector!
            //todo if null, draw all


            //todo optimize:if renderObject is behind plane, not render it!
            //todo refactor
            window.isRenderTarget = true;
            this._texture.renderList.forEach((child:GameObject) => {
                child.render(renderer, GameObject.create().addComponent(mirrorCameraComponent));
            });


            renderer.render();


            this._frameBufferManager.unBind();
        }

        private _getClipPlaneInCameraSpace(vMatrix:Matrix, plane:Plane){
            var clipPlane = Vector4.create(),
                p = vMatrix.multiplyVector3(this._texture.getPosition()),
                n = vMatrix.copy().invert().transpose().multiplyVector3(plane.normal).normalize();

            clipPlane.set(n.x, n.y, n.z, -p.dot(n));

            return clipPlane;
        }

        private _setClipPlane(vMatrix:Matrix, pMatrix:Matrix, plane:Plane):Matrix{
            var projectionMatrix = pMatrix.copy(),
                q = Vector4.create(),
                clipPlane = this._getClipPlaneInCameraSpace(vMatrix, plane),
                c = Vector4.create();

            q.x = ( Math.sign( clipPlane.x ) + projectionMatrix.values[ 8 ] ) / projectionMatrix.values[ 0 ];
            q.y = ( Math.sign( clipPlane.y ) + projectionMatrix.values[ 9 ] ) / projectionMatrix.values[ 5 ];
            q.z = - 1.0;
            q.w = ( 1.0 + projectionMatrix.values[ 10 ] ) / projectionMatrix.values[ 14 ];

            // Calculate the scaled plane vector
            c = clipPlane.multiplyScalar( 2.0 / clipPlane.dot( q ) );

            // Replacing the third row of the projection matrix
            projectionMatrix.values[ 2 ] = c.x;
            projectionMatrix.values[ 6 ] = c.y;
            //projectionMatrix.values[ 10 ] = c.z + 1.0 - clipBias;
            projectionMatrix.values[ 10 ] = c.z + 1.0;
            //projectionMatrix.values[ 10 ] = c.z + 1.0 - 0.3;
            projectionMatrix.values[ 14 ] = c.w;

            return projectionMatrix;
        }

        private _isTextureSizeExceedCanvasSize(){
            var view = Director.getInstance().getView();

            return this._texture.width > view.width || this._texture.height > view.height;
        }
    }
}

