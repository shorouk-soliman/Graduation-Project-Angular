export interface IAddSubcategory {
    name: string,
    description: string,
    image:string,
    categoryId:number
};

export const initAddSubcategory: IAddSubcategory = {
    name: '',
    description: '',
    image:'',
    categoryId:0
};