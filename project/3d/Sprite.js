/// <reference path="Program.ts"/>
/// <reference path="Matrix.ts"/>
/// <reference path="Buffer.ts"/>
/// <reference path="Rotate.ts"/>
/// <reference path="Translate.ts"/>
/// <reference path="FrameBuffer.ts"/>
//todo type/mode直接改为gl.xxx
//todo 重构texture和textureArr属性
var Engine3D;
(function (Engine3D) {
    var Sprite = (function () {
        function Sprite(drawMode) {
            this._drawMode = null;
            //private _vertices = null;
            //private _normals = null;
            //private _texCoords = null;
            //private _indices = null;
            this._drawFunc = null;
            //private _action:{} = null;
            this._actionContainer = null;
            this._enableCULLFACE = null;
            this._face = null;
            this._matrix = null;
            this._program = null;
            this._buffers = null;
            this._textureArr = null;
            this._drawMode = drawMode;
            //this._action = {};
            this._actionContainer = [];
            this._matrix = Math3D.Matrix.create();
        }
        Object.defineProperty(Sprite.prototype, "matrix", {
            get: function () {
                return this._matrix;
            },
            set: function (matrix) {
                this._matrix = matrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "program", {
            get: function () {
                return this._program;
            },
            set: function (program) {
                this._program = program;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "buffers", {
            get: function () {
                return this._buffers;
            },
            set: function (buffers) {
                this._buffers = buffers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "textureArr", {
            get: function () {
                return this._textureArr;
            },
            set: function (textureArr) {
                if (textureArr.length > 8) {
                    //todo query the supported max num
                    console.log("纹理数超过了8个");
                }
                this._textureArr = textureArr;
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.draw = function (program) {
            var self = this;
            //fbo.bind();
            //
            //gl.clearColor(0.2, 0.2, 0.4, 1.0); // Set clear color (the color is slightly changed)
            //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO
            //
            //drawTexCube(cube, viewProjMatrixFBO);   // Draw the cube
            //
            //fbo.unBind();
            //
            //gl.clearColor(0.0, 0.0, 0.0, 1.0);
            //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer
            if (this._enableCULLFACE) {
                gl.enable(gl.CULL_FACE);
                gl.frontFace(this._face);
            }
            if (this._textureArr) {
                this._textureArr.forEach(function (data, index) {
                    //self._program.setUniformData(uniformDataForTextureArr.name, uniformDataForTextureArr.type,index);
                    data.material.texture.bindToUnit(index);
                    if (data.uniformData) {
                        ////todo optimize data structure
                        var i = null;
                        var val = null;
                        for (i in data.uniformData) {
                            if (data.uniformData.hasOwnProperty(i)) {
                                val = data.uniformData[i];
                                program.setUniformData(i, Engine3D.DataType[val[0]], data.material[val[1]]);
                            }
                        }
                    }
                    var totalComponents = data.indexCount || self._buffers.indexBuffer.num;
                    var startOffset = data.indexOffset || 0;
                    self._drawFunc(totalComponents, startOffset);
                });
            }
            else {
                var totalComponents = this._buffers.indexBuffer.num;
                var startOffset = 0;
                this._drawFunc(totalComponents, startOffset);
            }
            //todo 单个纹理，material如何处理
            if (this._enableCULLFACE) {
                gl.disable(gl.CULL_FACE);
                gl.frontFace(gl.CCW);
            }
        };
        Sprite.prototype.setCULLFACE = function (face) {
            this._enableCULLFACE = true;
            this._face = face || gl.CCW;
        };
        Sprite.prototype.init = function () {
            var self = this;
            if (this._buffers.indexBuffer) {
                //this.baseBuffer = this.buffers.indices;
                this._drawFunc = function (totalComponents, startOffset) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, self._buffers.vertexBuffer.buffer);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self._buffers.indexBuffer.buffer);
                    gl.drawElements(gl[self._drawMode], totalComponents, self._buffers.indexBuffer.type, self.buffers.indexBuffer.typeSize * startOffset);
                };
            }
            else {
                //for (var key in this.buffers) {
                //    this.baseBuffer = this.buffers[key];
                //    break;
                //}
                //todo 待验证
                this._drawFunc = function (totalComponents, startOffset) {
                    gl.drawArrays(gl[self._drawMode], startOffset, totalComponents);
                };
            }
            //o.actionData = {
            //    "rotate": {
            //        action: "rotate",
            //        axis: [0, 1, 0],
            //        speed:10
            //    }
            //};
            //this._initAction();
            this.initData();
        };
        //
        //addActions(actionData){
        //    this._action = actionData;
        //}
        //private _initAction(){
        //    if(!this._actionData){
        //        return;
        //    }
        //
        //    var i = null;
        //
        //    for(i in this._actionData){
        //        if(this._actionData.hasOwnProperty(i)){
        //            this._action[i] =
        //        }
        //    }
        //    this._angle = 0;
        //    //switch (this._actionData.action){
        //    //    case "rotate":
        //    //        this._matrix.rotate(this.
        //    //}
        //}
        Sprite.prototype.runAction = function (action) {
            //todo 判断是否已有重复的
            this._actionContainer.push(action);
        };
        Sprite.prototype.runOnlyOneAction = function (action) {
            this._actionContainer = [action];
        };
        Sprite.prototype.update = function () {
            //todo only update action
            this._actionContainer.forEach(function (x) { return x.update(); });
            this._actionContainer.forEach(function (x) { return x.run(); });
        };
        Sprite.prototype.getRotateAction = function () {
            return Engine3D.Action.Rotate.create(this._matrix, { axis: [0, 1, 0], speed: 1 });
        };
        Sprite.prototype.getTranslateAction = function () {
            //todo refactor to be common
            return Engine3D.Action.Translate.create(this._matrix, { rangeZ: [0.08, -0.08], speed: 0.002 });
        };
        Sprite.prototype.initWhenCreate = function () {
            this._enableCULLFACE = false;
        };
        Sprite.create = function (drawMode) {
            var obj = new this(drawMode);
            obj.initWhenCreate();
            return obj;
        };
        Sprite.prototype.onStartLoop = function () {
            this._matrix.push();
        };
        Sprite.prototype.onEndLoop = function () {
            this._matrix.pop();
        };
        //*钩子
        Sprite.prototype.initData = function () {
        };
        return Sprite;
    })();
    Engine3D.Sprite = Sprite;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Sprite.js.map