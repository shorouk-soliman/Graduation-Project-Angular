import { Injectable } from '@angular/core';
import { CartMapperService } from '../Cart/cart-mapper.service';
import { CartItemMapperService } from '../CartItem/cart-item-mapper.service';
import { RateMapperService } from '../Rate/rate-mapper.service';
import { ProductsMapperService } from '../Products/products-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class IMapperService {

constructor(
 public cart:CartMapperService,
 public cartItem:CartItemMapperService,
 public rate:RateMapperService,
 public products:ProductsMapperService
) { }

}
