module wd {
    var getCloneAttributeMembers = (obj:any) => {
        return obj[buildMemberContainerAttributeName(obj)];
    };

    var setCloneAttributeMembers = (obj:any, members:wdCb.Collection<CloneMemberData>) => {
        obj[buildMemberContainerAttributeName(obj)] = members;
    };

    var searchCloneAttributeMembers = (obj:any) => {
        const CLONE_MEMBER_PREFIX = "__decorator_clone";
        var result = null;

        for(let memberName in obj){
            if(obj.hasOwnProperty(memberName)){
                if(memberName.indexOf(CLONE_MEMBER_PREFIX) > -1){
                    result = obj[memberName];
                    break;
                }
            }
        }

        return result;
    };

    var getAllCloneAttributeMembers = (obj:any) => {
        const IS_GATHERED_ATTRIBUTE_NAME = `__decorator_clone_isGathered_${obj.constructor.name}_cloneAttributeMembers`;
        var result = wdCb.Collection.create<CloneMemberData>();
        var gather = (obj:any) => {
                if(!obj){
                    return;
                }

                if(obj[IS_GATHERED_ATTRIBUTE_NAME]){
                    let members = getCloneAttributeMembers(obj);

                    assert(members, Log.info.FUNC_NOT_EXIST(`${buildMemberContainerAttributeName(obj)}`));

                    result.addChildren(members);
                    return;
                }

                gather(obj.__proto__);

                /*! it should ensure the order is: parent members->child members
                 so here go to the top parent, then add the members to result down side
                 */

                let members = searchCloneAttributeMembers(obj);
                if(members){
                    result.addChildren(members);
                }
            },
            setGatheredResult = () => {
                setCloneAttributeMembers(obj.__proto__, result);
                obj.__proto__[IS_GATHERED_ATTRIBUTE_NAME] = true;
            };

        gather(obj.__proto__);
        setGatheredResult();

        return getCloneAttributeMembers(obj);
    };

    var initCloneAttributeMembers = (obj:any) => {
        setCloneAttributeMembers(obj, wdCb.Collection.create<CloneMemberData>());
    };

    var buildMemberContainerAttributeName = (obj:any) => {
        return `__decorator_clone_${obj.constructor.name}_cloneAttributeMembers`;
    };

    var generateCloneableMember = (cloneType:CloneType, ...cloneDataArr) => {
        return (target:any, memberName:string | symbol) => {
            if (!getCloneAttributeMembers(target)) {
                initCloneAttributeMembers(target);
            }

            if(cloneDataArr.length === 1){
                getCloneAttributeMembers(target).addChild({
                    memberName:memberName,
                    cloneType: cloneType,
                    configData:cloneDataArr[0]
                });
            }
            else if(cloneDataArr.length === 2){

                getCloneAttributeMembers(target).addChild({
                    memberName:memberName,
                    cloneType: cloneType,
                    cloneFunc:cloneDataArr[0],
                    configData:cloneDataArr[1]
                });
            }
        }
    };

    export function cloneAttributeAsBasicType(configData?:CloneAttributeAsBasicTypeConfigData) {
        return generateCloneableMember(CloneType.BASIC, wdCb.ExtendUtils.extend({
            order:0
        }, configData));
    }

    export function cloneAttributeAsCloneable(configData?:CloneAttributeAsCloneableConfigData) {
        return generateCloneableMember(CloneType.CLONEABLE, wdCb.ExtendUtils.extend({
            order:0,
            isInjectTarget:false
        }, configData));
    }

    export function cloneAttributeAsCustomType(cloneFunc:(source:any, target:any, memberName:string, cloneData:any) => void, configData?:CloneAttributeAsCustomTypeConfigData) {
        return generateCloneableMember(CloneType.CUSTOM, cloneFunc, wdCb.ExtendUtils.extend({
            order:0
        }, configData));
    }

    export class CloneHelper{
        @require(function(source:any, cloneData:any = null, createDataArr:Array<any> = null){
            assert(!!source.constructor.name, Log.info.FUNC_CAN_NOT("get class name from source.constructor.name"));

            if(createDataArr){
                assert(JudgeUtils.isArrayExactly(createDataArr), Log.info.FUNC_MUST_BE("param:createDataArr", "be arr"));
            }
        })
        public static clone<T>(source:T, cloneData:any = null, createDataArr:Array<any> = null):T{
            var cloneAttributeMembers:wdCb.Collection<CloneMemberData> = getAllCloneAttributeMembers(source)
                .sort((memberDataA:any, memberDataB:any) => {
                    return memberDataA.configData.order - memberDataB.configData.order;
                }),
                className = (<any>source.constructor).name,
                target = null;

            if(createDataArr){
                target = wd[className].create.apply(wd[className], createDataArr);
            }
            else{
                target = wd[className].create();
            }

            if(!cloneAttributeMembers){
                return target;
            }

            cloneAttributeMembers.forEach((memberData:any) => {
                var cloneType = memberData.cloneType,
                    memberName = memberData.memberName;

                switch (cloneType){
                    case CloneType.CLONEABLE:
                        let configData:CloneAttributeAsCloneableConfigData = memberData.configData;

                        if(source[memberName] !== null && source[memberName] !== void 0){
                            if(configData.isInjectTarget === true){
                                target[memberName] = source[memberName].clone(target);
                            }
                            else{
                                target[memberName] = source[memberName].clone();
                            }
                        }
                        break;
                    case CloneType.BASIC:
                        target[memberName] = source[memberName];
                        break;
                    case CloneType.CUSTOM:
                        let cloneFunc = memberData.cloneFunc;

                        cloneFunc(source, target, memberName, cloneData);
                        break;
                }
            });

            return target;
        }

        public static cloneArray(arr:Array<any>){
            return [].concat(arr);
        }
    }

    type CloneMemberData = {
        memberName:string,
        cloneType: CloneType,
        cloneDataArr: Array<any>
    }

    type CloneAttributeAsBasicTypeConfigData = {
        order?:number;
    }

    type CloneAttributeAsCloneableConfigData = {
        order?:number;
        isInjectTarget:boolean;
    }

    type CloneAttributeAsCustomTypeConfigData = {
        order?:number;
    }

    export enum CloneType{
        CLONEABLE,
        BASIC,
        CUSTOM
    }
}

