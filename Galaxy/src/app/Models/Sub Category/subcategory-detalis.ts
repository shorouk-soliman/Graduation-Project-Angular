import { ISubCategoryImages } from "./subcategory-images";
import { ISubCategoryRead, initSubCategoryRead } from "./subcategory-read";

export interface ISubcategoryDetails {
    subcategory:ISubCategoryRead,
    images:ISubCategoryImages[]
};

export const initSubcategoryDetails: ISubcategoryDetails = {
    subcategory:initSubCategoryRead,
    images:[]
};