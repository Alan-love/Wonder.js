/// <reference path="../../definitions.d.ts"/>
module dy {
    export abstract class CubemapRenderTargetTexture extends RenderTargetTexture {
        public target:TextureTarget = TextureTarget.TEXTURE_CUBE_MAP;

        public createEmptyTexture() {
            var gl = DeviceManager.getInstance().gl,
                texture = gl.createTexture(),
                i = null;

            this.setEmptyTexture(texture);

            for (i = 0; i < 6; i++) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            }

            return texture;
        }
    }
}

