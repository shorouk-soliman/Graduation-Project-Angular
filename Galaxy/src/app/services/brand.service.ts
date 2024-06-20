import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBrandRead } from '../Models/Brand/Brand-Read-model';
import { IBrandAdmin } from '../Models/Brand/Brand-Admin-model';

@Injectable({
  providedIn: 'root'
})

export class BrandService {

  constructor(private generic: GenericService) { }

  generalBrandSubject: BehaviorSubject<IBrandRead[]> = new BehaviorSubject<IBrandRead[]>([]);

  FetchGeneralBrands(): void {
    let Url: string = `Brand/GetAllGeneral`;
    this.generic.getRequest<IBrandRead[]>(Url).subscribe((brands: IBrandRead[]) => {
      this.generalBrandSubject.next(brands);
    });
  };

  GetOneBrand(brandId: number): Observable<IBrandRead> {
    let Url: string = `Brand/GetBrand?id=${brandId}`;
    return this.generic.getRequest<IBrandRead>(Url);
  };

  GetAdminBrand(): Observable<IBrandAdmin> {
    let Url: string = `Brand/GetAllAdmin`;
    return this.generic.getRequest<IBrandAdmin>(Url);
  };

  getGeneralBrands(): Observable<IBrandRead[]> {
    return this.generalBrandSubject.asObservable();
  };

  AddBrand(brand: any): Observable<any> {
    let Url: string = `Brand/AddBrand`;
    return this.generic.postRequest<any>(Url, brand);
  };

  DeleteBrand(brandId: number): Observable<any> {
    let Url: string = `Brand/DeleteBrand?id=${brandId}`;
    return this.generic.deleteRequest(Url);
  };

  RetriveBrand(brandId: number): Observable<any> {
    let Url: string = `Brand/RetrieveDeletedBrand?id=${brandId}`;
    return this.generic.putRequest(Url, null);
  };

};