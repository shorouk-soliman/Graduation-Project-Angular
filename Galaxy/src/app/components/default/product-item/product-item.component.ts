import { Component, Input, OnInit } from '@angular/core';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  API:string = this.unit.general.API.slice(0,-5);
  @Input() products: any;
  @Input() productsTotalPages: number = 1;

  constructor(private unit:UnitService) { }

  productSelectedPrice: { [productId: number]: number } = {};

  ngOnInit() {
  }

  AddToCart(product:any):void{
    product.incart = !product.incart;
    this.unit.cart.AddToCart(product,this.productSelectedPrice[product.id] || 1);
  }

  AddToWishList(product:any):void{
    product.inwl = !product.inwl;
    this.unit.wishlist.AddToWishList(product);
  }

  RemoveFromWishList(product:any):void{
    product.inwl = !product.inwl;
    this.unit.wishlist.RemoveFromWishList(product);
  }

  OnProductQtyChange(productId:number,event:any):void{
    let newQuantity = event.target.value;
    this.productSelectedPrice[productId] = newQuantity;
  }
  
  RemoveFromCart(productId:number){
    this.unit.cart.RemoveFromCart(productId);
  }

  convertToRound(decimal:number) {
    return Math.round(decimal);
  }


}
