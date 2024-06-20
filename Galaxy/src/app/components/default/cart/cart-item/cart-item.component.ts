import { Component, Input, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ICartItem } from '../../../../Models/Cart-Items/Cart-item-model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private unit: UnitService) { }

  @Input() cartItems: ICartItem[] = [];

  ngOnInit() {
  };

  LodingCart(): boolean {
    return this.unit.cart.loading;
  };

  UpdateQuantity(productId: number, event: any): void {
    let newQuantity = event.target.value;
    this.unit.cart.UpdateItemQuantity(productId, newQuantity);
  };

  RemoveProduct(productId: number): void {
    this.unit.cart.RemoveFromCart(productId);
  };

  clearCart() {
    this.unit.cart.clearCart();
  };

};