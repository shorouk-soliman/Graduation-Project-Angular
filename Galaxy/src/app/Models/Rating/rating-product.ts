import { IRateRead, initRateRead } from "./rating-read";

export interface IProductRating {
    ratings: IRateRead[],
    totalPages: number,
    ratedBefore?: IRateRead | null,
};

export const initProductRating: IProductRating = {
    ratings: [],
    totalPages: 0,
    ratedBefore: null,
};