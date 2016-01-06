module wd {
    export class SphereShape extends Shape {
        public static create() {
            var obj = new this();

            return obj;
        }

        public radius:number = 1;

        public setFromShapeParam(center:Vector3, radius:number){
            this.center = center;
            this.radius = radius;
        }

        public setFromPoints(points:Array<number>) {
            var aabb = AABBShape.create();

            this.center = aabb.setFromPoints(points).center;
            this.radius = this._findMaxDistanceOfPointsToCenter(points);
        }

        public setFromTranslationAndScale(sphere:SphereShape, matrix:Matrix4){
            var translation = matrix.getTranslation(),
                scale = matrix.getScale();

            this.center = sphere.center.copy().add(translation);
            this.radius = sphere.radius * Math.max(scale.x, scale.y, scale.z);
        }

        public isIntersectWithSphere(shape:SphereShape) {
            var radiusSum = this.radius + shape.radius;

            return shape.center.distanceToSquared(this.center) <= ( radiusSum**2);
        }

        public isIntersectWithBox(shape:AABBShape) {
            return this.isBoxAndSphereIntersected(shape, this);
        }

        public isIntersectWithRay(rayOrigin:Vector3, rayDir:Vector3) {
            var diff = Vector3.create(),
                a = 0,
                b = 0,
                c = 0,
                discr = 0;

            diff.sub2(rayOrigin, this.center);
            if (diff.dot(diff) < this.radius * this.radius ) {
                // starts inside this
                return true;
            }

            a = rayDir.dot(rayDir);
            b = 2 * rayDir.dot(diff);
            c = this.center.dot(this.center);
            c += rayOrigin.dot(rayOrigin);
            c -= 2 * this.center.dot(rayOrigin);
            c -= this.radius * this.radius;

            discr = (b * b) - (4 * a * c);
            if (discr < 0) {
                return false;
            }

            return true;
        }

        public containPoint(point:Vector3) {
            return point.distanceToSquared(this.center) <= (this.radius**2);
        }

        public copy() {
            var shape = SphereShape.create();

            shape.center = this.center.copy();
            shape.radius = this.radius;

            return shape;
        }

        private _findMaxDistanceOfPointsToCenter(points:Array<number>){
            var maxRadiusSq = 0,
                center = this.center;


            GeometryUtils.iterateThreeComponent(points, (point:Vector3) => {
                maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared(point) );
            });

            return Math.sqrt(maxRadiusSq);
        }
    }
}

