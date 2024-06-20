export interface IAddRate {
    rate: number,
    reviewtitle: string,
    reviewText: string,
}

export const initAddRate: IAddRate = {
    rate: 0,
    reviewtitle: '',
    reviewText: '',
};