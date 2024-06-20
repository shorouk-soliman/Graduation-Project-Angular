import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { IAddRate } from '../Models/Rating/rating-add';
import { IProductRating } from '../Models/Rating/rating-product';
import { IUpdateRate } from '../Models/Rating/rating-update';
import { IRateRead } from '../Models/Rating/rating-read';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private generic: GenericService) { }

  ratedBeforeSubject:BehaviorSubject<IRateRead | null> = new BehaviorSubject<IRateRead | null>(null);
  productId: number = 0;
  page: number = 0;

  sendRate(rate:IRateRead | null):void{
    this.ratedBeforeSubject.next(rate);
  }

  listenToRate():Observable<IRateRead | null>{
    return this.ratedBeforeSubject.asObservable();
  }

  CheckproductEligabilityToRate(productId: number): Observable<boolean> {
    let Url: string = `Rating/IsProductEligable?productId=${productId}`;
    return this.generic.getRequest<boolean>(Url);
  };

  AddRating(rating: IAddRate, productId: number): Observable<any> {
    let Url: string = `Rating/AddRating?productId=${productId}`;
    return this.generic.postRequest<any>(Url, rating);
  };

  GetAvgRating(productId: number): Observable<number> {
    let Url: string = `Rating/GetAvgRating?productId=${productId}`;
    return this.generic.getRequest<number>(Url);
  };

  GetProductRating(page: number, productId: number): Observable<IProductRating> {
    let Url: string = `Rating/GetProductRating?productId=${productId}&page=${page}`;
    return this.generic.getRequest<IProductRating>(Url);
  };

  UpdateRating(rating: IUpdateRate, productId: number): Observable<any> {
    let Url: string = `Rating/UpdateRating?productId=${productId}`;
    return this.generic.putRequest<any>(Url, rating);
  };

  DeleteRating(productId: number) {
    let Url: string = `Rating/DeleteRating?productId=${productId}`;
    return this.generic.deleteRequest<any>(Url);
  };

};