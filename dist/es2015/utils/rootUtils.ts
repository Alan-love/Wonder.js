import { root } from "../definition/Variable";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";

export const getRootProperty = (propertyName: string) => {
    return IO.of(() => {
        return root[propertyName];
    });
}
