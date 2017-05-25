var cameraControllerTool = (function () {
    return {
        create: wd.createCameraController,
        getCameraNear: wd.getCameraNear,
        setCameraNear: wd.setCameraNear,
        getCameraFar: wd.getCameraFar,
        setCameraFar: wd.setCameraFar,
        getPerspectiveCameraFovy: wd.getPerspectiveCameraFovy,
        setPerspectiveCameraFovy: wd.setPerspectiveCameraFovy,
        getPerspectiveCameraAspect: wd.getPerspectiveCameraAspect,
        setPerspectiveCameraAspect: wd.setPerspectiveCameraAspect,
        getCameraPMatrix: wd.getCameraPMatrix,

        resetData: function(){
            wd.initCameraControllerData(wd.CameraControllerData, wd.PerspectiveCameraData, wd.CameraData);
        }
    }
})()

