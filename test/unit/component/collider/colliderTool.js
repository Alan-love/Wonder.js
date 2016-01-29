var colliderTool = (function () {
    return {
        findDebugObject: function(gameObject){
            return wd.Director.getInstance().scene.findChildByName("debugBoundingRegion" + gameObject.uid);
        },
        findDebugObjects: function(gameObject){
            return wd.Director.getInstance().scene.findChildrenByName("debugBoundingRegion" + gameObject.uid);
        },

        getShape: function(gameObject){
            return gameObject.getComponent(wd.Collider).boundingRegion.shape;
        },




        createSphere: function (colliderClass) {
            var material = wd.BasicMaterial.create(),
                colliderClass = colliderClass || wd.SphereCollider;

            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 5;


            var collider = colliderClass.create();

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(collider);

            gameObject.addComponent(wd.MeshRenderer.create());

            return gameObject;
        },
        createBox: function (colliderClass, size) {
            var material = wd.BasicMaterial.create(),
                size = size || 5;

            colliderClass = colliderClass || wd.BoxCollider;

            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = size;
            geometry.height = size;
            geometry.depth = size;


            var collider = colliderClass.create();

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(collider);

            gameObject.addComponent(wd.MeshRenderer.create());

            return gameObject;
        }
    }
})();

