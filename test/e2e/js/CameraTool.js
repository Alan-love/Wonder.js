var CameraTool = (function () {
    return {
        createCamera: function (state) {
            var record = wd.createBasicCameraView(state);
            var state = record[0];
            var basicCameraView = record[1];


            var record = wd.createPerspectiveCameraProjection(state);
            var state = record[0];
            var perspectiveCameraProjection = record[1];


            state = wd.setPerspectiveCameraNear(perspectiveCameraProjection, 0.1, state);
            state = wd.setPerspectiveCameraFar(perspectiveCameraProjection, 2000, state);
            state = wd.setPerspectiveCameraFovy(perspectiveCameraProjection, 60, state);
            state = wd.setPerspectiveCameraAspect(perspectiveCameraProjection, 1.0, state);




            var record = wd.createGameObject(state);
            var state = record[0];
            var obj = record[1];

            state = wd.addGameObjectBasicCameraViewComponent(obj, basicCameraView, state);

            state = wd.addGameObjectPerspectiveCameraProjectionComponent(obj, perspectiveCameraProjection, state);

            var transform = wd.unsafeGetGameObjectTransformComponent(obj, state);

            // TODO fix
            state = wd.setTransformLocalPosition(transform, [0, 0, 150], state);

            return [state, obj];
        }
    }
})();