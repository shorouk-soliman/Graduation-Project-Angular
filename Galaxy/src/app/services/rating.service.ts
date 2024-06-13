import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private general: GeneralService) { }
  productId:number = 0;
  page:number = 0;

  
  private RatingSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  

  CheckproductEligabilityToRate(productId:number){      
      let checkeligabilityUrl = `${this.general.API}Rating/IsProductEligable?productId=${productId}`;
      return this.general.http.get<any>(checkeligabilityUrl);
  }

  AddRating(rating:any, productId:number):Observable<any>{
    let AddRating = `${this.general.API}Rating/AddRating?productId=${productId}`;
    return this.general.http.post(AddRating,rating);
  }

  GetProductRating = ():Observable<any> => this.RatingSubject.asObservable();
  
  GetAvgRating(productId:string | null):Observable<any>{
    let GetAvgRateUrl = `${this.general.API}Rating/GetAvgRating?productId=${productId}`
    return this.general.http.get(GetAvgRateUrl);
  }

  FetchProductRating(page:number = this.page, productId:number = this.productId){
    this.page = page;
    this.productId = productId;
    let GetRating = `${this.general.API}Rating/GetProductRating?productId=${productId}&page=${page}`;
    return this.general.http.get(GetRating).subscribe((rating:any)=>{
      this.RatingSubject.next(rating);
    });
  }

  UpdateRating(rating:any, productId:number):Observable<any>{
    let UpdateRating = `${this.general.API}Rating/UpdateRating?productId=${productId}`;
    return this.general.http.put(UpdateRating,rating);
  }

  DeleteRating(productId:number){
    let DeleteRatingUrl = `${this.general.API}Rating/DeleteRating?productId=${productId}`;
    return this.general.http.delete(DeleteRatingUrl);
  }
}
