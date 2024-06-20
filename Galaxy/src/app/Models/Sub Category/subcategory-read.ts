export interface ISubCategoryRead {
    id: number,
    name: string,
    description: string,
    image:string,
    categoryId:number
};

export const initSubCategoryRead: ISubCategoryRead = {
    id: 0,
    name: '',
    description: '',
    image:'',
    categoryId:0
};