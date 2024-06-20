export interface IAddCategoryBanner {
    categoryId: number,
    subCategoryId: number,
    imageURL: string,
};

export const initAddCategoryBanner: IAddCategoryBanner = {
    categoryId: 0,
    subCategoryId: 0,
    imageURL: '',
};