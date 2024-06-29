import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { IProductDetails, initialProductDetails } from '../../../../Models/Product/Product-Details-model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnChanges {

  @Input() product: IProductDetails = initialProductDetails;
  @Input() InQty: number | undefined = 0;
  @Output() onChangeValues = new EventEmitter<any>();

  mainImage: string = '';
  OutQty: number = 1; 

  constructor(private unit: UnitService) { }

  ngOnInit() {
    this.mainImage = this.product.image;
  };

  AddToWishList(product:IProductDetails):void{
    product.inWishList = !product.inWishList;
    this.unit.wishlist.AddToWishList(product);
  };

  RemoveFromWishList(product:IProductDetails):void{
    product.inWishList = !product.inWishList;
    this.unit.wishlist.RemoveFromWishList(product);
  };

  Changevalues(event:any){
    this.onChangeValues.emit(event);
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.mainImage = this.product.image;
  };

  SetMainImage(image: string): void {
    this.mainImage = image;
  };

  AddToCart(product: any): void {
    product.incart = !product.incart;
    this.unit.cart.AddToCart(product, this.OutQty || 1);
  };

  OnProductQtyChangeIN(event: any): void {
    let newQuantity = event.target.value;
    this.InQty = newQuantity;
    this.unit.cart.UpdateItemQuantity(this.product.id,+newQuantity)
  };

  OnProductQtyChangeOUT(event: any): void {
    let newQuantity = event.target.value;
    this.OutQty = newQuantity;
  };

  RemoveFromCart(product: any) :void{
    product.incart = !product.incart;
    this.unit.cart.RemoveFromCart(product.id);
  };

}
