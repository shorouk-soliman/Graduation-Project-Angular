import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { ICategoryAdmin } from '../Models/Category/category-admin';
import { ICategoryDetails } from '../Models/Category/category-details';
import { IAddCategory } from '../Models/Category/cateory-add';
import { IAddCategoryBanner } from '../Models/Category/category-banner-add';
import { ICategoryRead } from '../Models/Category/category-read';
import { ICategorySubs } from '../Models/Category/category-with-subs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private generic: GenericService) { }

  categorySubject: BehaviorSubject<ICategoryRead[]> = new BehaviorSubject<ICategoryRead[]>([]);
  categorywithSubsSubject: BehaviorSubject<ICategorySubs[]> = new BehaviorSubject<ICategorySubs[]>([]);

  GetAdminCategories(): Observable<ICategoryAdmin[]> {
    let Url: string = `Category/GetAllAdmin`;
    return this.generic.getRequest<ICategoryAdmin[]>(Url);
  };

  fetchGeneralCategories(): void {
    let Url: string = `Category/GetAllGeneral`;
    this.generic.getRequest<ICategorySubs[]>(Url).subscribe((categoriesSubs: ICategorySubs[]) => {
      this.categorySubject.next(this.getCategoriesOnly(categoriesSubs));
      this.categorywithSubsSubject.next(categoriesSubs);
    });
  }

  private getCategoriesOnly(categoriesSubs: ICategorySubs[]): ICategoryRead[] {
    return categoriesSubs.map(cs => cs.category);
  }

  getGeneralCategories(): Observable<ICategoryRead[]> {
    return this.categorySubject.asObservable();
  }

  getCategoriesSubs(): Observable<ICategorySubs[]> {
    return this.categorywithSubsSubject.asObservable();
  }

  GetOneCategory(categoryId: number): Observable<ICategoryDetails> {
    let Url: string = `Category/GetOneCategory?id=${categoryId}`;
    return this.generic.getRequest<ICategoryDetails>(Url);
  }

  AddCategory(category: IAddCategory): Observable<any> {
    let Url: string = `Category/AddCategory`;
    return this.generic.postRequest<any>(Url, category);
  }

  AddCategoryBanner(banner: IAddCategoryBanner): Observable<any> {
    let Url: string = `Category/AddCategoryImages`;
    return this.generic.postRequest<any>(Url, banner);
  }

  DeleteCategory(categoryId: number): Observable<any> {
    let Url: string = `Category/DeleteCategory?id=${categoryId}`;
    return this.generic.deleteRequest<any>(Url);
  }

  RetrieveCategory(categoryId: number): Observable<any> {
    let Url: string = `Category/RetrieveDeletedCategory?id=${categoryId}`;
    return this.generic.putRequest<any>(Url, null);
  }
  
  UpdateCategory(categoryId: number, updateData: any): Observable<any> {
    let Url: string = `Category/UpdateCategory?id=${categoryId}`;
    return this.generic.putRequest<any>(Url, updateData);
  }
}
