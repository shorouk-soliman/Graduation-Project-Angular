import { IValueRead, initialReadValue } from "../Values/values-read-model";
import { IAttributeRead } from "./Attribute-Read-model";

export interface IAttributeValues{
    attribute:IAttributeRead[],
    values:IValueRead
}

export const initAttributeValues: IAttributeValues = {
    attribute:[],
    values: initialReadValue,
};