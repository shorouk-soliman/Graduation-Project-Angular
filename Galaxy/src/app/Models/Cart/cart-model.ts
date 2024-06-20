import { ICartItem } from "../Cart-Items/Cart-item-model";
import { IProducts } from "../Product/products-model";

export interface ICart {
    id: number,
    userId: string,
    cartitems: ICartItem[]
};

export const initialCart: ICart = {
    id: 0,
    userId: '',
    cartitems: []
};