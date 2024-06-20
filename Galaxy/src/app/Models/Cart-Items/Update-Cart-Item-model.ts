export interface IUpdateCartItem {
    productId: number,
    cartProductQuantity: number,
};

export const initialAddToCart: IUpdateCartItem = {
    productId: 0,
    cartProductQuantity: 0,
};