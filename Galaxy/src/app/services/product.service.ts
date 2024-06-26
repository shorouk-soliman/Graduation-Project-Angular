import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { ISimpleProduct } from '../Models/Product/simple-product-model';
import { IVarProduct } from '../Models/Product/var-product-model';
import { IProductDetails } from '../Models/Product/Product-Details-model';
import { IGeneralProducts } from '../Models/Product/general-product-model';

@Injectable()
export class ProductService {

  constructor(private generic: GenericService) { }

  GetProductDetails(productId: number): Observable<IProductDetails> {
    const url: string = `Product/GetOneProduct?id=${productId}`;
    return this.generic.getRequest<IProductDetails>(url);
  }

  AddSimpleProduct(insert: ISimpleProduct): Observable<ISimpleProduct> {
    const url: string = `Product/AddSimpleProduct`;
    return this.generic.postRequest<ISimpleProduct>(url, insert);
  }

  AddVarProduct(insert: IVarProduct): Observable<IVarProduct> {
    const url: string = `Product/AddVarProduct`;
    return this.generic.postRequest<IVarProduct>(url, insert);
  }

  UpdateProduct(id: number, insert: ISimpleProduct): Observable<ISimpleProduct> {
    const url: string = `Product/UpdateProduct?id=${id}`;
    return this.generic.putRequest<ISimpleProduct>(url, insert);
  }

  DeleteProduct(productId: number): Observable<any> {
    const url: string = `Product/DeleteProduct?id=${productId}`;
    return this.generic.deleteRequest<any>(url);
  }

  RetrieveProduct(productId: number): Observable<any> {
    const url: string = `Product/RetreiveDeletedProduct?id=${productId}`;
    return this.generic.putRequest<any>(url, null);
  }

  GetGeneralProducts(): Observable<IGeneralProducts> {
    const url: string = `Product/GetGeneralPagination`;
    return this.generic.getRequest<IGeneralProducts>(url);
  }

  GetAdminProducts(): Observable<IGeneralProducts> {
    const url: string = `Product/GetAdminPagination`;
    return this.generic.getRequest<IGeneralProducts>(url);
  }
}
