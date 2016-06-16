module wd{
    @singleton()
    export class SpacePartitionEngine extends ComponentContainer{
        public static getInstance():any {}

        protected list:wdCb.Collection<SpacePartition>;

        public update(elapsed:number){
            this.list.forEach(function(child:SpacePartition){
                child.update(elapsed);
            });
        }
    }
}

