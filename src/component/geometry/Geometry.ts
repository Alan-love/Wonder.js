module wd{
    export abstract class Geometry extends Component{
        private _material:Material = null;
        @cloneAttributeAsCloneable()
        get material(){
            return this._material;
        }
        set material(material:Material){
            if(!JudgeUtils.isEqual(material, this._material)){
                this._material = material;
                this._material.geometry = this;

                if(this.entityObject){
                    EventManager.trigger(this.entityObject, CustomEvent.create(<any>EEngineEvent.MATERIAL_CHANGE));
                }
            }
        }

        get geometryData(){
            if(this.buffers === null){
                return null;
            }

            return this.buffers.geometryData;
        }

        public entityObject:GameObject;
        public buffers:BufferContainer = null;
        public vaoManager:VAOManager = !!GPUDetector.getInstance().extensionVAO ? VAOManager.create() : null;
        @cloneAttributeAsBasicType()
        public drawMode:EDrawMode = EDrawMode.TRIANGLES;

        public abstract computeData(): GeometryDataType;

        @ensure(function(){
            var geometryData = this.buffers.geometryData;

            assert(geometryData.vertices.length > 0, Log.info.FUNC_MUST("vertices.count", "> 0"));
            assert(geometryData.faces.length * 3 === geometryData.indices.length, Log.info.FUNC_SHOULD("faces.count", `be ${geometryData.indices.length / 3}, but actual is ${geometryData.faces.length}`));
        })
        @execOnlyOnce("_isInit")
        public init(){
            var geometryData = null,
                {
                    vertices,
                    faces = [],
                    texCoords,
                    colors,
                    morphTargets
                    } = this.computeData();

            this.buffers = this.createBufferContainer();

            geometryData = this.createGeometryData(vertices, faces, texCoords, colors, morphTargets);

            this.buffers.geometryData = geometryData;

            this.buffers.init();

            this._material.init();

            this.computeNormals();

            this.vaoManager && this.vaoManager.init();
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasFaceNormals(){
            return this.buffers.geometryData.hasFaceNormals();
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasVertexNormals(){
            return this.buffers.geometryData.hasVertexNormals();
        }

        public isSmoothShading(){
            return this._material.shading === EShading.SMOOTH;
        }

        public dispose(){
            this.buffers.dispose();

            this._material.dispose();

            this.vaoManager && this.vaoManager.dispose();
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public computeFaceNormals() {
            this.buffers.geometryData.computeFaceNormals();
        }

        public computeVertexNormals(){
            this.buffers.geometryData.computeVertexNormals();
        }

        @require(function(){
            assert(!!this.buffers, Log.info.FUNC_NOT_EXIST("buffers"));
        })
        public createBuffersFromGeometryData(){
            this.buffers.createBuffersFromGeometryData();
        }

        @virtual
        protected computeNormals(){
            if(this.isSmoothShading()){
                if(!this.hasVertexNormals()){
                    this.computeVertexNormals();
                }
            }
            else{
                if(!this.hasFaceNormals()){
                    this.computeFaceNormals();
                }
            }
        }

        @virtual
        protected createBufferContainer():BufferContainer{
            return BasicBufferContainer.create(this.entityObject);
        }

        @virtual
        protected createGeometryData(vertices:Array<number>, faces:Array<Face3>, texCoords:Array<number>, colors:Array<number>, morphTargets:wdCb.Hash<MorphTargetsData>):GeometryData{
            return this.createBasicGeometryData(vertices, faces, texCoords, colors);
        }

        protected createBasicGeometryData(vertices:Array<number>, faces:Array<Face3>, texCoords:Array<number>, colors:Array<number>){
            var geometryData = BasicGeometryData.create(this);

            geometryData.vertices = vertices;
            geometryData.faces = faces;
            geometryData.texCoords = texCoords;
            geometryData.colors = colors;

            return geometryData;
        }
    }

    export type GeometryDataType = {
        vertices:Array<number>;
        faces?:Array<Face3>;
        texCoords?:Array<number>;
        colors?:Array<number>;
        morphTargets?:wdCb.Hash<MorphTargetsData>;
    };
}

