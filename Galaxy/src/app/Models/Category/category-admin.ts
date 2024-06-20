export interface ICategoryAdmin {
    id: number,
    name: string,
    description: string,
    image: string,
    isDeleted:boolean
};

export const initCategoryAdmin: ICategoryAdmin = {
    id: 0,
    name: '',
    description: '',
    image: '',
    isDeleted:false
};