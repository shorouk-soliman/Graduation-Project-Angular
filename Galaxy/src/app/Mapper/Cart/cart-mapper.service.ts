import { Injectable } from '@angular/core';
import { IAddToCart } from '../../Models/Cart-Items/Add-To-Cart-model';
import { IUpdateCartItem } from '../../Models/Cart-Items/Update-Cart-Item-model';

@Injectable({
  providedIn: 'root'
})
export class CartMapperService {

  constructor() { }


  ToAddToCart(productId: number, cartProductQuantity: number): IAddToCart {
    return {
      productId: productId,
      cartProductQuantity: cartProductQuantity,
    };
  }

  ToUpdateCartItem(productId: number, cartProductQuantity: number): IUpdateCartItem {
    return {
      productId: productId,
      cartProductQuantity: cartProductQuantity,
    };
  }

}
