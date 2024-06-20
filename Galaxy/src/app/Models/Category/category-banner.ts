export interface ICategoryBanner {
    categoryId: number,
    subCategoryId: number,
    imageURL: string,
};

export const initCategoryBanner: ICategoryBanner = {
    categoryId: 0,
    subCategoryId: 0,
    imageURL: '',
};