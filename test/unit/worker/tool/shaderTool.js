var shaderTool = (function () {
    return {
        disableVertexAttribArray: function (gl) {
          wd.disableVertexAttribArray(gl, wd.GLSLSenderData);
        },
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramWorkerData(wdrd.ProgramWorkerData);
            wd.initLocationWorkerData(wdrd.LocationWorkerData);
            wd.initGLSLSenderWorkerData(wdrd.GLSLSenderWorkerData);
        },
        clearShader: function () {
            wd.ProgramData.programMap = {};
            wd.LocationData.attributeLocationMap = {};
            wd.LocationData.uniformLocationMap = {};

            wd.GLSLSenderData.sendAttributeConfigMap = {};
            wd.GLSLSenderData.sendUniformConfigMap = {};
        },
        getDirectionLightPositionForSend: function(index){
            return wd.getPositionInShaderWorker(index, {
                DirectionLightDataFromSystem:wdrd.DirectionLightWorkerData
            });
        }
    }
})();

