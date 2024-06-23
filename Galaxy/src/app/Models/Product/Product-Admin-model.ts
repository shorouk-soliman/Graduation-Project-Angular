export interface IAdminProducts{
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
  isDeleted:boolean

}
