export interface IAddSubCategoryBanners {
    subCategoryId: number,
    productId: number,
    imageURL:string,
};

export const initAddSubCategoryBanners: IAddSubCategoryBanners = {
    subCategoryId: 0,
    productId: 0,
    imageURL:'',
};