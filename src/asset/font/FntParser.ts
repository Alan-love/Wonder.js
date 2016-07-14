module wd {
    //const INFO_EXP = /info [^\n]*(\n|$)/gi,
    const COMMON_EXP = /common [^\n]*(\n|$)/gi,
        PAGE_EXP = /page [^\n]*(\n|$)/gi,
        CHAR_EXP = /char [^\n]*(\n|$)/gi,
        KERNING_EXP = /kerning [^\n]*(\n|$)/gi,
        ITEM_EXP = /\w+=[^ \r\n]+/gi,
        INT_EXP = /^[\-]?\d+$/;       //"-"?

    export class FntParser {
        public static create() {
            var obj = new this();

            return obj;
        }

        public parseFnt(fntStr:string, url:string) {
            /*!
             xAdvance:the number of pixels the cursor move forward to draw the next char after draw current char
             xOffset:pixel x offset of current font when drawing
             yOffset:pixel y offset of current font when drawing
             */
            var fnt = <FntData>{},
                commonObj = null,
                pageObj = null;

            commonObj = this._parseStrToObj(fntStr.match(COMMON_EXP)[0]);

            fnt.commonHeight = commonObj["lineHeight"];

            fnt.commonBase = commonObj["base"];
            fnt.scaleW = commonObj["scaleW"];
            fnt.scaleH = commonObj["scaleH"];

            //todo support pages
            if (commonObj["pages"] !== 1) {
                Log.log("only supports 1 page");
            }

            pageObj = this._parseStrToObj(fntStr.match(PAGE_EXP)[0]);

            if (pageObj["id"] !== 0) {
                Log.log("file could not be found");
            }

            fnt.atlasName = wdCb.PathUtils.changeBasename(url, <string>pageObj["file"]);

            this._parseChar(fntStr, fnt);

            this._parseKerning(fntStr, fnt);


            //todo use padding?
            //padding = this._parsePadding(fntStr)

            return fnt;
        }

        private _parseStrToObj(str) {
            var arr = str.match(ITEM_EXP),
                obj = <any>{};

            if (arr) {
                for (let tempStr of arr) {
                    let index = tempStr.indexOf("="),
                        key = tempStr.substring(0, index),
                        value:any = tempStr.substring(index + 1);
                    if (value.match(INT_EXP)) {
                        value = parseInt(value);
                    }
                    else if (value[0] == '"') {
                        value = value.substring(1, value.length - 1);
                    }
                    obj[key] = value;
                }
            }
            return obj;
        }

        private _parseChar(fntStr:string, fnt:any) {
            var charLines = fntStr.match(CHAR_EXP),
                fontDefDictionary = {};


            for (let char of charLines) {
                let charObj = this._parseStrToObj(char),
                    charId = charObj["id"];

                fontDefDictionary[charId] = {
                    id:charId,
                    rect: {x: charObj["x"], y: charObj["y"], width: charObj["width"], height: charObj["height"]},
                    xOffset: charObj["xoffset"],
                    yOffset: charObj["yoffset"],

                    //xAdvance equal width of char texture
                    xAdvance: charObj["xadvance"]
                };
            }

            fnt.fontDefDictionary = fontDefDictionary;
        }

        private _parseKerning(fntStr:string, fnt:any) {
            var kerningLines = fntStr.match(KERNING_EXP),
                kerningArray = [];

            if(kerningLines === null){
                fnt.kerningArray = [];

                return;
            }

            for (let kerning of kerningLines) {
                let kerningObj = this._parseStrToObj(kerning);

                kerningArray.push({
                    first: kerningObj["first"],
                    second:kerningObj["second"],
                    amount:kerningObj["amount"]
                });
            }

            fnt.kerningArray = kerningArray;
        }

        //private _parsePadding(fntStr:string){
        //    var infoObj = this._parseStrToObj(fntStr.match(INFO_EXP)[0]),
        //        paddingArr = infoObj["padding"].split(',');
        //
        //    return {
        //        left: parseInt(paddingArr[0]),
        //        top: parseInt(paddingArr[1]),
        //        right: parseInt(paddingArr[2]),
        //        bottom: parseInt(paddingArr[3])
        //    }
        //}
    }
}

