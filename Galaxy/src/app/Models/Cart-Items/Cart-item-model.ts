import { IProducts, initialProduct } from "../Product/products-model";

export interface ICartItem {
    productId: number,
    cartProductQuantity: number,
    product: IProducts,
};

export const initialCartItem: ICartItem = {
    productId: 0,
    cartProductQuantity: 0,
    product: initialProduct
};