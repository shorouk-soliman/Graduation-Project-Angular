import { Injectable } from '@angular/core';
import { IAddRate } from '../../Models/Rating/rating-add';
import { IRateRead } from '../../Models/Rating/rating-read';
import { IUserRead, initUserRead } from '../../Models/User/user-read';
import { UnitService } from '../../services/unit.service';
import { UserService } from '../../services/user.service';
import { IUpdateRate } from '../../Models/Rating/rating-update';

@Injectable({
  providedIn: 'root'
})
export class RateMapperService {

  constructor(private userService: UserService) { }

  ToAddRate(rate: number, title: string, text: string): IAddRate {
    return {
      rate: rate,
      reviewtitle: title,
      reviewText: text,
    };
  };

  ToUpdateRate(rate: number, title: string, text: string): IUpdateRate {
    return {
      rate: rate,
      reviewtitle: title,
      reviewText: text,
    };
  };

  AddToRead(addRate: IAddRate, productId: number): IRateRead {
    return {
      rate: addRate.rate,
      reviewTitle: addRate.reviewtitle,
      reviewText: addRate.reviewText,
      user: initUserRead,
      productId: productId,
      date: new Date().getUTCDate(),
    };
  }
  
  UpdateToRead(addRate: IAddRate, productId: number): IRateRead {
    return {
      rate: addRate.rate,
      reviewTitle: addRate.reviewtitle,
      reviewText: addRate.reviewText,
      user: initUserRead,
      productId: productId,
      date: new Date().getUTCDate(),
    };
  }

  ToRead(rate: number, reviewTitle: string, reviewText: string, user: IUserRead, productId: number): IRateRead {
    return {
      rate: rate,
      reviewTitle: reviewTitle,
      reviewText: reviewText,
      user: user,
      productId: productId,
      date: new Date().getUTCDate(),
    };
  };


}
