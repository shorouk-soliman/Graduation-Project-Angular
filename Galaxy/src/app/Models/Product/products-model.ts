export interface IProducts{    
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
}


export const initialProduct: IProducts = {
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
    inWishList: false
  };