/// <reference path="LoaderManager.ts"/>
/// <reference path="../import/YEQuery.ts"/>
module Engine3D{
    export class GLSLLoader{
        private static _instance:GLSLLoader = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _cache:any = {};

        public load(url, id){
            var self = this;

            if(this._cache[id]){
                LoaderManager.getInstance().onResLoaded();
                return;
            }

            this._loadText(url, (err, data) => {
                if(err){
                    LoaderManager.getInstance().onResError(url, err);
                    return;
                }

                LoaderManager.getInstance().onResLoaded();
                self._cache[id] = data;
            });
        }

        private _loadText(url, callback) {
            var self = this;

            YEQuery.ajax({
                type: "get",
                //async: true,
                url: url,
                contentType: "text/plain; charset=utf-8",
                dataType: "text",
                //cache: false,
                success: function (data) {
                    callback(null, data);
                },
                error: function (XMLHttpRequest, errorThrown) {
                    callback("url:" + url + "\nreadyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status
                    + "\nmessage:" + errorThrown.message
                    + "\nresponseText:" + XMLHttpRequest.responseText)
                }
            });
        }
    }
}
