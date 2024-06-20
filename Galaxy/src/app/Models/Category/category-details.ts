import { ICategoryBanner } from "./category-banner";
import { ICategoryRead, initCategoryRead } from "./category-read";

export interface ICategoryDetails{
    category:ICategoryRead,
    banners:ICategoryBanner[]
}

export const initCategoryDetails: ICategoryDetails = {
    category:initCategoryRead,
    banners:[]
  };