var SceneTester = YYC.Class({
    Static:{
        create:function(){
            return new this();
        }
    },
    Public:{
        isDebug:true,

        init:function(){
            this._getDirector()._init();

            if(this.isDebug){
                this._debuger = SceneTestDebuger.create();

                this._debuger.init();
            }
        },
        /**
         * compare the snapshot image at the end of the frameIndex frame to the correct image
         * @param frameIndex
         * @param partialCorrectImagePath
         */
        compareAt:function(frameIndex, partialCorrectImagePath, done){
            var self = this;
            var director = this._getDirector();

            for(var i = 1; i <= frameIndex; i++){
                director._loopBody(i);
            }


            var data = this._readScenePixelArr();
            var pixelArr = data.data;



            var image = new Image();

            image.src = this._buildImagePath(partialCorrectImagePath);

            image.onload = function(){
                this.onload = null;

                var matcher = ImageMatcher.create(pixelArr);


                matcher.compareImage(this, pixelArr);

                if(self.isDebug){
                    self._debuger.insertTestResult(partialCorrectImagePath, this, data.canvas);
                }

                done();
            }

            image.onerror = function () {
                throw new Error("load image error");
            };
        },
        /**
         * generate image at the end of the frameIndex frame
         * @param frameIndex
         * @param imageName
         */
        generateAt:function(frameIndex, imageName){
            var director = this._getDirector();

            for(var i = 1; i <= frameIndex; i++){
                director._loopBody(i);
            }

            this._download(this._createImageDataURL(imageName), imageName);
        }
    },
    Private:{
        _debuger:null,
        _getDirector: function(){
            return wd.Director.getInstance();
        },
        _createImageDataURL: function(imageName){
            var canvas = wd.DeviceManager.getInstance().gl.canvas;

            var extname = wdCb.PathUtils.extname(imageName);

            return canvas.toDataURL("image/" + extname);
        },
        _download: function(imageDataURL, imageName){
            var blob = fileOperator.dataURLToBlob(imageDataURL);

            fileOperator.createFileAndDownload(blob, imageName);
        },
        _buildImagePath: function(partialImagePath){
         return pathTool.join(pathTool.getPathData().rootPath, pathTool.join("base/test/render/res/correct_image", partialImagePath));
        },
        _readScenePixelArr: function(){
            //var gl = wd.DeviceManager.getInstance().gl;
            //
            //var pixelArr = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
            //
            //gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixelArr);
            //
            //return pixelArr;

            var gl = wd.DeviceManager.getInstance().gl;
            var c = gl.canvas;

            //var canvas = document.createElement("canvas");
            //canvas.width = c.width;
            //canvas.height = c.height;
            //
            //var context = canvas.getContext("2d");
            //
            //context.drawImage(c, 0, 0);

            var data = fileTool.convertImageToCanvas(c);

            return {
                canvas:data.canvas,
                data:data.context.getImageData(0, 0, data.canvas.width, data.canvas.height).data
            }
        }
    }
});
