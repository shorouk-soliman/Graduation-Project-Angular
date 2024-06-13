import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private general: GeneralService) { }
  BrandGeneralSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);

  FetchGeneralBrands(){
    let GetAllBrandsURL = `${this.general.API}Brand/GetAllGeneral`;

    this.general.http.get(GetAllBrandsURL).subscribe((brands:any)=>{
      this.BrandGeneralSubject.next(brands);
    })
  }

  GetOneBrand(brandId:number):Observable<any>{
    let GenOneBrandURL = `${this.general.API}Brand/GetBrand?id=${brandId}`;
    return this.general.http.get(GenOneBrandURL);
  }

  GetAdminBrand():Observable<any>{
    let getAdminBrandsURL = `${this.general.API}Brand/GetAllAdmin`;
    return this.general.http.get(getAdminBrandsURL);
  }

  GetGeneralBrands():Observable<any>{
    return this.BrandGeneralSubject.asObservable()
  }

  AddBrand(brand:any):Observable<any>{
    let AddBrandURL = `${this.general.API}Brand/AddBrand`;
    return this.general.http.post(AddBrandURL,brand);
  }

  DeleteBrand(brandId: number){
    let DeleteBrandURL = `${this.general.API}Brand/DeleteBrand?id=${brandId}`;
    return this.general.http.delete(DeleteBrandURL);
  }

  RetriveBrand(brandId: number){
    let RetriveBrandURL = `${this.general.API}Brand/RetrieveDeletedBrand?id=${brandId}`;
    return this.general.http.put(RetriveBrandURL,null);
  }


}
