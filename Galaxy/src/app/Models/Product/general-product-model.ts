import { IProducts, initialProduct } from "./products-model";

export interface IGeneralProducts{
    products:IProducts[],
    totalPages:number
}

export const initGeneralProducts: IGeneralProducts = {
    products:[initialProduct],
    totalPages:0
}

