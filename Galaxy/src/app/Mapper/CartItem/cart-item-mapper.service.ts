import { Injectable } from '@angular/core';
import { ICartItem } from '../../Models/Cart-Items/Cart-item-model';
import { IProducts } from '../../Models/Product/products-model';

@Injectable({
  providedIn: 'root'
})
export class CartItemMapperService {

constructor() { }

ToCartItem(productId: number, cartProductQuantity: number,product:IProducts): ICartItem {
  return {
    productId: productId,
    cartProductQuantity: cartProductQuantity,
    product: product
  };
}

}
