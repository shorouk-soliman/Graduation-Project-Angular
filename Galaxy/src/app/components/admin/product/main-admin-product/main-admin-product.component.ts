import { Component, OnDestroy } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { Subscription } from 'rxjs';
import { IProducts } from '../../../../Models/Product/products-model';
import { IProductQuery, initProductQuery } from '../../../../Models/Product/product-query-model';

@Component({
  selector: 'app-main-admin-product',
  templateUrl: './main-admin-product.component.html',
  styleUrl: './main-admin-product.component.css'
})
export class MainAdminProductComponent implements OnDestroy{
  constructor(private unit: UnitService) { }
  products: IProducts[] = [];
  query:IProductQuery = new initProductQuery();

  private productsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.unit.products.fetchGeneralProducts(this.query);
    this.GetProducts()
  }

  DeleteProduct(productId:number){
    this.unit.product.DeleteProduct(productId).subscribe(()=>{
      this.unit.products.fetchGeneralProducts(this.query);
    })
  }
  RetriveBrand(brand:any){
    this.unit.brand.RetriveBrand(brand.id).subscribe(()=>{
      brand.isDeleted = false;
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
