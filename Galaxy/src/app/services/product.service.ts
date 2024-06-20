import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { ISimpleProduct } from '../Models/Product/simple-product-model';
import { IVarProduct } from '../Models/Product/var-product-model';
import { IProductDetails } from '../Models/Product/Product-Details-model';

@Injectable()
export class ProductService {

  constructor(private generic: GenericService) { }


  GetProductDetails(productId: number): Observable<IProductDetails> {
    let Url: string = `Product/GetOneProduct?id=${productId}`;
    return this.generic.getRequest<IProductDetails>(Url);
  }

  AddSimpleProduct(insert: ISimpleProduct): Observable<ISimpleProduct> {
    let Url: string = `Product/AddSimpleProduct`;
    return this.generic.postRequest<ISimpleProduct>(Url, insert);
  }

  AddVarProduct(insert: IVarProduct): Observable<IVarProduct> {
    let Url: string = `Product/AddVarProduct`;
    return this.generic.postRequest<IVarProduct>(Url, insert);
  }

  DeleteProduct(productId: number): Observable<any> {
    let Url: string = `Product/DeleteProduct?id=${productId}`;
    return this.generic.deleteRequest<any>(Url);
  }

};