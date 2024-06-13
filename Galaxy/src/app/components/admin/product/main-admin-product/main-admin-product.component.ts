import { Component, OnDestroy } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-admin-product',
  templateUrl: './main-admin-product.component.html',
  styleUrl: './main-admin-product.component.css'
})
export class MainAdminProductComponent implements OnDestroy{
  constructor(private unit: UnitService) { }
  products: any;
  private productsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.unit.products.FetchGeneralProducts(1,200,'any',0,0);
    this.GetProducts()
  }

  DeleteProduct(productId:number){
    this.unit.product.DeleteProduct(productId).subscribe(()=>{
      this.unit.products.FetchGeneralProducts(1,200,'any',0,0);
    },error=>{
      
    })
  }
  RetriveBrand(brand:any){
    this.unit.brand.RetriveBrand(brand.id).subscribe(()=>{
      brand.isDeleted = false;
    },error=>{
      
    })
  }

  GetProducts():void{
    this.productsSubscription = this.unit.products.GetProducts().subscribe((products: any) => {
      this.products = products.products;
    });
  }
  ngOnDestroy(): void {
      this.productsSubscription.unsubscribe();
  }
}
