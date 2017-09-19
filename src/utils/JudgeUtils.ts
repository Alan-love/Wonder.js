import { JudgeUtils as JudgeUtils$ } from "wonder-commonlib/dist/es2015/utils/JudgeUtils";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";

// @registerClass("JudgeUtils")
export class JudgeUtils extends JudgeUtils$ {
    public static isCollection(list: Collection<any>) {
        return list instanceof Collection;
    }
}

export const isString = JudgeUtils.isString;

export const isArray = JudgeUtils.isArray;

export const isUndefined = (v: any) => v === void 0;

export const isNotUndefined = (v: any) => v !== void 0;
