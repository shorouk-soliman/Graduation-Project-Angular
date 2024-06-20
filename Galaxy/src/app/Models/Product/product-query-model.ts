export interface IProductQuery{
    page:number,
    limit:number,
    sort:string,
    subCategoryId:number,
    brandId:number,
    keyword:string,
};

export class initProductQuery implements IProductQuery {
    constructor(
        public page:number = 1,
        public limit:number = 30,
        public sort:string = 'default',
        public subCategoryId:number = 0,
        public brandId:number = 0,
        public keyword:string = '',
    ){}
};

