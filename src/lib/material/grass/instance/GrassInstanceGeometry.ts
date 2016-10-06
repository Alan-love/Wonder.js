module wd{
    export class GrassInstanceGeometry extends InstanceGeometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        get bladeVerts(){
            return this.bladeDivs * 2;
        }

        get bladeDivs(){
            return this.bladeSegments + 1;
        }

        @cloneAttributeAsBasicType()
        public bladeCount:number = 10;
        @cloneAttributeAsBasicType()
        public bladeSegments = 4;
        @cloneAttributeAsBasicType()
        public bladeWidth = 0.15;
        @cloneAttributeAsBasicType()
        public bladeMinHeight = 2;
        @cloneAttributeAsBasicType()
        public bladeMaxHeight = 4;
        @cloneAttributeAsBasicType()
        public rangeWidth:number = 5;
        @cloneAttributeAsBasicType()
        public rangeHeight:number = 5;

        public vertexIndexBuffer:ArrayBuffer = null;

        /*!
         can't compute vertices,colors,texCoords and add them as instance attribute data!
         because it will exceed 256 max size limit.
         */
        public computeData(){
            for (let i = 0; i < this.bladeCount; i++) {
                this.addInstanceAttributes([
                    {attributeName: "a_shape", data: this._generateShapes(), meshPerAttribute: 1},
                    {attributeName: "a_offset", data: this._generateOffsets(), meshPerAttribute: 1}
                ]);
            }

            this.vertexIndexBuffer = BufferUtils.convertArrayToArrayBuffer(EVariableType.FLOAT_1, this._generateVertexIndex());

            this.indices = this._generateIndices();

            this.vertices = this._generateVerticesForCollisionCheck();

            return super.computeData();
        }

        private _generateVertexIndex(){
            var vertices:Array<number> = [],
                vIndexLength = this.bladeVerts * 2 * 1;

            for(let i = 0; i < vIndexLength; i++){
                vertices[i] = i;
            }

            return vertices;
        }

        private _generateVerticesForCollisionCheck(){
            var halfWidth = this.rangeWidth / 2,
                height = this.bladeMaxHeight,
                halfDepth = this.rangeHeight / 2;

            return [
                -halfWidth, height, halfDepth,
                halfWidth, height, halfDepth,
                halfWidth, 0, halfDepth,
                -halfWidth, 0, halfDepth,

                -halfWidth, height, -halfDepth,
                halfWidth, height, -halfDepth,
                halfWidth, 0, -halfDepth,
                -halfWidth, 0, -halfDepth
            ];
        }

        private _generateShapes(){
            var shape:Array<number> = [],
                width = this.bladeWidth + Math.random() * this.bladeWidth * 0.5,
                height = this.bladeMinHeight + Math.pow(Math.random(), 4.0) * (this.bladeMaxHeight - this.bladeMinHeight),
                lean = 0.0 + Math.random() * 0.2,
                curve = 0.2 + Math.random() * 0.2;

            shape[0] = width;
            shape[1] = height;
            shape[2] = lean;
            shape[3] = curve;

            return shape;
        }

        private _generateOffsets(){
            var offset:Array<number> = [],
                x = MathUtils.generateMinToMax(-1, 1) * this.rangeWidth,
                y = 0.0,
                z = MathUtils.generateMinToMax(-1, 1) * this.rangeHeight,
                rot = Math.PI * 2.0 * Math.random();

            offset[0] = x;
            offset[1] = y;
            offset[2] = z;
            offset[3] = rot;

            return offset;
        }

        private _generateIndices(){
            var seg:number = null,
                i:number = 0,
                vc1 = 0,
                vc2 = this.bladeVerts,
                indices:Array<number> = [];

            // blade front side
            for (seg = 0; seg < this.bladeSegments; seg++) {
                // tri 1
                indices[i++] = vc1 + 0;
                indices[i++] = vc1 + 1;
                indices[i++] = vc1 + 2;
                // tri 2
                indices[i++] = vc1 + 2;
                indices[i++] = vc1 + 1;
                indices[i++] = vc1 + 3;

                vc1 += 2;
            }

            // blade back side
            for (seg = 0; seg < this.bladeSegments; seg++) {
                // tri 1
                indices[i++] = vc2 + 2;
                indices[i++] = vc2 + 1;
                indices[i++] = vc2 + 0;
                // tri 2
                indices[i++] = vc2 + 3;
                indices[i++] = vc2 + 1;
                indices[i++] = vc2 + 2;

                vc2 += 2;
            }

            return indices;
        }
    }
}

