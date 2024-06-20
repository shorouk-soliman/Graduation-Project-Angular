import { IProducts, initialProduct } from "../Product/products-model";

export interface IOrderItemRead {
    id: number,
    itemPrice:number
    itemQuantitem:number
    product:IProducts,
};

export const initOrderItemRead: IOrderItemRead = {
    id: 0,
    itemPrice:0,
    itemQuantitem:0,
    product:initialProduct,
};