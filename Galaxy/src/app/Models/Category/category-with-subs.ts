import { ISubCategoryRead } from "../Sub Category/subcategory-read";
import { ICategoryRead, initCategoryRead } from "./category-read";

export interface ICategorySubs {
    category:ICategoryRead,
    subCategories:ISubCategoryRead[]
};

export const initCategorySubs: ICategorySubs = {
    category:initCategoryRead,
    subCategories:[]
};