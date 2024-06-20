import { IAttributeRead } from "../Attribute/Attribute-Read-model";
import { IValueRead } from "../Values/values-read-model";

export interface IVersion {
    productId: number,
    attributes: IAttributeRead[],
    values: IValueRead[],
}

export const initVersion: IVersion = {
    productId: 0,
    attributes: [],
    values: []
};