import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { ICategoryAdmin } from '../Models/Category/category-admin';
import { ICategoryDetails } from '../Models/Category/category-details';
import { IAddCategory } from '../Models/Category/cateory-add';
import { IAddCategoryBanner } from '../Models/Category/category-banner-add';
import { ICategoryRead } from '../Models/Category/category-read';
import { ICategorySubs } from '../Models/Category/category-with-subs';
import { IAdminSubCategoryRead } from '../Models/Sub Category/subcategory-admin-read';
import { ISubcategoryDetails } from '../Models/Sub Category/subcategory-detalis';
import { IAddSubcategory } from '../Models/Sub Category/subcategory-add';
import { IAddSubCategoryBanners } from '../Models/Sub Category/subcategory-banner-add';
import { ISubCategoryRead } from '../Models/Sub Category/subcategory-read';
import { ISubcategoryProducts } from '../Models/Sub Category/subcategory-with-products';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private generic: GenericService) { }

  private categorySubject: BehaviorSubject<ICategoryRead[]> = new BehaviorSubject<ICategoryRead[]>([]);
  private categoryWithSubsSubject: BehaviorSubject<ICategorySubs[]> = new BehaviorSubject<ICategorySubs[]>([]);
  private subcategorySubject: BehaviorSubject<ISubCategoryRead[]> = new BehaviorSubject<ISubCategoryRead[]>([]);
  private subcategoryWithSubsSubject: BehaviorSubject<ISubcategoryProducts[]> = new BehaviorSubject<ISubcategoryProducts[]>([]);

  // Category Methods
  getAdminCategories(): Observable<ICategoryAdmin[]> {
    const url = 'Category/GetAllAdmin';
    return this.generic.getRequest<ICategoryAdmin[]>(url);
  }

  fetchGeneralCategories(): void {
    const url = 'Category/GetAllGeneral';
    this.generic.getRequest<ICategorySubs[]>(url).subscribe((categoriesSubs: ICategorySubs[]) => {
      this.categorySubject.next(this.getCategoriesOnly(categoriesSubs));
      this.categoryWithSubsSubject.next(categoriesSubs);
    });
  }

  private getCategoriesOnly(categoriesSubs: ICategorySubs[]): ICategoryRead[] {
    return categoriesSubs.map(cs => cs.category);
  }

  getGeneralCategories(): Observable<ICategoryRead[]> {
    return this.categorySubject.asObservable();
  }

  getCategoriesWithSubs(): Observable<ICategorySubs[]> {
    return this.categoryWithSubsSubject.asObservable();
  }

  getOneCategory(categoryId: number): Observable<ICategoryDetails> {
    const url = `Category/GetOneCategory?id=${categoryId}`;
    return this.generic.getRequest<ICategoryDetails>(url);
  }

  addCategory(category: IAddCategory): Observable<any> {
    const url = 'Category/AddCategory';
    return this.generic.postRequest<any>(url, category);
  }

  addCategoryBanner(banner: IAddCategoryBanner): Observable<any> {
    const url = 'Category/AddCategoryImages';
    return this.generic.postRequest<any>(url, banner);
  }

  deleteCategory(categoryId: number): Observable<any> {
    const url = `Category/SoftDeleteCategory?id=${categoryId}`;
    return this.generic.deleteRequest<any>(url);
  }

  retrieveCategory(categoryId: number): Observable<any> {
    const url = `Category/RetrieveDeletedCategory?id=${categoryId}`;
    return this.generic.putRequest<any>(url, null);
  }

  updateCategory(categoryId: number, updateData: any): Observable<any> {
    const url = `Category/UpdateCategory?id=${categoryId}`;
    return this.generic.putRequest<any>(url, updateData);
  }

  // Subcategory Methods
  getAdminSubcategories(): Observable<IAdminSubCategoryRead[]> {
    const url = 'Subcategory/GetAllAdmin';
    return this.generic.getRequest<IAdminSubCategoryRead[]>(url);
  }

  fetchGeneralSubcategories(): void {
    const url = 'Subcategory/GetAllGeneral';
    this.generic.getRequest<ISubcategoryProducts[]>(url).subscribe((subcategoriesSubs: ISubcategoryProducts[]) => {
      this.subcategorySubject.next(this.getSubcategoriesOnly(subcategoriesSubs));
      this.subcategoryWithSubsSubject.next(subcategoriesSubs);
    });
  }

  private getSubcategoriesOnly(subcategoriesSubs: ISubcategoryProducts[]): ISubCategoryRead[] {
    return subcategoriesSubs.map(ss => ss.subcategory);
  }

  getGeneralSubcategories(): Observable<ISubCategoryRead[]> {
    return this.subcategorySubject.asObservable();
  }

  getSubcategoriesWithSubs(): Observable<ISubcategoryProducts[]> {
    return this.subcategoryWithSubsSubject.asObservable();
  }

  getOneSubcategory(subcategoryId: number): Observable<ISubcategoryDetails> {
    const url = `Subcategory/GetOneSubcategory?id=${subcategoryId}`;
    return this.generic.getRequest<ISubcategoryDetails>(url);
  }

  addSubcategory(subcategory: IAddSubcategory): Observable<any> {
    const url = 'Subcategory/AddSubcategory';
    return this.generic.postRequest<any>(url, subcategory);
  }

  addSubcategoryBanner(banner: IAddSubCategoryBanners): Observable<any> {
    const url = 'Subcategory/AddSubcategoryImages';
    return this.generic.postRequest<any>(url, banner);
  }

  deleteSubcategory(subcategoryId: number): Observable<any> {
    const url = `Subcategory/SoftDeleteSubcategory?id=${subcategoryId}`;
    return this.generic.deleteRequest<any>(url);
  }

  retrieveSubcategory(subcategoryId: number): Observable<any> {
    const url = `Subcategory/RetrieveDeletedSubcategory?id=${subcategoryId}`;
    return this.generic.putRequest<any>(url, null);
  }

  updateSubcategory(subcategoryId: number, updateData: any): Observable<any> {
    const url = `Subcategory/UpdateSubcategory?id=${subcategoryId}`;
    return this.generic.putRequest<any>(url, updateData);
  }
}
