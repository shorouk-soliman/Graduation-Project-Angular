import { IAttributeValues } from "../Attribute/attribute-with-values";

export interface IGroupAttributeValues {
    groupId: number,
    attributeWithValues: IAttributeValues[],
};

export const initGroupAttributeValues: IGroupAttributeValues = {
    groupId: 0,
    attributeWithValues: [],
};