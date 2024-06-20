export interface IAddGroup {
    name: string,
    attributesIds:number[]
};

export const initAddGroup: IAddGroup = {
    name: '',
    attributesIds:[]
};