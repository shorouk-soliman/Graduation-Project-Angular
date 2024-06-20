import { Injectable } from '@angular/core';
import { IProductQuery } from '../../Models/Product/product-query-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsMapperService {

  constructor() { }


  ToProductQuery(page: number, limit: number, sort: string, SubcategoryId: any, brandId: any, keyword: string = ''): IProductQuery {
    return {
      page: page,
      limit: limit,
      sort: sort,
      subCategoryId: SubcategoryId,
      brandId: brandId,
      keyword: keyword,
    };
  }

}
