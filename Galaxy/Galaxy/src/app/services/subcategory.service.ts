import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private general: GeneralService) { }

  GetSubCategoriesbyCategoryId(categoryId: string | null): Observable<any> {
    const getSubCategoriesByCategoryURL = `${this.general.API}SubCategory/GetbyCategory?Id=${categoryId}`;
    return this.general.http.get(getSubCategoriesByCategoryURL);
  }

  GetAdminSubCategories(): Observable<any> {
    const GetSubCategoriesURL = `${this.general.API}SubCategory/GetAll`
    return this.general.http.get(GetSubCategoriesURL);
  }

  GetOneSubCategory(subcategoryId:string | null):Observable<any>{
    const GetSubCategoryURL = `${this.general.API}SubCategory/GetOne?Id=${subcategoryId}`
    return this.general.http.get(GetSubCategoryURL);
  } 

  GetSubCategoriesWithProductsbyCategory(categoryId:string | null):Observable<any>{
    const GetCategoryURL = `${this.general.API}SubCategory/GetSubCategoriesWithProducts?Id=${categoryId}`
    return this.general.http.get(GetCategoryURL);
  } 


  AddSubCategory(SubCategory:any):Observable<any>{
    let AddSubCdategoryURL = `${this.general.API}SubCategory/AddOne`;
    return this.general.http.post(AddSubCdategoryURL,SubCategory);
  }

  AddSubCategoryBanner(banner:any):Observable<any>{
    let AddcategorybannerURL = `${this.general.API}SubCategory/AddCategorybanner`;
    return this.general.http.post(AddcategorybannerURL,banner);
  }


  // DeleteCategory(categoryId: number){
  //   let DeletecategoryURL = `${this.general.API}category/DeleteCategory?id=${categoryId}`;
  //   return this.general.http.delete(DeletecategoryURL);
  // }

  // RetriveCategory(categoryId: number){
  //   let RetrivecategoryURL = `${this.general.API}Category/RetrieveDeletedCategory?id=${categoryId}`;
  //   return this.general.http.put(RetrivecategoryURL,null);
  // }

}
