export interface IVarProduct{
    name: string,
    image: string,
    quantity: string,
    description: string,
    price: number,
    subCategoryId: number,
    discount: number,
    brandId: number,
    productImages: string[],
    exiestImagesProductId:number,
    values:number[],
    varGroupId:number,
    isDeleted :boolean

}

export const initVarProduct = {
    name: '',
    image: '',
    quantity: 0,
    description: '',
    price: 0,
    subCategoryId: 0,
    discount: 0,
    brandId: 0,
    productImages: [],
    isDeleted :false
}
