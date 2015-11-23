/// <reference path="../../filePath.d.ts"/>
module dy {
    export abstract class EventHandler {
        public abstract on(...args);

        public abstract off(...args);

        public abstract trigger(...args);
    }
}
