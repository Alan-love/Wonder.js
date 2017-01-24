var wdCb = require("wonder-commonlib");
var arrayUtils = require("../common/arrayUtils");



//todo remove keyword
var ExcludeLib = {
    WD_COMMONLIB: {
        variableName: "wdCb",
        keyword: "wonder-commonlib",
        path: "wonder-commonlib"
    },
    WD_FRP: {
        variableName: "wdFrp",
        keyword: "wonder-frp",
        path: "wonder-frp"
    },
    BOWSER: {
        variableName: "bowser",
        keyword: "bowser",
        path: "bowser"
    },
    CHAI: {
        variableName: "chai",
        keyword: "chai",
        path: "chai"
    },
    RSVP: {
        variableName: "RSVP",
        keyword: "rsvp",
        path: "rsvp"
    },
    CANNON:{
        variableName: "CANNON",
        keyword: "cannon",
        path: "cannon"
    }
};

function getAllLibs() {
    var combineDTsList = [
            ExcludeLib.WD_COMMONLIB,
            ExcludeLib.WD_FRP,
            ExcludeLib.BOWSER,
            ExcludeLib.CHAI,
            ExcludeLib.RSVP,
            ExcludeLib.CANNON
        ],
        combineContentList = [
            ExcludeLib.WD_COMMONLIB,
            ExcludeLib.WD_FRP,
            ExcludeLib.BOWSER,
            ExcludeLib.CHAI,
            ExcludeLib.RSVP,
            ExcludeLib.CANNON
        ];

    return {
        combineDTsList: combineDTsList,
        combineContentList: combineContentList
    }
}

function getExcludeLibData(excludeLibData, removeLibArr) {
    var excludeLibsArr = null,
        allLibs = getAllLibs(),
        combineDTsList = allLibs.combineDTsList,
        combineContentList = allLibs.combineContentList;

    excludeLibsArr = removeLibArr || [];

    if(wdCb.JudgeUtils.isString(excludeLibData)){
        if(excludeLibData !== ""){
            excludeLibsArr = excludeLibsArr.concat(excludeLibData.split(','));
        }
    }
    else{
        excludeLibsArr = excludeLibsArr.concat(excludeLibData);
    }

    excludeLibsArr = arrayUtils.removeRepeatItems(excludeLibsArr);

    return {
        combineDTsList: combineDTsList.filter(function(data){
            return excludeLibsArr.indexOf(data) === -1;
        }),
        combineContentList: combineContentList.filter(function(data){
            return excludeLibsArr.indexOf(data) === -1;
        })
    };
}



function getExcludeLibDataByCustomPackage(excludeLibData, removeLibArr) {
    var excludeLibsArr = null,
        allLibs = getAllLibs(),
        combineDTsList = allLibs.combineDTsList,
        combineContentList = allLibs.combineContentList;

    excludeLibsArr = removeLibArr;

    if(excludeLibData !== ""){
        excludeLibsArr = excludeLibsArr.concat(excludeLibData.split(','));
    }

    excludeLibsArr = arrayUtils.removeRepeatItems(excludeLibsArr);

    return {
        combineDTsList: combineDTsList.filter(function(data){
            return excludeLibsArr.indexOf(data.keyword) === -1;
        }),
        combineContentList: combineContentList.filter(function(data){
            return excludeLibsArr.indexOf(data.keyword) === -1;
        })
    };
}






module.exports = {
    ExcludeLib: ExcludeLib,

    getExcludeLibData: getExcludeLibData,
    getExcludeLibDataByCustomPackage: getExcludeLibDataByCustomPackage
};
