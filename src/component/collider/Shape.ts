module wd {
    export abstract class Shape{
        @cloneAttributeAsCloneable()
        public center:Vector3 = Vector3.create(0, 0, 0);

        public abstract setFromShapeParam(...args);
        public abstract setFromPoints(points:Array<number>);

        public abstract isIntersectWithBox(shape:AABBShape);
        public abstract isIntersectWithBox(min:Vector3, max:Vector3);

        public abstract isIntersectWithSphere(shape:SphereShape);
        public abstract isIntersectWithRay(ray:Ray);

        public clone() {
            return CloneHelper.clone(this);
        }

        protected isBoxAndSphereIntersected(box:AABBShape, sphere:SphereShape) {
            var sphereCenter = sphere.center,
                sphereRadius = sphere.radius;

            return sphereCenter.distanceToSquared(box.closestPointTo(sphereCenter)) < sphereRadius**2;
        }
    }
}

