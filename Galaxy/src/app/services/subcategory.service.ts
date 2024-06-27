import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { ISubCategoryRead } from '../Models/Sub Category/subcategory-read';
import { IAdminSubCategoryRead } from '../Models/Sub Category/subcategory-admin-read';
import { ISubcategoryDetails } from '../Models/Sub Category/subcategory-detalis';
import { ISubcategoryProducts } from '../Models/Sub Category/subcategory-with-products';
import { IAddSubcategory } from '../Models/Sub Category/subcategory-add';
import { IAddSubCategoryBanners } from '../Models/Sub Category/subcategory-banner-add';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private generic: GenericService) { }

  GetSubCategoriesbyCategoryId(categoryId: number): Observable<ISubCategoryRead[]> {
    let Url: string = `SubCategory/GetbyCategory?Id=${categoryId}`;
    return this.generic.getRequest<ISubCategoryRead[]>(Url);
  };

  GetAdminSubCategories(): Observable<IAdminSubCategoryRead[]> {
    let Url: string = `SubCategory/GetAll`;
    return this.generic.getRequest<IAdminSubCategoryRead[]>(Url);
  };

  GetOneSubCategory(subcategoryId: number): Observable<ISubcategoryDetails> {
    let Url: string = `SubCategory/GetOne?Id=${subcategoryId}`;
    return this.generic.getRequest<ISubcategoryDetails>(Url);
  };

  GetSubCategoriesWithProductsbyCategory(categoryId:number): Observable<ISubcategoryProducts[]> {
    let Url: string = `SubCategory/GetSubCategoriesWithProducts?Id=${categoryId}`;
    return this.generic.getRequest<ISubcategoryProducts[]>(Url);
  };

  AddSubCategory(SubCategory: IAddSubcategory): Observable<any> {
    let Url: string = `SubCategory/AddOne`;
    return this.generic.postRequest<any>(Url, SubCategory);
  };

  AddSubCategoryBanner(banner: IAddSubCategoryBanners): Observable<any> {
    let Url: string = `SubCategory/AddCategorybanner`;
    return this.generic.postRequest<any>(Url, banner);
  };

  DeleteSubCategory(subcategoryId: number): Observable<any> {
    let Url: string = `SubCategory/SoftDelete?id=${subcategoryId}`;
    return this.generic.deleteRequest<any>(Url);
  };

  RetriveSubCategory(subcategoryId: number): Observable<any> {
    let Url: string = `SubCategory/Retrive?id=${subcategoryId}`;
    return this.generic.putRequest<any>(Url, null);
  };
  
  updateSubcategory(subcategoryId: number, updateData: any): Observable<any> {
    const url = `SubCategory/Update?Id=${subcategoryId}`;
    return this.generic.putRequest<any>(url, updateData);
  }

};
