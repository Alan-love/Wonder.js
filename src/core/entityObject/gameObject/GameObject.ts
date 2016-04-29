module wd {
    export class GameObject extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:ThreeDTransform;
        public parent:GameObject;

        public name:string = `gameObject${String(this.uid)}`;

        protected children:wdCb.Collection<GameObject>;

        public getSpacePartition(){
            return this.getComponent<SpacePartition>(SpacePartition);
        }

        public update(elapsedTime:number):void {
            var lod = this.getComponent<LOD>(LOD),
                octree = this.getComponent<Octree>(Octree);

            if(lod){
                lod.update(elapsedTime);
            }

            if(octree){
                octree.update(elapsedTime);
            }

            super.update(elapsedTime);
        }

        protected getGeometry():Geometry{
            var lod:LOD = this.getComponent<LOD>(LOD);

            if(lod && lod.activeGeometry) {
                return <any>lod.activeGeometry;
            }

            return super.getGeometry();
        }

        protected createTransform(){
            return ThreeDTransform.create();
        }

        protected getRenderList(){
            if(this.hasComponent(Octree)){
                return this.getSpacePartition().getRenderList();
            }

            return RenderUtils.getGameObjectRenderList(this.getChildren());
        }

        protected afterInitChildren(){
            if(this.hasComponent(Octree)){
                return this.getSpacePartition().build();
            }
        }
    }
}

