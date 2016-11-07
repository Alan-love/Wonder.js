module wd{
    @singleton()
    export class SoundLoader extends Loader{
        public static getInstance():any {}

        private constructor(){super();}

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        protected loadAsset(...args):wdFrp.Stream {
            var urlArr = null;

            if(JudgeUtils.isString(args[0])){
                urlArr = [args[0]];
            }
            else{
                urlArr = args[0];
            }

            return wdFrp.fromPromise(new RSVP.Promise((resolve, reject) => {
                Sound.create({
                    urlArr:urlArr,
                    onLoad: (sound:Sound) => {
                        resolve(sound);
                    },
                    onError: (err:string) => {
                        reject(err);
                    }
                });
            }));
        }
    }
}

