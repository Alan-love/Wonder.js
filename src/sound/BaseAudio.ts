module wd {
    declare var window:any;

    export abstract class BaseAudio {
        protected urlArr:Array<string> = null;
        protected url:string = null;

        public abstract play(): void;
        public abstract load():wdFrp.Stream;
        public abstract getPlayState(): ESoundPlayState;

        public initWhenCreate() {
            this.url = this._getCanPlayUrl();
        }

        public canPlay(){
            return this.url !== null;
        }

        @require(function(){
            it("url should add extname", () => {
                for(let url of this.urlArr) {
                    let result = url.match(/\.(\w+)$/);

                    expect(result).not.be.a("null");
                }
            }, this);
        })
        @ensure(function(canPlayUrl:string){
            it("if browser not support audio urlArr, warn", () => {
                if(canPlayUrl === null){
                    Log.warn(`browser not support audio urlArr: ${this.urlArr}`);
                }
            }, this);
        })
        private _getCanPlayUrl() {
            var canPlayUrl = null;

            for(let url of this.urlArr){
                let result = url.match(/\.(\w+)$/);

                // if (result === null) {
                //     YE.error(true, "声音url错误，必须加上类型后缀名");
                //     // return $break;
                //     return $break;
                // }

                if (this._canplay(result[1])) {
                    canPlayUrl = url;
                    break;
                }
            }

            // if (canPlayUrl === null) {
            //     YE.error(true, "浏览器不支持该声音格式");
            //     return;
            // }

            return canPlayUrl;
        }

        private _canplay(mimeType) {
            var audio = new window.Audio(),
                mimeStr = null;

            //todo support more mimeType
            switch (mimeType) {
                case "mp3":
                    mimeStr = "audio/mpeg";
                    break;
//                    case "vorbis":
//                        mimeStr = "audio/ogg; codecs="vorbis"";
//                        break;
//                    case "opus":
//                        mimeStr = "audio/ogg; codecs="opus"";
////                        break;
//                    case "webm":
//                        mimeStr = "audio/webm; codecs="vorbis"";
//                        break;
//                    case "mp4":
//                        mimeStr = "audio/mp4; codecs="mp4a.40.5"";
//                        break;
                case "wav":
                    mimeStr = "audio/wav";
                    break;
                default :
                    Log.warn(`unknown mimeType:${mimeType}`);
                    return false;
            }

            if (mimeType == "mp3" && bowser.firefox) {
                return false;
            }

            return !!audio.canPlayType && audio.canPlayType(mimeStr) !== "";
        }
    }
}
