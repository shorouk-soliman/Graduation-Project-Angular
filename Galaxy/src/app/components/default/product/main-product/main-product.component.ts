import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductDetails, initialProductDetails } from '../../../../Models/Product/Product-Details-model';
import { ICartItem } from '../../../../Models/Cart-Items/Cart-item-model';
import { IProducts } from '../../../../Models/Product/products-model';
import { IProductRating, initProductRating } from '../../../../Models/Rating/rating-product';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.css']
})
export class MainProductComponent implements OnInit,OnChanges {

  constructor(private unit: UnitService,private route:ActivatedRoute) { }

  product:IProductDetails = initialProductDetails;
  Qty:number | undefined = 0;
  productId:number = 0;
  

  ngOnInit() {
    this.getIdParamter();
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.getIdParamter();
  };

  getIdParamter():void{
    this.route.paramMap.subscribe(params =>{
      this.productId = Number(params.get('id'));
      this.GetProductDetails();
    });
  };

  GetProductDetails():void{
    this.unit.product.GetProductDetails(this.productId).subscribe((productData:IProductDetails)=>{
      this.unit.cart.GetCart().subscribe((cartItems:ICartItem[])=>{
        this.product = productData;
        this.product.inCart = cartItems?.some((cp:ICartItem) => cp?.productId === Number(this.productId));
        this.Qty = cartItems?.find((ci: ICartItem) => ci.productId === Number(this.productId))?.cartProductQuantity;
        this.unit.wishlist.GetWishList().subscribe((WishListProducts:IProducts[])=>{
          this.product.inWishList = WishListProducts?.some((product:IProducts) => product?.id === Number(this.productId));
        })
      })
    });
  };



  onChangeValues(event:any){
    this.unit.eav.GetProductIdbyValues(this.product.variantGroupId,event).subscribe((productId:number)=>{
      /* change id pramter */
      this.unit.generic.router.navigate(['/product',productId])
    });
  };

  UpdateAvgRating():void{
    this.unit.rate.GetAvgRating(this.productId).subscribe((avgRate:number)=>{
      this.product.rate = avgRate;
    });
  };

}
