import { IBrandRead, initBrandRead } from "../Brand/Brand-Read-model";
import { ICategoryRead, initCategoryRead } from "../Category/category-read";
import { IVersion } from "../Version/version-read-model";
import { IProductImages } from "./product-images-model";

export interface IProductDetails{    
    id: number,
    name: string,
    desctiption: string,
    image: string,
    quantity: number,
    discount: number,
    rate: number,
    price: number,
    subCategoryId: number,
    productType: string,
    brandId: number,
    variantGroupId: number
    inCart: boolean,
    inWishList: boolean,
    brand:IBrandRead,
    category:ICategoryRead,
    productImages:IProductImages[],
    versions:IVersion[]
};


export const initialProductDetails: IProductDetails = {
    id: 0,
    name: '',
    desctiption: '',
    image: '',
    quantity: 0,
    discount: 0,
    rate: 0,
    price: 0,
    subCategoryId: 0,
    productType: '',
    brandId: 0,
    variantGroupId: 0,
    inCart: false,
    inWishList: false,
    brand:initBrandRead,
    category:initCategoryRead,
    productImages:[],
    versions:[]
  };