module wd{
    export class TriangleGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        @cloneAttributeAsBasicType()
        public width:number = null;
        @cloneAttributeAsBasicType()
        public height:number = null;

        public computeData(){
            var width = this.width,
                height = this.height,
                left = -width / 2,
                right = width / 2,
                up = height / 2,
                down = -height / 2,
                vertices = null,
                texCoords = null,
                indices = null,
                normals = null;

            vertices = [
                0.0, up, 0,
                left, down, 0,
                right, down, 0
            ];

            indices = [
                0, 1, 2
            ];

            texCoords = [
                0.5, 1.0,
                0.0, 0.0,
                1.0, 0.0
            ];

            normals = [
                0, 0, 1,
                0, 0, 1,
                0, 0, 1
            ];

            return {
                vertices: vertices,
                faces: GeometryUtils.convertToFaces(indices, normals),
                texCoords: texCoords
            };
        }
    }
}

