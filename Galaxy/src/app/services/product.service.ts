import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProductService {

constructor(private general:GeneralService) { }


GetProductDetils(productId:string|null):Observable<any>{
   const GetProductURL = `${this.general.API}Product/GetOneProduct?id=${productId}`;
  return this.general.http.get(GetProductURL);
}


AddSimpleProduct(insert:any):Observable<any>{
  const AddProductURL = `${this.general.API}Product/AddSimpleProduct`;
 return this.general.http.post(AddProductURL,insert);
}

AddVarProduct(insert:any):Observable<any>{
  const AddProductURL = `${this.general.API}Product/AddVarProduct`;
 return this.general.http.post(AddProductURL,insert);
}

DeleteProduct(productId:number):Observable<any>{
  const AddProductURL = `${this.general.API}Product/DeleteProduct?id=${productId}`;
 return this.general.http.delete(AddProductURL);
}


}
