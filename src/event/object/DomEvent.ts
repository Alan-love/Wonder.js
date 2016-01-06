module wd {
    export abstract class DomEvent extends Event{
        constructor(event:any, eventName:EventName) {
            super(eventName);

            this.event = event;
        }

        private _event:any = null;
        get event() {
            return this._event;
        }
        set event(event:any) {
            this._event = event || root.event;
        }

        public target:HTMLElement;

        public preventDefault(){
            var e = this._event;

            if (bowser.msie && Number(bowser.version) <= 8) {
                e.returnValue = false;
            }
            else {
                e.preventDefault();
            }
        }
    }
}

