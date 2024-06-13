import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.css']
})
export class MainProductComponent implements OnInit {

  product:any;
  Qty:number | null = null;
  productId:string|null ='';

  constructor(
    private unit: UnitService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.GetProductDetails()
  }

  GetProductDetails():void{
    this.unit.product.GetProductDetils(this.productId)
    .subscribe((productData:any)=>{
      this.unit.cart.GetCart().subscribe((cart:any)=>{
        this.product = productData;
        this.product.incart = cart?.some((cp:any) => cp?.productId === Number(this.productId));
        this.Qty = cart?.find((cp: any) => cp?.productId === Number(this.productId))?.cartProductQuantity;
        this.unit.wishlist.GetWishList().subscribe((wl:any)=>{
          this.product.inwl = wl?.some((wl:any) => wl?.id === Number(this.productId));
        })
      })
    });
  }

  onChangeValues(event:any){
    this.unit.eav.GetProductIdbyValues(this.product.variantGroupId,event)
    .subscribe((productId:number)=>{
      /* change id pramter */
      this.router.navigate(['/product',productId])
      this.productId = productId.toString();
      this.GetProductDetails();
    })
  }

  UpdateAvgRating():void{
    this.unit.rate.GetAvgRating(this.productId).subscribe((avg:any)=>{
      this.product.rate = avg;
    })
  }

}
