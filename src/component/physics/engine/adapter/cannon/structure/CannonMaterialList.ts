/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export class CannonMaterialList extends CannonDataList{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected dataList:wdCb.Collection<MaterialData>;

        public findByGameObject(obj:GameObject){
            return this.dataList.findOne(({gameObject, material}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });
        }

        public add(obj:GameObject, material:CANNON.Material){
            this.dataList.addChild({
                gameObject:obj,
                material:material
            });
        }

        public addContactMaterial(world:CANNON.World, currentMaterial:CANNON.Material, friction:number, restitution:number){
            this.dataList.forEach(({gameObject, material}) => {
                world.addContactMaterial(new CANNON.ContactMaterial(material, currentMaterial, {
                    friction: friction,
                    restitution: restitution
                }));
            });
        }

        public getContactMaterialData(world:CANNON.World, currentMaterial:CANNON.Material, dataName:string){
            var result = null;

            this.dataList.forEach(({gameObject, material}) => {
                let contactMaterial = world.getContactMaterial(material, currentMaterial);

                if(!contactMaterial){
                    return;
                }

                result = contactMaterial[dataName];

                return wdCb.$BREAK;
            });

            return result;
        }

        public getContactMaterials(world:CANNON.World, currentMaterial:CANNON.Material){
            var resultArr = [];

            this.dataList.forEach(({gameObject, material}) => {
                let contactMaterial = world.getContactMaterial(material, currentMaterial);

                if(!contactMaterial){
                    return;
                }

                resultArr.push(contactMaterial);
            });

            return resultArr;
        }

        public getMaterial(obj:GameObject){
            var result = this.findByGameObject(obj);

            return result === null ? null : result.material;
        }

        public setContactMaterialData(world:CANNON.World, currentMaterial:CANNON.Material, dataName:string, data:any){
            this.dataList.forEach(({gameObject, material}) => {
                let contactMaterial = world.getContactMaterial(material, currentMaterial);

                if(!contactMaterial){
                    return;
                }

                contactMaterial[dataName] = data;
            });
        }
    }

    export type MaterialData = {
        gameObject:GameObject,
        material:CANNON.Material
    }
}
