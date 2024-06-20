export interface ICategoryRead {
    id: number,
    name: string,
    description: string,
    image: string
};

export const initCategoryRead: ICategoryRead = {
    id: 0,
    name: '',
    description: '',
    image: '',
};