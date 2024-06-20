export interface IUpdateRate {
    rate: number,
    reviewtitle: string,
    reviewText: string,
}

export const initUpdateRate: IUpdateRate = {
    rate: 0,
    reviewtitle: '',
    reviewText: '',
};