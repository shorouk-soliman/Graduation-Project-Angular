import { Component, Input, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private unit:UnitService) { }
  @Input() cartItems:any;

  ngOnInit() {
  }
  
  
  LodingCart():boolean{
    return this.unit.cart.loding;
  }

  UpdateQuantity(productId:number,event:any):void{
    let newQuantity = event.target.value;
    this.unit.cart.UpdateItemQuantity(productId,newQuantity);
  }

  RemoveProduct(productId:number):void{
    this.unit.cart.RemoveFromCart(productId);
  }

  clearCart(){
    this.unit.cart.clearCart();
  }

}
