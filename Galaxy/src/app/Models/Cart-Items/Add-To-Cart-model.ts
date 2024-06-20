export interface IAddToCart {
    productId: number,
    cartProductQuantity: number,
};

export const initialAddToCart: IAddToCart = {
    productId: 0,
    cartProductQuantity: 0,
};