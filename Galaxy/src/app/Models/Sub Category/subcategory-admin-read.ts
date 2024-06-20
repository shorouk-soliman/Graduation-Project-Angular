export interface IAdminSubCategoryRead {
    id: number,
    name: string,
    description: string,
    image:string,
    categoryId:number,
    isDeleted:boolean
};

export const initAdminSubCategoryRead: IAdminSubCategoryRead = {
    id: 0,
    name: '',
    description: '',
    image:'',
    categoryId:0,
    isDeleted:false
};