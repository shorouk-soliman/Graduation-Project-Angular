import { IProducts } from "../Product/products-model";
import { ISubCategoryImages } from "./subcategory-images";
import { ISubCategoryRead, initSubCategoryRead } from "./subcategory-read";

export interface ISubcategoryProducts {
    subcategory:ISubCategoryRead,
    products:IProducts[]
};

export const initSubcategoryProducts: ISubcategoryProducts = {
    subcategory:initSubCategoryRead,
    products:[]
};