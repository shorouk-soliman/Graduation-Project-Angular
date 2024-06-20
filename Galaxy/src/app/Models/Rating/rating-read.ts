import { IUserRead, initUserRead } from "../User/user-read";

export interface IRateRead {
    user: IUserRead,
    productId: number,
    rate: number,
    reviewTitle: string,
    reviewText: string,
    date: number,
};

export const initRateRead: IRateRead = {
    user: initUserRead,
    productId: 0,
    rate: 0,
    reviewTitle: '',
    reviewText: '',
    date: new Date().getUTCDate(),
};