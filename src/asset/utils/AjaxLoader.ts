/// <reference path="../../definitions.d.ts"/>
module dy{
    export class AjaxLoader{
        public static load(url:string, dataType:string) {
            return dyRt.fromPromise(new RSVP.Promise((resolve, reject) => {
                dyCb.AjaxUtils.ajax({
                    type: "get",
                    //async: true,
                    url: url,
                    contentType: "text/plain; charset=utf-8",
                    dataType: dataType,
                    //cache: false,
                    success: (data) => {
                        resolve(data);
                    },
                    error: (XMLHttpRequest, errorThrown) => {
                        reject("url:" + url + "\nreadyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status
                            + "\nmessage:" + errorThrown.message
                            + "\nresponseText:" + XMLHttpRequest.responseText);
                    }
                });
            }));
        }
    }
}

