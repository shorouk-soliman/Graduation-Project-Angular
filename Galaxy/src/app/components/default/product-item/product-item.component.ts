import { Component, Input, OnInit } from '@angular/core';
import { UnitService } from '../../../services/unit.service';
import { IProducts } from '../../../Models/Product/products-model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() products: IProducts[] = [];

  constructor(private unit: UnitService) { }

  productSelectedPrice: { [productId: number]: number } = {};

  ngOnInit() {
  }

  AddToCart(product: IProducts): void {
    product.inCart = !product.inCart;
    this.unit.cart.AddToCart(product, this.productSelectedPrice[product.id] || 1);
  }

  RemoveFromCart(productId: number) {
    this.unit.cart.RemoveFromCart(productId);
  }

  AddToWishList(product: IProducts): void {
    product.inWishList = !product.inWishList;
    this.unit.wishlist.AddToWishList(product);
  }

  RemoveFromWishList(product: IProducts): void {
    product.inWishList = !product.inWishList;
    this.unit.wishlist.RemoveFromWishList(product);
  }

  OnProductQtyChange(productId: number, event: any): void {
    let newQuantity = event.target.value;
    this.productSelectedPrice[productId] = newQuantity;
  }

  convertToRound(decimal: number) {
    return Math.round(decimal);
  }


}
