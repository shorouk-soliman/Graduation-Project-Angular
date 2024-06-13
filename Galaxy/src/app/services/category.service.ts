import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categorySubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private general: GeneralService) { }

  GetAdminCategories():Observable<any>{
    let GetAllAdminURL = `${this.general.API}Category/GetAllAdmin`;
    return this.general.http.get(GetAllAdminURL);
  }

  FetchGeneralCategories(): void {
    const GetCategoriesURL = `${this.general.API}Category/GetAllGeneral`
    this.general.http.get(GetCategoriesURL).subscribe((categories: any) => {
      this.categorySubject.next(categories)
    })
  }

  GetGeneralCategories(): Observable<any> {
    return this.categorySubject.asObservable();
  }

  GetOneCategory(categoryId:string | null):Observable<any>{
    const GetCategoryURL = `${this.general.API}Category/GetOneCategory?id=${categoryId}`
    return this.general.http.get(GetCategoryURL);
  } 


  AddCategory(category:any):Observable<any>{
    let AddcategoryURL = `${this.general.API}Category/AddCategory`;
    return this.general.http.post(AddcategoryURL,category);
  }

  AddCategoryBanner(banner:any):Observable<any>{
    let AddcategorybannerURL = `${this.general.API}Category/AddCategoryImages`;
    return this.general.http.post(AddcategorybannerURL,banner);
  }

  DeleteCategory(categoryId: number){
    let DeletecategoryURL = `${this.general.API}category/DeleteCategory?id=${categoryId}`;
    return this.general.http.delete(DeletecategoryURL);
  }

  RetriveCategory(categoryId: number){
    let RetrivecategoryURL = `${this.general.API}Category/RetrieveDeletedCategory?id=${categoryId}`;
    return this.general.http.put(RetrivecategoryURL,null);
  }

}
