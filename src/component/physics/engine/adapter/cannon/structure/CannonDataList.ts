/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export abstract class CannonDataList{
        protected dataList:wdCb.Collection<any> = wdCb.Collection.create<any>();

        public remove(obj:GameObject){
            this.dataList.removeChild(({gameObject, body}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });
        }
    }
}

